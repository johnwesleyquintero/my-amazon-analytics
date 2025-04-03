
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240 // Only compress files larger than 10KB
    })
  ],
  server: {
    hmr: {
      overlay: false
    },
    host: true,
    port: 8080
  },
  preview: {
    port: 8080
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [
      ".mts",
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json"
    ]
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('@radix-ui')) return 'radix-ui';
            if (id.includes('@supabase')) return 'supabase';
            if (id.includes('react')) return 'react-vendor';
            return 'vendor';
          }
          if (id.includes('src/components')) return 'components';
          if (id.includes('src/features')) return 'features';
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  }
}));
