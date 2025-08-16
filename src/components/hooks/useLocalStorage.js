/**
 * useLocalStorage Hook
 * Provides persistent local storage with React state synchronization
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// Storage event emitter for cross-tab synchronization
class StorageEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);
  }

  off(key, callback) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).delete(callback);
    }
  }

  emit(key, newValue, oldValue) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).forEach(callback => {
        callback(newValue, oldValue);
      });
    }
  }
}

const storageEmitter = new StorageEventEmitter();

// Utility functions
const isSSR = () => typeof window === 'undefined';

const safeJsonParse = (value, fallback = null) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const safeJsonStringify = (value) => {
  try {
    return JSON.stringify(value);
  } catch {
    return null;
  }
};

// Storage interface
class Storage {
  static get(key, defaultValue = null) {
    if (isSSR()) return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item !== null ? safeJsonParse(item, defaultValue) : defaultValue;
    } catch (error) {
      console.warn(`Failed to get item "${key}" from localStorage:`, error);
      return defaultValue;
    }
  }

  static set(key, value) {
    if (isSSR()) return false;
    
    try {
      const oldValue = this.get(key);
      const serialized = safeJsonStringify(value);
      
      if (serialized !== null) {
        localStorage.setItem(key, serialized);
        storageEmitter.emit(key, value, oldValue);
        return true;
      }
    } catch (error) {
      console.warn(`Failed to set item "${key}" in localStorage:`, error);
    }
    return false;
  }

  static remove(key) {
    if (isSSR()) return false;
    
    try {
      const oldValue = this.get(key);
      localStorage.removeItem(key);
      storageEmitter.emit(key, null, oldValue);
      return true;
    } catch (error) {
      console.warn(`Failed to remove item "${key}" from localStorage:`, error);
    }
    return false;
  }

  static clear() {
    if (isSSR()) return false;
    
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
    return false;
  }

  static getSize() {
    if (isSSR()) return 0;
    
    try {
      let size = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          size += localStorage[key].length + key.length;
        }
      }
      return size;
    } catch (error) {
      console.warn('Failed to calculate localStorage size:', error);
      return 0;
    }
  }

  static getAllKeys() {
    if (isSSR()) return [];
    
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.warn('Failed to get localStorage keys:', error);
      return [];
    }
  }

  static isQuotaExceeded(error) {
    return error && (
      error.code === 22 ||
      error.code === 1014 ||
      error.name === 'QuotaExceededError' ||
      error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    );
  }
}

// Main hook
export const useLocalStorage = (key, defaultValue = null, options = {}) => {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    syncAcrossTabs = true,
    onError = console.warn,
    debounceMs = 0
  } = options;

  // Initialize state with value from localStorage or defaultValue
  const [storedValue, setStoredValue] = useState(() => {
    if (isSSR()) return defaultValue;
    return Storage.get(key, defaultValue);
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const debounceTimeoutRef = useRef(null);

  // Custom serialization if provided
  const getValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? deserialize(item) : defaultValue;
    } catch (error) {
      onError(`Failed to deserialize localStorage key "${key}":`, error);
      setError(error);
      return defaultValue;
    }
  }, [key, defaultValue, deserialize, onError]);

  // Set value in localStorage and state
  const setValue = useCallback((value) => {
    try {
      setError(null);
      setLoading(true);

      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      const debouncedSet = () => {
        try {
          const serialized = serialize(valueToStore);
          localStorage.setItem(key, serialized);
          setStoredValue(valueToStore);
          
          // Emit storage event for cross-tab sync
          if (syncAcrossTabs) {
            storageEmitter.emit(key, valueToStore, storedValue);
          }
        } catch (error) {
          if (Storage.isQuotaExceeded(error)) {
            onError('localStorage quota exceeded. Consider clearing some data.', error);
          } else {
            onError(`Failed to set localStorage key "${key}":`, error);
          }
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      if (debounceMs > 0) {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
        debounceTimeoutRef.current = setTimeout(debouncedSet, debounceMs);
      } else {
        debouncedSet();
      }
    } catch (error) {
      onError(`Unexpected error setting localStorage key "${key}":`, error);
      setError(error);
      setLoading(false);
    }
  }, [key, storedValue, serialize, syncAcrossTabs, onError, debounceMs]);

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setError(null);
      setLoading(true);
      
      localStorage.removeItem(key);
      setStoredValue(defaultValue);
      
      if (syncAcrossTabs) {
        storageEmitter.emit(key, defaultValue, storedValue);
      }
    } catch (error) {
      onError(`Failed to remove localStorage key "${key}":`, error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [key, defaultValue, syncAcrossTabs, onError, storedValue]);

  // Reset to default value
  const resetValue = useCallback(() => {
    setValue(defaultValue);
  }, [setValue, defaultValue]);

  // Refresh value from localStorage
  const refreshValue = useCallback(() => {
    const currentValue = getValue();
    setStoredValue(currentValue);
  }, [getValue]);

  // Listen for changes across tabs
  useEffect(() => {
    if (!syncAcrossTabs) return;

    const handleStorageChange = (newValue) => {
      setStoredValue(newValue);
    };

    const handleNativeStorageChange = (e) => {
      if (e.key === key && e.newValue !== e.oldValue) {
        try {
          const newValue = e.newValue ? deserialize(e.newValue) : defaultValue;
          setStoredValue(newValue);
        } catch (error) {
          onError(`Failed to deserialize storage event for key "${key}":`, error);
        }
      }
    };

    // Listen to our custom emitter
    storageEmitter.on(key, handleStorageChange);
    
    // Listen to native storage events (for different tabs)
    window.addEventListener('storage', handleNativeStorageChange);

    return () => {
      storageEmitter.off(key, handleStorageChange);
      window.removeEventListener('storage', handleNativeStorageChange);
    };
  }, [key, defaultValue, deserialize, syncAcrossTabs, onError]);

  // Cleanup debounce timeout
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return [
    storedValue,
    setValue,
    {
      remove: removeValue,
      reset: resetValue,
      refresh: refreshValue,
      error,
      loading
    }
  ];
};

// Hook variants for specific use cases
export const useSessionStorage = (key, defaultValue, options = {}) => {
  // Similar to useLocalStorage but uses sessionStorage
  const [value, setValue] = useState(() => {
    if (isSSR()) return defaultValue;
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = useCallback((newValue) => {
    try {
      setValue(newValue);
      sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn(`Failed to set sessionStorage key "${key}":`, error);
    }
  }, [key]);

  const removeStoredValue = useCallback(() => {
    try {
      setValue(defaultValue);
      sessionStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove sessionStorage key "${key}":`, error);
    }
  }, [key, defaultValue]);

  return [value, setStoredValue, { remove: removeStoredValue }];
};

// Hook for managing multiple localStorage keys
export const useMultipleLocalStorage = (keyValuePairs) => {
  const storageHooks = {};
  
  Object.entries(keyValuePairs).forEach(([key, defaultValue]) => {
    storageHooks[key] = useLocalStorage(key, defaultValue);
  });

  return storageHooks;
};

// Hook for localStorage with validation
export const useValidatedLocalStorage = (key, defaultValue, validator) => {
  const [value, setValue, actions] = useLocalStorage(key, defaultValue);

  const setValidatedValue = useCallback((newValue) => {
    try {
      if (validator && !validator(newValue)) {
        throw new Error(`Validation failed for localStorage key "${key}"`);
      }
      setValue(newValue);
    } catch (error) {
      console.warn(`Validation error for localStorage key "${key}":`, error);
      actions.error = error;
    }
  }, [setValue, validator, key, actions]);

  return [value, setValidatedValue, actions];
};

// Hook for localStorage with expiration
export const useLocalStorageWithExpiry = (key, defaultValue, ttlInMinutes = 60) => {
  const getWithExpiry = useCallback(() => {
    if (isSSR()) return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;

      const parsed = JSON.parse(item);
      const now = new Date().getTime();

      if (now > parsed.expiry) {
        localStorage.removeItem(key);
        return defaultValue;
      }

      return parsed.value;
    } catch {
      return defaultValue;
    }
  }, [key, defaultValue]);

  const [value, setValue] = useState(getWithExpiry);

  const setWithExpiry = useCallback((newValue) => {
    try {
      const now = new Date().getTime();
      const expiry = now + (ttlInMinutes * 60 * 1000);
      const item = {
        value: newValue,
        expiry
      };
      
      localStorage.setItem(key, JSON.stringify(item));
      setValue(newValue);
    } catch (error) {
      console.warn(`Failed to set localStorage with expiry for key "${key}":`, error);
    }
  }, [key, ttlInMinutes]);

  return [value, setWithExpiry];
};

// Utility functions
export const clearLocalStorage = () => Storage.clear();
export const getLocalStorageSize = () => Storage.getSize();
export const getAllLocalStorageKeys = () => Storage.getAllKeys();

// Export storage class for direct use
export { Storage };

// Default export
export default useLocalStorage;
