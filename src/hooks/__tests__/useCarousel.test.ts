import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCarousel } from "../useCarousel";

describe("useCarousel Hook", () => {
  const mockItems = [
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" },
    { id: 4, title: "Item 4" },
    { id: 5, title: "Item 5" },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes with correct default values", () => {
    const { result } = renderHook(() => useCarousel(mockItems.length));

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalItems).toBe(5);
  });

  it("scrolls to next item correctly for featured type", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 0, { type: "featured" }),
    );

    act(() => {
      result.current.next();
    });

    // Featured: steps by 2 (A B, B C, C D pattern)
    expect(result.current.currentIndex).toBe(2);
  });

  it("scrolls to next item correctly for other type", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 0, { type: "other" }),
    );

    act(() => {
      result.current.next();
    });

    // Other: steps by 3 (A B C, B C D pattern)
    expect(result.current.currentIndex).toBe(3);
  });

  it("scrolls to next item correctly for mobile", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 0, { isMobile: true }),
    );

    act(() => {
      result.current.next();
    });

    // Mobile: single-step navigation
    expect(result.current.currentIndex).toBe(1);
  });

  it("scrolls to previous item correctly for featured type", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 2, { type: "featured" }),
    );

    act(() => {
      result.current.prev();
    });

    // Featured: steps back by 2
    expect(result.current.currentIndex).toBe(0);
  });

  it("scrolls to previous item correctly for other type", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 3, { type: "other" }),
    );

    act(() => {
      result.current.prev();
    });

    // Other: steps back by 3
    expect(result.current.currentIndex).toBe(0);
  });

  it("scrolls to previous item correctly for mobile", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 1, { isMobile: true }),
    );

    act(() => {
      result.current.prev();
    });

    // Mobile: single-step back
    expect(result.current.currentIndex).toBe(0);
  });

  it("handles circular navigation for featured type", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 4, { type: "featured" }),
    );

    // Go to next (should wrap to first)
    act(() => {
      result.current.next();
    });

    expect(result.current.currentIndex).toBe(1); // (4 + 2) % 5 = 1

    // Go to previous (should wrap to last)
    act(() => {
      result.current.prev();
    });

    expect(result.current.currentIndex).toBe(4); // (1 - 2 + 5) % 5 = 4
  });

  it("handles circular navigation for other type", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 4, { type: "other" }),
    );

    // Go to next (should wrap to first)
    act(() => {
      result.current.next();
    });

    expect(result.current.currentIndex).toBe(2); // (4 + 3) % 5 = 2

    // Go to previous (should wrap to last)
    act(() => {
      result.current.prev();
    });

    expect(result.current.currentIndex).toBe(4); // (2 - 3 + 5) % 5 = 4
  });

  it("handles empty items array", () => {
    const { result } = renderHook(() => useCarousel(0));

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalItems).toBe(0);
  });

  it("handles single item", () => {
    const { result } = renderHook(() => useCarousel(1));

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalItems).toBe(1);
  });

  it("updates when totalItems change", () => {
    const { result, rerender } = renderHook(
      ({ totalItems }) => useCarousel(totalItems),
      { initialProps: { totalItems: mockItems.length } },
    );

    expect(result.current.totalItems).toBe(5);

    rerender({ totalItems: 3 });

    expect(result.current.totalItems).toBe(3);
  });

  it("maintains current index when totalItems change", () => {
    const { result, rerender } = renderHook(
      ({ totalItems }) => useCarousel(totalItems),
      { initialProps: { totalItems: mockItems.length } },
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

  it("initializes with custom initial index", () => {
    const { result } = renderHook(() => useCarousel(mockItems.length, 2));

    expect(result.current.currentIndex).toBe(2);
    expect(result.current.totalItems).toBe(5);
  });

  it("resets to initial index", () => {
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

  it("allows manual index setting", () => {
    const { result } = renderHook(() => useCarousel(mockItems.length));

    act(() => {
      result.current.goTo(3);
    });

    expect(result.current.currentIndex).toBe(3);
  });

  it("handles index bounds correctly", () => {
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

  it("handles negative index", () => {
    const { result } = renderHook(() => useCarousel(mockItems.length));

    // Set negative index
    act(() => {
      result.current.goTo(-1);
    });

    expect(result.current.currentIndex).toBe(0); // Should not change if negative
  });

  it("handles zero totalItems", () => {
    const { result } = renderHook(() => useCarousel(0));

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalItems).toBe(0);

    // Try to navigate
    act(() => {
      result.current.next();
    });

    expect(result.current.currentIndex).toBe(0); // Should not change
  });

  it("handles single item navigation", () => {
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

  // New tests for auto-scrolling functionality
  it("auto-scrolls with default interval", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 0, { autoPlay: true }),
    );

    // Advance timer by default interval (3000ms)
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.currentIndex).toBe(2); // Featured type by default, steps by 2
  });

  it("auto-scrolls with custom interval", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 0, {
        autoPlay: true,
        interval: 2000,
        type: "other",
      }),
    );

    // Advance timer by custom interval
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.currentIndex).toBe(3); // Other type, steps by 3
  });

  it("auto-scrolls with mobile single-step navigation", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 0, {
        autoPlay: true,
        interval: 2000,
        isMobile: true,
      }),
    );

    // Advance timer by custom interval
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.currentIndex).toBe(1); // Mobile, steps by 1
  });

  it("pauses auto-scroll when pause is called", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 0, { autoPlay: true }),
    );

    // Pause auto-scroll
    act(() => {
      result.current.pause();
    });

    // Advance timer
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.currentIndex).toBe(0); // Should not have changed
  });

  it("resumes auto-scroll when resume is called", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 0, { autoPlay: true }),
    );

    // Pause auto-scroll
    act(() => {
      result.current.pause();
    });

    // Resume auto-scroll
    act(() => {
      result.current.resume();
    });

    // Advance timer
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.currentIndex).toBe(2); // Should have advanced
  });

  it("does not auto-scroll when autoPlay is false", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 0, { autoPlay: false }),
    );

    // Advance timer
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.currentIndex).toBe(0); // Should not have changed
  });

  it("handles multiple auto-scroll cycles", () => {
    const { result } = renderHook(() =>
      useCarousel(mockItems.length, 0, {
        autoPlay: true,
        type: "featured",
      }),
    );

    // Advance timer multiple times
    act(() => {
      vi.advanceTimersByTime(3000); // First cycle: 0 -> 2
    });

    expect(result.current.currentIndex).toBe(2);

    act(() => {
      vi.advanceTimersByTime(3000); // Second cycle: 2 -> 4
    });

    expect(result.current.currentIndex).toBe(4);

    act(() => {
      vi.advanceTimersByTime(3000); // Third cycle: 4 -> 1 (wraps around)
    });

    expect(result.current.currentIndex).toBe(1);
  });

  it("cleans up interval on unmount", () => {
    const { unmount } = renderHook(() =>
      useCarousel(mockItems.length, 0, { autoPlay: true }),
    );

    // Spy on clearInterval
    const clearIntervalSpy = vi.spyOn(global, "clearInterval");

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
