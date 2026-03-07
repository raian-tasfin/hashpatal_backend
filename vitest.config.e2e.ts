import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    sequence: { concurrent: false },
  },
  plugins: [tsconfigPaths(), swc.vite({ module: { type: 'es6' } })],
});
