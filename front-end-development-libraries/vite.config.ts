import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        quote: resolve(__dirname, 'random-quote-machine.html'),
        markdown: resolve(__dirname, 'markdown-previewer.html'),
        drumMachine: resolve(__dirname, 'drum-machine.html'),
      },
    },
  },
  plugins: [react()],
});
