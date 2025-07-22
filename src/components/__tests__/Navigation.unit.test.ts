import { describe, it, expect, vi } from 'vitest';
import { scrollToSection, SocialIcons } from '../Navigation';
import React from 'react';
import { render } from '@testing-library/react';

describe('Navigation internal functions', () => {
  it('scrollToSection scrolls to element and closes menu', () => {
    const mockSetIsMobileMenuOpen = vi.fn();
    const mockElement = { scrollIntoView: vi.fn() };
    vi.spyOn(document, 'querySelector').mockReturnValue(mockElement as any);
    scrollToSection('#about', mockSetIsMobileMenuOpen);
    expect(document.querySelector).toHaveBeenCalledWith('#about');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(mockSetIsMobileMenuOpen).toHaveBeenCalledWith(false);
  });

  it('scrollToSection does nothing if element does not exist', () => {
    const mockSetIsMobileMenuOpen = vi.fn();
    vi.spyOn(document, 'querySelector').mockReturnValue(null);
    expect(() => scrollToSection('#notfound', mockSetIsMobileMenuOpen)).not.toThrow();
    expect(mockSetIsMobileMenuOpen).toHaveBeenCalledWith(false);
  });

  it('scrollToSection handles empty href gracefully', () => {
    const mockSetIsMobileMenuOpen = vi.fn();
    vi.spyOn(document, 'querySelector').mockReturnValue(null);
    expect(() => scrollToSection('', mockSetIsMobileMenuOpen)).not.toThrow();
    expect(mockSetIsMobileMenuOpen).toHaveBeenCalledWith(false);
  });

  it('SocialIcons renders all provided social links', () => {
    const socialLinks = [
      { label: 'GitHub', href: 'https://github.com', icon: () => React.createElement('span', null, 'GH') },
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: () => React.createElement('span', null, 'LI') },
      { label: 'Dashboard', href: '/dashboard', icon: () => React.createElement('span', null, 'DB') },
    ];
    const { getByText } = render(React.createElement(SocialIcons, { socialLinks }));
    expect(getByText('GH')).toBeInTheDocument();
    expect(getByText('LI')).toBeInTheDocument();
    expect(getByText('DB')).toBeInTheDocument();
  });

  it('SocialIcons renders nothing with empty array', () => {
    const { container } = render(React.createElement(SocialIcons, { socialLinks: [] }));
    expect(container).toBeInTheDocument();
  });
}); 