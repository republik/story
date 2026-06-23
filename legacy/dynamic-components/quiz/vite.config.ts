import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    lib: {
      entry: './src/index.js',
      formats: ['es'],
      fileName: 'index',
    },
    copyPublicDir: false,
  },
  plugins: [react()],
})
