import axios from 'axios';

const getScorecard = async (matchId) => {
  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key6;
  const options = {
    method: 'GET',
    url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/hscard`,
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getScorecard;