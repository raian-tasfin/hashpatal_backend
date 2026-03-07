import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@org/sdk': path.resolve(__dirname, './src/generated/sdk'),
    },
  },
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    sequence: { concurrent: false },
  },
  plugins: [tsconfigPaths(), swc.vite({ module: { type: 'es6' } })],
});
