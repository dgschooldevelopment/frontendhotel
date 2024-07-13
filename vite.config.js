import { defineConfig } from 'vite';

export default defineConfig({
  // other configuration options
  resolve: {
    extensions: ['.js', '.jsx'] // Ensure JSX files are recognized
  }
});
