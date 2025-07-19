import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('Utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      expect(cn('base', true && 'conditional')).toBe('base conditional');
      expect(cn('base', false && 'conditional')).toBe('base');
    });

    it('should handle undefined and null values', () => {
      expect(cn('base', undefined, null, 'valid')).toBe('base valid');
    });

    it('should handle empty strings', () => {
      expect(cn('base', '', 'valid')).toBe('base valid');
    });

    it('should handle arrays', () => {
      expect(cn('base', ['class1', 'class2'])).toBe('base class1 class2');
    });

    it('should handle objects', () => {
      expect(cn('base', { conditional: true, ignored: false })).toBe('base conditional');
    });

    it('should handle mixed inputs', () => {
      expect(cn('base', 'static', { conditional: true }, ['array1', 'array2'])).toBe('base static conditional array1 array2');
    });

    it('should handle no arguments', () => {
      expect(cn()).toBe('');
    });

    it('should handle single argument', () => {
      expect(cn('single')).toBe('single');
    });

    it('should handle complex conditional logic', () => {
      const isActive = true;
      const isDisabled = false;
      expect(cn(
        'base',
        isActive && 'active',
        isDisabled && 'disabled',
        'always'
      )).toBe('base active always');
    });
  });
}); 