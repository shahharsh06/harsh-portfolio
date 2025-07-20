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
    const { result } = renderHook(() => useCarousel({ items: mockItems }));
    
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalItems).toBe(5);
  });

  it('scrolls to next item correctly', () => {
    const { result } = renderHook(() => useCarousel({ items: mockItems }));
    
    act(() => {
      result.current.scrollTo('next');
    });
    
    expect(result.current.currentIndex).toBe(1);
  });

  it('scrolls to previous item correctly', () => {
    const { result } = renderHook(() => useCarousel({ items: mockItems }));
    
    // Go to next first
    act(() => {
      result.current.scrollTo('next');
    });
    
    // Then go back
    act(() => {
      result.current.scrollTo('prev');
    });
    
    expect(result.current.currentIndex).toBe(0);
  });

  it('handles circular navigation', () => {
    const { result } = renderHook(() => useCarousel({ items: mockItems }));
    
    // Go to last item
    act(() => {
      result.current.setCurrentIndex(4);
    });
    
    // Go to next (should wrap to first)
    act(() => {
      result.current.scrollTo('next');
    });
    
    expect(result.current.currentIndex).toBe(0);
    
    // Go to previous (should wrap to last)
    act(() => {
      result.current.scrollTo('prev');
    });
    
    expect(result.current.currentIndex).toBe(4);
  });

  it('handles empty items array', () => {
    const { result } = renderHook(() => useCarousel({ items: [] }));
    
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalItems).toBe(0);
  });

  it('handles single item', () => {
    const { result } = renderHook(() => useCarousel({ items: [mockItems[0]] }));
    
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalItems).toBe(1);
  });

  it('updates when items change', () => {
    const { result, rerender } = renderHook(
      ({ items }) => useCarousel({ items }),
      { initialProps: { items: mockItems } }
    );
    
    expect(result.current.totalItems).toBe(5);
    
    const newItems = mockItems.slice(0, 3);
    rerender({ items: newItems });
    
    expect(result.current.totalItems).toBe(3);
  });

  it('maintains current index when items change', () => {
    const { result, rerender } = renderHook(
      ({ items }) => useCarousel({ items }),
      { initialProps: { items: mockItems } }
    );
    
    // Go to second item
    act(() => {
      result.current.setCurrentIndex(1);
    });
    
    expect(result.current.currentIndex).toBe(1);
    
    // Change items
    rerender({ items: mockItems.slice(0, 3) });
    
    expect(result.current.currentIndex).toBe(1); // Should maintain the same index
  });

  it('auto-scrolls when not hovered', () => {
    const { result } = renderHook(() => useCarousel({ 
      items: mockItems, 
      autoSlideInterval: 1000 
    }));
    
    expect(result.current.currentIndex).toBe(0);
    
    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current.currentIndex).toBe(1);
  });

  it('stops auto-scroll when hovered', () => {
    const { result } = renderHook(() => useCarousel({ 
      items: mockItems, 
      autoSlideInterval: 1000,
      isHovered: true
    }));
    
    expect(result.current.currentIndex).toBe(0);
    
    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current.currentIndex).toBe(0); // Should not change
  });

  it('stops auto-scroll with empty items', () => {
    const { result } = renderHook(() => useCarousel({ 
      items: [], 
      autoSlideInterval: 1000 
    }));
    
    expect(result.current.currentIndex).toBe(0);
    
    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current.currentIndex).toBe(0); // Should not change
  });

  it('uses custom auto-slide interval', () => {
    const { result } = renderHook(() => useCarousel({ 
      items: mockItems, 
      autoSlideInterval: 2000 
    }));
    
    expect(result.current.currentIndex).toBe(0);
    
    // Fast-forward time less than interval
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current.currentIndex).toBe(0); // Should not change yet
    
    // Fast-forward time to trigger interval
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current.currentIndex).toBe(1);
  });

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    
    const { unmount } = renderHook(() => useCarousel({ 
      items: mockItems, 
      autoSlideInterval: 1000 
    }));
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('allows manual index setting', () => {
    const { result } = renderHook(() => useCarousel({ items: mockItems }));
    
    act(() => {
      result.current.setCurrentIndex(3);
    });
    
    expect(result.current.currentIndex).toBe(3);
  });

  it('handles index bounds correctly', () => {
    const { result } = renderHook(() => useCarousel({ items: mockItems }));
    
    // Set index beyond bounds
    act(() => {
      result.current.setCurrentIndex(10);
    });
    
    expect(result.current.currentIndex).toBe(10); // Should allow any index
    
    // Set negative index
    act(() => {
      result.current.setCurrentIndex(-1);
    });
    
    expect(result.current.currentIndex).toBe(-1); // Should allow any index
  });
}); 