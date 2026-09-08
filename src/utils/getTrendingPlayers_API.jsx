import axios from 'axios';
import { getCached, setCached } from './apiCache';

const FIVE_MIN = 5 * 60 * 1000;

const getTrendingPlayers = async () => {
  const cached = getCached('trendingPlayers');
  if (cached) return cached;

  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key3;

  const options = {
    method: 'GET',
    url: 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/trending',
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    setCached('trendingPlayers', response.data, FIVE_MIN);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending players:', error);
    throw error;
  }
};

export default getTrendingPlayers;
