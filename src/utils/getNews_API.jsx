import axios from 'axios';

const getNewsData = async () => {
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
    return response.data;
  } catch (error) {
    console.error('Error fetching news data:', error);
    throw error;
  }
};

export default getNewsData;
