import axios from 'axios';
import { getCached, setCached } from './apiCache';

const FIVE_MIN = 5 * 60 * 1000;

const getRankings = async (category = 'batsmen', formatType = 'test') => {
  const cacheKey = `rankings-${category}-${formatType}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key1;

  const options = {
    method: 'GET',
    url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/${category}`,
    params: { formatType },
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    setCached(cacheKey, response.data, FIVE_MIN);
    return response.data;
  } catch (error) {
    console.error('Error fetching rankings:', error);
    throw error;
  }
};

export default getRankings;
