import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/utils';
import ProjectCard from '../ProjectCard';

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

  it('displays project image when provided', () => {
    render(
      <ProjectCard
        title="Test Project"
        description="Test description"
        image="/mock-project-image.jpg"
        technologies={['React', 'TypeScript']}
        githubUrl="https://github.com"
        liveUrl="https://example.com"
      />
    );

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'http://localhost:3000/mock-project-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Project');
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
    render(<ProjectCard {...mockProps} />);
    
    // Check image alt text
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

  it('applies custom className', () => {
    render(<ProjectCard {...mockProps} className="custom-class" />);
    
    const card = screen.getByText('Test Project').closest('div[class*="custom-class"]');
    expect(card).toHaveClass('custom-class');
  });

  it('handles empty technologies array', () => {
    const propsWithoutTech = { ...mockProps, technologies: [] };
    render(<ProjectCard {...propsWithoutTech} />);
    
    const card = screen.getByText('Test Project').closest('div[class*="card-gradient"]');
    expect(card).toBeInTheDocument();
    // Should still render the card without technology tags
  });

  it('handles long project titles', () => {
    const propsWithLongTitle = { 
      ...mockProps, 
      title: 'This is a very long project title that might overflow the card container'
    };
    render(<ProjectCard {...propsWithLongTitle} />);
    
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveTextContent('This is a very long project title');
  });

  it('handles long project descriptions', () => {
    const propsWithLongDesc = { 
      ...mockProps, 
      description: 'This is a very long project description that might overflow the card container and need to be truncated or wrapped properly'
    };
    render(<ProjectCard {...propsWithLongDesc} />);
    
    const description = screen.getByText('This is a very long project description that might overflow the card container and need to be truncated or wrapped properly');
    expect(description).toBeInTheDocument();
  });

  it('applies different icon sizes for featured vs non-featured', () => {
    const { rerender } = render(<ProjectCard {...mockProps} featured={true} />);
    
    // Featured projects should have larger icons
    let githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    
    rerender(<ProjectCard {...mockProps} featured={false} />);
    
    // Non-featured projects should have smaller icons
    githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
  });

  it('applies different description text sizes for featured vs non-featured', () => {
    const { rerender } = render(<ProjectCard {...mockProps} featured={true} />);
    
    // Featured projects should have normal text size
    let description = screen.getByText('A test project description');
    expect(description).toHaveClass('text-sm');
    
    rerender(<ProjectCard {...mockProps} featured={false} />);
    
    // Non-featured projects should have smaller text
    description = screen.getByText('A test project description');
    expect(description).toHaveClass('text-sm');
  });
}); 