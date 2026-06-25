import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  define: { 'process.env.NODE_ENV': `"${process.env.NODE_ENV}"` },
  assetsInclude: ['**/*.srt', '**/*.vtt'],
  build: {
    lib: {
      entry: './src/index.tsx',
      formats: ['es'],
      fileName: 'index',
    },
    minify: false,
    copyPublicDir: false,
  },
  plugins: [react()],
})
