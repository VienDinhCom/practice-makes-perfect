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
        barChar: resolve(__dirname, 'projects/bar-chart/bar-chart.html'),
        scatterplotGraph: resolve(__dirname, 'projects/scatterplot-graph/scatterplot-graph.html'),
        heatMap: resolve(__dirname, 'projects/heat-map/heat-map.html'),
        choroplethMap: resolve(__dirname, 'projects/choropleth-map/choropleth-map.html'),
        treemapDiagram: resolve(__dirname, 'projects/treemap-diagram/treemap-diagram.html'),
      },
    },
  },
});
