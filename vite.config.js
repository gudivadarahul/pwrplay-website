import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
    }),
    tailwindcss()
  ],
  server: {
    port: 3000, // Use a standard port instead of 443
    https: false, // Disable https for local development
    host: '0.0.0.0',  // Allows external access (for iPhone & ngrok)
    strictPort: true, // Ensures Vite always runs on 5173
    hmr: {
      overlay: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: [
      'localhost',
      '6398cfda1149.ngrok.app',
      '.ngrok.app',
      '.ngrok-free.app',
    ],
    watch: {
      usePolling: true,
      interval: 100,
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'./src'),
    },
  },
});
