import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/guardian-ia/',
  // This makes the environment variable available in the client-side code
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
})