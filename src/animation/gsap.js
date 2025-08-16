import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export { gsap };

// Hook to orchestrate GSAP timelines scoped to a component
export const useGsapTimeline = (build) => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      build(gsap, ScrollTrigger);
    }, ref);
    return () => ctx.revert();
  }, [build]);
  return ref;
};
