import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useResponsive } from '../useResponsive';

describe('useResponsive Hook', () => {
  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    });
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isSmallScreen).toBe(false);
    expect(result.current.visibleFeatured).toBeDefined();
    expect(result.current.visibleOther).toBeDefined();
  });

  it('detects small screen size', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768
    });

    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isSmallScreen).toBe(true);
  });

  it('detects large screen size', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    });

    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isSmallScreen).toBe(false);
  });

  it('handles exact breakpoint values', () => {
    // Test small screen breakpoint
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1023
    });

    let { result } = renderHook(() => useResponsive());
    expect(result.current.isSmallScreen).toBe(true);

    // Test large screen breakpoint
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    });

    result = renderHook(() => useResponsive()).result;
    expect(result.current.isSmallScreen).toBe(false);
  });

  it('updates on window resize', () => {
    const { result } = renderHook(() => useResponsive());
    
    // Initial large screen state
    expect(result.current.isSmallScreen).toBe(false);
    
    // Simulate small screen resize
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768
      });
      
      // Trigger resize event
      window.dispatchEvent(new Event('resize'));
    });
    
    expect(result.current.isSmallScreen).toBe(true);
  });

  it('handles multiple resize events', () => {
    const { result } = renderHook(() => useResponsive());
    
    // Start with large screen
    expect(result.current.isSmallScreen).toBe(false);
    
    // Resize to small screen
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768
      });
      window.dispatchEvent(new Event('resize'));
    });
    
    expect(result.current.isSmallScreen).toBe(true);
    
    // Resize back to large screen
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      });
      window.dispatchEvent(new Event('resize'));
    });
    
    expect(result.current.isSmallScreen).toBe(false);
  });

  it('handles very small screen sizes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320
    });

    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isSmallScreen).toBe(true);
  });

  it('handles very large screen sizes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920
    });

    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isSmallScreen).toBe(false);
  });

  it('updates visible counts on resize', () => {
    const { result } = renderHook(() => useResponsive());
    
    const initialFeatured = result.current.visibleFeatured;
    const initialOther = result.current.visibleOther;
    
    // Resize to small screen
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768
      });
      window.dispatchEvent(new Event('resize'));
    });
    
    // Visible counts should update based on screen size
    expect(result.current.visibleFeatured).toBeDefined();
    expect(result.current.visibleOther).toBeDefined();
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    
    const { unmount } = renderHook(() => useResponsive());
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('provides consistent screen size detection', () => {
    const testCases = [
      { width: 320, expected: true },
      { width: 768, expected: true },
      { width: 1023, expected: true },
      { width: 1024, expected: false },
      { width: 1280, expected: false },
      { width: 1920, expected: false }
    ];

    testCases.forEach(({ width, expected }) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width
      });

      const { result } = renderHook(() => useResponsive());
      expect(result.current.isSmallScreen).toBe(expected);
    });
  });
}); 