/**
 * usePagination Hook
 * Provides comprehensive pagination functionality with advanced features
 */

import { useState, useMemo, useCallback, useEffect } from 'react';

// Default pagination configuration
const DEFAULT_CONFIG = {
  initialPage: 1,
  pageSize: 10,
  siblingCount: 1,
  boundaryCount: 1,
  showFirstLast: true,
  showPrevNext: true,
  maxPages: Infinity,
  autoHidePagination: true,
  minItemsForPagination: 1
};

// Pagination hook
export const usePagination = (totalItems = 0, config = {}) => {
  const {
    initialPage,
    pageSize,
    siblingCount,
    boundaryCount,
    showFirstLast,
    showPrevNext,
    maxPages,
    autoHidePagination,
    minItemsForPagination
  } = { ...DEFAULT_CONFIG, ...config };

  // State
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);

  // Computed values
  const totalPages = useMemo(() => {
    if (totalItems === 0) return 1;
    return Math.min(Math.ceil(totalItems / itemsPerPage), maxPages);
  }, [totalItems, itemsPerPage, maxPages]);

  const hasNextPage = useMemo(() => currentPage < totalPages, [currentPage, totalPages]);
  const hasPreviousPage = useMemo(() => currentPage > 1, [currentPage]);

  const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage]);
  const endIndex = useMemo(() => Math.min(startIndex + itemsPerPage - 1, totalItems - 1), [startIndex, itemsPerPage, totalItems]);

  const currentItems = useMemo(() => {
    return {
      start: totalItems === 0 ? 0 : startIndex + 1,
      end: totalItems === 0 ? 0 : endIndex + 1,
      total: totalItems
    };
  }, [startIndex, endIndex, totalItems]);

  // Page range calculation
  const pageRange = useMemo(() => {
    if (totalPages <= 1) return [];

    const range = [];
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > boundaryCount + 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - boundaryCount - 1;

    // Case 1: No dots needed
    if (!shouldShowLeftDots && !shouldShowRightDots) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    // Case 2: Only right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = Array.from({ length: leftSiblingIndex }, (_, i) => i + 1);
      range.push(...leftRange);
      range.push('...');
      
      for (let i = totalPages - boundaryCount + 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    // Case 3: Only left dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      for (let i = 1; i <= boundaryCount; i++) {
        range.push(i);
      }
      range.push('...');
      
      for (let i = rightSiblingIndex; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    // Case 4: Both dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      for (let i = 1; i <= boundaryCount; i++) {
        range.push(i);
      }
      range.push('...');
      
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        range.push(i);
      }
      range.push('...');
      
      for (let i = totalPages - boundaryCount + 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    return range;
  }, [currentPage, totalPages, siblingCount, boundaryCount]);

  // Navigation methods
  const goToPage = useCallback((page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
    return pageNumber;
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      return goToPage(currentPage + 1);
    }
    return currentPage;
  }, [hasNextPage, currentPage, goToPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      return goToPage(currentPage - 1);
    }
    return currentPage;
  }, [hasPreviousPage, currentPage, goToPage]);

  const firstPage = useCallback(() => goToPage(1), [goToPage]);
  const lastPage = useCallback(() => goToPage(totalPages), [goToPage, totalPages]);

  // Jump methods
  const jumpToPage = useCallback((page) => {
    if (typeof page === 'string') {
      const parsed = parseInt(page, 10);
      if (!isNaN(parsed)) {
        return goToPage(parsed);
      }
    } else if (typeof page === 'number') {
      return goToPage(page);
    }
    return currentPage;
  }, [goToPage, currentPage]);

  const jumpBy = useCallback((pages) => {
    return goToPage(currentPage + pages);
  }, [currentPage, goToPage]);

  // Page size methods
  const changePageSize = useCallback((newPageSize) => {
    const newTotalPages = Math.ceil(totalItems / newPageSize);
    setItemsPerPage(newPageSize);
    
    // Adjust current page if necessary
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }
  }, [totalItems, currentPage]);

  // Reset pagination
  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setItemsPerPage(pageSize);
  }, [initialPage, pageSize]);

  // Slice data helper
  const sliceData = useCallback((data) => {
    if (!Array.isArray(data)) return data;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [startIndex, itemsPerPage]);

  // Progress calculation
  const progress = useMemo(() => {
    if (totalPages <= 1) return 100;
    return Math.round((currentPage / totalPages) * 100);
  }, [currentPage, totalPages]);

  // Visibility check
  const shouldShowPagination = useMemo(() => {
    if (autoHidePagination && totalItems <= minItemsForPagination) return false;
    return totalPages > 1;
  }, [autoHidePagination, totalItems, minItemsForPagination, totalPages]);

  // URL integration helpers
  const getPageUrl = useCallback((page, baseUrl = '') => {
    const url = new URL(baseUrl || window.location.href);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('size', itemsPerPage.toString());
    return url.toString();
  }, [itemsPerPage]);

  const updateUrlParams = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const url = new URL(window.location.href);
    url.searchParams.set('page', currentPage.toString());
    url.searchParams.set('size', itemsPerPage.toString());
    
    window.history.replaceState(null, '', url.toString());
  }, [currentPage, itemsPerPage]);

  // Auto-update current page when totalItems changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Keyboard navigation
  const handleKeyNavigation = useCallback((event) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        previousPage();
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextPage();
        break;
      case 'Home':
        event.preventDefault();
        firstPage();
        break;
      case 'End':
        event.preventDefault();
        lastPage();
        break;
      default:
        break;
    }
  }, [previousPage, nextPage, firstPage, lastPage]);

  // Page info for screen readers
  const getAriaLabel = useCallback((page) => {
    if (page === currentPage) {
      return `Current page, page ${page}`;
    }
    return `Go to page ${page}`;
  }, [currentPage]);

  return {
    // State
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    
    // Navigation info
    hasNextPage,
    hasPreviousPage,
    currentItems,
    startIndex,
    endIndex,
    pageRange,
    progress,
    shouldShowPagination,
    
    // Navigation methods
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    jumpToPage,
    jumpBy,
    
    // Configuration methods
    changePageSize,
    reset,
    
    // Data helpers
    sliceData,
    
    // URL helpers
    getPageUrl,
    updateUrlParams,
    
    // Accessibility
    handleKeyNavigation,
    getAriaLabel,
    
    // Page size options
    pageSizeOptions: [5, 10, 20, 50, 100],
    
    // Status
    isEmpty: totalItems === 0,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    
    // Advanced pagination info
    info: {
      showing: `Showing ${currentItems.start} to ${currentItems.end} of ${totalItems} results`,
      page: `Page ${currentPage} of ${totalPages}`,
      compact: `${currentPage}/${totalPages}`
    }
  };
};

// Hook for infinite pagination
export const useInfinitePagination = (totalItems, pageSize = 10) => {
  const [loadedPages, setLoadedPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const hasMore = useMemo(() => {
    const totalPages = Math.ceil(totalItems / pageSize);
    return loadedPages < totalPages;
  }, [loadedPages, totalItems, pageSize]);
  
  const loadedItems = useMemo(() => loadedPages * pageSize, [loadedPages, pageSize]);
  
  const loadMore = useCallback(async (loadFunction) => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    try {
      await loadFunction(loadedPages + 1);
      setLoadedPages(prev => prev + 1);
    } catch (error) {
      console.error('Failed to load more items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, loadedPages]);
  
  const reset = useCallback(() => {
    setLoadedPages(1);
    setIsLoading(false);
  }, []);
  
  return {
    loadedPages,
    loadedItems,
    hasMore,
    isLoading,
    loadMore,
    reset
  };
};

// Hook for cursor-based pagination
export const useCursorPagination = (pageSize = 10) => {
  const [cursors, setCursors] = useState([null]); // Stack of cursors
  const [currentCursor, setCurrentCursor] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  
  const goToNext = useCallback((nextCursor) => {
    setCursors(prev => [...prev, nextCursor]);
    setCurrentCursor(nextCursor);
  }, []);
  
  const goToPrevious = useCallback(() => {
    if (cursors.length > 1) {
      const newCursors = cursors.slice(0, -1);
      setCursors(newCursors);
      setCurrentCursor(newCursors[newCursors.length - 1]);
    }
  }, [cursors]);
  
  const reset = useCallback(() => {
    setCursors([null]);
    setCurrentCursor(null);
    setHasNext(true);
  }, []);
  
  const canGoBack = cursors.length > 1;
  
  return {
    currentCursor,
    hasNext,
    canGoBack,
    pageSize,
    goToNext,
    goToPrevious,
    setHasNext,
    reset
  };
};

// Default export
export default usePagination;
