import axios from 'axios';
import { getCached, setCached } from './apiCache';

const FIVE_MIN = 5 * 60 * 1000;

const getNewsData = async () => {
  const cached = getCached('news');
  if (cached) return cached;

  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key4;

  const options = {
    method: 'GET',
    url: 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index',
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    setCached('news', response.data, FIVE_MIN);
    return response.data;
  } catch (error) {
    console.error('Error fetching news data:', error);
    throw error;
  }
};

export default getNewsData;
