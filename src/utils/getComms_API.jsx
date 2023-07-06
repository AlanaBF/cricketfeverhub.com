import axios from 'axios';

const getComms = async (matchId) => {
  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key;

  const options = {
    method: 'GET',
    url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/comm`,
    headers: {
      'X-RapidAPI-Key': VITE_RapidAPI_Key,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data)
    return response.data; // Return the data to the caller
  } catch (error) {
    console.error(error);
    throw error; // Throw the error to the caller
  }
};

export default getComms;

