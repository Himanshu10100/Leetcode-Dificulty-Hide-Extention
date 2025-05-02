import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  define: {
    'chrome': 'chrome' // prevent vite from replacing chrome
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.'
        },
        {
          src: 'src/content.js',
          dest: '.'
        }
      ]
    })
  ],
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  }
});
