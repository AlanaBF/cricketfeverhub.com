import axios from 'axios';

const getSeriesList = async () => {
  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key2;

  const options = {
    method: 'GET',
    url: 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/international',
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching series list:', error);
    throw error;
  }
};

export default getSeriesList;
