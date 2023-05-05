import { defineConfig } from 'vite'
import dotenv from 'dotenv'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    'process.env.VITE_CLOUD_NAME': JSON.stringify(process.env.VITE_CLOUD_NAME),
    'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
    'process.env.VITE_API_SECRET': JSON.stringify(process.env.VITE_API_SECRET),
    'process.env.VITE_API_PRESET': JSON.stringify(process.env.VITE_API_PRESET),
    'process.env.VITE_CLOUDINARY_URL':JSON.stringify(process.env.VITE_CLOUDINARY_URL)
  }
})
