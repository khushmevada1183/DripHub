/**
 * useSearchFilter Hook
 * Provides advanced search and filtering functionality for data sets
 */

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';

// Default configuration
const DEFAULT_CONFIG = {
  searchFields: ['name', 'description'],
  debounceMs: 300,
  caseSensitive: false,
  enableHighlighting: true,
  minSearchLength: 0,
  maxResults: Infinity,
  fuzzySearch: false,
  fuzzyThreshold: 0.6
};

// Search operators
const OPERATORS = {
  CONTAINS: 'contains',
  STARTS_WITH: 'startsWith',
  ENDS_WITH: 'endsWith',
  EQUALS: 'equals',
  NOT_EQUALS: 'notEquals',
  GREATER_THAN: 'gt',
  LESS_THAN: 'lt',
  GREATER_EQUAL: 'gte',
  LESS_EQUAL: 'lte',
  IN: 'in',
  NOT_IN: 'notIn',
  REGEX: 'regex'
};

// Filter types
const FILTER_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  BOOLEAN: 'boolean',
  SELECT: 'select',
  RANGE: 'range',
  MULTI_SELECT: 'multiSelect'
};

// Utility functions
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const fuzzyMatch = (text, pattern, threshold = 0.6) => {
  if (!text || !pattern) return false;
  
  const textLower = text.toLowerCase();
  const patternLower = pattern.toLowerCase();
  
  // Simple fuzzy matching algorithm
  let matches = 0;
  let patternIndex = 0;
  
  for (let i = 0; i < textLower.length && patternIndex < patternLower.length; i++) {
    if (textLower[i] === patternLower[patternIndex]) {
      matches++;
      patternIndex++;
    }
  }
  
  const score = matches / patternLower.length;
  return score >= threshold;
};

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

const applyOperator = (value, filterValue, operator) => {
  if (value == null) return false;
  
  switch (operator) {
    case OPERATORS.CONTAINS:
      return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
    case OPERATORS.STARTS_WITH:
      return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
    case OPERATORS.ENDS_WITH:
      return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
    case OPERATORS.EQUALS:
      return value === filterValue;
    case OPERATORS.NOT_EQUALS:
      return value !== filterValue;
    case OPERATORS.GREATER_THAN:
      return Number(value) > Number(filterValue);
    case OPERATORS.LESS_THAN:
      return Number(value) < Number(filterValue);
    case OPERATORS.GREATER_EQUAL:
      return Number(value) >= Number(filterValue);
    case OPERATORS.LESS_EQUAL:
      return Number(value) <= Number(filterValue);
    case OPERATORS.IN:
      return Array.isArray(filterValue) && filterValue.includes(value);
    case OPERATORS.NOT_IN:
      return Array.isArray(filterValue) && !filterValue.includes(value);
    case OPERATORS.REGEX:
      try {
        const regex = new RegExp(filterValue, 'i');
        return regex.test(String(value));
      } catch {
        return false;
      }
    default:
      return false;
  }
};

// Main hook
export const useSearchFilter = (data = [], config = {}) => {
  const {
    searchFields,
    debounceMs,
    caseSensitive,
    enableHighlighting,
    minSearchLength,
    maxResults,
    fuzzySearch,
    fuzzyThreshold
  } = { ...DEFAULT_CONFIG, ...config };

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });
  const [isSearching, setIsSearching] = useState(false);

  // Refs
  const debounceTimeoutRef = useRef(null);

  // Debounce search query
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    setIsSearching(true);
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    }, debounceMs);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery, debounceMs]);

  // Search function
  const searchData = useCallback((items, query) => {
    if (!query || query.length < minSearchLength) return items;

    const searchTerm = caseSensitive ? query : query.toLowerCase();
    
    return items.filter(item => {
      return searchFields.some(field => {
        const value = getNestedValue(item, field);
        if (value == null) return false;

        const stringValue = caseSensitive ? String(value) : String(value).toLowerCase();
        
        if (fuzzySearch) {
          return fuzzyMatch(stringValue, searchTerm, fuzzyThreshold);
        }
        
        return stringValue.includes(searchTerm);
      });
    });
  }, [searchFields, caseSensitive, minSearchLength, fuzzySearch, fuzzyThreshold]);

  // Filter function
  const filterData = useCallback((items, filterConfig) => {
    return items.filter(item => {
      return Object.entries(filterConfig).every(([field, filterRule]) => {
        if (!filterRule || filterRule.value == null) return true;
        
        const value = getNestedValue(item, field);
        const { value: filterValue, operator = OPERATORS.EQUALS, type = FILTER_TYPES.TEXT } = filterRule;
        
        // Handle different filter types
        switch (type) {
          case FILTER_TYPES.RANGE:
            const { min, max } = filterValue;
            const numValue = Number(value);
            return (!min || numValue >= min) && (!max || numValue <= max);
            
          case FILTER_TYPES.MULTI_SELECT:
            return Array.isArray(filterValue) && filterValue.length === 0 || 
                   Array.isArray(filterValue) && filterValue.includes(value);
            
          case FILTER_TYPES.DATE:
            const itemDate = new Date(value);
            const filterDate = new Date(filterValue);
            return applyOperator(itemDate.getTime(), filterDate.getTime(), operator);
            
          default:
            return applyOperator(value, filterValue, operator);
        }
      });
    });
  }, []);

  // Sort function
  const sortData = useCallback((items, { field, direction }) => {
    if (!field) return items;

    return [...items].sort((a, b) => {
      const aValue = getNestedValue(a, field);
      const bValue = getNestedValue(b, field);
      
      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return direction === 'asc' ? -1 : 1;
      if (bValue == null) return direction === 'asc' ? 1 : -1;
      
      // Compare values
      let comparison = 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }
      
      return direction === 'desc' ? -comparison : comparison;
    });
  }, []);

  // Computed filtered and sorted data
  const processedData = useMemo(() => {
    let result = [...data];
    
    // Apply search
    if (debouncedQuery) {
      result = searchData(result, debouncedQuery);
    }
    
    // Apply filters
    result = filterData(result, filters);
    
    // Apply sorting
    result = sortData(result, sortConfig);
    
    // Apply max results limit
    if (maxResults < Infinity) {
      result = result.slice(0, maxResults);
    }
    
    return result;
  }, [data, debouncedQuery, filters, sortConfig, maxResults, searchData, filterData, sortData]);

  // Highlight function
  const highlightText = useCallback((text, query) => {
    if (!enableHighlighting || !query || !text) return text;
    
    const searchTerm = caseSensitive ? query : query.toLowerCase();
    const textToSearch = caseSensitive ? text : text.toLowerCase();
    
    if (!textToSearch.includes(searchTerm)) return text;
    
    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, caseSensitive ? 'g' : 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }, [enableHighlighting, caseSensitive]);

  // Search methods
  const updateSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
  }, []);

  // Filter methods
  const addFilter = useCallback((field, value, operator = OPERATORS.EQUALS, type = FILTER_TYPES.TEXT) => {
    setFilters(prev => ({
      ...prev,
      [field]: { value, operator, type }
    }));
  }, []);

  const removeFilter = useCallback((field) => {
    setFilters(prev => {
      const { [field]: removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const updateFilter = useCallback((field, updates) => {
    setFilters(prev => ({
      ...prev,
      [field]: { ...prev[field], ...updates }
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const toggleFilter = useCallback((field, value) => {
    setFilters(prev => {
      const currentFilter = prev[field];
      if (currentFilter && currentFilter.value === value) {
        const { [field]: removed, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [field]: { value, operator: OPERATORS.EQUALS, type: FILTER_TYPES.TEXT }
      };
    });
  }, []);

  // Sort methods
  const updateSort = useCallback((field, direction = 'asc') => {
    setSortConfig({ field, direction });
  }, []);

  const toggleSort = useCallback((field) => {
    setSortConfig(prev => {
      if (prev.field === field) {
        return {
          field,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { field, direction: 'asc' };
    });
  }, []);

  const clearSort = useCallback(() => {
    setSortConfig({ field: null, direction: 'asc' });
  }, []);

  // Utility methods
  const reset = useCallback(() => {
    clearSearch();
    clearFilters();
    clearSort();
  }, [clearSearch, clearFilters, clearSort]);

  const getFilterValue = useCallback((field) => {
    return filters[field]?.value;
  }, [filters]);

  const hasActiveFilters = Object.keys(filters).length > 0 || debouncedQuery.length > 0;

  const stats = useMemo(() => ({
    totalItems: data.length,
    filteredItems: processedData.length,
    searchQuery: debouncedQuery,
    activeFilters: Object.keys(filters).length,
    isFiltered: hasActiveFilters,
    reductionPercent: data.length > 0 ? Math.round(((data.length - processedData.length) / data.length) * 100) : 0
  }), [data.length, processedData.length, debouncedQuery, filters, hasActiveFilters]);

  // Export filter state for persistence
  const exportState = useCallback(() => ({
    searchQuery: debouncedQuery,
    filters,
    sortConfig
  }), [debouncedQuery, filters, sortConfig]);

  const importState = useCallback((state) => {
    if (state.searchQuery !== undefined) {
      setSearchQuery(state.searchQuery);
      setDebouncedQuery(state.searchQuery);
    }
    if (state.filters) {
      setFilters(state.filters);
    }
    if (state.sortConfig) {
      setSortConfig(state.sortConfig);
    }
  }, []);

  return {
    // Data
    data: processedData,
    originalData: data,
    
    // Search state
    searchQuery,
    debouncedQuery,
    isSearching,
    
    // Filter state
    filters,
    sortConfig,
    hasActiveFilters,
    
    // Search methods
    updateSearch,
    clearSearch,
    
    // Filter methods
    addFilter,
    removeFilter,
    updateFilter,
    clearFilters,
    toggleFilter,
    getFilterValue,
    
    // Sort methods
    updateSort,
    toggleSort,
    clearSort,
    
    // Utility methods
    reset,
    highlightText,
    exportState,
    importState,
    
    // Statistics
    stats,
    
    // Constants
    OPERATORS,
    FILTER_TYPES
  };
};

// Preset configurations for common use cases
export const useProductSearch = (products) => {
  return useSearchFilter(products, {
    searchFields: ['name', 'description', 'brand', 'category'],
    debounceMs: 300,
    enableHighlighting: true
  });
};

export const useUserSearch = (users) => {
  return useSearchFilter(users, {
    searchFields: ['name', 'email', 'username'],
    debounceMs: 200,
    enableHighlighting: true
  });
};

export const useOrderSearch = (orders) => {
  return useSearchFilter(orders, {
    searchFields: ['orderNumber', 'customerName', 'status'],
    debounceMs: 300,
    enableHighlighting: false
  });
};

// Default export
export default useSearchFilter;
