import react from '@vitejs/plugin-react'
import { defineConfig, Plugin } from 'vite'

function graphqlPlugin(): Plugin {
  return {
    name: 'graphql-loader',
    transform(code, id) {
      if (!id.endsWith('.graphql')) return
      const escaped = code.replace(/`/g, '\\`').replace(/\$/g, '\\$')
      return `import gql from 'graphql-tag'; export default gql\`${escaped}\`;`
    },
  }
}

export default defineConfig({
  define: { 'process.env.NODE_ENV': `"${process.env.NODE_ENV}"` },
  build: {
    lib: {
      entry: './src/index.tsx',
      formats: ['es'],
      fileName: 'index',
    },
    minify: false,
    copyPublicDir: false,
  },
  plugins: [react(), graphqlPlugin()],
})
