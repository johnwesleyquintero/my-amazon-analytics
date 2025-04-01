
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '183b05a1-f757-48de-89da-fb5e0449a514.lovableproject.com'
    ]
  }
});
