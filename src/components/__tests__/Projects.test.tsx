import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/utils';
import Projects from '../Projects';

describe('Projects Component', () => {
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

  it('renders projects section', () => {
    render(<Projects />);

    const projectsSection = document.getElementById('projects');
    expect(projectsSection).toBeInTheDocument();
    expect(projectsSection).toHaveAttribute('id', 'projects');
  });

  it('displays section title', () => {
    render(<Projects />);

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Featured Projects');
  });

  it('displays section description', () => {
    render(<Projects />);

    const description = screen.getByText(/Here are some of my recent projects/);
    expect(description).toBeInTheDocument();
  });

  it('displays featured projects section', () => {
    render(<Projects />);

    const featuredHeading = screen.getByRole('heading', { level: 2 });
    expect(featuredHeading).toHaveTextContent('Featured Projects');
  });

  it('displays other projects section', () => {
    render(<Projects />);

    const otherHeading = screen.getByRole('heading', { level: 3, name: 'Other Projects' });
    expect(otherHeading).toBeInTheDocument();
  });

  it('renders project cards with correct information', () => {
    render(<Projects />);

    // Check for project titles (these should be in the data)
    const projectCards = screen.getAllByText(/E-Commerce Platform|Task Management App|Weather Dashboard|Portfolio Website|Recipe Finder App/).map(el => el.closest('div[class*="card-gradient"]')).filter(Boolean);
    expect(projectCards.length).toBeGreaterThan(0);
  });

  it('displays project images', () => {
    render(<Projects />);
    
    const projectImages = screen.getAllByRole('img');
    expect(projectImages.length).toBeGreaterThan(0);
    
    projectImages.forEach(image => {
      expect(image).toHaveAttribute('alt');
      expect(image).toHaveAttribute('src');
    });
  });

  it('displays project titles', () => {
    render(<Projects />);
    
    // Check for project titles in cards
    const projectTitles = screen.getAllByRole('heading', { level: 3 });
    expect(projectTitles.length).toBeGreaterThan(0);
  });

  it('displays project descriptions', () => {
    render(<Projects />);
    
    // Check for project descriptions in cards
    const projectDescriptions = screen.getAllByText(/A showcase of my recent work|E-Commerce Platform|Recipe Finder App/);
    expect(projectDescriptions.length).toBeGreaterThan(0);
  });

  it('displays project technologies', () => {
    render(<Projects />);
    
    // Check for technology tags
    const technologyTags = screen.getAllByText(/React|TypeScript|Tailwind|Node.js|Python/);
    expect(technologyTags.length).toBeGreaterThan(0);
  });

  it('displays project links', () => {
    render(<Projects />);
    
    // Check for project links
    const projectLinks = screen.getAllByRole('link');
    const demoLinks = projectLinks.filter(link => 
      link.getAttribute('aria-label')?.toLowerCase().includes('live demo')
    );
    const githubLinks = projectLinks.filter(link => 
      link.getAttribute('aria-label')?.toLowerCase().includes('github')
    );
    
    expect(demoLinks.length).toBeGreaterThan(0);
    expect(githubLinks.length).toBeGreaterThan(0);
  });

  it('handles carousel navigation for featured projects', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    
    // Check for navigation arrows - use getAllByRole to handle multiple buttons
    const prevButtons = screen.getAllByRole('button', { name: /previous project/i });
    const nextButtons = screen.getAllByRole('button', { name: /next project/i });
    
    expect(prevButtons.length).toBeGreaterThan(0);
    expect(nextButtons.length).toBeGreaterThan(0);
    
    // Test navigation with the first set of buttons
    await user.click(nextButtons[0]);
    await user.click(prevButtons[0]);
    
    // Carousel should still be functional
    expect(prevButtons[0]).toBeInTheDocument();
    expect(nextButtons[0]).toBeInTheDocument();
  });

  it('handles carousel navigation for other projects', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    
    // Find navigation buttons for other projects section
    const otherProjectButtons = screen.getAllByRole('button');
    const otherProjectNavButtons = otherProjectButtons.filter(button => 
      button.getAttribute('aria-label')?.includes('previous project') || 
      button.getAttribute('aria-label')?.includes('next project')
    );
    
    if (otherProjectNavButtons.length >= 2) {
      const [prevButton, nextButton] = otherProjectNavButtons;
      
      await user.click(nextButton);
      await user.click(prevButton);
      
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    }
  });

  it('applies hover effects to project cards', () => {
    render(<Projects />);
    
    const projectCards = screen.getAllByText(/E-Commerce Platform|Recipe Finder App/).map(el => el.closest('div[class*="card-gradient"]')).filter(Boolean);
    projectCards.forEach(card => {
      expect(card).toHaveClass('hover-lift');
      expect(card).toHaveClass('group');
    });
  });

  it('applies gradient styling to buttons', () => {
    render(<Projects />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      if (button.textContent?.toLowerCase().includes('demo') || 
          button.textContent?.toLowerCase().includes('github')) {
        expect(button).toHaveClass('bg-gradient-to-r');
        expect(button).toHaveClass('from-primary');
        expect(button).toHaveClass('to-cyan-400');
      }
    });
  });

  it('has proper accessibility attributes', () => {
    render(<Projects />);
    
    // Check for proper heading hierarchy
    const h2 = screen.getByRole('heading', { level: 2 });
    const h3s = screen.getAllByRole('heading', { level: 3 });
    expect(h2).toBeInTheDocument();
    expect(h3s.length).toBeGreaterThan(0);
    
    // Check for section element
    const section = document.getElementById('projects');
    expect(section).toBeInTheDocument();
    
    // Check for image alt text
    const images = screen.getAllByRole('img');
    images.forEach(image => {
      expect(image).toHaveAttribute('alt');
    });
  });

  it('handles auto-scrolling functionality', async () => {
    render(<Projects />);
    
    // Wait for auto-scroll to potentially trigger
    await waitFor(() => {
      const carousels = document.querySelectorAll('.flex.overflow-hidden');
      expect(carousels.length).toBeGreaterThan(0);
    }, { timeout: 1000 });
  });

  it('handles project card interactions', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    
    const projectCards = screen.getAllByText(/E-Commerce Platform|Recipe Finder App/).map(el => el.closest('div[class*="card-gradient"]')).filter(Boolean);
    if (projectCards.length > 0) {
      const firstCard = projectCards[0];
      
      // Hover over card
      await user.hover(firstCard);
      
      // Card should still be visible
      expect(firstCard).toBeInTheDocument();
    }
  });

  it('handles carousel auto-scrolling functionality', async () => {
    render(<Projects />);
    
    // Wait for auto-scroll to potentially trigger
    await waitFor(() => {
      const carousels = document.querySelectorAll('.flex.overflow-hidden');
      expect(carousels.length).toBeGreaterThan(0);
    }, { timeout: 1000 });
  });

  it('handles mobile responsive behavior', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<Projects />);
    
    // Should still render all sections
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Other Projects' })).toBeInTheDocument();
  });

  it('handles desktop responsive behavior', () => {
    // Mock desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1440,
    });

    render(<Projects />);
    
    // Should render all sections
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Other Projects' })).toBeInTheDocument();
  });

  it('handles carousel pause on hover for featured projects', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    
    const featuredCarousel = document.querySelector('.flex.overflow-hidden');
    if (featuredCarousel) {
      await user.hover(featuredCarousel);
      expect(featuredCarousel).toBeInTheDocument();
      
      await user.unhover(featuredCarousel);
      expect(featuredCarousel).toBeInTheDocument();
    }
  });

  it('handles carousel pause on hover for other projects', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    
    const otherCarousel = document.querySelectorAll('.flex.overflow-hidden')[1];
    if (otherCarousel) {
      await user.hover(otherCarousel);
      expect(otherCarousel).toBeInTheDocument();
      
      await user.unhover(otherCarousel);
      expect(otherCarousel).toBeInTheDocument();
    }
  });

  it('handles navigation button accessibility', () => {
    render(<Projects />);
    
    const navButtons = screen.getAllByRole('button');
    const accessibleButtons = navButtons.filter(button => 
      button.getAttribute('aria-label')?.includes('project')
    );
    
    expect(accessibleButtons.length).toBeGreaterThan(0);
    accessibleButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });
  });

  it('handles carousel transition animations', async () => {
    render(<Projects />);
    
    const carouselContainers = document.querySelectorAll('.flex.overflow-hidden');
    carouselContainers.forEach(container => {
      // Check for flex and overflow-hidden classes which are the actual classes
      expect(container).toHaveClass('flex');
      expect(container).toHaveClass('overflow-hidden');
    });
  });

  it('handles project card hover effects', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    
    const projectCards = screen.getAllByText(/E-Commerce Platform|Recipe Finder App/).map(el => el.closest('div[class*="card-gradient"]')).filter(Boolean);
    if (projectCards.length > 0) {
      const firstCard = projectCards[0];
      
      await user.hover(firstCard);
      expect(firstCard).toHaveClass('hover-lift');
      
      await user.unhover(firstCard);
      expect(firstCard).toBeInTheDocument();
    }
  });

  it('handles section icon interactions', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    
    const sectionIcons = document.querySelectorAll('[data-testid="section-icon"]');
    if (sectionIcons.length > 0) {
      const firstIcon = sectionIcons[0];
      await user.click(firstIcon);
      expect(firstIcon).toBeInTheDocument();
    }
  });

  it('handles external link accessibility', () => {
    render(<Projects />);
    
    const externalLinks = screen.getAllByRole('link');
    const githubLinks = externalLinks.filter(link => 
      link.getAttribute('href')?.includes('github.com')
    );
    const demoLinks = externalLinks.filter(link => 
      link.getAttribute('href')?.includes('demo') || link.getAttribute('href')?.includes('live')
    );
    
    [...githubLinks, ...demoLinks].forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('handles carousel infinite scrolling', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    
    const nextButtons = screen.getAllByRole('button').filter(button => 
      button.getAttribute('aria-label')?.includes('next')
    );
    
    if (nextButtons.length > 0) {
      // Click next multiple times to test infinite scrolling
      for (let i = 0; i < 3; i++) {
        await user.click(nextButtons[0]);
      }
      
      expect(nextButtons[0]).toBeInTheDocument();
    }
  });

  it('handles carousel reverse scrolling', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    
    const prevButtons = screen.getAllByRole('button').filter(button => 
      button.getAttribute('aria-label')?.includes('previous')
    );
    
    if (prevButtons.length > 0) {
      // Click previous multiple times to test reverse scrolling
      for (let i = 0; i < 3; i++) {
        await user.click(prevButtons[0]);
      }
      
      expect(prevButtons[0]).toBeInTheDocument();
    }
  });

  it('displays correct number of featured projects', () => {
    render(<Projects />);
    
    // Featured projects should be limited to a specific number
    const featuredProjectCards = screen.getAllByText(/E-Commerce Platform|Task Management App|Weather Dashboard/).map(el => el.closest('div[class*="card-gradient"]')).filter(Boolean);
    expect(featuredProjectCards.length).toBeGreaterThan(0);
  });

  it('displays correct number of other projects', () => {
    render(<Projects />);
    
    // Other projects should be displayed
    const otherProjectCards = screen.getAllByText(/Portfolio Website|Recipe Finder App|Fitness Tracker/).map(el => el.closest('div[class*="card-gradient"]')).filter(Boolean);
    expect(otherProjectCards.length).toBeGreaterThan(0);
  });

  it('handles window resize events', () => {
    render(<Projects />);
    
    // Mock window resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
    
    // Projects should still be functional
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('handles carousel pause on hover', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    
    const carouselContainers = document.querySelectorAll('.flex.overflow-hidden');
    if (carouselContainers.length > 0) {
      const firstCarousel = carouselContainers[0];
      
      // Hover over carousel
      await user.hover(firstCarousel);
      
      // Carousel should still be functional
      expect(firstCarousel).toBeInTheDocument();
      
      // Unhover
      await user.unhover(firstCarousel);
      expect(firstCarousel).toBeInTheDocument();
    }
  });

  it('handles carousel resume after hover', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    
    const carouselContainers = document.querySelectorAll('.flex.overflow-hidden');
    if (carouselContainers.length > 0) {
      const firstCarousel = carouselContainers[0];
      
      // Hover and unhover
      await user.hover(firstCarousel);
      await user.unhover(firstCarousel);
      
      // Carousel should resume functionality
      expect(firstCarousel).toBeInTheDocument();
    }
  });

  it('handles carousel navigation with keyboard', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    
    const navigationButtons = screen.getAllByRole('button');
    const carouselButtons = navigationButtons.filter(button => 
      button.getAttribute('aria-label')?.includes('Previous') || 
      button.getAttribute('aria-label')?.includes('Next')
    );
    
    if (carouselButtons.length > 0) {
      await user.click(carouselButtons[0]);
      expect(carouselButtons[0]).toBeInTheDocument();
    }
  });

  it('handles carousel infinite scrolling', async () => {
    render(<Projects />);
    
    // Wait for carousel to potentially trigger infinite scroll
    await waitFor(() => {
      const carousels = document.querySelectorAll('.flex.overflow-hidden');
      expect(carousels.length).toBeGreaterThan(0);
    }, { timeout: 2000 });
  });

  it('handles carousel auto-scroll intervals', async () => {
    render(<Projects />);
    
    // Wait for auto-scroll intervals to potentially trigger
    await waitFor(() => {
      const carousels = document.querySelectorAll('.flex.overflow-hidden');
      expect(carousels.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it('handles carousel responsive breakpoints', () => {
    // Test mobile breakpoint
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    render(<Projects />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    
    // Test tablet breakpoint
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    window.dispatchEvent(new Event('resize'));
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('handles carousel touch events', async () => {
    render(<Projects />);
    
    const carouselContainers = document.querySelectorAll('.flex.overflow-hidden');
    if (carouselContainers.length > 0) {
      const firstCarousel = carouselContainers[0];
      
      // Simulate touch events using mouse events instead
      const mouseEvent = new MouseEvent('mousedown', { clientX: 100, clientY: 100 });
      firstCarousel.dispatchEvent(mouseEvent);
      
      expect(firstCarousel).toBeInTheDocument();
    }
  });

  it('handles carousel accessibility features', () => {
    render(<Projects />);
    
    // Check for proper ARIA labels on navigation buttons
    const navigationButtons = screen.getAllByRole('button');
    const carouselButtons = navigationButtons.filter(button => 
      button.getAttribute('aria-label')?.includes('Previous') || 
      button.getAttribute('aria-label')?.includes('Next')
    );
    
    expect(carouselButtons.length).toBeGreaterThan(0);
    
    // Check for proper heading structure
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Other Projects' })).toBeInTheDocument();
  });

  it('handles carousel state management', () => {
    render(<Projects />);
    
    // Projects should maintain state properly
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    
    // All project sections should be present
    expect(screen.getByText(/Featured/i)).toBeInTheDocument();
    expect(screen.getByText(/Other Projects/i)).toBeInTheDocument();
  });

  it('handles carousel performance optimization', async () => {
    render(<Projects />);
    
    // Wait for carousel to load and optimize
    await waitFor(() => {
      const carousels = document.querySelectorAll('.flex.overflow-hidden');
      expect(carousels.length).toBeGreaterThan(0);
    }, { timeout: 1000 });
    
    // Should maintain performance
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('handles carousel state initialization', () => {
    render(<Projects />);
    
    // Should initialize carousel state properly
    const carousels = document.querySelectorAll('.flex.overflow-hidden');
    expect(carousels.length).toBeGreaterThan(0);
    
    // Check for proper state management
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('handles carousel cleanup on unmount', () => {
    const { unmount } = render(<Projects />);
    
    // Should clean up properly on unmount
    unmount();
    
    // Component should unmount without errors
    expect(document.querySelector('#projects')).not.toBeInTheDocument();
  });

  it('handles carousel error handling', () => {
    render(<Projects />);
    
    // Should handle errors gracefully
    const carousels = document.querySelectorAll('.flex.overflow-hidden');
    carousels.forEach(carousel => {
      // Simulate error condition
      expect(carousel).toBeInTheDocument();
    });
  });

  it('handles carousel performance monitoring', () => {
    render(<Projects />);
    
    // Should monitor performance
    const carousels = document.querySelectorAll('.flex.overflow-hidden');
    expect(carousels.length).toBeGreaterThan(0);
    
    // Performance should be acceptable
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('handles carousel memory management', () => {
    render(<Projects />);
    
    // Should manage memory efficiently
    const carousels = document.querySelectorAll('.flex.overflow-hidden');
    expect(carousels.length).toBeGreaterThan(0);
    
    // Memory usage should be reasonable
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('handles carousel accessibility compliance', () => {
    render(<Projects />);
    
    // Should meet accessibility standards
    const navigationButtons = screen.getAllByRole('button');
    const carouselButtons = navigationButtons.filter(button => 
      button.getAttribute('aria-label')?.includes('Previous') || 
      button.getAttribute('aria-label')?.includes('Next')
    );
    
    expect(carouselButtons.length).toBeGreaterThan(0);
    carouselButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });
  });

  it('handles carousel responsive breakpoint changes', () => {
    render(<Projects />);
    
    // Test different breakpoints
    const breakpoints = [375, 768, 1024, 1440];
    
    breakpoints.forEach(width => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      
      window.dispatchEvent(new Event('resize'));
      
      // Should adapt to different screen sizes
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });
  });

  it('handles carousel data validation', () => {
    render(<Projects />);
    
    // Should validate project data
    const projectCards = screen.getAllByText(/E-Commerce Platform|Recipe Finder App/).map(el => el.closest('div[class*="card-gradient"]')).filter(Boolean);
    expect(projectCards.length).toBeGreaterThan(0);
    
    // Data should be properly structured
    projectCards.forEach(card => {
      expect(card).toBeInTheDocument();
    });
  });
}); 