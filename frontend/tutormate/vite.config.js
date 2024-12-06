import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/static/', // Set the base path to /static
  build: {
    outDir: 'dist', // Specify the output directory as dist
  },
});
