import axios from 'axios';
import { getCached, setCached } from './apiCache';

const THIRTY_SEC = 30 * 1000;

const getLiveMatchesData = async () => {
  const cached = getCached('liveMatches');
  if (cached) return cached;

  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key3;
  const options = {
    method: 'GET',
    url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live',
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    setCached('liveMatches', response.data, THIRTY_SEC);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export default getLiveMatchesData