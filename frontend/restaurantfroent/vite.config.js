import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        [env.VITE_API_PROXY_PATH || '/api']: {
          target: env.VITE_API_BASE_URL || 'https://127.0.0.1:8000',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
