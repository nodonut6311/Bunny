import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    manifest: true,
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        // Vite 8 / Rolldown-compatible syntax
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },

        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})