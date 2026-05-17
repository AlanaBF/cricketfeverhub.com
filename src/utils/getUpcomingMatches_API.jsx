import axios from 'axios';

const getUpcomingMatchesData = async () => {
  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key4;

  const options = {
    method: 'GET',
    url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming',
    headers: {
      'x-rapidapi-key': VITE_RapidAPI_Key,
      'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming matches data:', error);
    throw error;
  }
};

export default getUpcomingMatchesData;
