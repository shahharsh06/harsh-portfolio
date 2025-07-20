import { useState, useCallback, useEffect, useRef } from 'react';

interface CarouselState {
  currentIndex: number;
  totalItems: number;
}

interface CarouselActions {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}

interface UseCarouselOptions {
  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  type?: 'featured' | 'other';
  isMobile?: boolean;
}

export const useCarousel = (
  totalItems: number, 
  initialIndex = 0,
  options: UseCarouselOptions = {}
): CarouselState & CarouselActions => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { 
    autoPlay = true, 
    interval = 3000, 
    pauseOnHover = true,
    type = 'featured',
    isMobile = false
  } = options;

  // Optimized scrolling patterns
  const getNextIndex = useCallback((current: number): number => {
    if (totalItems <= 1) return current;
    
    if (isMobile) {
      // Mobile: single-step navigation for smooth coverflow
      return (current + 1) % totalItems;
    } else if (type === 'featured') {
      // Desktop Featured: A B, B C, C D, A D pattern (2 at a time)
      const visibleCount = 2;
      const step = visibleCount;
      return (current + step) % totalItems;
    } else {
      // Desktop Other: A B C, B C D pattern (3 at a time)
      const visibleCount = 3;
      const step = visibleCount;
      return (current + step) % totalItems;
    }
  }, [totalItems, type, isMobile]);

  const next = useCallback(() => {
    if (totalItems <= 1) return;
    setCurrentIndex((prev) => getNextIndex(prev));
  }, [totalItems, getNextIndex]);

  const prev = useCallback(() => {
    if (totalItems <= 1) return;
    setCurrentIndex((prev) => {
      if (isMobile) {
        // Mobile: single-step back
        return (prev - 1 + totalItems) % totalItems;
      } else if (type === 'featured') {
        // Desktop Featured: step back by 2
        return (prev - 2 + totalItems) % totalItems;
      } else {
        // Desktop Other: step back by 3
        return (prev - 3 + totalItems) % totalItems;
      }
    });
  }, [totalItems, type, isMobile]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index);
    }
  }, [totalItems]);

  const reset = useCallback(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const pause = useCallback(() => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Auto-scrolling effect
  useEffect(() => {
    if (!autoPlay || totalItems <= 1 || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => getNextIndex(prev));
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlay, totalItems, isPaused, interval, getNextIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return {
    currentIndex,
    totalItems,
    next,
    prev,
    goTo,
    reset,
    pause,
    resume,
  };
}; 