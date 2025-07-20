import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCarousel } from '../useCarousel';

describe('useCarousel Hook', () => {
  const mockItems = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
    { id: 4, title: 'Item 4' },
    { id: 5, title: 'Item 5' }
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useCarousel(mockItems.length));
    
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalItems).toBe(5);
  });

  it('scrolls to next item correctly', () => {
    const { result } = renderHook(() => useCarousel(mockItems.length));
    
    act(() => {
      result.current.next();
    });
    
    expect(result.current.currentIndex).toBe(1);
  });

  it('scrolls to previous item correctly', () => {
    const { result } = renderHook(() => useCarousel(mockItems.length));
    
    // Go to next first
    act(() => {
      result.current.next();
    });
    
    // Then go back
    act(() => {
      result.current.prev();
    });
    
    expect(result.current.currentIndex).toBe(0);
  });

  it('handles circular navigation', () => {
    const { result } = renderHook(() => useCarousel(mockItems.length));
    
    // Go to last item
    act(() => {
      result.current.goTo(4);
    });
    
    // Go to next (should wrap to first)
    act(() => {
      result.current.next();
    });
    
    expect(result.current.currentIndex).toBe(0);
    
    // Go to previous (should wrap to last)
    act(() => {
      result.current.prev();
    });
    
    expect(result.current.currentIndex).toBe(4);
  });

  it('handles empty items array', () => {
    const { result } = renderHook(() => useCarousel(0));
    
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalItems).toBe(0);
  });

  it('handles single item', () => {
    const { result } = renderHook(() => useCarousel(1));
    
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalItems).toBe(1);
  });

  it('updates when totalItems change', () => {
    const { result, rerender } = renderHook(
      ({ totalItems }) => useCarousel(totalItems),
      { initialProps: { totalItems: mockItems.length } }
    );
    
    expect(result.current.totalItems).toBe(5);
    
    rerender({ totalItems: 3 });
    
    expect(result.current.totalItems).toBe(3);
  });

  it('maintains current index when totalItems change', () => {
    const { result, rerender } = renderHook(
      ({ totalItems }) => useCarousel(totalItems),
      { initialProps: { totalItems: mockItems.length } }
    );
    
    // Go to second item
    act(() => {
      result.current.goTo(1);
    });
    
    expect(result.current.currentIndex).toBe(1);
    
    // Change totalItems
    rerender({ totalItems: 3 });
    
    expect(result.current.currentIndex).toBe(1); // Should maintain the same index
  });

  it('initializes with custom initial index', () => {
    const { result } = renderHook(() => useCarousel(mockItems.length, 2));
    
    expect(result.current.currentIndex).toBe(2);
    expect(result.current.totalItems).toBe(5);
  });

  it('resets to initial index', () => {
    const { result } = renderHook(() => useCarousel(mockItems.length, 1));
    
    // Move to different index
    act(() => {
      result.current.goTo(3);
    });
    
    expect(result.current.currentIndex).toBe(3);
    
    // Reset
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.currentIndex).toBe(1); // Should reset to initial index
  });

  it('allows manual index setting', () => {
    const { result } = renderHook(() => useCarousel(mockItems.length));
    
    act(() => {
      result.current.goTo(3);
    });
    
    expect(result.current.currentIndex).toBe(3);
  });

  it('handles index bounds correctly', () => {
    const { result } = renderHook(() => useCarousel(mockItems.length));
    
    // Set index beyond bounds
    act(() => {
      result.current.goTo(10);
    });
    
    expect(result.current.currentIndex).toBe(0); // Should not change if out of bounds
    
    // Set valid index
    act(() => {
      result.current.goTo(2);
    });
    
    expect(result.current.currentIndex).toBe(2);
  });

  it('handles negative index', () => {
    const { result } = renderHook(() => useCarousel(mockItems.length));
    
    // Set negative index
    act(() => {
      result.current.goTo(-1);
    });
    
    expect(result.current.currentIndex).toBe(0); // Should not change if negative
  });

  it('handles zero totalItems', () => {
    const { result } = renderHook(() => useCarousel(0));
    
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalItems).toBe(0);
    
    // Try to navigate
    act(() => {
      result.current.next();
    });
    
    expect(result.current.currentIndex).toBe(0); // Should not change
  });

  it('handles single item navigation', () => {
    const { result } = renderHook(() => useCarousel(1));
    
    expect(result.current.currentIndex).toBe(0);
    
    // Try to navigate
    act(() => {
      result.current.next();
    });
    
    expect(result.current.currentIndex).toBe(0); // Should stay at 0 for single item
    
    act(() => {
      result.current.prev();
    });
    
    expect(result.current.currentIndex).toBe(0); // Should stay at 0 for single item
  });
}); 