import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get backend port from environment or use default range
const getBackendPort = () => {
  // Check if backend port is specified in environment
  if (process.env.BACKEND_PORT) {
    return parseInt(process.env.BACKEND_PORT, 10);
  }
  
  // Default port range to try (same as backend)
  const defaultPort = 3003;
  return defaultPort;
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: `http://localhost:${getBackendPort()}`,
        changeOrigin: true,
        rewrite: (path) => path,
        configure: (proxy, options) => {
          // Log proxy target for debugging
          console.log(`🔗 Frontend proxy configured for backend: ${options.target}`);
        },
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}) 