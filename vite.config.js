import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        produits: resolve(__dirname, 'produits.html'),
        apropos: resolve(__dirname, 'a-propos.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
