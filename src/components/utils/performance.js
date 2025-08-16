/**
 * Performance optimization utilities
 */

// Debounce function - delays execution until after wait time has passed
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(this, args);
  };
};

// Throttle function - limits execution to once per limit period
export const throttle = (func, limit) => {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Memoization - caches function results
export const memoize = (func, keyGenerator) => {
  const cache = new Map();
  
  return function(...args) {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

// Once function - ensures function is called only once
export const once = (func) => {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  };
};

// Delay function - returns a promise that resolves after specified time
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Retry function - retries a function with exponential backoff
export const retry = async (func, maxAttempts = 3, baseDelay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await func();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        throw lastError;
      }
      
      // Exponential backoff: baseDelay * 2^(attempt-1)
      const delayTime = baseDelay * Math.pow(2, attempt - 1);
      await delay(delayTime);
    }
  }
};

// Create a batched function that collects calls and executes them together
export const batch = (func, batchSize = 10, delay = 100) => {
  let batch = [];
  let timeoutId;
  
  return function(item) {
    batch.push(item);
    
    if (batch.length >= batchSize) {
      clearTimeout(timeoutId);
      const currentBatch = [...batch];
      batch = [];
      func(currentBatch);
    } else if (batch.length === 1) {
      timeoutId = setTimeout(() => {
        const currentBatch = [...batch];
        batch = [];
        func(currentBatch);
      }, delay);
    }
  };
};

// Rate limiter - limits function calls to a specific rate
export const rateLimit = (func, calls, period) => {
  const timestamps = [];
  
  return function(...args) {
    const now = Date.now();
    
    // Remove timestamps older than the period
    while (timestamps.length > 0 && timestamps[0] <= now - period) {
      timestamps.shift();
    }
    
    if (timestamps.length < calls) {
      timestamps.push(now);
      return func.apply(this, args);
    } else {
      throw new Error('Rate limit exceeded');
    }
  };
};

// LazyLoad utility for deferred execution
export class LazyValue {
  constructor(factory) {
    this.factory = factory;
    this.cached = false;
    this.value = undefined;
  }
  
  get() {
    if (!this.cached) {
      this.value = this.factory();
      this.cached = true;
    }
    return this.value;
  }
  
  reset() {
    this.cached = false;
    this.value = undefined;
  }
}

// Task queue for managing async operations
export class TaskQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }
  
  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        task,
        resolve,
        reject
      });
      this.process();
    });
  }
  
  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }
    
    this.running++;
    const { task, resolve, reject } = this.queue.shift();
    
    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process();
    }
  }
  
  clear() {
    this.queue.forEach(({ reject }) => {
      reject(new Error('Queue cleared'));
    });
    this.queue = [];
  }
}

// Performance monitoring utilities
export const measurePerformance = (func, name) => {
  return function(...args) {
    const start = performance.now();
    const result = func.apply(this, args);
    const end = performance.now();
    
    console.log(`${name || func.name} took ${end - start} milliseconds`);
    return result;
  };
};

export const measureAsyncPerformance = (func, name) => {
  return async function(...args) {
    const start = performance.now();
    const result = await func.apply(this, args);
    const end = performance.now();
    
    console.log(`${name || func.name} took ${end - start} milliseconds`);
    return result;
  };
};
