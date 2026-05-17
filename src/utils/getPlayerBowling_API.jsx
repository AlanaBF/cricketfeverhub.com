import axios from 'axios';

const getPlayerBowling = async (playerId) => {
  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key5;

  const options = {
    method: 'GET',
    url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${playerId}/bowling`,
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching player bowling stats:', error);
    throw error;
  }
};

export default getPlayerBowling;
