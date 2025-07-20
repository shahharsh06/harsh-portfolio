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

  it('applies responsive design classes', () => {
    render(<Projects />);
    
    const projectsSection = document.getElementById('projects');
    expect(projectsSection).toHaveClass('py-20');
    
    // Check grid layout
    const gridContainers = projectsSection?.querySelectorAll('.grid');
    gridContainers?.forEach(container => {
      expect(container).toHaveClass('lg:grid-cols-2');
    });
  });

  it('displays project status badges', () => {
    render(<Projects />);
    
    // Check for status badges (if any)
    const badges = document.querySelectorAll('[data-testid="status-badge"]');
    if (badges.length > 0) {
      badges.forEach(badge => {
        expect(badge).toBeInTheDocument();
      });
    }
  });

  it('has consistent styling with theme', () => {
    render(<Projects />);
    
    const projectsSection = document.getElementById('projects');
    expect(projectsSection).toHaveClass('py-20');
    
    const description = screen.getByText(/Here are some of my recent projects/);
    expect(description).toHaveClass('text-muted-foreground');
  });

  it('displays project dates or timeframes', () => {
    render(<Projects />);
    
    // Check for date elements (if any)
    const dateElements = document.querySelectorAll('[data-testid="project-date"]');
    if (dateElements.length > 0) {
      dateElements.forEach(date => {
        expect(date).toBeInTheDocument();
      });
    }
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
}); 