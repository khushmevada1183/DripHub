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
    light: '[background-color:white] [border-color:#e5e7eb] [color:#111827]',
    dark: '[background-color:#1f2937] [border-color:#374151] [color:white]'
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
      group [position:relative] [border:1px_solid] [border-radius:12px] [overflow:hidden] [box-shadow:0_1px_2px_rgba(0,0,0,0.05)] hover:[box-shadow:0_4px_6px_rgba(0,0,0,0.1)] [transition:all_0.3s]
      ${themeClasses[theme]}
      ${className}
    `}>
      <Link to={`/products/${id}`} className="[display:block]">
        {/* Product Image */}
        <div className="[position:relative] [aspect-ratio:1] [overflow:hidden] [background-color:#f3f4f6]">
          <img
            src={image}
            alt={displayName}
            className="[width:100%] [height:100%] [object-fit:cover] group-hover:[transform:scale(1.05)] [transition:transform_0.3s]"
            loading="lazy"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="[position:absolute] [top:12px] [right:12px] [padding:8px] [border-radius:50%] [background-color:rgba(255,255,255,0.8)] hover:[background-color:white] [box-shadow:0_1px_2px_rgba(0,0,0,0.05)] [transition:all_0.2s]"
          >
            {isInWishlist ? (
              <HeartSolid className="[height:20px] [width:20px] [color:#ef4444]" />
            ) : (
              <HeartIcon className="[height:20px] [width:20px] [color:#6b7280] hover:[color:#ef4444]" />
            )}
          </button>

          {/* Category Badge */}
          {category && (
            <div className="[position:absolute] [top:12px] [left:12px] [padding:4px_8px] [background-color:#f97316] [color:white] [font-size:0.75rem] [font-weight:500] [border-radius:6px]">
              {category}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="[padding:16px]">
          <h3 className="[font-weight:600] [font-size:0.875rem] [margin-bottom:8px] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] [overflow:hidden] group-hover:[color:#f97316] [transition:color_0.2s]">
            {displayName}
          </h3>
          
          {rating && (
            <div className="[margin-bottom:8px]">
              <StarRating value={rating.rate} readonly size="sm" />
              <span className="[font-size:0.75rem] [color:#6b7280] [margin-left:4px]">
                ({rating.count})
              </span>
            </div>
          )}

          {description && (
            <p className="[font-size:0.875rem] [color:#6b7280] [margin-bottom:12px] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] [overflow:hidden]">
              {description}
            </p>
          )}

          <div className="[display:flex] [align-items:center] [justify-content:space-between]">
            <span className="[font-size:1.125rem] [font-weight:700] [color:#ea580c]">
              ${price}
            </span>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="[opacity:0] group-hover:[opacity:1] [transition:opacity_0.2s]"
            >
              <ShoppingCartIcon className="[height:16px] [width:16px] [margin-right:4px]" />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
