import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  // Use relative paths for GitHub Pages compatibility
  // Change this to '/your-repo-name/' if using a project page without custom domain
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure assets are properly referenced
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
