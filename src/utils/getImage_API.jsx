import axios from 'axios';

const getImages = async (coverImage) => {
  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key2;

  const options = {
    method: 'GET',
    url: `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${coverImage}/i.jpg`,
    params: { p: 'de' },
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getImages;

