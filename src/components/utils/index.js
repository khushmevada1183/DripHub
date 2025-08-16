/**
 * Utility functions for the application
 */

// Re-export all validation utilities
export {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateCreditCard,
  createValidator,
  validationRules,
  getCreditCardType,
  formatCreditCard,
  formatPhoneNumber,
  validateForm,
  createFieldValidator
} from './validation';

// Re-export all formatting utilities
export {
  formatPrice,
  formatDate,
  formatNumber,
  formatCurrency,
  formatRelativeTime,
  formatFileSize,
  formatPercentage,
  formatTitle,
  formatCamelCase,
  formatKebabCase,
  formatSnakeCase,
  formatMask,
  truncateText,
  capitalize
} from './formatting';

// Re-export all performance utilities
export {
  debounce,
  throttle,
  memoize,
  once,
  delay,
  retry
} from './performance';

// Re-export all general utilities
export {
  generateId,
  slugify,
  deepClone,
  deepMerge,
  isEqual,
  isEmpty,
  omit,
  pick,
  groupBy,
  chunk,
  flatten,
  unique,
  sortBy,
  shuffle,
  sample,
  range,
  clamp,
  randomBetween
} from './general';
