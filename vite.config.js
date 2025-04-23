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
    strictPort: true, // Ensures Vite always runs on port 3000
    hmr: {
      overlay: true,
      // Ensure HMR works with Netlify Dev
      clientPort: 8888,
      host: 'localhost',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      // Add proxy for Netlify functions
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
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
    },
    // Add correct MIME type handling
    fs: {
      strict: false,
      allow: ['..']
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'./src'),
    },
  },
  assetsInclude: ['**/*.html'],
  // Set proper optimizeDeps options
  optimizeDeps: {
    include: ['react','react-dom'],
    force: true
  },
  // Ensure correct build options
  build: {
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // Add define replacements for consistent environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VITE_API_URL': JSON.stringify('http://localhost:8888/.netlify/functions')
  }
});
