/**
 * useApi Hook
 * Provides comprehensive API management with caching, retries, and state management
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// Default configuration
const DEFAULT_CONFIG = {
  baseURL: '',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  cache: true,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  }
};

// Request states
const REQUEST_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Cache management
class ApiCache {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
  }

  set(key, data, timeout = 5 * 60 * 1000) {
    this.cache.set(key, data);
    this.timestamps.set(key, Date.now() + timeout);
  }

  get(key) {
    const timestamp = this.timestamps.get(key);
    if (timestamp && Date.now() < timestamp) {
      return this.cache.get(key);
    }
    this.delete(key);
    return null;
  }

  delete(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  clear() {
    this.cache.clear();
    this.timestamps.clear();
  }

  has(key) {
    const timestamp = this.timestamps.get(key);
    return timestamp && Date.now() < timestamp;
  }

  getSize() {
    return this.cache.size;
  }
}

const globalCache = new ApiCache();

// HTTP client
class HttpClient {
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.interceptors = {
      request: [],
      response: [],
      error: []
    };
  }

  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  addErrorInterceptor(interceptor) {
    this.interceptors.error.push(interceptor);
  }

  async request(url, options = {}) {
    const fullUrl = url.startsWith('http') ? url : `${this.config.baseURL}${url}`;
    
    let requestOptions = {
      ...this.config,
      ...options,
      headers: {
        ...this.config.headers,
        ...options.headers
      }
    };

    // Apply request interceptors
    for (const interceptor of this.interceptors.request) {
      requestOptions = await interceptor(requestOptions);
    }

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      requestOptions.signal = controller.signal;
      
      let response = await fetch(fullUrl, requestOptions);
      clearTimeout(timeoutId);

      // Apply response interceptors
      for (const interceptor of this.interceptors.response) {
        response = await interceptor(response);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      return { data, status: response.status, headers: response.headers };
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Apply error interceptors
      for (const interceptor of this.interceptors.error) {
        await interceptor(error);
      }
      
      throw error;
    }
  }

  get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  post(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  patch(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }
}

// Default client instance
const defaultClient = new HttpClient();

// Main useApi hook
export const useApi = (config = {}) => {
  const client = useMemo(() => {
    if (Object.keys(config).length === 0) return defaultClient;
    return new HttpClient(config);
  }, [config]);

  // Request state management
  const [requests, setRequests] = useState({});
  const abortControllersRef = useRef({});

  // Generate request key
  const generateKey = useCallback((url, options = {}) => {
    return `${options.method || 'GET'}:${url}:${JSON.stringify(options.params || {})}`;
  }, []);

  // Get request state
  const getRequestState = useCallback((key) => {
    return requests[key] || {
      state: REQUEST_STATES.IDLE,
      data: null,
      error: null,
      loading: false
    };
  }, [requests]);

  // Update request state
  const updateRequestState = useCallback((key, updates) => {
    setRequests(prev => ({
      ...prev,
      [key]: { ...prev[key], ...updates }
    }));
  }, []);

  // Execute request with retry logic
  const executeRequest = useCallback(async (url, options = {}) => {
    const key = generateKey(url, options);
    const { retries = 3, retryDelay = 1000, cache = true, cacheTimeout } = { ...DEFAULT_CONFIG, ...config, ...options };

    // Check cache first
    if (cache && options.method !== 'POST' && options.method !== 'PUT' && options.method !== 'PATCH' && options.method !== 'DELETE') {
      const cached = globalCache.get(key);
      if (cached) {
        updateRequestState(key, {
          state: REQUEST_STATES.SUCCESS,
          data: cached,
          error: null,
          loading: false
        });
        return cached;
      }
    }

    // Create abort controller
    const controller = new AbortController();
    abortControllersRef.current[key] = controller;

    updateRequestState(key, {
      state: REQUEST_STATES.LOADING,
      loading: true,
      error: null
    });

    let lastError;
    let attempt = 0;

    while (attempt <= retries) {
      try {
        const response = await client.request(url, {
          ...options,
          signal: controller.signal
        });

        // Cache successful response
        if (cache) {
          globalCache.set(key, response.data, cacheTimeout);
        }

        updateRequestState(key, {
          state: REQUEST_STATES.SUCCESS,
          data: response.data,
          error: null,
          loading: false,
          status: response.status,
          headers: response.headers
        });

        delete abortControllersRef.current[key];
        return response.data;
      } catch (error) {
        lastError = error;
        attempt++;

        if (error.name === 'AbortError') {
          updateRequestState(key, {
            state: REQUEST_STATES.ERROR,
            error: new Error('Request was cancelled'),
            loading: false
          });
          throw error;
        }

        if (attempt <= retries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
        }
      }
    }

    updateRequestState(key, {
      state: REQUEST_STATES.ERROR,
      error: lastError,
      loading: false
    });

    delete abortControllersRef.current[key];
    throw lastError;
  }, [client, config, generateKey, updateRequestState]);

  // HTTP methods
  const get = useCallback((url, options = {}) => {
    return executeRequest(url, { ...options, method: 'GET' });
  }, [executeRequest]);

  const post = useCallback((url, data, options = {}) => {
    return executeRequest(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }, [executeRequest]);

  const put = useCallback((url, data, options = {}) => {
    return executeRequest(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }, [executeRequest]);

  const patch = useCallback((url, data, options = {}) => {
    return executeRequest(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }, [executeRequest]);

  const del = useCallback((url, options = {}) => {
    return executeRequest(url, { ...options, method: 'DELETE' });
  }, [executeRequest]);

  // Cancel request
  const cancelRequest = useCallback((url, options = {}) => {
    const key = generateKey(url, options);
    const controller = abortControllersRef.current[key];
    if (controller) {
      controller.abort();
    }
  }, [generateKey]);

  // Cancel all requests
  const cancelAllRequests = useCallback(() => {
    Object.values(abortControllersRef.current).forEach(controller => {
      controller.abort();
    });
    abortControllersRef.current = {};
  }, []);

  // Clear cache
  const clearCache = useCallback((pattern) => {
    if (pattern) {
      // Clear specific pattern
      for (const [key] of globalCache.cache) {
        if (key.includes(pattern)) {
          globalCache.delete(key);
        }
      }
    } else {
      globalCache.clear();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAllRequests();
    };
  }, [cancelAllRequests]);

  return {
    // HTTP methods
    get,
    post,
    put,
    patch,
    delete: del,
    request: executeRequest,
    
    // Request management
    getRequestState,
    cancelRequest,
    cancelAllRequests,
    
    // Cache management
    clearCache,
    cache: globalCache,
    
    // Client access
    client,
    
    // Request states
    REQUEST_STATES
  };
};

// Specific hooks for common patterns
export const useFetch = (url, options = {}) => {
  const { get, getRequestState } = useApi(options.config);
  const [key] = useState(() => `GET:${url}:${JSON.stringify(options.params || {})}`);
  const { immediate = true, dependencies = [] } = options;

  const state = getRequestState(key);

  const execute = useCallback(() => {
    if (url) {
      return get(url, options);
    }
  }, [get, url, options]);

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  useEffect(() => {
    if (immediate && url) {
      execute();
    }
  }, [immediate, url, execute, ...dependencies]);

  return {
    ...state,
    execute,
    refetch
  };
};

export const useAsyncRequest = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null
  });

  const execute = useCallback(async (asyncFunction) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await asyncFunction();
      setState({ loading: false, error: null, data: result });
      return result;
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, data: null });
  }, []);

  return { ...state, execute, reset };
};

// Resource management hooks
export const useResource = (baseUrl, config = {}) => {
  const api = useApi(config);

  const list = useCallback((params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    return api.get(url);
  }, [api, baseUrl]);

  const get = useCallback((id) => {
    return api.get(`${baseUrl}/${id}`);
  }, [api, baseUrl]);

  const create = useCallback((data) => {
    return api.post(baseUrl, data);
  }, [api, baseUrl]);

  const update = useCallback((id, data) => {
    return api.put(`${baseUrl}/${id}`, data);
  }, [api, baseUrl]);

  const remove = useCallback((id) => {
    return api.delete(`${baseUrl}/${id}`);
  }, [api, baseUrl]);

  const patch = useCallback((id, data) => {
    return api.patch(`${baseUrl}/${id}`, data);
  }, [api, baseUrl]);

  return {
    list,
    get,
    create,
    update,
    remove,
    patch,
    ...api
  };
};

// Configure global defaults
export const configureApi = (config) => {
  Object.assign(DEFAULT_CONFIG, config);
  
  // Add global interceptors
  if (config.interceptors) {
    const { request, response, error } = config.interceptors;
    
    if (request) defaultClient.addRequestInterceptor(request);
    if (response) defaultClient.addResponseInterceptor(response);
    if (error) defaultClient.addErrorInterceptor(error);
  }
};

// Export the default client
export { defaultClient as apiClient };

// Default export
export default useApi;
