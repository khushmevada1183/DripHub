import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Dropdown = ({ 
  trigger, 
  children,
  items = [], // Add items support
  align = 'right', // left, right, center
  position = 'bottom',
  className = '',
  disabled = false,
  variant = 'default' // 'default' or 'red' for the styled dropdown
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
    'left': '[left:0]',
    'right': '[right:0]', 
    'center': '[left:50%] [transform:translateX(-50%)]'
  };

  const positionClasses = {
    'bottom': '[top:100%] [margin-top:8px]',
    'top': '[bottom:100%] [margin-bottom:8px]'
  };

  const variantClasses = {
    'default': '[background-color:white] [border:1px_solid_#e5e7eb] [border-radius:8px] [box-shadow:0_4px_6px_rgba(0,0,0,0.1)]',
    'red': '[background-color:#ef4444] [border-radius:20px] [box-shadow:0_8px_25px_rgba(0,0,0,0.15)] [padding:20px] [animation:fadeIn_0.2s_ease-out] [min-width:240px]'
  };

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div className={`[position:relative] [display:inline-block] ${className}`} ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`${disabled ? '[cursor:not-allowed] [opacity:0.5]' : '[cursor:pointer]'}`}
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`
          [position:absolute] [z-index:50] ${positionClasses[position]} ${alignmentClasses[align]} ${variantClasses[variant]}
        `}>
          {items.length > 0 ? (
            variant === 'red' ? (
              <div>
                {/* Red dropdown header */}
                <div className="[background-color:white] [border-radius:20px] [padding:16px] [margin-bottom:16px]">
                  <div className="[color:#ef4444] [font-weight:700] [font-size:1.125rem] [text-align:center]">
                    Menu
                  </div>
                </div>
                {/* Red dropdown items */}
                <div className="[display:flex] [flex-direction:column] [gap:4px]">
                  {items.map((item, index) => (
                    <div key={index}>
                      {item.href ? (
                        <Link
                          to={item.href}
                          className="[color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-decoration:none] [display:block]"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon && <span className="[margin-right:8px]">{item.icon}</span>}
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleItemClick(item)}
                          className="[width:100%] [color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-align:left] [border:none] [background:transparent] [cursor:pointer]"
                        >
                          {item.icon && <span className="[margin-right:8px]">{item.icon}</span>}
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="[padding:4px_0]">
                {items.map((item, index) => (
                  <div key={index}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="[display:flex] [align-items:center] [gap:12px] [padding:8px_16px] [font-size:0.875rem] [color:#374151] hover:[background-color:#f9fafb] hover:[color:#2563eb] [transition:all_0.2s] [text-decoration:none]"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon && <span className="[font-size:1.125rem]">{item.icon}</span>}
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleItemClick(item)}
                        className="[width:100%] [display:flex] [align-items:center] [gap:12px] [padding:8px_16px] [font-size:0.875rem] [color:#374151] hover:[background-color:#f9fafb] hover:[color:#2563eb] [transition:all_0.2s] [text-align:left] [border:none] [background:transparent] [cursor:pointer]"
                      >
                        {item.icon && <span className="[font-size:1.125rem]">{item.icon}</span>}
                        <span>{item.label}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
};

// Helper components for custom dropdown content
export const DropdownHeader = ({ children }) => (
  <div className="[background-color:white] [border-radius:20px] [padding:16px] [margin-bottom:16px]">
    <div className="[color:#ef4444] [font-weight:700] [font-size:1.125rem] [text-align:center]">
      {children}
    </div>
  </div>
);

export const DropdownItem = ({ children, onClick, href, className = '' }) => {
  const baseClasses = "[color:white] [font-weight:600] [font-size:1rem] [padding:12px_16px] [border-radius:12px] hover:[background-color:rgba(255,255,255,0.1)] [transition:background-color_0.2s] [text-decoration:none] [display:block]";
  
  if (href) {
    return (
      <Link to={href} onClick={onClick} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }
  
  return (
    <div onClick={onClick} className={`${baseClasses} [cursor:pointer] ${className}`}>
      {children}
    </div>
  );
};

export const DropdownMenu = ({ children }) => (
  <div className="[display:flex] [flex-direction:column] [gap:4px]">
    {children}
  </div>
);

export default Dropdown;
