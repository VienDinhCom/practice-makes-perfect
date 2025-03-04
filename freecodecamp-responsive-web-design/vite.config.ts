import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        personalPortfolioWebpage: resolve(
          __dirname,
          'projects/personal-portfolio-webpage/personal-portfolio-webpage.html'
        ),
      },
    },
  },
});
