/**
 * Helper utilities for common application operations
 * These are specific helper functions that support the ecommerce functionality
 */

// Product helpers
export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

export const formatProductPrice = (product) => {
  const { price, salePrice, currency = 'INR' } = product;

  return {
    original: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency
    }).format(price),
    sale: salePrice ? new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency
    }).format(salePrice) : null,
    discount: salePrice ? calculateDiscount(price, salePrice) : 0
  };
};

export const getProductAvailability = (stock) => {
  if (stock === 0) return { status: 'out-of-stock', message: 'Out of Stock', color: 'text-red-600' };
  if (stock <= 5) return { status: 'low-stock', message: `Only ${stock} left`, color: 'text-orange-600' };
  return { status: 'in-stock', message: 'In Stock', color: 'text-green-600' };
};

// Cart helpers
export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const price = item.salePrice || item.price;
    return total + (price * item.quantity);
  }, 0);
};

export const calculateCartItemCount = (cartItems) => {
  return cartItems.reduce((count, item) => count + item.quantity, 0);
};

export const findCartItem = (cartItems, productId) => {
  return cartItems.find(item => item.id === productId || item.productId === productId);
};

// Order helpers
export const getOrderStatus = (status) => {
  const statusMap = {
    pending: { label: 'Pending', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    confirmed: { label: 'Confirmed', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    processing: { label: 'Processing', color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
    shipped: { label: 'Shipped', color: 'text-purple-600', bgColor: 'bg-purple-100' },
    delivered: { label: 'Delivered', color: 'text-green-600', bgColor: 'bg-green-100' },
    cancelled: { label: 'Cancelled', color: 'text-red-600', bgColor: 'bg-red-100' },
    returned: { label: 'Returned', color: 'text-gray-600', bgColor: 'bg-gray-100' }
  };
  
  return statusMap[status] || statusMap.pending;
};

export const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `ORD-${timestamp.slice(-6)}-${random}`;
};

// User helpers
export const getUserInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export const formatUserRole = (role) => {
  const roles = {
    admin: { label: 'Administrator', color: 'text-red-600' },
    manager: { label: 'Manager', color: 'text-blue-600' },
    customer: { label: 'Customer', color: 'text-green-600' },
    guest: { label: 'Guest', color: 'text-gray-600' }
  };
  
  return roles[role] || roles.guest;
};

// Address helpers
export const formatAddress = (address) => {
  if (!address) return '';

  // Support India-style 'pincode' as well as 'zipCode'
  const { street, city, state, zipCode, pincode, country } = address;
  const postal = pincode || zipCode;
  const parts = [street, city, state, postal, country].filter(Boolean);
  return parts.join(', ');
};

export const validateAddress = (address) => {
  // Accept either pincode or zipCode for postal field
  const required = ['street', 'city', 'state'];
  const missing = required.filter(field => !address[field]);
  if (!address.pincode && !address.zipCode) missing.push('pincode/zipCode');

  return {
    isValid: missing.length === 0,
    missing,
    errors: missing.map(field => `${field} is required`)
  };
};

// Search and filter helpers
export const filterProducts = (products, filters) => {
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Price range filter
    if (filters.priceRange) {
      const price = product.salePrice || product.price;
      const { min, max } = filters.priceRange;
      if (price < min || price > max) {
        return false;
      }
    }
    
    // Rating filter
    if (filters.minRating && product.rating < filters.minRating) {
      return false;
    }
    
    // Availability filter
    if (filters.inStockOnly && product.stock === 0) {
      return false;
    }
    
    // Brand filter
    if (filters.brands && filters.brands.length > 0) {
      if (!filters.brands.includes(product.brand)) {
        return false;
      }
    }
    
    // Search query
    if (filters.query) {
      const searchTerm = filters.query.toLowerCase();
      const searchFields = [
        product.name,
        product.description,
        product.brand,
        product.category
      ].join(' ').toLowerCase();
      
      if (!searchFields.includes(searchTerm)) {
        return false;
      }
    }
    
    return true;
  });
};

export const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sortedProducts.sort((a, b) => {
        const priceA = a.salePrice || a.price;
        const priceB = b.salePrice || b.price;
        return priceA - priceB;
      });
      
    case 'price-high':
      return sortedProducts.sort((a, b) => {
        const priceA = a.salePrice || a.price;
        const priceB = b.salePrice || b.price;
        return priceB - priceA;
      });
      
    case 'rating':
      return sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      
    case 'newest':
      return sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
    case 'popular':
      return sortedProducts.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
      
    case 'name':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      
    default:
      return sortedProducts;
  }
};

// Image helpers
export const getImageUrl = (imagePath, size = 'medium') => {
  if (!imagePath) return '/images/placeholder-product.jpg';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // Handle different image sizes
  const sizePath = size === 'thumbnail' ? 'thumbs/' : size === 'large' ? 'large/' : '';
  
  return `/images/products/${sizePath}${imagePath}`;
};

export const generateImageAlt = (product) => {
  return `${product.name} - ${product.brand || 'DripHub'} | ${product.category || 'Product'}`;
};

// Notification helpers
export const createNotification = (type, title, message, options = {}) => {
  return {
    id: Date.now().toString(),
    type, // success, error, warning, info
    title,
    message,
    timestamp: new Date().toISOString(),
    read: false,
    ...options
  };
};

export const getNotificationIcon = (type) => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  return icons[type] || icons.info;
};

// SEO helpers
export const generateMetaTags = (page, data = {}) => {
  const baseTitle = 'ShopHub - Your Ultimate Shopping Destination';
  const baseDescription = 'Discover amazing products at unbeatable prices. Shop electronics, fashion, home goods and more with fast shipping and easy returns.';
  
  const metaConfigs = {
    home: {
      title: baseTitle,
      description: baseDescription
    },
    product: {
      title: `${data.name} - ${data.brand || 'ShopHub'}`,
      description: data.description ? data.description.substring(0, 155) + '...' : baseDescription
    },
    category: {
      title: `${data.category} - Shop Online at ShopHub`,
      description: `Browse our ${data.category} collection. ${baseDescription}`
    },
    search: {
      title: `Search Results for "${data.query}" - ShopHub`,
      description: `Find products matching "${data.query}". ${baseDescription}`
    }
  };
  
  return metaConfigs[page] || { title: baseTitle, description: baseDescription };
};

// Analytics helpers
export const trackEvent = (eventName, properties = {}) => {
  // This would integrate with your analytics service (Google Analytics, Mixpanel, etc.)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, properties);
  }
};

export const trackPageView = (pageName, additionalData = {}) => {
  trackEvent('page_view', {
    page_title: pageName,
    page_location: window.location.href,
    ...additionalData
  });
};

// Performance helpers
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (imagePaths) => {
  try {
    const promises = imagePaths.map(preloadImage);
    await Promise.all(promises);
    return true;
  } catch (error) {
    console.warn('Failed to preload some images:', error);
    return false;
  }
};

// Error helpers
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.data?.message) return error.data.message;
  return 'An unexpected error occurred. Please try again.';
};

export const isNetworkError = (error) => {
  return error?.code === 'NETWORK_ERROR' || 
         error?.message?.includes('Network Error') ||
         error?.message?.includes('fetch');
};
