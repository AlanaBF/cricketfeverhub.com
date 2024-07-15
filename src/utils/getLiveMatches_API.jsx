import axios from 'axios';

const getLiveMatchesData = async () => {
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
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export default getLiveMatchesData