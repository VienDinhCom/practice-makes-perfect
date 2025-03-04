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
        portfolio: resolve(__dirname, 'projects/personal-portfolio-webpage/personal-portfolio-webpage.html'),
        product: resolve(__dirname, 'projects/product-landing-page/product-landing-page.html'),
        survey: resolve(__dirname, 'projects/survey-form/survey-form.html'),
        documentation: resolve(__dirname, 'projects/technical-documentation-page/technical-documentation-page.html'),
        tribute: resolve(__dirname, 'projects/tribute-page/tribute-page.html'),
      },
    },
  },
});
