import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api-images': {
          target: 'https://cricbuzz-cricket.p.rapidapi.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-images/, ''),
          headers: {
            'X-RapidAPI-Key': env.VITE_RapidAPI_Key2,
            'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
          }
        }
      }
    }
  };
});
