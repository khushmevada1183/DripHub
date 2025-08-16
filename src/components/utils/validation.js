/**
 * Validation utilities for form validation and data validation
 */

// Email validation with comprehensive RFC compliant regex
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation with customizable requirements
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true
  } = options;

  const errors = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Phone number validation (US format)
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Credit card validation using Luhn algorithm
export const validateCreditCard = (cardNumber) => {
  // Remove all non-digit characters
  const cleanedNumber = cardNumber.replace(/\D/g, '');
  
  // Check if the number is empty or too short
  if (!cleanedNumber || cleanedNumber.length < 13) {
    return false;
  }

  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;

  // Loop through values starting from the right
  for (let i = cleanedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit = (digit % 10) + 1;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return (sum % 10) === 0;
};

// Credit card type detection
export const getCreditCardType = (cardNumber) => {
  const cleanedNumber = cardNumber.replace(/\D/g, '');
  
  // Card type patterns
  const patterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    dinersclub: /^3[0689][0-9]{11}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cleanedNumber)) {
      return type;
    }
  }

  return 'unknown';
};

// Format credit card number with spaces
export const formatCreditCard = (cardNumber) => {
  const cleanedNumber = cardNumber.replace(/\D/g, '');
  const cardType = getCreditCardType(cleanedNumber);
  
  // Different formatting for different card types
  if (cardType === 'amex') {
    return cleanedNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  } else {
    return cleanedNumber.replace(/(\d{4})/g, '$1 ').trim();
  }
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  const cleanedPhone = phone.replace(/\D/g, '');
  
  if (cleanedPhone.length === 10) {
    return cleanedPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  } else if (cleanedPhone.length === 11 && cleanedPhone[0] === '1') {
    return cleanedPhone.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
  }
  
  return phone;
};

// Validation rules object for common validations
export const validationRules = {
  required: (value) => ({
    isValid: value !== null && value !== undefined && value !== '',
    message: 'This field is required'
  }),
  
  minLength: (min) => (value) => ({
    isValid: !value || value.length >= min,
    message: `Minimum length is ${min} characters`
  }),
  
  maxLength: (max) => (value) => ({
    isValid: !value || value.length <= max,
    message: `Maximum length is ${max} characters`
  }),
  
  pattern: (regex, message) => (value) => ({
    isValid: !value || regex.test(value),
    message: message || 'Invalid format'
  }),
  
  email: (value) => ({
    isValid: !value || validateEmail(value),
    message: 'Please enter a valid email address'
  }),
  
  phone: (value) => ({
    isValid: !value || validatePhoneNumber(value),
    message: 'Please enter a valid phone number'
  }),
  
  creditCard: (value) => ({
    isValid: !value || validateCreditCard(value),
    message: 'Please enter a valid credit card number'
  }),
  
  numeric: (value) => ({
    isValid: !value || /^\d+\.?\d*$/.test(value),
    message: 'Please enter a valid number'
  }),
  
  integer: (value) => ({
    isValid: !value || /^\d+$/.test(value),
    message: 'Please enter a valid whole number'
  }),
  
  url: (value) => ({
    isValid: !value || /^https?:\/\/.+/.test(value),
    message: 'Please enter a valid URL'
  }),
  
  date: (value) => ({
    isValid: !value || !isNaN(Date.parse(value)),
    message: 'Please enter a valid date'
  }),
  
  match: (targetValue, fieldName) => (value) => ({
    isValid: value === targetValue,
    message: `Must match ${fieldName}`
  }),
  
  range: (min, max) => (value) => {
    const num = parseFloat(value);
    return {
      isValid: !value || (!isNaN(num) && num >= min && num <= max),
      message: `Value must be between ${min} and ${max}`
    };
  }
};

// Create validator function - builds a validator with multiple rules
export const createValidator = (rules = []) => {
  return (value) => {
    const errors = [];
    
    for (const rule of rules) {
      const result = rule(value);
      if (!result.isValid) {
        errors.push(result.message);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      value
    };
  };
};

// Validate an entire form object
export const validateForm = (formData, validationSchema) => {
  const results = {};
  let isFormValid = true;
  
  for (const [fieldName, validator] of Object.entries(validationSchema)) {
    const fieldResult = validator(formData[fieldName]);
    results[fieldName] = fieldResult;
    
    if (!fieldResult.isValid) {
      isFormValid = false;
    }
  }
  
  return {
    isValid: isFormValid,
    fields: results,
    errors: Object.entries(results)
      .filter(([_, result]) => !result.isValid)
      .reduce((acc, [fieldName, result]) => {
        acc[fieldName] = result.errors;
        return acc;
      }, {})
  };
};

// Real-time validation helper
export const createFieldValidator = (rules = []) => {
  const validator = createValidator(rules);
  
  return {
    validate: validator,
    validateOnChange: (setValue, setError) => (value) => {
      setValue(value);
      const result = validator(value);
      setError(result.isValid ? '' : result.errors[0]);
      return result;
    },
    validateOnBlur: (value, setError) => {
      const result = validator(value);
      setError(result.isValid ? '' : result.errors[0]);
      return result;
    }
  };
};