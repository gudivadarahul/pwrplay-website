import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',  // Allows external access (for iPhone & ngrok)
    port: 5173,       // Keeps the port consistent
    strictPort: true, // Ensures Vite always runs on 5173
    hmr: {
      clientPort: 443, // Fixes HMR issues when using ngrok
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
  },
});
