import AOS from 'aos';
import { useEffect } from 'react';

export const useAOS = (options = { duration: 600, once: true, easing: 'ease-out-cubic' }) => {
  useEffect(() => {
    AOS.init(options);
    return () => {
      AOS.refreshHard();
    };
  }, [options]);
};
