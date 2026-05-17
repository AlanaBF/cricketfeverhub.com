import axios from 'axios';

const getApiKey = () => import.meta.env.VITE_RapidAPI_Key2;
const BASE_URL = 'https://cricbuzz-cricket.p.rapidapi.com';

const getHeaders = () => ({
  'X-RapidAPI-Key': getApiKey(),
  'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
});

export const getSeriesMatches = async (seriesId) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/series/get-matches`,
    params: { seriesId },
    headers: getHeaders()
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching series matches:', error);
    throw error;
  }
};

export const getSeriesPointsTable = async (seriesId) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/series/get-points-table`,
    params: { seriesId },
    headers: getHeaders()
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching series points table:', error);
    throw error;
  }
};
