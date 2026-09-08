import { getCached, setCached } from './apiCache';

const THIRTY_SEC = 30 * 1000;

const getLiveMatchesData = async () => {
  const cached = getCached('liveMatches');
  if (cached) return cached;

  const response = await fetch('/api/live-matches');
  if (!response.ok) throw new Error(`Live matches API error: ${response.status}`);
  const data = await response.json();
  setCached('liveMatches', data, THIRTY_SEC);
  return data;
};

export default getLiveMatchesData;
