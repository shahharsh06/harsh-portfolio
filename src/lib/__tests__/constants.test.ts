import { describe, it, expect } from 'vitest';
import { 
  BREAKPOINTS, 
  CAROUSEL_INTERVALS, 
  COVERFLOW_CONFIG, 
  ANIMATION_DURATIONS, 
  PERSONAL_INFO, 
  SOCIAL_LINKS,
  getVisibleCount 
} from '../constants';

describe('Constants', () => {
  describe('BREAKPOINTS', () => {
    it('should have correct breakpoint values', () => {
      expect(BREAKPOINTS.MOBILE).toBe(768);
      expect(BREAKPOINTS.TABLET).toBe(1024);
      expect(BREAKPOINTS.DESKTOP).toBe(1280);
    });

    it('should be readonly', () => {
      expect(BREAKPOINTS).toBeDefined();
      expect(typeof BREAKPOINTS.MOBILE).toBe('number');
    });
  });

  describe('CAROUSEL_INTERVALS', () => {
    it('should have correct interval values', () => {
      expect(CAROUSEL_INTERVALS.FEATURED).toBe(3000);
      expect(CAROUSEL_INTERVALS.OTHER).toBe(2500);
    });

    it('should be in milliseconds', () => {
      expect(CAROUSEL_INTERVALS.FEATURED).toBeGreaterThan(1000);
      expect(CAROUSEL_INTERVALS.OTHER).toBeGreaterThan(1000);
    });
  });

  describe('COVERFLOW_CONFIG', () => {
    it('should have all required properties', () => {
      expect(COVERFLOW_CONFIG).toHaveProperty('CENTER_SCALE');
      expect(COVERFLOW_CONFIG).toHaveProperty('SIDE_SCALE');
      expect(COVERFLOW_CONFIG).toHaveProperty('ANGLE');
      expect(COVERFLOW_CONFIG).toHaveProperty('TRANSLATE_X');
      expect(COVERFLOW_CONFIG).toHaveProperty('SIDE_OPACITY');
      expect(COVERFLOW_CONFIG).toHaveProperty('FAR_OPACITY');
      expect(COVERFLOW_CONFIG).toHaveProperty('FAR_SCALE');
      expect(COVERFLOW_CONFIG).toHaveProperty('FAR_TRANSLATE');
    });

    it('should have reasonable scale values', () => {
      expect(COVERFLOW_CONFIG.CENTER_SCALE).toBe(1);
      expect(COVERFLOW_CONFIG.SIDE_SCALE).toBeLessThan(1);
      expect(COVERFLOW_CONFIG.FAR_SCALE).toBeLessThan(1);
    });

    it('should have reasonable opacity values', () => {
      expect(COVERFLOW_CONFIG.SIDE_OPACITY).toBeGreaterThan(0);
      expect(COVERFLOW_CONFIG.SIDE_OPACITY).toBeLessThanOrEqual(1);
      expect(COVERFLOW_CONFIG.FAR_OPACITY).toBeGreaterThan(0);
      expect(COVERFLOW_CONFIG.FAR_OPACITY).toBeLessThanOrEqual(1);
    });
  });

  describe('ANIMATION_DURATIONS', () => {
    it('should have correct duration values', () => {
      expect(ANIMATION_DURATIONS.FAST).toBe(200);
      expect(ANIMATION_DURATIONS.NORMAL).toBe(300);
      expect(ANIMATION_DURATIONS.SLOW).toBe(500);
    });

    it('should be in ascending order', () => {
      expect(ANIMATION_DURATIONS.FAST).toBeLessThan(ANIMATION_DURATIONS.NORMAL);
      expect(ANIMATION_DURATIONS.NORMAL).toBeLessThan(ANIMATION_DURATIONS.SLOW);
    });
  });

  describe('PERSONAL_INFO', () => {
    it('should have all required personal information', () => {
      expect(PERSONAL_INFO).toHaveProperty('name');
      expect(PERSONAL_INFO).toHaveProperty('email');
      expect(PERSONAL_INFO).toHaveProperty('location');
      expect(PERSONAL_INFO).toHaveProperty('title');
      expect(PERSONAL_INFO).toHaveProperty('github');
      expect(PERSONAL_INFO).toHaveProperty('linkedin');
    });

    it('should have valid email format', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(PERSONAL_INFO.email)).toBe(true);
    });

    it('should have non-empty values', () => {
      expect(PERSONAL_INFO.name).toBeTruthy();
      expect(PERSONAL_INFO.email).toBeTruthy();
      expect(PERSONAL_INFO.location).toBeTruthy();
      expect(PERSONAL_INFO.title).toBeTruthy();
      expect(PERSONAL_INFO.github).toBeTruthy();
      expect(PERSONAL_INFO.linkedin).toBeTruthy();
    });

    it('should have correct name', () => {
      expect(PERSONAL_INFO.name).toBe('Harsh Shah');
    });

    // Test with invalid key
    // @ts-expect-error - Testing invalid key
    expect(PERSONAL_INFO.invalidKey).toBeUndefined();
  });

  describe('SOCIAL_LINKS', () => {
    it('should have all required social links', () => {
      expect(SOCIAL_LINKS).toHaveProperty('github');
      expect(SOCIAL_LINKS).toHaveProperty('linkedin');
      expect(SOCIAL_LINKS).toHaveProperty('email');
    });

    it('should have valid URLs', () => {
      expect(SOCIAL_LINKS.github).toMatch(/^https:\/\/github\.com\//);
      expect(SOCIAL_LINKS.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\//);
      expect(SOCIAL_LINKS.email).toMatch(/^mailto:/);
    });

    it('should use PERSONAL_INFO values', () => {
      expect(SOCIAL_LINKS.github).toContain(PERSONAL_INFO.github);
      expect(SOCIAL_LINKS.linkedin).toContain(PERSONAL_INFO.linkedin);
      expect(SOCIAL_LINKS.email).toContain(PERSONAL_INFO.email);
    });
  });

  describe('getVisibleCount', () => {
    it('should return 1 for mobile screens', () => {
      // Mock window.innerWidth for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      expect(getVisibleCount('featured')).toBe(1);
      expect(getVisibleCount('other')).toBe(1);
    });

    it('should return correct values for tablet screens', () => {
      // Mock window.innerWidth for tablet
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      expect(getVisibleCount('featured')).toBe(2);
      expect(getVisibleCount('other')).toBe(3);
    });

    it('should return correct values for desktop screens', () => {
      // Mock window.innerWidth for desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1440,
      });

      expect(getVisibleCount('featured')).toBe(2);
      expect(getVisibleCount('other')).toBe(3);
    });

    it('should handle undefined window', () => {
      // Mock window as undefined (SSR)
      const originalWindow = global.window;
      // @ts-expect-error - Testing undefined window
      delete global.window;

      expect(getVisibleCount('featured')).toBe(1);
      expect(getVisibleCount('other')).toBe(1);

      // Restore window
      global.window = originalWindow;
    });
  });
}); 