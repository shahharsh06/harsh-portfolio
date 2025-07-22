import { describe, it, expect } from 'vitest';
import { 
  cn, 
  getCardWidthClass, 
  getCardPadding, 
  getCoverflowStyle, 
  getRollingWindow,
  getImageUrl,
  getProjectFallbackEmoji
} from '../utils';

describe('Utility Functions', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      expect(cn('base', 'conditional')).toBe('base conditional');
      expect(cn('base')).toBe('base');
    });

    it('handles arrays and objects', () => {
      expect(cn(['class1', 'class2'], { class3: true, class4: false })).toBe('class1 class2 class3');
    });

    it('should handle empty string', () => {
      expect(cn('')).toBe('');
    });

    it('should handle single class', () => {
      expect(cn('test-class')).toBe('test-class');
    });
  });

  describe('getImageUrl', () => {
    it('returns full URL for relative paths', () => {
      const result = getImageUrl('/image.jpg');
      expect(result).toContain('http://localhost');
      expect(result).toContain('/image.jpg');
    });

    it('returns full URL for absolute URLs', () => {
      const result = getImageUrl('https://example.com/image.jpg');
      expect(result).toBe('https://example.com/image.jpg');
    });

    it('returns fallback for empty URL', () => {
      const result = getImageUrl('', 'fallback.jpg');
      expect(result).toBe('fallback.jpg');
    });

    it('returns empty string for empty URL without fallback', () => {
      const result = getImageUrl('');
      expect(result).toBe('');
    });
  });

  describe('getProjectFallbackEmoji', () => {
    it('returns food emoji for recipe projects', () => {
      expect(getProjectFallbackEmoji('Recipe Finder App')).toBe('🍽️');
      expect(getProjectFallbackEmoji('Food Delivery App')).toBe('🍽️');
    });

    it('returns weather emoji for weather projects', () => {
      expect(getProjectFallbackEmoji('Weather Dashboard')).toBe('🌤️');
      expect(getProjectFallbackEmoji('Weather App')).toBe('🌤️');
    });

    it('returns shopping emoji for e-commerce projects', () => {
      expect(getProjectFallbackEmoji('E-Commerce Platform')).toBe('🛒');
      expect(getProjectFallbackEmoji('Online Shop')).toBe('🛒');
    });

    it('returns task emoji for task management projects', () => {
      expect(getProjectFallbackEmoji('Task Management App')).toBe('📋');
      expect(getProjectFallbackEmoji('Todo App')).toBe('📋');
    });

    it('returns robot emoji for AI projects', () => {
      expect(getProjectFallbackEmoji('AI Chat Assistant')).toBe('🤖');
      expect(getProjectFallbackEmoji('Chatbot App')).toBe('🤖');
    });

    it('returns chart emoji for data projects', () => {
      expect(getProjectFallbackEmoji('Data Analytics Dashboard')).toBe('📊');
      expect(getProjectFallbackEmoji('Analytics Platform')).toBe('📊');
    });

    it('returns fitness emoji for fitness projects', () => {
      expect(getProjectFallbackEmoji('Fitness Tracker')).toBe('💪');
      expect(getProjectFallbackEmoji('Workout App')).toBe('💪');
    });

    it('returns blog emoji for blog projects', () => {
      expect(getProjectFallbackEmoji('Blog Platform')).toBe('📝');
    });

    it('returns portfolio emoji for portfolio projects', () => {
      expect(getProjectFallbackEmoji('Portfolio Website')).toBe('🎨');
    });

    it('returns default emoji for unknown projects', () => {
      expect(getProjectFallbackEmoji('Random App')).toBe('💻');
    });
  });

  describe('getCardWidthClass', () => {
    it('returns correct width for featured projects', () => {
      expect(getCardWidthClass(1, 'featured')).toBe('w-full');
      expect(getCardWidthClass(2, 'featured')).toBe('w-1/2');
      expect(getCardWidthClass(3, 'featured')).toBe('w-1/2');
    });

    it('returns correct width for other projects', () => {
      expect(getCardWidthClass(1, 'other')).toBe('w-full');
      expect(getCardWidthClass(2, 'other')).toBe('w-1/2');
      expect(getCardWidthClass(3, 'other')).toBe('w-1/3');
    });
  });

  describe('getCardPadding', () => {
    it('returns padding for non-last items', () => {
      expect(getCardPadding(0, 3)).toBe('px-4');
      expect(getCardPadding(1, 3)).toBe('px-4');
    });

    it('returns empty string for last item', () => {
      expect(getCardPadding(2, 3)).toBe('');
    });
  });

  describe('getCoverflowStyle', () => {
    it('returns center card style for current index', () => {
      const style = getCoverflowStyle(2, 2);
      expect(style.zIndex).toBe(10);
      expect(style.opacity).toBe(1);
    });

    it('returns left card style for previous index', () => {
      const style = getCoverflowStyle(1, 2);
      expect(style.zIndex).toBe(5);
      expect(style.opacity).toBeLessThan(1);
    });

    it('returns right card style for next index', () => {
      const style = getCoverflowStyle(3, 2);
      expect(style.zIndex).toBe(5);
      expect(style.opacity).toBeLessThan(1);
    });

    it('returns far card style for distant indices', () => {
      const style = getCoverflowStyle(0, 2);
      expect(style.zIndex).toBe(1);
      expect(style.opacity).toBeLessThan(1);
    });
  });

  describe('getRollingWindow', () => {
    it('returns correct window of items', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(getRollingWindow(arr, 0, 3)).toEqual([1, 2, 3]);
      expect(getRollingWindow(arr, 3, 3)).toEqual([4, 5, 1]);
    });

    it('handles empty array', () => {
      expect(getRollingWindow([], 0, 3)).toEqual([undefined, undefined, undefined]);
    });
  });

  describe('getCardWidthClass edge cases', () => {
    it('returns w-full for unexpected visible values', () => {
      expect(getCardWidthClass(0, 'featured')).toBe('w-full');
      expect(getCardWidthClass(10, 'other')).toBe('w-full');
    });
  });

  describe('getRollingWindow edge cases', () => {
    it('handles negative start index', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(getRollingWindow(arr, -1, 3)).toEqual([5, 1, 2]);
    });
    it('handles count greater than array length', () => {
      const arr = [1, 2];
      expect(getRollingWindow(arr, 0, 5)).toEqual([1, 2, 1, 2, 1]);
    });
  });

  describe('getImageUrl edge cases', () => {
    it('returns url as is for non-http, non-/ string', () => {
      expect(getImageUrl('foo.jpg')).toBe('foo.jpg');
    });
  });
}); 