import axios from "axios";

// ==========================
// ENVIRONMENT CONFIGURATION
// ==========================
const API_URL = import.meta.env.VITE_REACT_APP_URL || "http://localhost:3000/api";

// ==========================
// AXIOS INSTANCE
// ==========================
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================
// TOKEN MANAGEMENT
// ==========================
const TOKEN_KEY = "shophub_token";
const REFRESH_TOKEN_KEY = "shophub_refresh_token";

const getAccessToken = () => localStorage.getItem(TOKEN_KEY);
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

const saveTokens = ({ accessToken, refreshToken }) => {
  if (accessToken) localStorage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// ==========================
// INTERCEPTORS
// ==========================

// Request Interceptor - Attach token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle refresh tokens and standardize responses
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => ({
    success: true,
    data: response.data,
    status: response.status,
    message: response.data?.message || "Success",
    error: null,
  }),
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - Try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        saveTokens({ accessToken, refreshToken: newRefreshToken });

        apiClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        // Redirect to login page when refresh fails
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Standardize error responses
    return {
      success: false,
      data: null,
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || "An error occurred",
      error: error.response?.data || error.message,
    };
  }
);

// ==========================
// GENERIC API FUNCTIONS
// ==========================

/**
 * Generic GET request
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @param {Object} config - Additional axios config
 * @returns {Promise} - Standardized response
 */
export const getData = (endpoint, params = {}, config = {}) =>
  apiClient.get(endpoint, { params, ...config });

/**
 * Generic POST request
 * @param {string} endpoint - API endpoint
 * @param {Object} payload - Request body
 * @param {Object} config - Additional axios config
 * @returns {Promise} - Standardized response
 */
export const postData = (endpoint, payload = {}, config = {}) =>
  apiClient.post(endpoint, payload, config);

/**
 * Generic PUT request
 * @param {string} endpoint - API endpoint
 * @param {Object} payload - Request body
 * @param {Object} config - Additional axios config
 * @returns {Promise} - Standardized response
 */
export const putData = (endpoint, payload = {}, config = {}) =>
  apiClient.put(endpoint, payload, config);

/**
 * Generic PATCH request
 * @param {string} endpoint - API endpoint
 * @param {Object} payload - Request body
 * @param {Object} config - Additional axios config
 * @returns {Promise} - Standardized response
 */
export const patchData = (endpoint, payload = {}, config = {}) =>
  apiClient.patch(endpoint, payload, config);

/**
 * Generic DELETE request
 * @param {string} endpoint - API endpoint
 * @param {Object} payload - Request body (optional)
 * @param {Object} config - Additional axios config
 * @returns {Promise} - Standardized response
 */
export const deleteData = (endpoint, payload = null, config = {}) =>
  apiClient.delete(endpoint, { data: payload, ...config });

// ==========================
// AUTHENTICATION APIs
// ==========================

/**
 * User login
 * @param {Object} credentials - Login credentials
 * @returns {Promise} - Login response with token management
 */
export const login = async (credentials) => {
  try {
    const response = await postData("/auth/login", credentials);
    
    if (response.success && response.data?.accessToken) {
      saveTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
    }
    
    return response;
  } catch (error) {
    return {
      success: false,
      data: null,
      status: 500,
      message: "Login failed",
      error: error.message,
    };
  }
};

/**
 * User registration
 * @param {Object} userData - User registration data
 * @returns {Promise} - Registration response
 */
export const signup = (userData) => postData("/auth/signup", userData);

/**
 * User logout
 * @returns {Promise} - Logout response
 */
export const logout = async () => {
  try {
    const response = await postData("/auth/logout");
    clearTokens();
    return response;
  } catch (error) {
    clearTokens(); // Clear tokens even if logout fails
    return {
      success: false,
      data: null,
      status: 500,
      message: "Logout failed",
      error: error.message,
    };
  }
};

/**
 * Refresh access token
 * @returns {Promise} - Token refresh response
 */
export const refreshToken = () => postData("/auth/refresh", {
  refreshToken: getRefreshToken(),
});

// ==========================
// PRODUCT APIs
// ==========================

/**
 * Get all products with optional filtering
 * @param {Object} filters - Product filters
 * @returns {Promise} - Products response
 */
export const getProducts = (filters = {}) => getData("/products", filters);

/**
 * Get product by ID
 * @param {string|number} productId - Product identifier
 * @returns {Promise} - Product response
 */
export const getProduct = (productId) => getData(`/products/${productId}`);

/**
 * Create new product (Admin only)
 * @param {Object} productData - Product data
 * @returns {Promise} - Creation response
 */
export const createProduct = (productData) => postData("/products", productData);

/**
 * Update product (Admin only)
 * @param {string|number} productId - Product identifier
 * @param {Object} productData - Updated product data
 * @returns {Promise} - Update response
 */
export const updateProduct = (productId, productData) =>
  putData(`/products/${productId}`, productData);

/**
 * Delete product (Admin only)
 * @param {string|number} productId - Product identifier
 * @returns {Promise} - Deletion response
 */
export const deleteProduct = (productId) => deleteData(`/products/${productId}`);

// ==========================
// CATEGORY APIs
// ==========================

/**
 * Get all categories
 * @returns {Promise} - Categories response
 */
export const getCategories = () => getData("/categories");

/**
 * Get products by category
 * @param {string} categoryId - Category identifier
 * @param {Object} filters - Additional filters
 * @returns {Promise} - Products response
 */
export const getProductsByCategory = (categoryId, filters = {}) =>
  getData(`/categories/${categoryId}/products`, filters);

// ==========================
// USER APIs
// ==========================

/**
 * Get user profile
 * @returns {Promise} - User profile response
 */
export const getUserProfile = () => getData("/users/profile");

/**
 * Update user profile
 * @param {Object} profileData - Updated profile data
 * @returns {Promise} - Update response
 */
export const updateUserProfile = (profileData) =>
  putData("/users/profile", profileData);

/**
 * Get user orders
 * @returns {Promise} - Orders response
 */
export const getUserOrders = () => getData("/users/orders");

// ==========================
// CART APIs
// ==========================

/**
 * Get user cart
 * @returns {Promise} - Cart response
 */
export const getCart = () => getData("/cart");

/**
 * Add item to cart
 * @param {Object} cartItem - Cart item data
 * @returns {Promise} - Add to cart response
 */
export const addToCart = (cartItem) => postData("/cart/items", cartItem);

/**
 * Update cart item quantity
 * @param {string|number} itemId - Cart item identifier
 * @param {Object} updateData - Update data
 * @returns {Promise} - Update response
 */
export const updateCartItem = (itemId, updateData) =>
  putData(`/cart/items/${itemId}`, updateData);

/**
 * Remove item from cart
 * @param {string|number} itemId - Cart item identifier
 * @returns {Promise} - Removal response
 */
export const removeFromCart = (itemId) => deleteData(`/cart/items/${itemId}`);

/**
 * Clear entire cart
 * @returns {Promise} - Clear cart response
 */
export const clearCart = () => deleteData("/cart");

// ==========================
// WISHLIST APIs
// ==========================

/**
 * Get user wishlist
 * @returns {Promise} - Wishlist response
 */
export const getWishlist = () => getData("/wishlist");

/**
 * Add item to wishlist
 * @param {Object} wishlistItem - Wishlist item data
 * @returns {Promise} - Add to wishlist response
 */
export const addToWishlist = (wishlistItem) => postData("/wishlist", wishlistItem);

/**
 * Remove item from wishlist
 * @param {string|number} itemId - Wishlist item identifier
 * @returns {Promise} - Removal response
 */
export const removeFromWishlist = (itemId) => deleteData(`/wishlist/${itemId}`);

// ==========================
// ORDER APIs
// ==========================

/**
 * Create new order
 * @param {Object} orderData - Order data
 * @returns {Promise} - Order creation response
 */
export const createOrder = (orderData) => postData("/orders", orderData);

/**
 * Get order by ID
 * @param {string|number} orderId - Order identifier
 * @returns {Promise} - Order response
 */
export const getOrder = (orderId) => getData(`/orders/${orderId}`);

/**
 * Get all orders (Admin only)
 * @param {Object} filters - Order filters
 * @returns {Promise} - Orders response
 */
export const getAllOrders = (filters = {}) => getData("/orders", filters);

// ==========================
// SEARCH APIs
// ==========================

/**
 * Search products
 * @param {string} query - Search query
 * @param {Object} filters - Additional filters
 * @returns {Promise} - Search results
 */
export const searchProducts = (query, filters = {}) =>
  getData("/search/products", { q: query, ...filters });

// ==========================
// UTILITY FUNCTIONS
// ==========================

/**
 * Check if user is authenticated
 * @returns {boolean} - Authentication status
 */
export const isAuthenticated = () => !!getAccessToken();

/**
 * Get current user token
 * @returns {string|null} - Current access token
 */
export const getCurrentToken = () => getAccessToken();

/**
 * Set custom headers for specific requests
 * @param {Object} headers - Custom headers
 */
export const setCustomHeaders = (headers) => {
  Object.assign(apiClient.defaults.headers.common, headers);
};

/**
 * Reset API client to default state
 */
export const resetApiClient = () => {
  clearTokens();
  apiClient.defaults.headers.Authorization = "";
};

// Export the main apiClient for direct use if needed
export { apiClient };

// Export default for backward compatibility
export default {
  // Generic methods
  get: getData,
  post: postData,
  put: putData,
  patch: patchData,
  delete: deleteData,
  
  // Auth methods
  login,
  signup,
  logout,
  refreshToken,
  
  // Product methods
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  
  // Category methods
  getCategories,
  getProductsByCategory,
  
  // User methods
  getUserProfile,
  updateUserProfile,
  getUserOrders,
  
  // Cart methods
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  
  // Wishlist methods
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  
  // Order methods
  createOrder,
  getOrder,
  getAllOrders,
  
  // Search methods
  searchProducts,
  
  // Utility methods
  isAuthenticated,
  getCurrentToken,
  setCustomHeaders,
  resetApiClient,
};
