// 🚀 Enterprise-level Route Configuration
// This file defines all application routes with metadata, guards, and lazy loading

export const ROUTE_PATHS = {
  // Public Routes
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/product/:id',
  // CATEGORIES routes removed
  DEALS: '/deals',
  SEARCH: '/search',
  
  // Authentication Routes
  LOGIN: '/login',
  REGISTER: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // User Account Routes
  ACCOUNT: '/account',
  PROFILE: '/account/profile',
  ORDERS: '/account/orders',
  ORDER_DETAILS: '/account/orders/:id',
  ADDRESSES: '/account/addresses',
  SETTINGS: '/account/settings',
  
  // Shopping Routes
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout/success',
  CHECKOUT_CANCEL: '/checkout/cancel',
  WISHLIST: '/wishlist',
  
  // Admin Routes (if needed)
  ADMIN: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',
  
  // Utility Routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  SERVER_ERROR: '/500',
};

// Route Metadata Configuration
export const ROUTES_CONFIG = [
  {
    path: ROUTE_PATHS.HOME,
    name: 'Home',
    component: 'Home',
    layout: 'MainLayout',
    meta: {
      title: 'DripHub - Your Online Store',
      description: 'Discover amazing products at unbeatable prices',
      keywords: 'ecommerce, shopping, deals',
      requiresAuth: false,
      showInNav: true,
      breadcrumb: ['Home']
    }
  },
  {
    path: ROUTE_PATHS.PRODUCTS,
    name: 'Products',
    component: 'Products',
    layout: 'MainLayout',
    meta: {
      title: 'All Products - DripHub',
      description: 'Browse our complete product catalog',
      requiresAuth: false,
      showInNav: true,
      breadcrumb: ['Home', 'Products']
    }
  },
  {
    path: ROUTE_PATHS.PRODUCT_DETAILS,
    name: 'ProductDetails',
    component: 'ProductDetails',
    layout: 'MainLayout',
    meta: {
      title: 'Product Details - DripHub',
      description: 'View detailed product information',
      requiresAuth: false,
      showInNav: false,
      breadcrumb: ['Home', 'Products', 'Product Details']
    }
  },
  // Categories route entries removed because Categories page was deleted
  {
    path: ROUTE_PATHS.DEALS,
    name: 'Deals',
    component: 'Deals',
    layout: 'MainLayout',
    meta: {
      title: 'Today\'s Deals - DripHub',
      description: 'Special offers and discounts',
      requiresAuth: false,
      showInNav: true,
      breadcrumb: ['Home', 'Deals']
    }
  },
  {
    path: ROUTE_PATHS.SEARCH,
    name: 'Search',
    component: 'Search',
    layout: 'MainLayout',
    meta: {
      title: 'Search Results - DripHub',
      description: 'Search results for your query',
      requiresAuth: false,
      showInNav: false,
      breadcrumb: ['Home', 'Search']
    }
  },
  {
    path: ROUTE_PATHS.LOGIN,
    name: 'Login',
    component: 'Login',
    layout: 'AuthLayout',
    meta: {
      title: 'Login - DripHub',
      description: 'Sign in to your account',
      requiresAuth: false,
      redirectIfAuth: ROUTE_PATHS.HOME,
      showInNav: false,
      breadcrumb: ['Home', 'Login']
    }
  },
  {
    path: ROUTE_PATHS.REGISTER,
  name: 'SignUp',
  component: 'SignUp',
    layout: 'AuthLayout',
    meta: {
      title: 'Sign Up - DripHub',
      description: 'Create a new account',
      requiresAuth: false,
      redirectIfAuth: ROUTE_PATHS.HOME,
      showInNav: false,
      breadcrumb: ['Home', 'Sign Up']
    }
  },
  {
    path: ROUTE_PATHS.FORGOT_PASSWORD,
    name: 'ForgotPassword',
    component: 'ForgotPassword',
    layout: 'AuthLayout',
    meta: {
      title: 'Forgot Password - DripHub',
      description: 'Reset your password',
      requiresAuth: false,
      redirectIfAuth: ROUTE_PATHS.HOME,
      showInNav: false,
      breadcrumb: ['Home', 'Forgot Password']
    }
  },
  {
    path: ROUTE_PATHS.CART,
    name: 'Cart',
    component: 'Cart',
    layout: 'MainLayout',
    meta: {
      title: 'Shopping Cart - DripHub',
      description: 'Review your cart items',
      requiresAuth: false,
      showInNav: false,
      breadcrumb: ['Home', 'Cart']
    }
  },
  {
    path: ROUTE_PATHS.CHECKOUT,
    name: 'Checkout',
    component: 'Checkout',
    layout: 'CheckoutLayout',
    meta: {
      title: 'Checkout - DripHub',
      description: 'Complete your purchase',
      requiresAuth: true,
      redirectUnauth: ROUTE_PATHS.LOGIN,
      showInNav: false,
      breadcrumb: ['Home', 'Cart', 'Checkout']
    }
  },
  {
    path: ROUTE_PATHS.WISHLIST,
    name: 'Wishlist',
    component: 'Wishlist',
    layout: 'MainLayout',
    meta: {
      title: 'Wishlist - DripHub',
      description: 'Your saved items',
      requiresAuth: true,
      redirectUnauth: ROUTE_PATHS.LOGIN,
      showInNav: false,
      breadcrumb: ['Home', 'Wishlist']
    }
  },
  {
    path: ROUTE_PATHS.ACCOUNT,
    name: 'Account',
    component: 'Account',
    layout: 'AccountLayout',
    meta: {
      title: 'My Account - DripHub',
      description: 'Manage your account',
      requiresAuth: true,
      redirectUnauth: ROUTE_PATHS.LOGIN,
      showInNav: false,
      breadcrumb: ['Home', 'Account']
    }
  },
  {
    path: ROUTE_PATHS.PROFILE,
    name: 'Profile',
    component: 'Profile',
    layout: 'AccountLayout',
    meta: {
      title: 'Profile - DripHub',
      description: 'Edit your profile information',
      requiresAuth: true,
      redirectUnauth: ROUTE_PATHS.LOGIN,
      showInNav: false,
      breadcrumb: ['Home', 'Account', 'Profile']
    }
  },
  {
    path: ROUTE_PATHS.ORDERS,
    name: 'Orders',
    component: 'Orders',
    layout: 'AccountLayout',
    meta: {
      title: 'My Orders - DripHub',
      description: 'View your order history',
      requiresAuth: true,
      redirectUnauth: ROUTE_PATHS.LOGIN,
      showInNav: false,
      breadcrumb: ['Home', 'Account', 'Orders']
    }
  },
  {
    path: ROUTE_PATHS.NOT_FOUND,
    name: 'NotFound',
    component: 'NotFound',
    layout: 'ErrorLayout',
    meta: {
      title: 'Page Not Found - DripHub',
      description: 'The page you\'re looking for doesn\'t exist',
      requiresAuth: false,
      showInNav: false,
      breadcrumb: ['Home', '404']
    }
  }
];

// Helper functions for route management
export const getRouteByPath = (path) => {
  return ROUTES_CONFIG.find(route => route.path === path);
};

export const getPublicRoutes = () => {
  return ROUTES_CONFIG.filter(route => !route.meta.requiresAuth);
};

export const getProtectedRoutes = () => {
  return ROUTES_CONFIG.filter(route => route.meta.requiresAuth);
};

export const getNavigationRoutes = () => {
  return ROUTES_CONFIG.filter(route => route.meta.showInNav);
};

export const generateBreadcrumbs = (currentPath) => {
  const route = getRouteByPath(currentPath);
  return route ? route.meta.breadcrumb : ['Home'];
};
