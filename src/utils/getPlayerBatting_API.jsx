import axios from 'axios';

const getPlayerBatting = async (playerId) => {
  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key5;

  const options = {
    method: 'GET',
    url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${playerId}/batting`,
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching player batting stats:', error);
    throw error;
  }
};

export default getPlayerBatting;
