import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/utils';
import { GradientButton } from '../GradientButton';

describe('GradientButton Component', () => {
  it('renders button with default props', () => {
    render(<GradientButton>Click me</GradientButton>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-gradient-to-r');
    expect(button).toHaveClass('from-primary');
    expect(button).toHaveClass('to-cyan-400');
  });

  it('renders as a link when asChild is true', () => {
    render(
      <GradientButton asChild>
        <a href="/test">Test Link</a>
      </GradientButton>
    );
    
    const link = screen.getByRole('link', { name: /test link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveClass('bg-gradient-to-r');
  });

  it('applies custom className', () => {
    render(
      <GradientButton className="custom-class">
        Custom Button
      </GradientButton>
    );
    
    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('bg-gradient-to-r');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(
      <GradientButton onClick={handleClick}>
        Clickable Button
      </GradientButton>
    );
    
    const button = screen.getByRole('button', { name: /clickable button/i });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled state', () => {
    render(
      <GradientButton disabled>
        Disabled Button
      </GradientButton>
    );
    
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it('renders with children content', () => {
    render(
      <GradientButton>
        <span>Icon</span>
        Button Text
      </GradientButton>
    );
    
    const button = screen.getByRole('button', { name: /button text/i });
    expect(button).toHaveTextContent('Icon');
    expect(button).toHaveTextContent('Button Text');
  });

  it('applies hover and focus states', () => {
    render(<GradientButton>Hover Button</GradientButton>);
    
    const button = screen.getByRole('button', { name: /hover button/i });
    expect(button).toHaveClass('hover:from-primary/90');
    expect(button).toHaveClass('hover:to-cyan-400/90');
    expect(button).toHaveClass('hover-lift');
  });

  it('works with different button types', () => {
    render(
      <GradientButton type="submit">
        Submit Button
      </GradientButton>
    );
    
    const button = screen.getByRole('button', { name: /submit button/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('maintains gradient styling when disabled', () => {
    render(
      <GradientButton disabled>
        Disabled Gradient
      </GradientButton>
    );
    
    const button = screen.getByRole('button', { name: /disabled gradient/i });
    expect(button).toHaveClass('bg-gradient-to-r');
    expect(button).toHaveClass('from-primary');
    expect(button).toHaveClass('to-cyan-400');
  });

  it('renders with proper accessibility attributes', () => {
    render(
      <GradientButton aria-label="Accessible button">
        Accessible
      </GradientButton>
    );
    
    const button = screen.getByRole('button', { name: /accessible button/i });
    expect(button).toBeInTheDocument();
  });
}); 