import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/Vexera',
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})