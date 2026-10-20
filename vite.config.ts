import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    checker({
      typescript: true,
    }),
  ],
  build: {
    outDir: './build',
  },
  server: { port: 3000 },
  resolve: {
    tsconfigPaths: true,
  },
});
