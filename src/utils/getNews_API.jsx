import axios from 'axios';

const GetNewsData = async () => {
  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key;

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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default GetNewsData;

