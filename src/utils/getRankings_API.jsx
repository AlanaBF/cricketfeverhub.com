import { getCached, setCached } from './apiCache';

const FIVE_MIN = 5 * 60 * 1000;

const getRankings = async (category = 'batsmen', formatType = 'test') => {
  const cacheKey = `rankings-${category}-${formatType}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({ category, formatType });
  const response = await fetch(`/api/rankings?${params}`);
  if (!response.ok) throw new Error(`Rankings API error: ${response.status}`);
  const data = await response.json();
  setCached(cacheKey, data, FIVE_MIN);
  return data;
};

export default getRankings;
