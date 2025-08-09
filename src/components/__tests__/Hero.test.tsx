import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/utils';
import Hero from '../Hero';

// Mock the image imports
vi.mock('@/assets/profile/harsh_profile_image.jpg', () => ({
  default: '/mock-profile-image.jpg'
}));

vi.mock('@/assets/resume/Harsh_SE_Resume.pdf', () => ({
  default: '/mock-resume.pdf'
}));

describe('Hero Component', () => {
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

  it('renders hero section with correct structure', () => {
    render(<Hero />);
    
    // Check main section by ID
    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toBeInTheDocument();
    
    // Check hero image (alt text may evolve; match broadly)
    const heroImage = screen.getByAltText(/Harsh Shah.*Engineer/i);
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', '/mock-profile-image.jpg');
  });

  it('displays hero content with name and title', () => {
    render(<Hero />);
    
    // Check greeting
    expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument();
    
    // Check description
    expect(screen.getByText(/Passionate about building intelligent systems/)).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<Hero />);
    
    // Check Get In Touch button
    const getInTouchButton = screen.getByRole('button', { name: /get in touch/i });
    expect(getInTouchButton).toBeInTheDocument();
    expect(getInTouchButton).toHaveTextContent('Get In Touch');
    
    // Check Download Resume link
    const downloadResumeLink = screen.getByRole('link', { name: /download resume/i });
    expect(downloadResumeLink).toBeInTheDocument();
    expect(downloadResumeLink).toHaveAttribute('href', '/mock-resume.pdf');
    expect(downloadResumeLink).toHaveAttribute('download');
  });

  it('displays statistics section', () => {
    render(<Hero />);
    
    // Check statistics
    expect(screen.getByText('1+')).toBeInTheDocument();
    expect(screen.getByText(/Years\s*Experience/i)).toBeInTheDocument();
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText(/Projects\s*Completed/i)).toBeInTheDocument();
    expect(screen.getByText('25+')).toBeInTheDocument();
    expect(screen.getByText(/Technologies/i)).toBeInTheDocument();
  });

  it('handles Get In Touch button click', async () => {
    const user = userEvent.setup();
    render(<Hero />);
    
    const getInTouchButton = screen.getByRole('button', { name: /get in touch/i });
    
    await user.click(getInTouchButton);
    
    // Should scroll to contact section
    expect(document.querySelector).toHaveBeenCalledWith('#contact');
  });

  it('handles scroll to about section', async () => {
    const user = userEvent.setup();
    render(<Hero />);
    
    // Find scroll indicator (might be hidden on mobile)
    const scrollIndicator = screen.queryByText('Scroll to explore');
    if (scrollIndicator) {
      await user.click(scrollIndicator);
      expect(document.querySelector).toHaveBeenCalledWith('#about');
    }
  });

  it('applies gradient styling to buttons', () => {
    render(<Hero />);
    
    const getInTouchButton = screen.getByRole('button', { name: /get in touch/i });
    const downloadResumeLink = screen.getByRole('link', { name: /download resume/i });
    
    // Check for gradient classes
    expect(getInTouchButton).toHaveClass('bg-gradient-to-r');
    expect(downloadResumeLink).toHaveClass('bg-gradient-to-r');
  });

  it('applies gradient styling to statistics', () => {
    render(<Hero />);
    
    const experienceStat = screen.getByText('1+');
    const projectsStat = screen.getByText('10+');
    const technologiesStat = screen.getByText('25+');
    
    // Check for gradient text classes
    expect(experienceStat).toHaveClass('text-gradient');
    expect(projectsStat).toHaveClass('text-gradient');
    expect(technologiesStat).toHaveClass('text-gradient');
  });

  it('has proper accessibility attributes', () => {
    render(<Hero />);
    
    // Check image alt text
    const heroImage = screen.getByAltText(/Harsh Shah.*Engineer/i);
    expect(heroImage).toBeInTheDocument();
    
    // Check button accessibility
    const getInTouchButton = screen.getByRole('button', { name: /get in touch/i });
    expect(getInTouchButton).toBeInTheDocument();
    
    // Check link accessibility
    const downloadResumeLink = screen.getByRole('link', { name: /download resume/i });
    expect(downloadResumeLink).toBeInTheDocument();
  });

  it('renders with responsive design classes', () => {
    render(<Hero />);
    
    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toHaveClass('min-h-screen');
    expect(heroSection).toHaveClass('pt-16');
    
    // Check grid layout
    const gridContainer = heroSection.querySelector('.grid');
    expect(gridContainer).toHaveClass('lg:grid-cols-2');
  });

  it('displays typewriter animation for name', async () => {
    render(<Hero />);
    
    // The name should be visible (typewriter effect)
    await waitFor(() => {
      expect(screen.getByText('Harsh Shah')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('displays typewriter animation for titles', async () => {
    render(<Hero />);
    
    // Check for title animation
    await waitFor(() => {
      const titleElement = screen.getByText(/Machine Learning Engineer|Data Scientist|AI Enthusiast|Python Developer/);
      expect(titleElement).toBeInTheDocument();
    }, { timeout: 5000 });
  });
}); 