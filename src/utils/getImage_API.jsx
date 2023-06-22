import axios from 'axios';

const getImages = async (ImageId) => {
  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key;

  const options = {
    method: 'GET',
    url: `https://cricbuzz-cricket.p.rapidapi.com/img/v1/c${ImageId}/i.jpg`,
    params: { p: 'de' },
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getImages;

