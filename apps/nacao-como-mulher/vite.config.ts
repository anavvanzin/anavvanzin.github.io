import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/atlas/nacao-como-mulher/',
  plugins: [react()],
  build: {
    outDir: '../../atlas/nacao-como-mulher',
    emptyOutDir: true,
    sourcemap: false,
  },
})
