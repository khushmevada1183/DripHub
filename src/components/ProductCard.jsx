import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, ShoppingCartIcon as CartSolid } from '@heroicons/react/24/solid';
import StarRating from './StarRating';
import Button from './Button';

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist = false,
  className = '',
  theme = 'light'
}) => {
  const { id, name, title, price, image, rating, description, category } = product;
  const displayName = name || title;
  
  const themeClasses = {
    light: 'bg-white border-gray-200 text-gray-900',
    dark: 'bg-gray-800 border-gray-700 text-white'
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist?.(product);
  };

  return (
    <div className={`
      group relative border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300
      ${themeClasses[theme]}
      ${className}
    `}>
      <Link to={`/products/${id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={displayName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all duration-200"
          >
            {isInWishlist ? (
              <HeartSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600 hover:text-red-500" />
            )}
          </button>

          {/* Category Badge */}
          {category && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-md">
              {category}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {displayName}
          </h3>
          
          {rating && (
            <div className="mb-2">
              <StarRating value={rating.rate} readonly size="sm" />
              <span className="text-xs text-gray-500 ml-1">
                ({rating.count})
              </span>
            </div>
          )}

          {description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-orange-600">
              ${price}
            </span>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ShoppingCartIcon className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
