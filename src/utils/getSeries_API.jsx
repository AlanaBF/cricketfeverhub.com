import { getCached, setCached } from './apiCache';

const FIVE_MIN = 5 * 60 * 1000;

const getSeriesList = async () => {
  const cached = getCached('seriesList');
  if (cached) return cached;

  const response = await fetch('/api/series');
  if (!response.ok) throw new Error(`Series API error: ${response.status}`);
  const data = await response.json();
  setCached('seriesList', data, FIVE_MIN);
  return data;
};

export default getSeriesList;
