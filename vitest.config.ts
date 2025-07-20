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
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
    ],
    coverage: {
      provider: 'v8',
      reporter: [
        'text',
        'text-summary',
        'json',
        'html',
        'lcov'
      ],
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
    },
    // Suppress React Router warnings
    onConsoleLog(log, type) {
      if (log.includes('React Router Future Flag Warning')) {
        return false;
      }
      return true;
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
}); 