import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ThemeProviderContext, useTheme } from '../ThemeProvider.utils';
import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import userEvent from '@testing-library/user-event';

function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProviderContext.Provider value={{ theme: 'light', setTheme: () => {} }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

function ThemeConsumer() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
    </div>
  );
}

describe('ThemeProvider.utils & component (combined)', () => {
  it('provides theme context and allows reading values', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: Provider });
    expect(result.current.theme).toBe('light');
    expect(typeof result.current.setTheme).toBe('function');
  });

  it('throws if used outside provider', () => {
    const original = (ThemeProviderContext as unknown as { _currentValue?: unknown })._currentValue;
    (ThemeProviderContext as unknown as { _currentValue?: unknown })._currentValue = undefined;
    expect(() => renderHook(() => useTheme())).toThrowError(/useTheme must be used within a ThemeProvider/);
    (ThemeProviderContext as unknown as { _currentValue?: unknown })._currentValue = original;
  });

  describe('ThemeProvider component behavior', () => {
    beforeEach(() => {
      document.documentElement.className = '';
      localStorage.clear();
      vi.spyOn(window, 'matchMedia').mockReturnValue({
        matches: true,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      } as unknown as MediaQueryList);
    });

    it('applies system theme class when defaultTheme is system', () => {
      render(
        <ThemeProvider defaultTheme="system">
          <ThemeConsumer />
        </ThemeProvider>
      );
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('setTheme updates localStorage and document class', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider defaultTheme="light" storageKey="portfolio-ui-theme">
          <ThemeConsumer />
        </ThemeProvider>
      );

      await user.click(screen.getByRole('button', { name: /dark/i }));
      expect(localStorage.getItem('portfolio-ui-theme')).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      await user.click(screen.getByRole('button', { name: /light/i }));
      expect(localStorage.getItem('portfolio-ui-theme')).toBe('light');
      expect(document.documentElement.classList.contains('light')).toBe(true);
    });
  });
});