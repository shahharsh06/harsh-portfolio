import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
        '.dist/',
        'coverage/',
        '**/*.test.*',
        '**/*.spec.*',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/pages/NotFound.tsx', // Static page, no logic to test
        'src/components/icons/**', // Icon components are simple
        'src/components/ThemeProvider.tsx', // Context provider, minimal logic
        'src/components/MobileMenuContext.tsx', // Context provider, minimal logic
        'src/hooks/__tests__/useCarousel.test.ts', // Temporarily excluded due to interface changes
      ],
      include: [
        'src/**/*.{ts,tsx}',
        'src/**/*.{js,jsx}'
      ],
      all: true,
      thresholds: {
        branches: 80,
        functions: 65,
        lines: 80,
        statements: 80
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}); 