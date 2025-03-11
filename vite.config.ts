import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase chunk size warning limit to 1MB
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        // Manually split chunks to optimize bundle size
        manualChunks(id) {
          // Split node_modules into separate chunks
          if (id.includes('node_modules')) {
            // Further split large libraries into their own chunks
            if (id.includes('@radix-ui') || id.includes('@supabase')) {
              return `vendor-${id.split('node_modules/')[1].split('/')[0]}`;
            }
            return 'vendor';
          }
          
          // Split large components or pages into separate chunks
          if (id.includes('/src/pages/') || id.includes('/src/components/metrics/')) {
            return `chunk-${path.parse(id).name}`;
          }
        }
      }
    }
  }
}));
