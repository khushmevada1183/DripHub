import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = '[display:inline-flex] [align-items:center] [justify-content:center] [font-weight:500] [border-radius:8px] [transition:all_0.2s] focus:[outline:none] focus:[box-shadow:0_0_0_2px_rgba(0,0,0,0.05),0_0_0_4px] focus:[box-shadow-offset:0_0]';
  
  const variantClasses = {
    primary: '[background-color:#f97316] hover:[background-color:#ea580c] [color:white] focus:[box-shadow:0_0_0_2px_rgba(0,0,0,0.05),0_0_0_4px_rgba(249,115,22,0.3)]',
    secondary: '[background-color:#e5e7eb] hover:[background-color:#d1d5db] [color:#111827] focus:[box-shadow:0_0_0_2px_rgba(0,0,0,0.05),0_0_0_4px_rgba(107,114,128,0.3)]',
    outline: '[border:2px_solid_#f97316] [color:#f97316] hover:[background-color:#f97316] hover:[color:white] focus:[box-shadow:0_0_0_2px_rgba(0,0,0,0.05),0_0_0_4px_rgba(249,115,22,0.3)]',
    ghost: '[color:#6b7280] hover:[background-color:#f3f4f6] focus:[box-shadow:0_0_0_2px_rgba(0,0,0,0.05),0_0_0_4px_rgba(107,114,128,0.3)]',
    danger: '[background-color:#ef4444] hover:[background-color:#dc2626] [color:white] focus:[box-shadow:0_0_0_2px_rgba(0,0,0,0.05),0_0_0_4px_rgba(239,68,68,0.3)]'
  };
  
  const sizeClasses = {
    sm: '[padding:6px_12px] [font-size:0.875rem]',
    md: '[padding:8px_16px] [font-size:1rem]',
    lg: '[padding:12px_24px] [font-size:1.125rem]',
    xl: '[padding:16px_32px] [font-size:1.25rem]'
  };
  
  const disabledClasses = '[opacity:0.5] [cursor:not-allowed]';
  
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled || loading ? disabledClasses : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="[animation:spin_1s_linear_infinite] [margin:-4px_8px_0_0] [height:16px] [width:16px]" fill="none" viewBox="0 0 24 24">
          <circle className="[opacity:0.25]" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="[opacity:0.75]" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
