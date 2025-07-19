import { useState, useEffect } from 'react';

interface UseCarouselProps {
  items: any[];
  autoSlideInterval?: number;
  isHovered?: boolean;
}

export const useCarousel = ({ 
  items, 
  autoSlideInterval = 3000, 
  isHovered = false 
}: UseCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollTo = (direction: 'prev' | 'next') => {
    const n = items.length;
    if (direction === 'prev') {
      setCurrentIndex(prev => (prev - 1 + n) % n);
    } else {
      setCurrentIndex(prev => (prev + 1) % n);
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    if (isHovered || items.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, autoSlideInterval);
    
    return () => clearInterval(interval);
  }, [isHovered, items.length, autoSlideInterval]);

  return {
    currentIndex,
    setCurrentIndex,
    scrollTo,
    totalItems: items.length
  };
}; 