import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'src/index.css'),
      output: {
        assetFileNames: 'yumeri-ui.css',
      },
    },
  },
});
