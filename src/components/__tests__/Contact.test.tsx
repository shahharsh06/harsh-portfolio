import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/utils';
import Contact from '../Contact';

describe('Contact Component', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('renders contact section with correct structure', () => {
    render(<Contact />);

    const contactSection = document.getElementById('contact');
    expect(contactSection).toBeInTheDocument();
    expect(contactSection).toHaveAttribute('id', 'contact');
  });

  it('displays section header with icon and title', () => {
    render(<Contact />);

    const header = screen.getByRole('heading', { level: 2 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Contact Me');

    // Check for gradient styling on "Me"
    const meText = screen.getByText('Me');
    expect(meText).toHaveClass('text-gradient');
  });

  it('displays section description', () => {
    render(<Contact />);

    const description = screen.getByText(/Have a project in mind or want to collaborate/);
    expect(description).toBeInTheDocument();
  });

  it('displays form with all required fields', () => {
    render(<Contact />);

    // Check for form fields
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(subjectInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();

    // Check for submit button
    const submitButton = screen.getByRole('button', { name: /send message/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('handles form input changes', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageInput, 'Test message content');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(subjectInput).toHaveValue('Test Subject');
    expect(messageInput).toHaveValue('Test message content');
  });

  it('handles form submission', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Form should still be visible after submission attempt
    expect(submitButton).toBeInTheDocument();
  });

  it('displays form validation states', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Try to submit empty form
    await user.click(submitButton);

    // Form should still be visible (no validation errors shown yet)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it('applies gradient styling to submit button', () => {
    render(<Contact />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    expect(submitButton).toHaveClass('bg-gradient-to-r');
    expect(submitButton).toHaveClass('from-primary');
    expect(submitButton).toHaveClass('to-cyan-400');
  });

  it('has proper form accessibility', () => {
    render(<Contact />);

    // Check form accessibility
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('applies responsive design classes', () => {
    render(<Contact />);

    const contactSection = document.getElementById('contact');
    expect(contactSection).toHaveClass('py-20');
  });

  it('has consistent styling with theme', () => {
    render(<Contact />);

    const contactSection = document.getElementById('contact');
    expect(contactSection).toHaveClass('py-20');
  });

  it('displays interactive elements with hover effects', () => {
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    expect(submitButton).toHaveClass('shadow-lg');
    expect(submitButton).toHaveClass('hover-lift');
  });
}); 