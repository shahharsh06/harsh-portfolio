import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/utils';
import Navigation from '../Navigation';
import { MobileMenuProvider } from '../MobileMenuContext';

// Custom render function that includes the MobileMenuProvider
const renderWithMobileMenu = (component: React.ReactElement) => {
  return render(
    <MobileMenuProvider>
      {component}
    </MobileMenuProvider>
  );
};

describe('Navigation Component', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Object.defineProperty(window, 'scrollIntoView', {
      writable: true,
      value: vi.fn(),
    });
    
    // Mock document.querySelector
    const mockElement = {
      scrollIntoView: vi.fn(),
    };
    vi.spyOn(document, 'querySelector').mockReturnValue(mockElement as any);
    
    // Mock IntersectionObserver
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('renders navigation with logo', () => {
    renderWithMobileMenu(<Navigation />);
    
    const logo = screen.getByText('Harsh');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('text-gradient');
  });

  it('displays desktop navigation items', () => {
    renderWithMobileMenu(<Navigation />);
    
    const navItems = [
      'Home',
      'About', 
      'Skills',
      'Career & Education',
      'Projects',
      'Contact'
    ];
    
    navItems.forEach(item => {
      const navButton = screen.getByRole('button', { name: new RegExp(item, 'i') });
      expect(navButton).toBeInTheDocument();
    });
  });

  it('handles navigation item clicks', async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);
    
    const aboutButton = screen.getByRole('button', { name: /about/i });
    await user.click(aboutButton);
    
    expect(document.querySelector).toHaveBeenCalledWith('#about');
  });

  it('displays theme toggle in desktop view', () => {
    renderWithMobileMenu(<Navigation />);
    
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it('displays social links in desktop view', () => {
    renderWithMobileMenu(<Navigation />);
    
    // Check GitHub link by href
    const github = Array.from(document.querySelectorAll('a')).find(a => a.href.includes('github.com'));
    expect(github).toBeInTheDocument();
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check LinkedIn link by href
    const linkedin = Array.from(document.querySelectorAll('a')).find(a => a.href.includes('linkedin.com'));
    expect(linkedin).toBeInTheDocument();
    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays dashboard link in desktop view', () => {
    renderWithMobileMenu(<Navigation />);
    
    // Check dashboard link by href
    const dashboard = Array.from(document.querySelectorAll('a')).find(a => a.href.includes('dashboard.html'));
    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toHaveAttribute('href', '/harsh-portfolio/dashboard.html');
    expect(dashboard).toHaveAttribute('target', '_blank');
    expect(dashboard).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies scroll-based styling', () => {
    renderWithMobileMenu(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('fixed');
    expect(nav).toHaveClass('top-0');
    expect(nav).toHaveClass('z-50');
  });

  it('has proper accessibility attributes', () => {
    renderWithMobileMenu(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Check for proper heading
    const logo = screen.getByText('Harsh');
    expect(logo).toBeInTheDocument();
  });

  it('applies hover effects to navigation items', () => {
    renderWithMobileMenu(<Navigation />);
    
    const navItems = screen.getAllByRole('button');
    navItems.forEach(item => {
      if (item.textContent?.match(/Home|About|Skills|Career|Projects|Contact/)) {
        expect(item).toHaveClass('hover:text-primary');
      }
    });
  });

  it('applies hover effects to social links', () => {
    renderWithMobileMenu(<Navigation />);
    
    const socialLinks = screen.getAllByRole('link');
    socialLinks.forEach(link => {
      if (link.getAttribute('aria-label')?.includes('GitHub') || 
          link.getAttribute('aria-label')?.includes('LinkedIn')) {
        expect(link).toHaveClass('hover-glow');
      }
    });
  });
}); 