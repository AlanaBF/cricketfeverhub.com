import axios from 'axios';

const getPlayerImages = async (playerImage) => {
  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key;

  const options = {
    method: 'GET',
    url: `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${playerImage}/i.jpg`,
    params: {p: 'de'},
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default getPlayerImages;
