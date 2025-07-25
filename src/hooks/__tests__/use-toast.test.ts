import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast, toast } from '../use-toast';

describe('use-toast', () => {
  beforeEach(() => {
    // Use fake timers
    vi.useFakeTimers();
    // Clear any existing toasts by resetting the memory state
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.dismiss();
      // Wait for removal
      vi.advanceTimersByTime(1000000);
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('toast function', () => {
    it('creates toast with correct properties', () => {
      const toastInstance = toast({ title: 'Test Title', description: 'Test Description' });
      
      expect(toastInstance).toHaveProperty('id');
      expect(toastInstance).toHaveProperty('dismiss');
      expect(toastInstance).toHaveProperty('update');
      expect(typeof toastInstance.dismiss).toBe('function');
      expect(typeof toastInstance.update).toBe('function');
    });

    it('generates unique IDs for different toasts', () => {
      const toast1 = toast({ title: 'Test 1' });
      const toast2 = toast({ title: 'Test 2' });
      
      expect(toast1.id).not.toBe(toast2.id);
    });
  });

  describe('useToast hook', () => {
    it('returns correct initial state', () => {
      const { result } = renderHook(() => useToast());
      
      // Clear any existing toasts first
      act(() => {
        result.current.dismiss();
        vi.advanceTimersByTime(1000000);
      });
      
      expect(result.current.toasts).toEqual([]);
      expect(typeof result.current.toast).toBe('function');
      expect(typeof result.current.dismiss).toBe('function');
    });

    it('can add a toast', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.toast({ title: 'Test Toast' });
      });
      
      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].title).toBe('Test Toast');
      expect(result.current.toasts[0].open).toBe(true);
    });

    it('can dismiss a specific toast', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        const toastInstance = result.current.toast({ title: 'Test Toast' });
        result.current.dismiss(toastInstance.id);
      });
      
      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].open).toBe(false);
    });

    it('can dismiss all toasts', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.toast({ title: 'Toast 1' });
        result.current.toast({ title: 'Toast 2' });
        result.current.dismiss();
      });
      
      expect(result.current.toasts).toHaveLength(1); // Only one remains due to limit
      expect(result.current.toasts[0].open).toBe(false);
    });

    it('respects toast limit', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.toast({ title: 'Toast 1' });
        result.current.toast({ title: 'Toast 2' });
        result.current.toast({ title: 'Toast 3' });
      });
      
      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].title).toBe('Toast 3');
    });

    it('can update a toast', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        const toastInstance = result.current.toast({ title: 'Original Title' });
        toastInstance.update({ id: toastInstance.id, title: 'Updated Title' });
      });
      
      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].title).toBe('Updated Title');
    });

    it('handles toast lifecycle with timers', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        const toastInstance = result.current.toast({ title: 'Lifecycle Test' });
        result.current.dismiss(toastInstance.id);
      });
      
      expect(result.current.toasts[0].open).toBe(false);
      
      // Fast-forward time to trigger removal
      act(() => {
        vi.advanceTimersByTime(1000000);
      });
      
      expect(result.current.toasts).toHaveLength(0);
    });

    it('prevents duplicate timeouts for same toast', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        const toastInstance = result.current.toast({ title: 'Test Toast' });
        
        // Dismiss the same toast multiple times
        result.current.dismiss(toastInstance.id);
        result.current.dismiss(toastInstance.id);
        result.current.dismiss(toastInstance.id);
      });
      
      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(1000000);
      });
      
      // Toast should be removed only once
      expect(result.current.toasts).toHaveLength(0);
    });

    it('handles onOpenChange callback', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.toast({ title: 'Test Toast' });
      });
      
      // Simulate onOpenChange(false)
      act(() => {
        const toast = result.current.toasts[0];
        if (toast.onOpenChange) {
          toast.onOpenChange(false);
        }
      });
      
      expect(result.current.toasts[0].open).toBe(false);
    });

    it('handles edge case: update non-existent toast', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        const toastInstance = result.current.toast({ title: 'Test Toast' });
        
        // Remove the toast first
        result.current.dismiss(toastInstance.id);
        vi.advanceTimersByTime(1000000);
        
        // Try to update the removed toast
        toastInstance.update({ id: toastInstance.id, title: 'Updated Title' });
      });
      
      // Should not throw any errors
      expect(result.current.toasts).toHaveLength(0);
    });
  });

  describe('integration tests', () => {
    it('multiple hooks maintain consistent state', () => {
      const { result: hook1 } = renderHook(() => useToast());
      const { result: hook2 } = renderHook(() => useToast());
      
      act(() => {
        hook1.current.toast({ title: 'Shared Toast' });
      });
      
      // Both hooks should have the same state
      expect(hook1.current.toasts).toHaveLength(1);
      expect(hook2.current.toasts).toHaveLength(1);
      expect(hook1.current.toasts[0].title).toBe('Shared Toast');
      expect(hook2.current.toasts[0].title).toBe('Shared Toast');
      
      // Dismiss from any hook should affect all
      act(() => {
        hook2.current.dismiss();
      });
      
      expect(hook1.current.toasts[0].open).toBe(false);
      expect(hook2.current.toasts[0].open).toBe(false);
    });
  });
}); 