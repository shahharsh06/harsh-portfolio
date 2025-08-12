import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { COVERFLOW_CONFIG } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to get a reliable image URL with fallback
export function getImageUrl(url: string, fallback?: string): string {
  if (!url) return fallback || "";

  // If it's already a full URL, return it as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If it's a relative path, make it absolute
  if (url.startsWith("/")) {
    return `${window.location.origin}${url}`;
  }

  // For other cases, return the URL as-is
  return url;
}

// Project emoji mapping for better maintainability
const PROJECT_EMOJI_MAP: Record<string, string> = {
  recipe: "🍽️",
  food: "🍽️",
  weather: "🌤️",
  "e-commerce": "🛒",
  shop: "🛒",
  task: "📋",
  todo: "📋",
  ai: "🤖",
  chat: "🤖",
  data: "📊",
  analytics: "📊",
  fitness: "💪",
  workout: "💪",
  blog: "📝",
  portfolio: "🎨",
};

// Utility function to get project-specific fallback emoji
export function getProjectFallbackEmoji(title: string): string {
  const lowerTitle = title.toLowerCase();

  // Use find method instead of for loop with early return
  const matchedEmoji = Object.entries(PROJECT_EMOJI_MAP).find(([keyword]) =>
    lowerTitle.includes(keyword),
  );

  return matchedEmoji ? matchedEmoji[1] : "💻";
}

// Helper to get card width class based on visible count
export const getCardWidthClass = (
  visible: number,
  type: "featured" | "other",
) => {
  if (visible === 1) return "w-full";
  if (visible === 2) return "w-1/2";
  if (visible === 3) return type === "featured" ? "w-1/2" : "w-1/3";
  return "w-full";
};

// Helper to add padding except for last visible card
export const getCardPadding = (index: number, total: number) =>
  index !== total - 1 ? "px-4" : "";

// Helper for coverflow transform styles
export const getCoverflowStyle = (index: number, currentIndex: number) => {
  const offset = index - currentIndex;

  // Define style configurations for different positions
  const styleConfigs = {
    0: {
      // Center card
      transform: `scale(${COVERFLOW_CONFIG.CENTER_SCALE}) rotateY(0deg) translateX(0px)`,
      zIndex: 10,
      opacity: 1,
      filter: "none",
    },
    [-1]: {
      // Left card
      transform: `scale(${COVERFLOW_CONFIG.SIDE_SCALE}) rotateY(${COVERFLOW_CONFIG.ANGLE}deg) translateX(-${COVERFLOW_CONFIG.TRANSLATE_X}px)`,
      zIndex: 5,
      opacity: COVERFLOW_CONFIG.SIDE_OPACITY,
      filter: "blur(0.5px)",
    },
    [1]: {
      // Right card
      transform: `scale(${COVERFLOW_CONFIG.SIDE_SCALE}) rotateY(-${COVERFLOW_CONFIG.ANGLE}deg) translateX(${COVERFLOW_CONFIG.TRANSLATE_X}px)`,
      zIndex: 5,
      opacity: COVERFLOW_CONFIG.SIDE_OPACITY,
      filter: "blur(0.5px)",
    },
  };

  // Return specific style or default for further cards
  if (styleConfigs[offset as keyof typeof styleConfigs]) {
    return styleConfigs[offset as keyof typeof styleConfigs];
  }

  // Further cards - default case
  return {
    transform: `scale(${COVERFLOW_CONFIG.FAR_SCALE}) translateX(${offset * COVERFLOW_CONFIG.FAR_TRANSLATE}px)`,
    zIndex: 1,
    opacity: COVERFLOW_CONFIG.FAR_OPACITY,
    filter: "blur(1px)",
    pointerEvents: "none" as React.CSSProperties["pointerEvents"],
  };
};

// Helper to get rolling window of items
export const getRollingWindow = <T>(
  arr: T[],
  start: number,
  count: number,
): T[] => {
  const n = arr.length;
  return Array.from({ length: count }, (_, i) => {
    let idx = (start + i) % n;
    if (idx < 0) idx += n;
    return arr[idx];
  });
};

// Optimized cyclic window function for smooth carousel movement
// Creates the pattern: A B → B C → C D → D A (for 4 cards)
// For any number of cards, it creates smooth cyclic transitions
export const getCyclicWindow = <T>(
  arr: T[],
  start: number,
  count: number,
): T[] => {
  const n = arr.length;
  if (n === 0) return [];
  
  // For single card, just return the current item
  if (count === 1) {
    return [arr[start % n]];
  }
  
  // Create a cyclic window that moves smoothly
  // This ensures we always show the right combination of cards
  // Pattern: A B → B C → C D → D A (for 4 cards)
  // Pattern: A B C → B C D → C D A → D A B (for 3 cards)
  const result: T[] = [];
  
  for (let i = 0; i < count; i++) {
    let idx = (start + i) % n;
    if (idx < 0) idx += n;
    result.push(arr[idx]);
  }
  
  return result;
};
