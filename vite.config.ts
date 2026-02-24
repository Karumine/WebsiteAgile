import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    open: true,
    port: 3001,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'ui': ['lucide-react', 'react-hot-toast', 'clsx', 'tailwind-merge'],
          'editor': ['react-quill-new'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  }
})
