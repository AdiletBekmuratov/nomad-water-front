import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/pm 
export default defineConfig({
  server: {
    open: true,
    port: 3000
  },
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname
    }
  },
  plugins: [react(), svgr()]
});
