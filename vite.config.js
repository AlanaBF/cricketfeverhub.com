import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env and .env.local into process.env (works regardless of Vite env loading)
for (const file of ['.env', '.env.local']) {
  try {
    const content = readFileSync(resolve(process.cwd(), file), 'utf-8');
    for (const line of content.split('\n')) {
      const match = line.match(/^([^#\s][^=]*)=(.*)$/);
      if (match) process.env[match[1].trim()] = match[2].trim();
    }
  } catch { /* file may not exist */ }
}

const CRICBUZZ = 'https://cricbuzz-cricket.p.rapidapi.com';
const CRICBUZZ_HOST = 'cricbuzz-cricket.p.rapidapi.com';

function getKey(n) {
  return process.env[`RapidAPI_Key${n}`];
}

function cricbuzzProxy(apiPath, keyNum) {
  return {
    target: CRICBUZZ,
    changeOrigin: true,
    configure: (proxy) => {
      proxy.on('proxyReq', (proxyReq) => {
        proxyReq.path = apiPath;
        proxyReq.setHeader('X-RapidAPI-Key', getKey(keyNum));
        proxyReq.setHeader('X-RapidAPI-Host', CRICBUZZ_HOST);
      });
    },
  };
}

function cricbuzzParamProxy(getPath, keyNum) {
  return {
    target: CRICBUZZ,
    changeOrigin: true,
    configure: (proxy) => {
      proxy.on('proxyReq', (proxyReq, req) => {
        const url = new URL(req.url, 'http://localhost');
        proxyReq.path = getPath(url.searchParams);
        proxyReq.setHeader('X-RapidAPI-Key', getKey(keyNum));
        proxyReq.setHeader('X-RapidAPI-Host', CRICBUZZ_HOST);
      });
    },
  };
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/news-detail': cricbuzzParamProxy((p) => `/news/v1/detail/${p.get('id')}`, 4),
      '/api/news': cricbuzzProxy('/news/v1/index', 4),
      '/api/live-matches': cricbuzzProxy('/matches/v1/live', 3),
      '/api/upcoming-matches': cricbuzzProxy('/matches/v1/upcoming', 4),
      '/api/commentary': cricbuzzParamProxy((p) => `/mcenter/v1/${p.get('matchId')}/comm`, 1),
      '/api/scorecard': cricbuzzParamProxy((p) => `/mcenter/v1/${p.get('matchId')}/hscard`, 5),
      '/api/players': cricbuzzParamProxy(
        (p) => `/stats/v1/player/search?plrN=${encodeURIComponent(p.get('plrN') || '')}`,
        2
      ),
      '/api/player-profile': cricbuzzParamProxy((p) => `/stats/v1/player/${p.get('playerId')}`, 5),
      '/api/player-batting': cricbuzzParamProxy((p) => `/stats/v1/player/${p.get('playerId')}/batting`, 5),
      '/api/player-bowling': cricbuzzParamProxy((p) => `/stats/v1/player/${p.get('playerId')}/bowling`, 5),
      '/api/rankings': cricbuzzParamProxy(
        (p) => `/stats/v1/rankings/${p.get('category') || 'batsmen'}?formatType=${p.get('formatType') || 'test'}`,
        1
      ),
      '/api/series': cricbuzzProxy('/series/v1/international', 2),
      '/api/trending-players': cricbuzzProxy('/stats/v1/player/trending', 3),
      '/api/image': {
        target: CRICBUZZ,
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            const url = new URL(req.url, 'http://localhost');
            proxyReq.path = `/img/v1/i1/c${url.searchParams.get('id')}/i.jpg?p=de`;
            proxyReq.setHeader('X-RapidAPI-Key', getKey(2));
            proxyReq.setHeader('X-RapidAPI-Host', CRICBUZZ_HOST);
          });
        },
      },
      '/api/weather': {
        target: 'https://api.openweathermap.org',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            const url = new URL(req.url, 'http://localhost');
            const city = url.searchParams.get('city') || '';
            const key = process.env.RapidAPI_Key_Weather;
            proxyReq.path = `/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${key || ''}`;
          });
        },
      },
    },
  },
});
