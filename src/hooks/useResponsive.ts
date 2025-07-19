import { useState, useEffect } from 'react';
import { BREAKPOINTS, getVisibleCount } from '@/lib/constants';

export const useResponsive = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.TABLET : false
  );
  const [visibleFeatured, setVisibleFeatured] = useState(getVisibleCount('featured'));
  const [visibleOther, setVisibleOther] = useState(getVisibleCount('other'));

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < BREAKPOINTS.TABLET);
      setVisibleFeatured(getVisibleCount('featured'));
      setVisibleOther(getVisibleCount('other'));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isSmallScreen,
    visibleFeatured,
    visibleOther,
  };
}; 