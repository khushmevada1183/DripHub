import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Dropdown = ({ 
  trigger, 
  children,
  items = [], // Add items support
  align = 'left', // left, right, center
  position = 'bottom',
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

  const alignmentClasses = {
    'left': 'left-0',
    'right': 'right-0', 
    'center': 'left-1/2 transform -translate-x-1/2'
  };

  const positionClasses = {
    'bottom': 'top-full mt-1',
    'top': 'bottom-full mb-1'
  };

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
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
          ${positionClasses[position]} ${alignmentClasses[align]}
        `}>
          {items.length > 0 ? (
            <div className="py-1">
              {items.map((item, index) => (
                <div key={index}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon && <span className="text-lg">{item.icon}</span>}
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleItemClick(item)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-left"
                    >
                      {item.icon && <span className="text-lg">{item.icon}</span>}
                      <span>{item.label}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
