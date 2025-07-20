import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast, toast, reducer } from '../use-toast';

describe('use-toast Hook', () => {
  beforeEach(() => {
    // Clear any existing toasts
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('useToast hook', () => {
    it('should initialize with empty toasts', () => {
      const { result } = renderHook(() => useToast());
      
      expect(result.current.toasts).toEqual([]);
      expect(typeof result.current.toast).toBe('function');
      expect(typeof result.current.dismiss).toBe('function');
    });

    it('should add a toast', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.toast({
          title: 'Test Toast',
          description: 'Test Description'
        });
      });
      
      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].title).toBe('Test Toast');
      expect(result.current.toasts[0].description).toBe('Test Description');
      expect(result.current.toasts[0].open).toBe(true);
    });

    it('should dismiss a specific toast', () => {
      const { result } = renderHook(() => useToast());
      
      let toastId: string;
      
      act(() => {
        const toastResult = result.current.toast({
          title: 'Test Toast'
        });
        toastId = toastResult.id;
      });
      
      expect(result.current.toasts).toHaveLength(1);
      
      act(() => {
        result.current.dismiss(toastId!);
      });
      
      expect(result.current.toasts[0].open).toBe(false);
    });

    it('should dismiss all toasts when no id provided', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.toast({ title: 'Toast 1' });
      });
      
      // Due to TOAST_LIMIT of 1, only one toast should exist
      expect(result.current.toasts).toHaveLength(1);
      
      act(() => {
        result.current.dismiss();
      });
      
      expect(result.current.toasts[0].open).toBe(false);
    });

    it('should limit toasts to TOAST_LIMIT', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.toast({ title: 'Toast 1' });
        result.current.toast({ title: 'Toast 2' });
        result.current.toast({ title: 'Toast 3' });
      });
      
      // TOAST_LIMIT is 1, so only the last toast should remain
      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].title).toBe('Toast 3');
    });

    it('should handle toast update', () => {
      const { result } = renderHook(() => useToast());
      
      let toastResult: any;
      
      act(() => {
        toastResult = result.current.toast({
          title: 'Original Title',
          description: 'Original Description'
        });
      });
      
      act(() => {
        toastResult.update({
          title: 'Updated Title',
          description: 'Updated Description'
        });
      });
      
      expect(result.current.toasts[0].title).toBe('Updated Title');
      expect(result.current.toasts[0].description).toBe('Updated Description');
    });

    it('should handle toast dismiss from toast instance', () => {
      const { result } = renderHook(() => useToast());
      
      let toastResult: any;
      
      act(() => {
        toastResult = result.current.toast({
          title: 'Test Toast'
        });
      });
      
      expect(result.current.toasts[0].open).toBe(true);
      
      act(() => {
        toastResult.dismiss();
      });
      
      expect(result.current.toasts[0].open).toBe(false);
    });

    it('should handle onOpenChange callback', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.toast({
          title: 'Test Toast'
        });
      });
      
      const toast = result.current.toasts[0];
      expect(toast.open).toBe(true);
      
      act(() => {
        toast.onOpenChange?.(false);
      });
      
      expect(result.current.toasts[0].open).toBe(false);
    });
  });

  describe('toast function', () => {
    it('should create a toast with unique id', () => {
      const toast1 = toast({ title: 'Toast 1' });
      const toast2 = toast({ title: 'Toast 2' });
      
      expect(toast1.id).toBeDefined();
      expect(toast2.id).toBeDefined();
      expect(toast1.id).not.toBe(toast2.id);
    });

    it('should return dismiss and update functions', () => {
      const toastResult = toast({ title: 'Test Toast' });
      
      expect(typeof toastResult.dismiss).toBe('function');
      expect(typeof toastResult.update).toBe('function');
    });

    it('should handle toast update through returned function', () => {
      const toastResult = toast({ title: 'Original Title' });
      
      act(() => {
        toastResult.update({
          id: toastResult.id,
          title: 'Updated Title'
        });
      });
      
      // The toast should be updated in the global state
      const { result } = renderHook(() => useToast());
      expect(result.current.toasts[0].title).toBe('Updated Title');
    });
  });

  describe('reducer function', () => {
    const initialState = { toasts: [] };

    it('should handle ADD_TOAST action', () => {
      const action = {
        type: 'ADD_TOAST' as const,
        toast: {
          id: '1',
          title: 'Test Toast',
          open: true
        }
      };
      
      const newState = reducer(initialState, action);
      
      expect(newState.toasts).toHaveLength(1);
      expect(newState.toasts[0].title).toBe('Test Toast');
    });

    it('should handle UPDATE_TOAST action', () => {
      const state = {
        toasts: [{
          id: '1',
          title: 'Original Title',
          open: true
        }]
      };
      
      const action = {
        type: 'UPDATE_TOAST' as const,
        toast: {
          id: '1',
          title: 'Updated Title'
        }
      };
      
      const newState = reducer(state, action);
      
      expect(newState.toasts[0].title).toBe('Updated Title');
    });

    it('should handle DISMISS_TOAST action with specific id', () => {
      const state = {
        toasts: [{
          id: '1',
          title: 'Test Toast',
          open: true
        }]
      };
      
      const action = {
        type: 'DISMISS_TOAST' as const,
        toastId: '1'
      };
      
      const newState = reducer(state, action);
      
      expect(newState.toasts[0].open).toBe(false);
    });

    it('should handle DISMISS_TOAST action without id', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true },
          { id: '2', title: 'Toast 2', open: true }
        ]
      };
      
      const action = {
        type: 'DISMISS_TOAST' as const
      };
      
      const newState = reducer(state, action);
      
      expect(newState.toasts[0].open).toBe(false);
      expect(newState.toasts[1].open).toBe(false);
    });

    it('should handle REMOVE_TOAST action with specific id', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true },
          { id: '2', title: 'Toast 2', open: true }
        ]
      };
      
      const action = {
        type: 'REMOVE_TOAST' as const,
        toastId: '1'
      };
      
      const newState = reducer(state, action);
      
      expect(newState.toasts).toHaveLength(1);
      expect(newState.toasts[0].id).toBe('2');
    });

    it('should handle REMOVE_TOAST action without id', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true },
          { id: '2', title: 'Toast 2', open: true }
        ]
      };
      
      const action = {
        type: 'REMOVE_TOAST' as const
      };
      
      const newState = reducer(state, action);
      
      expect(newState.toasts).toHaveLength(0);
    });

    it('should limit toasts when adding beyond limit', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true }
        ]
      };
      
      const action = {
        type: 'ADD_TOAST' as const,
        toast: {
          id: '2',
          title: 'Toast 2',
          open: true
        }
      };
      
      const newState = reducer(state, action);
      
      // TOAST_LIMIT is 1, so only the new toast should remain
      expect(newState.toasts).toHaveLength(1);
      expect(newState.toasts[0].id).toBe('2');
    });
  });

  describe('genId function', () => {
    it('should generate unique ids', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.toast({ title: 'Toast 1' });
        result.current.toast({ title: 'Toast 2' });
        result.current.toast({ title: 'Toast 3' });
      });
      
      const ids = result.current.toasts.map(t => t.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
}); 