import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,        // Active les API globales comme `describe`, `test`, etc.
    environment: 'jsdom',  // Utilise un environnement JSDOM pour simuler le DOM
  },
});
