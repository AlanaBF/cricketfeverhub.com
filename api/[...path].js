const CRICBUZZ_BASE = 'https://cricbuzz-cricket.p.rapidapi.com';
const CRICBUZZ_HOST = 'cricbuzz-cricket.p.rapidapi.com';

const VALID_CATEGORIES = new Set(['batsmen', 'bowlers', 'allrounders', 'teams']);
const VALID_FORMATS = new Set(['test', 'odi', 'odi-w', 't20', 't20-w']);

function getKey(n) {
  return process.env[`RapidAPI_Key${n}`];
}

function cricbuzzFetch(path, keyNum) {
  return fetch(`${CRICBUZZ_BASE}${path}`, {
    headers: {
      'X-RapidAPI-Key': getKey(keyNum),
      'X-RapidAPI-Host': CRICBUZZ_HOST,
    },
  });
}

export default async function handler(req, res) {
  const pathParts = req.query.path || [];
  const route = Array.isArray(pathParts) ? pathParts.join('/') : String(pathParts);
  const q = req.query;

  let upstream;

  switch (route) {
    case 'news':
      upstream = await cricbuzzFetch('/news/v1/index', 4);
      break;

    case 'news-detail':
      if (!q.id || !/^\d{1,15}$/.test(q.id)) return res.status(400).json({ error: 'Invalid id' });
      upstream = await cricbuzzFetch(`/news/v1/detail/${q.id}`, 4);
      break;

    case 'live-matches':
      upstream = await cricbuzzFetch('/matches/v1/live', 3);
      break;

    case 'upcoming-matches':
      upstream = await cricbuzzFetch('/matches/v1/upcoming', 4);
      break;

    case 'commentary':
      if (!q.matchId || !/^\d{1,15}$/.test(q.matchId)) return res.status(400).json({ error: 'Invalid matchId' });
      upstream = await cricbuzzFetch(`/mcenter/v1/${q.matchId}/comm`, 1);
      break;

    case 'scorecard':
      if (!q.matchId || !/^\d{1,15}$/.test(q.matchId)) return res.status(400).json({ error: 'Invalid matchId' });
      upstream = await cricbuzzFetch(`/mcenter/v1/${q.matchId}/hscard`, 5);
      break;

    case 'players':
      if (!q.plrN || typeof q.plrN !== 'string' || q.plrN.length > 100) return res.status(400).json({ error: 'Invalid plrN' });
      upstream = await cricbuzzFetch(`/stats/v1/player/search?plrN=${encodeURIComponent(q.plrN.trim())}`, 2);
      break;

    case 'player-profile':
      if (!q.playerId || !/^\d{1,15}$/.test(q.playerId)) return res.status(400).json({ error: 'Invalid playerId' });
      upstream = await cricbuzzFetch(`/stats/v1/player/${q.playerId}`, 5);
      break;

    case 'player-batting':
      if (!q.playerId || !/^\d{1,15}$/.test(q.playerId)) return res.status(400).json({ error: 'Invalid playerId' });
      upstream = await cricbuzzFetch(`/stats/v1/player/${q.playerId}/batting`, 5);
      break;

    case 'player-bowling':
      if (!q.playerId || !/^\d{1,15}$/.test(q.playerId)) return res.status(400).json({ error: 'Invalid playerId' });
      upstream = await cricbuzzFetch(`/stats/v1/player/${q.playerId}/bowling`, 5);
      break;

    case 'rankings': {
      const category = q.category || 'batsmen';
      const formatType = q.formatType || 'test';
      if (!VALID_CATEGORIES.has(category)) return res.status(400).json({ error: 'Invalid category' });
      if (!VALID_FORMATS.has(formatType)) return res.status(400).json({ error: 'Invalid formatType' });
      upstream = await cricbuzzFetch(`/stats/v1/rankings/${category}?formatType=${formatType}`, 1);
      break;
    }

    case 'series':
      upstream = await cricbuzzFetch('/series/v1/international', 2);
      break;

    case 'trending-players':
      upstream = await cricbuzzFetch('/stats/v1/player/trending', 3);
      break;

    case 'weather': {
      if (!q.city || typeof q.city !== 'string' || q.city.length > 100) return res.status(400).json({ error: 'Invalid city' });
      const params = new URLSearchParams({ q: q.city.trim(), appid: process.env.RapidAPI_Key_Weather });
      upstream = await fetch(`https://api.openweathermap.org/data/2.5/forecast?${params}`);
      break;
    }

    case 'image': {
      if (!q.id || !/^\d{1,10}$/.test(q.id)) return res.status(400).send('Invalid image id');
      upstream = await cricbuzzFetch(`/img/v1/i1/c${q.id}/i.jpg?p=de`, 2);
      if (!upstream.ok) return res.status(upstream.status).send('Image not found');
      res.setHeader('Content-Type', upstream.headers.get('content-type') || 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.send(Buffer.from(await upstream.arrayBuffer()));
    }

    default:
      return res.status(404).json({ error: 'Not found' });
  }

  if (!upstream.ok) return res.status(upstream.status).json({ error: 'Upstream error' });
  res.json(await upstream.json());
}
