import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

const StarRating = ({ 
  value = 0, 
  maxStars = 5, 
  size = 'md', 
  readonly = false, 
  onChange,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };

  const handleStarClick = (rating) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const filled = value >= starValue;
        const StarComponent = filled ? StarIcon : StarOutline;
        
        return (
          <StarComponent
            key={index}
            className={`
              ${sizeClasses[size]}
              ${filled ? 'text-yellow-400' : 'text-gray-300'}
              ${!readonly ? 'cursor-pointer hover:text-yellow-300' : ''}
              transition-colors duration-150
            `}
            onClick={() => handleStarClick(starValue)}
          />
        );
      })}
      {value > 0 && (
        <span className="text-sm text-gray-600 ml-2">
          ({value.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default StarRating;
