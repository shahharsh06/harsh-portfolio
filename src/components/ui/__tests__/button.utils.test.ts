import { describe, it, expect } from 'vitest';
import { buttonVariants } from '../button.utils';

describe('button.utils - buttonVariants', () => {
  it('returns default classes with no args', () => {
    const classes = buttonVariants();
    expect(typeof classes).toBe('string');
    expect(classes).toContain('inline-flex');
  });

  it('supports variant and size combinations', () => {
    const destructive = buttonVariants({ variant: 'destructive', size: 'sm' });
    expect(destructive).toContain('bg-destructive');
    expect(destructive).toContain('h-9');

    const outline = buttonVariants({ variant: 'outline', size: 'lg' });
    expect(outline).toContain('border');
    expect(outline).toContain('h-11');

    const ghost = buttonVariants({ variant: 'ghost', size: 'icon' });
    expect(ghost).toContain('hover:bg-accent');
    expect(ghost).toContain('w-10');
  });

  it('supports link variant', () => {
    const link = buttonVariants({ variant: 'link' });
    expect(link).toContain('underline');
  });
});