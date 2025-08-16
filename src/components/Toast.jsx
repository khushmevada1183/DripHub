import React, { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const Toast = ({ 
  message, 
  type = 'info', 
  isVisible, 
  onClose,
  duration = 3000,
  position = 'top-right'
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeConfig = {
    success: {
      bgColor: 'bg-green-500',
      icon: CheckCircleIcon,
      textColor: 'text-white'
    },
    error: {
      bgColor: 'bg-red-500',
      icon: XCircleIcon,
      textColor: 'text-white'
    },
    warning: {
      bgColor: 'bg-yellow-500',
      icon: ExclamationTriangleIcon,
      textColor: 'text-white'
    },
    info: {
      bgColor: 'bg-blue-500',
      icon: InformationCircleIcon,
      textColor: 'text-white'
    }
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`
      fixed z-50 px-4 py-3 rounded-lg shadow-lg max-w-sm
      ${config.bgColor}
      ${config.textColor}
      ${positionClasses[position]}
      transform transition-all duration-300
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-2 flex-shrink-0" />
        <span className="flex-1">{message}</span>
        <button 
          onClick={onClose} 
          className="ml-3 text-white hover:text-gray-200 focus:outline-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
