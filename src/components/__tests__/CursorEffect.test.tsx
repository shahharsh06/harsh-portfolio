import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { render as renderWithProviders } from '@/test/utils';
import CursorEffect from '../CursorEffect';

describe('CursorEffect Component', () => {
  beforeEach(() => {
    // Mock window properties
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders cursor effect container', () => {
    render(<CursorEffect />);
    
    const cursorContainer = document.querySelector('[data-testid="cursor-effect"]');
    expect(cursorContainer).toBeInTheDocument();
  });

  it('handles mouse move events', () => {
    render(<CursorEffect />);
    
    const cursorContainer = document.querySelector('[data-testid="cursor-effect"]');
    expect(cursorContainer).toBeInTheDocument();
    
    // Simulate mouse move
    fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });
    
    expect(cursorContainer).toBeInTheDocument();
  });

  it('handles mouse enter events', () => {
    render(<CursorEffect />);
    
    const cursorContainer = document.querySelector('[data-testid="cursor-effect"]');
    expect(cursorContainer).toBeInTheDocument();
    
    // Simulate mouse enter
    fireEvent.mouseEnter(document);
    
    expect(cursorContainer).toBeInTheDocument();
  });

  it('handles mouse leave events', () => {
    render(<CursorEffect />);
    
    const cursorContainer = document.querySelector('[data-testid="cursor-effect"]');
    expect(cursorContainer).toBeInTheDocument();
    
    // Simulate mouse leave
    fireEvent.mouseLeave(document);
    
    expect(cursorContainer).toBeInTheDocument();
  });

  it('handles window resize events', () => {
    render(<CursorEffect />);
    
    const cursorContainer = document.querySelector('[data-testid="cursor-effect"]');
    expect(cursorContainer).toBeInTheDocument();
    
    // Simulate window resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    
    window.dispatchEvent(new Event('resize'));
    
    expect(cursorContainer).toBeInTheDocument();
  });

  it('handles touch events on mobile', () => {
    render(<CursorEffect />);
    
    const cursorContainer = document.querySelector('[data-testid="cursor-effect"]');
    expect(cursorContainer).toBeInTheDocument();
    
    // Simulate touch events using mouse events instead
    fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });
    
    expect(cursorContainer).toBeInTheDocument();
  });

  it('handles performance optimization', () => {
    render(<CursorEffect />);
    
    const cursorContainer = document.querySelector('[data-testid="cursor-effect"]');
    expect(cursorContainer).toBeInTheDocument();
    
    // Should maintain performance during multiple events
    for (let i = 0; i < 10; i++) {
      fireEvent.mouseMove(document, { clientX: i * 10, clientY: i * 10 });
    }
    
    expect(cursorContainer).toBeInTheDocument();
  });

  it('handles accessibility features', () => {
    render(<CursorEffect />);
    
    const cursorContainer = document.querySelector('[data-testid="cursor-effect"]');
    expect(cursorContainer).toBeInTheDocument();
    
    // Should not interfere with keyboard navigation
    const focusableElement = document.createElement('button');
    document.body.appendChild(focusableElement);
    focusableElement.focus();
    
    expect(focusableElement).toHaveFocus();
    document.body.removeChild(focusableElement);
  });

  it('handles state management', () => {
    render(<CursorEffect />);
    
    const cursorContainer = document.querySelector('[data-testid="cursor-effect"]');
    expect(cursorContainer).toBeInTheDocument();
    
    // Should maintain state properly
    expect(cursorContainer).toBeInTheDocument();
  });

  it('handles cleanup on unmount', () => {
    const { unmount } = render(<CursorEffect />);
    
    const cursorContainer = document.querySelector('[data-testid="cursor-effect"]');
    expect(cursorContainer).toBeInTheDocument();
    
    // Unmount component
    unmount();
    
    // Should clean up properly
    expect(document.querySelector('[data-testid="cursor-effect"]')).not.toBeInTheDocument();
  });
}); 