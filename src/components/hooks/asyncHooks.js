import { useState, useCallback, useMemo } from 'react';

// useSort Hook
export const useSort = (items, initialSortKey = '', initialSortOrder = 'asc') => {
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const sortedItems = useMemo(() => {
    if (!sortKey) return items;

    return [...items].sort((a, b) => {
      const aValue = sortKey.split('.').reduce((obj, key) => obj?.[key], a);
      const bValue = sortKey.split('.').reduce((obj, key) => obj?.[key], b);

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;

      return sortOrder === 'desc' ? comparison * -1 : comparison;
    });
  }, [items, sortKey, sortOrder]);

  const handleSort = useCallback((key) => {
    if (sortKey === key) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  }, [sortKey]);

  const resetSort = useCallback(() => {
    setSortKey('');
    setSortOrder('asc');
  }, []);

  return {
    sortedItems,
    sortKey,
    sortOrder,
    handleSort,
    setSortKey,
    setSortOrder,
    resetSort
  };
};

// useFetch Hook
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (fetchUrl = url, fetchOptions = options) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(fetchUrl, fetchOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  React.useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [fetchData, url]);

  return {
    data,
    loading,
    error,
    refetch,
    fetchData
  };
};

// useAsyncOperation Hook
export const useAsyncOperation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (asyncFunction, ...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFunction(...args);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    reset
  };
};
