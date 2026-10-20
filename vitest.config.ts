import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    typecheck: {
      enabled: true,
      include: ['src/**/*.type.spec.ts'],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
});
