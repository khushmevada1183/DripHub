/**
 * Animation utilities and configurations
 * Centralized export for all animation-related functionality
 */

// Re-export AOS functionality
export { useAOS } from './aos';

// Re-export Framer Motion utilities
export { 
  m, 
  AnimatePresence, 
  fadeIn, 
  slideIn, 
  scaleIn, 
  staggerContainer, 
  staggerChildren,
  viewport,
  buttonHover,
  cardHover,
  iconHover,
  textVariants,
  listItemVariants
} from './motion';

// Animation presets for common use cases
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8
};

export const EASING = {
  easeOut: [0.25, 0.46, 0.45, 0.94],
  easeIn: [0.55, 0.06, 0.68, 0.19],
  easeInOut: [0.645, 0.045, 0.355, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: [0.175, 0.885, 0.32, 1.275]
};

// Common animation variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: ANIMATION_DURATION.normal, ease: EASING.easeOut }
};

export const modalTransition = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: ANIMATION_DURATION.fast, ease: EASING.easeOut }
};

export const slideInFromLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
  transition: { duration: ANIMATION_DURATION.normal, ease: EASING.easeOut }
};

export const slideInFromRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
  transition: { duration: ANIMATION_DURATION.normal, ease: EASING.easeOut }
};

export const slideInFromBottom = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 100, opacity: 0 },
  transition: { duration: ANIMATION_DURATION.normal, ease: EASING.easeOut }
};

// Loading animations
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: EASING.easeInOut
    }
  }
};

export const spinAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const bounceAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: EASING.bounce
    }
  }
};

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: ANIMATION_DURATION.fast, ease: EASING.easeOut }
};

export const hoverLift = {
  whileHover: { y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
  transition: { duration: ANIMATION_DURATION.fast, ease: EASING.easeOut }
};

export const hoverGlow = {
  whileHover: { 
    boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
    borderColor: "rgb(59, 130, 246)"
  },
  transition: { duration: ANIMATION_DURATION.fast, ease: EASING.easeOut }
};

// Stagger animations for lists
export const staggerList = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: ANIMATION_DURATION.normal, ease: EASING.easeOut }
  }
};

// Cart animations
export const addToCartAnimation = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.2, 1],
    transition: { duration: 0.3, ease: EASING.bounce }
  }
};

export const cartItemSlideIn = {
  initial: { x: 300, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { duration: ANIMATION_DURATION.normal, ease: EASING.easeOut }
  },
  exit: { 
    x: 300, 
    opacity: 0,
    transition: { duration: ANIMATION_DURATION.fast, ease: EASING.easeIn }
  }
};

// Success/Error animations
export const successPulse = {
  animate: {
    scale: [1, 1.1, 1],
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.5, ease: EASING.bounce }
  }
};

export const errorShake = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5, ease: EASING.easeOut }
  }
};

// Form animations
export const inputFocus = {
  whileFocus: { 
    scale: 1.02,
    borderColor: "rgb(59, 130, 246)",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
  },
  transition: { duration: ANIMATION_DURATION.fast, ease: EASING.easeOut }
};

export const buttonPress = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.1, ease: EASING.easeOut }
};

// Search animations
export const searchResultsSlide = {
  initial: { height: 0, opacity: 0 },
  animate: { 
    height: "auto", 
    opacity: 1,
    transition: { duration: ANIMATION_DURATION.normal, ease: EASING.easeOut }
  },
  exit: { 
    height: 0, 
    opacity: 0,
    transition: { duration: ANIMATION_DURATION.fast, ease: EASING.easeIn }
  }
};

// Navigation animations
export const mobileMenuSlide = {
  initial: { x: "-100%", opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { duration: ANIMATION_DURATION.normal, ease: EASING.easeOut }
  },
  exit: { 
    x: "-100%", 
    opacity: 0,
    transition: { duration: ANIMATION_DURATION.fast, ease: EASING.easeIn }
  }
};

export const dropdownSlide = {
  initial: { y: -10, opacity: 0, scale: 0.95 },
  animate: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { duration: ANIMATION_DURATION.fast, ease: EASING.easeOut }
  },
  exit: { 
    y: -10, 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: ANIMATION_DURATION.fast, ease: EASING.easeIn }
  }
};

// Utility functions
export const createStagger = (staggerDelay = 0.1, delayChildren = 0) => ({
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren
    }
  }
});

export const createSlideIn = (direction = 'up', distance = 50) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };

  return {
    initial: { ...directions[direction], opacity: 0 },
    animate: { 
      x: 0, 
      y: 0, 
      opacity: 1,
      transition: { duration: ANIMATION_DURATION.normal, ease: EASING.easeOut }
    }
  };
};

export const createFadeIn = (delay = 0, duration = ANIMATION_DURATION.normal) => ({
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration, delay, ease: EASING.easeOut }
  }
});

export const createScaleIn = (delay = 0, scale = 0.8) => ({
  initial: { opacity: 0, scale },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: ANIMATION_DURATION.normal, delay, ease: EASING.easeOut }
  }
});

// Animation hooks for React components
export const useAnimationConfig = (animationType, options = {}) => {
  const configs = {
    pageTransition: { ...pageTransition, ...options },
    modalTransition: { ...modalTransition, ...options },
    slideInFromLeft: { ...slideInFromLeft, ...options },
    slideInFromRight: { ...slideInFromRight, ...options },
    slideInFromBottom: { ...slideInFromBottom, ...options },
    hoverScale: { ...hoverScale, ...options },
    hoverLift: { ...hoverLift, ...options }
  };

  return configs[animationType] || pageTransition;
};

// Performance optimized animations for mobile
export const mobileOptimized = {
  reducedMotion: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: ANIMATION_DURATION.fast }
  }
};

// Check for reduced motion preference
export const respectsReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Conditional animation wrapper
export const conditionalAnimation = (animation, fallback = mobileOptimized.reducedMotion) => {
  return respectsReducedMotion() ? fallback : animation;
};
