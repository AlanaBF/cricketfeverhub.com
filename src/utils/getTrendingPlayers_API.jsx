import { getCached, setCached } from './apiCache';

const FIVE_MIN = 5 * 60 * 1000;

const getTrendingPlayers = async () => {
  const cached = getCached('trendingPlayers');
  if (cached) return cached;

  const response = await fetch('/api/trending-players');
  if (!response.ok) throw new Error(`Trending players API error: ${response.status}`);
  const data = await response.json();
  setCached('trendingPlayers', data, FIVE_MIN);
  return data;
};

export default getTrendingPlayers;
