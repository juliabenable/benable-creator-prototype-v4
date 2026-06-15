import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/benable-creator-prototype-v4/',
  server: { host: '127.0.0.1', port: 5188 },
  // lucide-react gets pre-bundled as its own optimizeDeps entry; without
  // deduping, its bundled React resolves to a separate copy/dispatcher than
  // the app's, causing React 19 "Invalid hook call" errors. Forcing a single
  // resolved react/react-dom keeps one React instance across all modules.
  resolve: { dedupe: ['react', 'react-dom'] },
});
