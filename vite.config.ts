import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load environment variables based on mode
  const env = loadEnv(mode, process.cwd(), '');
  
  // Environment-specific configurations
  const envConfig = {
    development: {
      define: {
        __DEV__: true,
        __STAGING__: false,
        __PROD__: false,
      },
      build: {
        sourcemap: true,
        minify: false,
      },
      server: {
        port: 3000,
        open: true,
        cors: true,
      },
    },
    testing: {
      define: {
        __DEV__: false,
        __STAGING__: false,
        __PROD__: false,
      },
      build: {
        sourcemap: true,
        minify: false,
      },
    },
    staging: {
      define: {
        __DEV__: false,
        __STAGING__: true,
        __PROD__: false,
      },
      build: {
        sourcemap: true,
        minify: true,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              router: ['react-router-dom'],
            },
          },
        },
      },
    },
    production: {
      define: {
        __DEV__: false,
        __STAGING__: false,
        __PROD__: true,
      },
      build: {
        sourcemap: false,
        minify: 'terser',
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              router: ['react-router-dom'],
            },
          },
        },
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      },
    },
  };

  // Get current environment - use mode if available, otherwise fall back to VITE_APP_ENV
  const currentEnv = mode || env.VITE_APP_ENV || 'development';
  const config = envConfig[currentEnv as keyof typeof envConfig] || envConfig.development;

  console.log(`🚀 Building for environment: ${currentEnv}`);
  console.log(`📁 Mode: ${mode}`);
  console.log(`🔧 Command: ${command}`);

  return {
    plugins: [react()],
    base: '/harsh-portfolio/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/lib'),
        '@types': path.resolve(__dirname, './src/types'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },
    define: {
      ...config.define,
      'import.meta.vitest': 'undefined',
      __BUILD_TIME__: JSON.stringify(env.VITE_APP_BUILD_TIME || new Date().toISOString()),
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
      __APP_ENV__: JSON.stringify(currentEnv),
    },
    build: {
      ...config.build,
      outDir: `dist/${currentEnv}`,
      assetsDir: 'assets',
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: true,
    },
    server: {
      ...config.server,
      host: true,
      strictPort: true,
    },
    preview: {
      port: 4173,
      host: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: true,
      testTimeout: 10000,
      hookTimeout: 10000,
      teardownTimeout: 5000,
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
          'src/pages/NotFound.tsx',
          'src/components/icons/**',
          'src/components/ThemeProvider.tsx',
          'src/components/MobileMenuContext.tsx',
          'src/types/**',
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
      onConsoleLog(log, type) {
        if (log.includes('React Router Future Flag Warning')) {
          return false;
        }
        return true;
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['@testing-library/react'],
    },
    css: {
      devSourcemap: currentEnv === 'development',
    },
  };
});
