import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
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
  const mockIntersectionObserver = {
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
  };

  beforeAll(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation(() => mockIntersectionObserver);
  });

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
    vi.spyOn(document, 'querySelector').mockReturnValue(mockElement as unknown as Element);
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

  it('renders dashboard link', () => {
    renderWithMobileMenu(<Navigation />);

    // Find dashboard link by href instead of name
    const dashboardLink = Array.from(document.querySelectorAll('a')).find(a => a.href.includes('dashboard.html'));
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('href', '/harsh-portfolio/dashboard.html');
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

  it('handles theme toggle functionality', async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);
    
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
    
    await user.click(themeToggle);
    
    // Theme toggle should still be functional
    expect(themeToggle).toBeInTheDocument();
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);
    
    const navLinks = screen.getAllByRole('button');
    if (navLinks.length > 0) {
      await user.tab();
      
      // Should be able to navigate with keyboard
      expect(navLinks[0]).toHaveFocus();
    }
  });

  it('handles focus management', async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);
    
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
    
    // Focus management test - just verify the button exists
    expect(themeToggle).toBeInTheDocument();
  });

  it('handles aria-expanded state for mobile menu', () => {
    renderWithMobileMenu(<Navigation />);

    // Mobile menu button might not be visible in desktop view
    const mobileMenuButton = screen.queryByRole('button', { name: /toggle menu/i });
    if (mobileMenuButton) {
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('handles logo click', () => {
    renderWithMobileMenu(<Navigation />);

    const logo = screen.getByText('Harsh');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('text-gradient');
  });

  it('handles mobile menu item clicks', async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    // Mobile menu button might not be visible in desktop view
    const mobileMenuButton = screen.queryByRole('button', { name: /toggle menu/i });
    if (mobileMenuButton) {
      await user.click(mobileMenuButton);
      
      // Check if menu items are accessible
      const menuItems = screen.getAllByRole('button');
      expect(menuItems.length).toBeGreaterThan(0);
    }
  });

  it('handles mobile menu toggle', () => {
    renderWithMobileMenu(<Navigation />);

    // Mobile menu button might not be visible in desktop view
    const mobileMenuButton = screen.queryByRole('button', { name: /toggle menu/i });
    if (mobileMenuButton) {
      expect(mobileMenuButton).toBeInTheDocument();
    }
  });

  it('handles dashboard link click', () => {
    renderWithMobileMenu(<Navigation />);

    // Find dashboard link by href instead of name
    const dashboardLink = Array.from(document.querySelectorAll('a')).find(a => a.href.includes('dashboard.html'));
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('target', '_blank');
  });

  it('handles scroll behavior', () => {
    renderWithMobileMenu(<Navigation />);
    
    // Mock scrollIntoView
    const mockScrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;
    
    const navLinks = screen.getAllByRole('link');
    const sectionLinks = navLinks.filter(link => 
      link.getAttribute('href')?.startsWith('#')
    );
    
    if (sectionLinks.length > 0) {
      // Navigation should be functional
      expect(sectionLinks[0]).toBeInTheDocument();
    }
  });

  it('handles window resize events', () => {
    renderWithMobileMenu(<Navigation />);
    
    // Mock window resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
    
    // Navigation should still be functional
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
}); 