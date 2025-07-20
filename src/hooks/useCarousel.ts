import { useState, useCallback } from 'react';

interface CarouselState {
  currentIndex: number;
  totalItems: number;
}

interface CarouselActions {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  reset: () => void;
}

export const useCarousel = (totalItems: number, initialIndex = 0): CarouselState & CarouselActions => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index);
    }
  }, [totalItems]);

  const reset = useCallback(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  return {
    currentIndex,
    totalItems,
    next,
    prev,
    goTo,
    reset,
  };
}; 