import { motion, useInView } from 'framer-motion';

// Shorthand export for cleaner JSX: <m.div />
export const m = motion;
export { useInView };

// Common viewport config
export const viewport = { once: true, amount: 0.2 };

// Variants
export const fadeIn = (direction = 'up', delay = 0, duration = 0.6, distance = 24) => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const from = (direction === 'up' || direction === 'left') ? distance : -distance;
  return {
    hidden: { opacity: 0, [axis]: from },
    show: {
      opacity: 1,
      [axis]: 0,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };
};

export const slideIn = (direction = 'up', delay = 0, duration = 0.6, distance = 40) => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const from = (direction === 'up' || direction === 'left') ? distance : -distance;
  return {
    hidden: { [axis]: from },
    show: { [axis]: 0, transition: { duration, delay, ease: [0.16, 1, 0.3, 1] } },
  };
};

export const scaleIn = (delay = 0, duration = 0.5, from = 0.9) => ({
  hidden: { opacity: 0, scale: from },
  show: { opacity: 1, scale: 1, transition: { duration, delay, ease: [0.16, 1, 0.3, 1] } },
});

export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});
