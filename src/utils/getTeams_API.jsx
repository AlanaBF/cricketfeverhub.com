import axios from "axios";

const GetTeamsData = async () => {
  const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key2;

  const options = {
    method: "GET",
    url: "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international",
    headers: {
      "X-RapidAPI-Key": VITE_RapidAPI_Key,
      "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
    },
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

export default GetTeamsData;
