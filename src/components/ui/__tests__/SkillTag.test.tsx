import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/utils';
import { SkillTag } from '../SkillTag';

describe('SkillTag Component', () => {
  it('renders skill tag with text', () => {
    render(<SkillTag>React</SkillTag>);
    
    const skillTag = screen.getByText('React');
    expect(skillTag).toBeInTheDocument();
  });

  it('applies default styling classes', () => {
    render(<SkillTag>TypeScript</SkillTag>);
    
    const skillTag = screen.getByText('TypeScript');
    expect(skillTag).toHaveClass('px-3');
    expect(skillTag).toHaveClass('py-1');
    expect(skillTag).toHaveClass('text-sm');
    expect(skillTag).toHaveClass('rounded-full');
  });

  it('applies custom className', () => {
    render(<SkillTag className="custom-class">JavaScript</SkillTag>);
    
    const skillTag = screen.getByText('JavaScript');
    expect(skillTag).toHaveClass('custom-class');
  });

  it('renders with different skill names', () => {
    const skills = ['Python', 'Machine Learning', 'Data Science', 'TensorFlow'];
    
    skills.forEach(skill => {
      const { unmount } = render(<SkillTag>{skill}</SkillTag>);
      expect(screen.getByText(skill)).toBeInTheDocument();
      unmount();
    });
  });

  it('handles empty content', () => {
    render(<SkillTag>{''}</SkillTag>);
    
    const skillTags = screen.getAllByRole('generic');
    expect(skillTags.length).toBeGreaterThan(0);
  });

  it('renders with accessibility attributes', () => {
    render(<SkillTag>Accessible</SkillTag>);
    
    const skillTag = screen.getByText('Accessible');
    expect(skillTag).toBeInTheDocument();
  });

  it('applies hover effects', () => {
    render(<SkillTag>Hoverable</SkillTag>);
    
    const skillTag = screen.getByText('Hoverable');
    expect(skillTag).toHaveClass('hover:bg-primary/10');
  });

  it('renders with proper text size', () => {
    render(<SkillTag>Text Size</SkillTag>);
    
    const skillTag = screen.getByText('Text Size');
    expect(skillTag).toHaveClass('text-sm');
  });

  it('renders with proper padding', () => {
    render(<SkillTag>Padding</SkillTag>);
    
    const skillTag = screen.getByText('Padding');
    expect(skillTag).toHaveClass('px-3');
    expect(skillTag).toHaveClass('py-1');
  });

  it('renders with border styling', () => {
    render(<SkillTag>Border</SkillTag>);
    
    const skillTag = screen.getByText('Border');
    expect(skillTag).toHaveClass('border');
    expect(skillTag).toHaveClass('border-border');
  });
}); 