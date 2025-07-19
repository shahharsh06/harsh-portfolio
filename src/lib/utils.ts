import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { COVERFLOW_CONFIG } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to get card width class based on visible count
export const getCardWidthClass = (visible: number, type: 'featured' | 'other') => {
  if (visible === 1) return 'w-full';
  if (visible === 2) return 'w-1/2';
  if (visible === 3) return type === 'featured' ? 'w-1/2' : 'w-1/3';
  return 'w-full';
};

// Helper to add padding except for last visible card
export const getCardPadding = (index: number, total: number) =>
  index !== total - 1 ? 'px-4' : '';

// Helper for coverflow transform styles
export const getCoverflowStyle = (index: number, currentIndex: number) => {
  const offset = index - currentIndex;
  
  if (offset === 0) {
    // Center card
    return {
      transform: `scale(${COVERFLOW_CONFIG.CENTER_SCALE}) rotateY(0deg) translateX(0px)`,
      zIndex: 10,
      opacity: 1,
      filter: 'none',
    };
  } else if (offset === -1) {
    // Left card
    return {
      transform: `scale(${COVERFLOW_CONFIG.SIDE_SCALE}) rotateY(${COVERFLOW_CONFIG.ANGLE}deg) translateX(-${COVERFLOW_CONFIG.TRANSLATE_X}px)`,
      zIndex: 5,
      opacity: COVERFLOW_CONFIG.SIDE_OPACITY,
      filter: 'blur(0.5px)',
    };
  } else if (offset === 1) {
    // Right card
    return {
      transform: `scale(${COVERFLOW_CONFIG.SIDE_SCALE}) rotateY(-${COVERFLOW_CONFIG.ANGLE}deg) translateX(${COVERFLOW_CONFIG.TRANSLATE_X}px)`,
      zIndex: 5,
      opacity: COVERFLOW_CONFIG.SIDE_OPACITY,
      filter: 'blur(0.5px)',
    };
  } else {
    // Further cards
    return {
      transform: `scale(${COVERFLOW_CONFIG.FAR_SCALE}) translateX(${offset * COVERFLOW_CONFIG.FAR_TRANSLATE}px)`,
      zIndex: 1,
      opacity: COVERFLOW_CONFIG.FAR_OPACITY,
      filter: 'blur(1px)',
      pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
    };
  }
};

// Helper to get rolling window of items
export const getRollingWindow = <T>(arr: T[], start: number, count: number): T[] => {
  const n = arr.length;
  return Array.from({ length: count }, (_, i) => arr[(start + i) % n]);
};
