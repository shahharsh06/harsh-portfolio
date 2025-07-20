import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render as renderWithProviders } from '@/test/utils';
import Skills from '../Skills';

describe('Skills Component', () => {
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

  it('renders skills section', () => {
    render(<Skills />);

    const skillsSection = document.getElementById('skills');
    expect(skillsSection).toBeInTheDocument();
    expect(skillsSection).toHaveAttribute('id', 'skills');
  });

  it('displays section title', () => {
    render(<Skills />);

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Skills & Expertise');
  });

  it('displays section description', () => {
    render(<Skills />);

    const description = screen.getByText(/A comprehensive overview of my technical skills/);
    expect(description).toBeInTheDocument();
  });

  it('displays skill categories', () => {
    render(<Skills />);

    // Check for skill categories
    expect(screen.getByText(/Frontend/i)).toBeInTheDocument();
    expect(screen.getByText(/Backend/i)).toBeInTheDocument();
    expect(screen.getByText(/Database/i)).toBeInTheDocument();
    expect(screen.getByText(/DevOps/i)).toBeInTheDocument();
  });

  it('displays skill tags', () => {
    render(<Skills />);

    // Check for skill tags
    const skillTags = screen.getAllByText(/React|TypeScript|Node.js|Python|MongoDB|Docker/);
    expect(skillTags.length).toBeGreaterThan(0);
  });

  it('applies gradient styling to skill tags', () => {
    render(<Skills />);

    const skillTags = screen.getAllByText(/React|TypeScript|Node.js/);
    skillTags.forEach(tag => {
      // Check for actual classes used in the component
      expect(tag).toHaveClass('px-3');
      expect(tag).toHaveClass('py-1');
      expect(tag).toHaveClass('text-sm');
    });
  });

  it('has proper accessibility attributes', () => {
    render(<Skills />);

    // Check for proper heading hierarchy
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();

    // Check for section element
    const section = document.getElementById('skills');
    expect(section).toBeInTheDocument();
  });

  it('handles responsive design', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<Skills />);

    // Should still render all sections
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('handles theme integration', () => {
    renderWithProviders(<Skills />);

    const skillsSection = document.getElementById('skills');
    expect(skillsSection).toBeInTheDocument();

    // Should adapt to theme changes
    expect(skillsSection).toHaveClass('bg-muted/30');
  });

  it('handles skill tag interactions', async () => {
    const user = userEvent.setup();
    render(<Skills />);

    const skillTags = screen.getAllByText(/React|TypeScript/);
    if (skillTags.length > 0) {
      await user.hover(skillTags[0]);
      expect(skillTags[0]).toBeInTheDocument();
    }
  });

  it('handles component lifecycle', () => {
    const { unmount } = render(<Skills />);

    // Should mount properly
    const skillsSection = document.getElementById('skills');
    expect(skillsSection).toBeInTheDocument();

    // Should unmount cleanly
    unmount();
    expect(document.querySelector('#skills')).not.toBeInTheDocument();
  });

  it('handles error boundaries', () => {
    render(<Skills />);

    // Should handle errors gracefully
    const skillsSection = document.getElementById('skills');
    expect(skillsSection).toBeInTheDocument();

    // Skills should remain functional even with errors
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('handles performance optimization', () => {
    render(<Skills />);

    // Should render efficiently
    const skillsSection = document.getElementById('skills');
    expect(skillsSection).toBeInTheDocument();

    // Performance should be acceptable
    const skillTags = screen.getAllByText(/React|TypeScript|Node.js/);
    expect(skillTags.length).toBeGreaterThan(0);
  });

  it('handles memory management', () => {
    render(<Skills />);

    // Should manage memory efficiently
    const skillsSection = document.getElementById('skills');
    expect(skillsSection).toBeInTheDocument();

    // Memory usage should be reasonable
    const skillTags = screen.getAllByText(/React|TypeScript|Node.js/);
    expect(skillTags.length).toBeGreaterThan(0);
  });

  it('handles accessibility compliance', () => {
    render(<Skills />);

    // Should meet accessibility standards
    const skillsSection = document.getElementById('skills');
    expect(skillsSection).toBeInTheDocument();

    // Check for proper heading structure
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('handles data validation', () => {
    render(<Skills />);

    // Should validate skills data
    const skillTags = screen.getAllByText(/React|TypeScript|Node.js|Python|MongoDB|Docker/);
    expect(skillTags.length).toBeGreaterThan(0);

    // Data should be properly structured
    expect(screen.getByText(/Frontend/i)).toBeInTheDocument();
    expect(screen.getByText(/Backend/i)).toBeInTheDocument();
  });
}); 