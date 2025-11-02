import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Enable library mode
    lib: {
      // The entry point for the library
      entry: resolve(__dirname, 'src/index.js'),
      // The name for the UMD global variable
      name: 'YUUI',
      // The file name for the generated bundles
      fileName: (format) => `yumeri-ui.${format}.js`,
    },
    rollupOptions: {
      // We don't have external dependencies like React or Vue
      // external: [],
      output: {
        // We don't have external dependencies to map to globals
        // globals: {},
      },
    },
  },
});