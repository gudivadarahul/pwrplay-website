import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',  // Allows external devices like iPhones to connect
    port: 5173,       // Make sure this matches your ngrok command
    strictPort: true, // Ensures Vite always uses this port
    hmr: {
      clientPort: 443, // Ensures Hot Module Reload (HMR) works with ngrok (HTTPS)
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
    allowedHosts: [
      '.ngrok-free.app', // Allows ngrok's free domain to access Vite
    ],
  },
});
