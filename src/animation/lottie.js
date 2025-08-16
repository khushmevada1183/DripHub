import Lottie from 'lottie-react';

// Simple wrapper so we can centralize defaults later if needed
export const LottiePlayer = ({ animationData, loop = true, autoplay = true, className = '' }) => {
  return <Lottie animationData={animationData} loop={loop} autoplay={autoplay} className={className} />;
};
