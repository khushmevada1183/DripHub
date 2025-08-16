/**
 * useToast Hook
 * Provides toast notification functionality for the application
 */

import { useState, useCallback, useRef, useEffect } from 'react';

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Default toast configuration
const DEFAULT_TOAST_CONFIG = {
  duration: 5000,
  position: 'top-right',
  maxToasts: 5,
  dismissible: true
};

// Toast position options
export const TOAST_POSITIONS = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4'
};

export const useToast = (config = {}) => {
  const [toasts, setToasts] = useState([]);
  const timeoutRefs = useRef({});
  const toastConfig = { ...DEFAULT_TOAST_CONFIG, ...config };

  // Generate unique ID for toast
  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Remove toast by ID
  const removeToast = useCallback((id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    
    // Clear timeout if exists
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]);
      delete timeoutRefs.current[id];
    }
  }, []);

  // Add new toast
  const addToast = useCallback((message, type = TOAST_TYPES.INFO, options = {}) => {
    const id = generateId();
    const toast = {
      id,
      message,
      type,
      timestamp: new Date().toISOString(),
      ...options
    };

    setToasts(prevToasts => {
      const newToasts = [toast, ...prevToasts];
      // Limit number of toasts
      return newToasts.slice(0, toastConfig.maxToasts);
    });

    // Auto-dismiss toast after duration (unless duration is 0)
    const duration = options.duration !== undefined ? options.duration : toastConfig.duration;
    if (duration > 0) {
      timeoutRefs.current[id] = setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [generateId, removeToast, toastConfig.duration, toastConfig.maxToasts]);

  // Convenience methods for different toast types
  const showSuccess = useCallback((message, options = {}) => {
    return addToast(message, TOAST_TYPES.SUCCESS, {
      icon: '✅',
      ...options
    });
  }, [addToast]);

  const showError = useCallback((message, options = {}) => {
    return addToast(message, TOAST_TYPES.ERROR, {
      icon: '❌',
      duration: 7000, // Errors should stay longer
      ...options
    });
  }, [addToast]);

  const showWarning = useCallback((message, options = {}) => {
    return addToast(message, TOAST_TYPES.WARNING, {
      icon: '⚠️',
      ...options
    });
  }, [addToast]);

  const showInfo = useCallback((message, options = {}) => {
    return addToast(message, TOAST_TYPES.INFO, {
      icon: 'ℹ️',
      ...options
    });
  }, [addToast]);

  // Update toast (useful for progress toasts)
  const updateToast = useCallback((id, updates) => {
    setToasts(prevToasts => 
      prevToasts.map(toast => 
        toast.id === id ? { ...toast, ...updates } : toast
      )
    );
  }, []);

  // Clear all toasts
  const clearAllToasts = useCallback(() => {
    // Clear all timeouts
    Object.values(timeoutRefs.current).forEach(clearTimeout);
    timeoutRefs.current = {};
    setToasts([]);
  }, []);

  // Pause/Resume toast auto-dismiss
  const pauseToast = useCallback((id) => {
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]);
      delete timeoutRefs.current[id];
    }
  }, []);

  const resumeToast = useCallback((id, remainingTime) => {
    if (remainingTime > 0) {
      timeoutRefs.current[id] = setTimeout(() => {
        removeToast(id);
      }, remainingTime);
    }
  }, [removeToast]);

  // Batch operations
  const showBatchToasts = useCallback((toastArray) => {
    toastArray.forEach((toastData, index) => {
      setTimeout(() => {
        const { message, type, options } = toastData;
        addToast(message, type, options);
      }, index * 100); // Stagger the toasts
    });
  }, [addToast]);

  // Promise-based toast for async operations
  const promiseToast = useCallback(async (promise, messages = {}) => {
    const {
      loading = 'Loading...',
      success = 'Success!',
      error = 'Something went wrong!'
    } = messages;

    const loadingToastId = showInfo(loading, { 
      duration: 0, // Don't auto-dismiss
      icon: '⏳' 
    });

    try {
      const result = await promise;
      removeToast(loadingToastId);
      showSuccess(typeof success === 'function' ? success(result) : success);
      return result;
    } catch (err) {
      removeToast(loadingToastId);
      showError(typeof error === 'function' ? error(err) : error);
      throw err;
    }
  }, [showInfo, showSuccess, showError, removeToast]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  // Toast component styling helpers
  const getToastStyle = useCallback((type) => {
    const baseStyle = 'flex items-center gap-3 p-4 rounded-lg shadow-lg border max-w-sm w-full transform transition-all duration-300 ease-out';
    
    const typeStyles = {
      [TOAST_TYPES.SUCCESS]: 'bg-green-50 border-green-200 text-green-800',
      [TOAST_TYPES.ERROR]: 'bg-red-50 border-red-200 text-red-800',
      [TOAST_TYPES.WARNING]: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      [TOAST_TYPES.INFO]: 'bg-blue-50 border-blue-200 text-blue-800'
    };

    return `${baseStyle} ${typeStyles[type] || typeStyles[TOAST_TYPES.INFO]}`;
  }, []);

  const getToastIcon = useCallback((toast) => {
    if (toast.icon) return toast.icon;
    
    const defaultIcons = {
      [TOAST_TYPES.SUCCESS]: '✅',
      [TOAST_TYPES.ERROR]: '❌',
      [TOAST_TYPES.WARNING]: '⚠️',
      [TOAST_TYPES.INFO]: 'ℹ️'
    };

    return defaultIcons[toast.type] || defaultIcons[TOAST_TYPES.INFO];
  }, []);

  // Advanced features
  const persistToast = useCallback((message, type, storageKey) => {
    const toastData = { message, type, timestamp: Date.now() };
    localStorage.setItem(storageKey, JSON.stringify(toastData));
    return addToast(message, type);
  }, [addToast]);

  const restorePersistedToast = useCallback((storageKey, maxAge = 24 * 60 * 60 * 1000) => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const toastData = JSON.parse(stored);
        const age = Date.now() - toastData.timestamp;
        
        if (age < maxAge) {
          addToast(toastData.message, toastData.type);
          localStorage.removeItem(storageKey);
          return true;
        }
        localStorage.removeItem(storageKey);
      }
    } catch (error) {
      console.warn('Failed to restore persisted toast:', error);
    }
    return false;
  }, [addToast]);

  return {
    // State
    toasts,
    
    // Basic operations
    addToast,
    removeToast,
    updateToast,
    clearAllToasts,
    
    // Convenience methods
    showSuccess,
    showError,
    showWarning,
    showInfo,
    
    // Advanced features
    pauseToast,
    resumeToast,
    showBatchToasts,
    promiseToast,
    persistToast,
    restorePersistedToast,
    
    // Styling helpers
    getToastStyle,
    getToastIcon,
    
    // Configuration
    config: toastConfig,
    TOAST_POSITIONS
  };
};

// Context provider for global toast management
export const createToastContext = () => {
  const ToastContext = React.createContext(null);
  
  const ToastProvider = ({ children, config = {} }) => {
    const toast = useToast(config);
    
    return (
      <ToastContext.Provider value={toast}>
        {children}
        <ToastContainer />
      </ToastContext.Provider>
    );
  };
  
  const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
      throw new Error('useToastContext must be used within ToastProvider');
    }
    return context;
  };
  
  return { ToastProvider, useToastContext };
};

// Default export
export default useToast;
