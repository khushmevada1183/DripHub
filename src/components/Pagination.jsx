import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className = ''
}) => {
  const pages = [];
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {/* First page */}
      {showFirstLast && currentPage > 1 && startPage > 1 && (
        <>
          <button
            onClick={() => handlePageClick(1)}
            className="px-3 py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
        </>
      )}

      {/* Previous button */}
      {showPrevNext && currentPage > 1 && (
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          className="px-3 py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors flex items-center"
        >
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          Previous
        </button>
      )}

      {/* Page numbers */}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`
            px-3 py-2 text-sm rounded-md transition-colors
            ${page === currentPage 
              ? 'bg-orange-500 text-white' 
              : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      {showPrevNext && currentPage < totalPages && (
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          className="px-3 py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors flex items-center"
        >
          Next
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </button>
      )}

      {/* Last page */}
      {showFirstLast && currentPage < totalPages && endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-gray-400">...</span>}
          <button
            onClick={() => handlePageClick(totalPages)}
            className="px-3 py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
