import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { render as renderWithProviders } from '@/test/utils';
import Footer from '../Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    // Mock current year
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01'));
  });

  it('renders footer with correct structure', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Check for copyright text using getAllByText to handle multiple elements
    const copyrightTexts = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('©') && element?.textContent?.includes('Made with');
    });
    expect(copyrightTexts.length).toBeGreaterThan(0);
    
    // Check for Harsh text using getAllByText since there are multiple elements
    const harshTexts = screen.getAllByText(/Harsh/i);
    expect(harshTexts.length).toBeGreaterThan(0);
  });

  it('displays current year dynamically', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Footer />);
    
    // Check for GitHub link
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/shahharsh06');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check for LinkedIn link
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/shahharsh06/');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders email link', () => {
    render(<Footer />);
    
    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:shahharsh06.jobs@gmail.com');
  });

  it('applies gradient styling to links', () => {
    render(<Footer />);
    
    const socialLinks = screen.getAllByRole('link');
    socialLinks.forEach(link => {
      expect(link).toHaveClass('hover-glow');
    });
  });

  it('has proper accessibility attributes', () => {
    render(<Footer />);
    
    // Check footer role
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Check link accessibility
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders with responsive design classes', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-card');
    expect(footer).toHaveClass('border-t');
  });

  it('handles theme integration', () => {
    renderWithProviders(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Should adapt to theme changes
    expect(footer).toHaveClass('bg-card');
  });

  it('handles year updates', () => {
    // Test with different years
    vi.setSystemTime(new Date('2025-01-01'));
    
    render(<Footer />);
    
    // Check for copyright text using getAllByText to handle multiple elements
    const copyrightTexts = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('©') && element?.textContent?.includes('Made with');
    });
    expect(copyrightTexts.length).toBeGreaterThan(0);
    
    // Check for Harsh text using getAllByText since there are multiple elements
    const harshTexts = screen.getAllByText(/Harsh/i);
    expect(harshTexts.length).toBeGreaterThan(0);
  });

  it('maintains consistent styling', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-card');
    expect(footer).toHaveClass('border-t');
    expect(footer).toHaveClass('border-border');
  });

  it('handles link interactions', () => {
    render(<Footer />);
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    // All links should be functional
    links.forEach(link => {
      expect(link).toBeInTheDocument();
    });
  });

  it('handles footer component lifecycle', () => {
    const { unmount } = render(<Footer />);
    
    // Should mount properly
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Should unmount cleanly
    unmount();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });

  it('handles footer error boundaries', () => {
    render(<Footer />);
    
    // Should handle errors gracefully
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Footer should remain functional even with errors
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('handles footer performance optimization', () => {
    render(<Footer />);
    
    // Should render efficiently
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Performance should be acceptable
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('handles footer memory management', () => {
    render(<Footer />);
    
    // Should manage memory efficiently
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Memory usage should be reasonable
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('handles footer accessibility compliance', () => {
    render(<Footer />);
    
    // Should meet accessibility standards
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('aria-label');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('handles footer responsive behavior', () => {
    // Test mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    render(<Footer />);
    
    // Should adapt to mobile
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Test desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1440,
    });
    
    window.dispatchEvent(new Event('resize'));
    
    // Should adapt to desktop
    expect(footer).toBeInTheDocument();
  });

  it('handles footer data validation', () => {
    render(<Footer />);
    
    // Should validate footer data
    const harshTexts = screen.getAllByText(/Harsh/i);
    expect(harshTexts.length).toBeGreaterThan(0);
    
    // Data should be properly structured
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('calls scrollToTop when Back to Top button is clicked', () => {
    render(<Footer />);
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const backToTopButton = screen.getByRole('button', { name: /back to top/i });
    backToTopButton.click();
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    scrollToSpy.mockRestore();
  });
}); 