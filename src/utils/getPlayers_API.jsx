import axios from 'axios';

const getPlayersData = async (playerName) => {
  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key;

  const options = {
    method: 'GET',
    url: 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search',
    params: { plrN: playerName },
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data; // Return the response data if needed for further processing
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it at the calling site
  }
};

export default getPlayersData;
