import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// Mirror production security headers (public/_headers, "/*" block) in `vite preview`.
function productionHeaders(): Record<string, string> {
  const lines = fs.readFileSync(path.resolve(__dirname, 'public/_headers'), 'utf8').split(/\r?\n/)
  const headers: Record<string, string> = {}
  for (const line of lines.slice(lines.indexOf('/*') + 1)) {
    if (!line.trim()) break
    const idx = line.indexOf(':')
    headers[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
  }
  delete headers['Strict-Transport-Security']
  if (headers['Content-Security-Policy']) {
    headers['Content-Security-Policy'] = headers['Content-Security-Policy'].replace('; upgrade-insecure-requests', '')
  }
  return headers
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: true,
    open: true,
    port: 3001,
    proxy: {
      '/api': {
        target: 'https://api.tunjai.in.th',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 4173,
    headers: productionHeaders(),
  },
  build: {
    target: 'es2020',
    sourcemap: false,
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
