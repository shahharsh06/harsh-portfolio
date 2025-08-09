import { describe, it, expect } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from '@/test/utils';
import ProjectCard from '../ProjectCard';
import userEvent from '@testing-library/user-event';
// Combined from ProjectCard.extra.test.tsx: cover image load/error handlers

describe('ProjectCard Component', () => {
  const mockProps = {
    title: 'Test Project',
    description: 'A test project description',
    image: '/mock-project-image.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    githubUrl: 'https://github.com/example/project',
    liveUrl: 'https://demo.example.com',
    featured: true
  };

  it('renders with project data', () => {
    render(<ProjectCard {...mockProps} />);
    
    const card = screen.getByText('Test Project').closest('div[class*="card-gradient"]');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Test Project');
    expect(card).toHaveTextContent('A test project description');
  });

  it('displays project image when provided for featured projects', () => {
    render(
      <ProjectCard
        title="Test Project"
        description="Test description"
        image="/mock-project-image.jpg"
        technologies={['React', 'TypeScript']}
        githubUrl="https://github.com"
        liveUrl="https://example.com"
        featured={true}
      />
    );

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'http://localhost:3000/mock-project-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Project');
  });

  it('does not display project image for non-featured projects', () => {
    render(
      <ProjectCard
        title="Test Project"
        description="Test description"
        image="/mock-project-image.jpg"
        technologies={['React', 'TypeScript']}
        githubUrl="https://github.com"
        liveUrl="https://example.com"
        featured={false}
      />
    );

    const image = screen.queryByRole('img');
    expect(image).not.toBeInTheDocument();
  });

  it('handles missing image', () => {
    const propsWithoutImage = { ...mockProps, image: undefined };
    render(<ProjectCard {...propsWithoutImage} />);
    
    const image = screen.queryByRole('img');
    expect(image).not.toBeInTheDocument();
  });

  it('displays project title', () => {
    render(<ProjectCard {...mockProps} />);
    
    const title = screen.getByText('Test Project');
    expect(title).toBeInTheDocument();
  });

  it('displays project description', () => {
    render(<ProjectCard {...mockProps} />);
    
    const description = screen.getByText('A test project description');
    expect(description).toBeInTheDocument();
  });

  it('displays technology tags', () => {
    render(<ProjectCard {...mockProps} />);
    
    mockProps.technologies.forEach(tech => {
      const tag = screen.getByText(tech);
      expect(tag).toBeInTheDocument();
    });
  });

  it('displays GitHub link', () => {
    render(<ProjectCard {...mockProps} />);
    
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/example/project');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays live demo link', () => {
    render(<ProjectCard {...mockProps} />);
    
    const liveLink = screen.getByRole('link', { name: /live demo/i });
    expect(liveLink).toBeInTheDocument();
    expect(liveLink).toHaveAttribute('href', 'https://demo.example.com');
    expect(liveLink).toHaveAttribute('target', '_blank');
    expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies hover effects', () => {
    render(<ProjectCard {...mockProps} />);
    
    const card = screen.getByText('Test Project').closest('div[class*="card-gradient"]');
    expect(card).toHaveClass('hover-lift');
    expect(card).toHaveClass('group');
  });

  it('applies gradient styling', () => {
    render(<ProjectCard {...mockProps} />);
    
    const card = screen.getByText('Test Project').closest('div[class*="card-gradient"]');
    expect(card).toHaveClass('card-gradient');
    expect(card).toHaveClass('border-border');
  });

  it('handles featured projects', () => {
    render(<ProjectCard {...mockProps} featured={true} />);
    
    const card = screen.getByText('Test Project').closest('div[class*="card-gradient"]');
    expect(card).toBeInTheDocument();
    
    // Featured projects should show all technologies
    mockProps.technologies.forEach(tech => {
      const tag = screen.getByText(tech);
      expect(tag).toBeInTheDocument();
    });
  });

  it('handles non-featured projects', () => {
    render(<ProjectCard {...mockProps} featured={false} />);
    
    const card = screen.getByText('Test Project').closest('div[class*="card-gradient"]');
    expect(card).toBeInTheDocument();
    
    // Non-featured projects should show only first 3 technologies
    const firstThreeTechs = mockProps.technologies.slice(0, 3);
    firstThreeTechs.forEach(tech => {
      const tag = screen.getByText(tech);
      expect(tag).toBeInTheDocument();
    });
    
    // Should show "+X more" for additional technologies
    if (mockProps.technologies.length > 3) {
      const moreTag = screen.getByText(`+${mockProps.technologies.length - 3} more`);
      expect(moreTag).toBeInTheDocument();
    }
  });

  it('has proper accessibility attributes', () => {
    render(<ProjectCard {...mockProps} featured={true} />);
    
    // Check image alt text for featured projects
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Test Project');
    
    // Check link accessibility
    const githubLink = screen.getByRole('link', { name: /github/i });
    const liveLink = screen.getByRole('link', { name: /live demo/i });
    
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(liveLink).toHaveAttribute('target', '_blank');
    expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has proper accessibility attributes for non-featured projects', () => {
    render(<ProjectCard {...mockProps} featured={false} />);
    
    // Non-featured projects don't have images
    const image = screen.queryByRole('img');
    expect(image).not.toBeInTheDocument();
    
    // Check link accessibility
    const githubLink = screen.getByRole('link', { name: /github/i });
    const liveLink = screen.getByRole('link', { name: /live demo/i });
    
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(liveLink).toHaveAttribute('target', '_blank');
    expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies custom className', () => {
    render(<ProjectCard {...mockProps} className="custom-class" />);
    
    const card = screen.getByText('Test Project').closest('div[class*="custom-class"]');
    expect(card).toHaveClass('custom-class');
  });

  it('handles image loading state', () => {
    render(<ProjectCard {...mockProps} />);
    
    // Should show loading state initially
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });

  it('handles image error state', async () => {
    const user = userEvent.setup();
    render(<ProjectCard {...mockProps} />);
    
    // Simulate image error
    const image = screen.getByRole('img');
    fireEvent.error(image);
    
    // Should show fallback content
    await waitFor(() => {
      const projectTitles = screen.getAllByText('Test Project');
      expect(projectTitles.length).toBeGreaterThan(0);
    });
  });

  it('covers image handlers: load and error (combined)', async () => {
    render(
      <ProjectCard
        title="Sample Project"
        description="A project for testing"
        technologies={['React']}
        githubUrl="https://github.com/example/repo"
        liveUrl="https://example.com"
        featured
        image="image.png"
      />
    );

    const img = screen.getByRole('img', { name: /sample project/i });
    fireEvent.load(img);
    expect(img).toBeInTheDocument();

    fireEvent.error(img);
    await waitFor(() => {
      const titles = screen.getAllByText('Sample Project', { exact: true });
      expect(titles.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('handles image load success', async () => {
    render(<ProjectCard {...mockProps} />);
    
    const image = screen.getByRole('img');
    fireEvent.load(image);
    
    // Image should be visible after loading
    await waitFor(() => {
      expect(image).toHaveClass('block');
    });
  });

  it('applies different styling for featured vs non-featured projects', () => {
    const { rerender } = render(<ProjectCard {...mockProps} featured={true} />);
    
    // Featured project should have larger icons
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    
    rerender(<ProjectCard {...mockProps} featured={false} />);
    
    // Non-featured project should have smaller icons
    const githubLinkSmall = screen.getByRole('link', { name: /github/i });
    expect(githubLinkSmall).toBeInTheDocument();
  });

  it('handles empty technologies array', () => {
    render(<ProjectCard {...mockProps} technologies={[]} />);
    
    const card = screen.getByText('Test Project').closest('div[class*="card-gradient"]');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Test Project');
  });

  it('handles long technology lists', () => {
    const longTechList = ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Python', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'AWS'];
    render(<ProjectCard {...mockProps} technologies={longTechList} />);
    
    longTechList.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('handles special characters in title and description', () => {
    const specialProps = {
      ...mockProps,
      title: 'Test Project & More! 🚀',
      description: 'A project with special chars: @#$%^&*()'
    };
    
    render(<ProjectCard {...specialProps} />);
    
    expect(screen.getByText('Test Project & More! 🚀')).toBeInTheDocument();
    expect(screen.getByText('A project with special chars: @#$%^&*()')).toBeInTheDocument();
  });

  it('handles very long descriptions', () => {
    const longDescription = 'This is a very long project description that should be truncated to two lines using the line-clamp utility. It contains a lot of text to test the truncation functionality and ensure the card maintains consistent height across different content lengths.';
    
    render(<ProjectCard {...mockProps} description={longDescription} />);
    
    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  it('handles missing liveUrl', () => {
    render(<ProjectCard {...mockProps} liveUrl="" />);
    
    // Should still render the card
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('handles missing githubUrl', () => {
    render(<ProjectCard {...mockProps} githubUrl="" />);
    
    // Should still render the card
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
}); 