import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Dropdown = ({ 
  trigger, 
  children, 
  position = 'bottom-left',
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-1',
    'bottom-right': 'top-full right-0 mt-1',
    'top-left': 'bottom-full left-0 mb-1',
    'top-right': 'bottom-full right-0 mb-1'
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`
          absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg min-w-max
          ${positionClasses[position]}
        `}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
