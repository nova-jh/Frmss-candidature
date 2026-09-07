import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  if (mode === 'production' && !env.VITE_API_URL) {
    throw new Error('VITE_API_URL must be configured for a production build')
  }

  return {
    plugins: [react()],
  }
})
