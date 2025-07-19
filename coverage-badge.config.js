module.exports = {
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'html', 'lcov', 'json'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/test/**',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/pages/NotFound.tsx',
    '!src/components/icons/**',
    '!src/components/ThemeProvider.tsx',
    '!src/components/MobileMenuContext.tsx'
  ]
}; 