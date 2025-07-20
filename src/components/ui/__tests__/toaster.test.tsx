import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toaster } from '../toaster';
import { useToast } from '@/hooks/use-toast';

// Mock the useToast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: vi.fn()
}));

// Mock the toast components
vi.mock('@/components/ui/toast', () => ({
  Toast: ({ children, ...props }: any) => <div data-testid="toast" {...props}>{children}</div>,
  ToastClose: () => <button data-testid="toast-close">Close</button>,
  ToastDescription: ({ children }: any) => <div data-testid="toast-description">{children}</div>,
  ToastProvider: ({ children }: any) => <div data-testid="toast-provider">{children}</div>,
  ToastTitle: ({ children }: any) => <div data-testid="toast-title">{children}</div>,
  ToastViewport: () => <div data-testid="toast-viewport">Viewport</div>,
}));

describe('Toaster Component', () => {
  const mockUseToast = useToast as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without toasts', () => {
    mockUseToast.mockReturnValue({
      toasts: [],
      toast: vi.fn(),
      dismiss: vi.fn()
    });

    render(<Toaster />);
    
    expect(screen.getByTestId('toast-provider')).toBeInTheDocument();
    expect(screen.getByTestId('toast-viewport')).toBeInTheDocument();
    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
  });

  it('renders a single toast with title only', () => {
    mockUseToast.mockReturnValue({
      toasts: [{
        id: '1',
        title: 'Test Toast',
        open: true
      }],
      toast: vi.fn(),
      dismiss: vi.fn()
    });

    render(<Toaster />);
    
    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.getByTestId('toast-title')).toHaveTextContent('Test Toast');
    expect(screen.queryByTestId('toast-description')).not.toBeInTheDocument();
    expect(screen.getByTestId('toast-close')).toBeInTheDocument();
  });

  it('renders a toast with title and description', () => {
    mockUseToast.mockReturnValue({
      toasts: [{
        id: '1',
        title: 'Test Toast',
        description: 'Test Description',
        open: true
      }],
      toast: vi.fn(),
      dismiss: vi.fn()
    });

    render(<Toaster />);
    
    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.getByTestId('toast-title')).toHaveTextContent('Test Toast');
    expect(screen.getByTestId('toast-description')).toHaveTextContent('Test Description');
    expect(screen.getByTestId('toast-close')).toBeInTheDocument();
  });

  it('renders a toast with description only', () => {
    mockUseToast.mockReturnValue({
      toasts: [{
        id: '1',
        description: 'Test Description',
        open: true
      }],
      toast: vi.fn(),
      dismiss: vi.fn()
    });

    render(<Toaster />);
    
    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.queryByTestId('toast-title')).not.toBeInTheDocument();
    expect(screen.getByTestId('toast-description')).toHaveTextContent('Test Description');
    expect(screen.getByTestId('toast-close')).toBeInTheDocument();
  });

  it('renders a toast with action', () => {
    const mockAction = <button data-testid="toast-action">Action</button>;
    
    mockUseToast.mockReturnValue({
      toasts: [{
        id: '1',
        title: 'Test Toast',
        action: mockAction,
        open: true
      }],
      toast: vi.fn(),
      dismiss: vi.fn()
    });

    render(<Toaster />);
    
    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.getByTestId('toast-title')).toHaveTextContent('Test Toast');
    expect(screen.getByTestId('toast-action')).toBeInTheDocument();
    expect(screen.getByTestId('toast-close')).toBeInTheDocument();
  });

  it('renders multiple toasts', () => {
    mockUseToast.mockReturnValue({
      toasts: [
        {
          id: '1',
          title: 'Toast 1',
          open: true
        },
        {
          id: '2',
          title: 'Toast 2',
          description: 'Description 2',
          open: true
        }
      ],
      toast: vi.fn(),
      dismiss: vi.fn()
    });

    render(<Toaster />);
    
    const toasts = screen.getAllByTestId('toast');
    expect(toasts).toHaveLength(2);
    
    expect(screen.getByText('Toast 1')).toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('passes additional props to toast', () => {
    mockUseToast.mockReturnValue({
      toasts: [{
        id: '1',
        title: 'Test Toast',
        open: true,
        variant: 'destructive',
        className: 'custom-class'
      }],
      toast: vi.fn(),
      dismiss: vi.fn()
    });

    render(<Toaster />);
    
    const toast = screen.getByTestId('toast');
    expect(toast).toHaveAttribute('variant', 'destructive');
    expect(toast).toHaveClass('custom-class');
  });

  it('renders toast with all properties', () => {
    const mockAction = <button data-testid="toast-action">Action</button>;
    
    mockUseToast.mockReturnValue({
      toasts: [{
        id: '1',
        title: 'Test Toast',
        description: 'Test Description',
        action: mockAction,
        open: true,
        variant: 'default',
        className: 'test-class'
      }],
      toast: vi.fn(),
      dismiss: vi.fn()
    });

    render(<Toaster />);
    
    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.getByTestId('toast-title')).toHaveTextContent('Test Toast');
    expect(screen.getByTestId('toast-description')).toHaveTextContent('Test Description');
    expect(screen.getByTestId('toast-action')).toBeInTheDocument();
    expect(screen.getByTestId('toast-close')).toBeInTheDocument();
  });

  it('handles empty title and description', () => {
    mockUseToast.mockReturnValue({
      toasts: [{
        id: '1',
        open: true
      }],
      toast: vi.fn(),
      dismiss: vi.fn()
    });

    render(<Toaster />);
    
    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.queryByTestId('toast-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('toast-description')).not.toBeInTheDocument();
    expect(screen.getByTestId('toast-close')).toBeInTheDocument();
  });

  it('handles null and undefined values', () => {
    mockUseToast.mockReturnValue({
      toasts: [{
        id: '1',
        title: null,
        description: undefined,
        open: true
      }],
      toast: vi.fn(),
      dismiss: vi.fn()
    });

    render(<Toaster />);
    
    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.queryByTestId('toast-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('toast-description')).not.toBeInTheDocument();
    expect(screen.getByTestId('toast-close')).toBeInTheDocument();
  });
}); 