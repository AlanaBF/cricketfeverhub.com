import axios from 'axios';

const getRankings = async (category = 'batsmen', formatType = 'test') => {
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
    return response.data;
  } catch (error) {
    console.error('Error fetching rankings:', error);
    throw error;
  }
};

export default getRankings;
