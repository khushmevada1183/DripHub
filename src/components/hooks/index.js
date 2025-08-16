import { useState, useCallback, useMemo } from 'react';

// useToast Hook
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message, duration) => showToast(message, 'success', duration), [showToast]);
  const showError = useCallback((message, duration) => showToast(message, 'error', duration), [showToast]);
  const showWarning = useCallback((message, duration) => showToast(message, 'warning', duration), [showToast]);
  const showInfo = useCallback((message, duration) => showToast(message, 'info', duration), [showToast]);

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast
  };
};

// useLocalStorage Hook
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// usePagination Hook
export const usePagination = (initialPage = 1, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToPage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const goToPrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  const getTotalPages = useCallback((totalItems) => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [itemsPerPage]);

  const paginateArray = useCallback((array) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  return {
    currentPage,
    itemsPerPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    getTotalPages,
    paginateArray
  };
};

// useSearch Hook
export const useSearch = (items, searchFields = []) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;

    return items.filter(item => {
      return searchFields.some(field => {
        const value = field.split('.').reduce((obj, key) => obj?.[key], item);
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [items, searchTerm, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems
  };
};

// useFilter Hook
export const useFilter = (items, initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);

  const setFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const removeFilter = useCallback((key) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '' || value === null || value === undefined) return true;
        const itemValue = key.split('.').reduce((obj, k) => obj?.[k], item);
        return itemValue === value;
      });
    });
  }, [items, filters]);

  return {
    filters,
    setFilter,
    removeFilter,
    clearFilters,
    filteredItems
  };
};

// Export async hooks
export { useSort, useFetch, useAsyncOperation } from './asyncHooks';

// Export document title hook
export { useDocumentTitle } from './useDocumentTitle';
