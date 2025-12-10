import { defineConfig } from 'vite';
import alias from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { telefunc } from 'telefunc/vite';

export default defineConfig({
  plugins: [alias(), react(), telefunc()],
});
