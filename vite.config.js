import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sda-onsite-3-react-real-estate-website/',
  plugins: [react()],
})
