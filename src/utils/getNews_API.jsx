import { getCached, setCached } from './apiCache';

const FIVE_MIN = 5 * 60 * 1000;

const getNewsData = async () => {
  const cached = getCached('news');
  if (cached) return cached;

  const response = await fetch('/api/news');
  if (!response.ok) throw new Error(`News API error: ${response.status}`);
  const data = await response.json();
  setCached('news', data, FIVE_MIN);
  return data;
};

export default getNewsData;
