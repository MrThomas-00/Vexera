import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/Vexera/',
  server: {
    allowedHosts: true,
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})