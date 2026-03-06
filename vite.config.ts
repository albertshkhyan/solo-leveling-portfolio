/// <reference types="vite/client" />
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import Terminal from 'vite-plugin-terminal';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- pnpm duplicate vite causes Plugin type mismatch
  plugins: [
    react(),
    tailwindcss(),
    Terminal({ console: 'terminal' }),
  ] as any,
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
