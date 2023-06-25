import axios from 'axios';

const getPlayerProfile = async (batId) => {
    
      const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key;
      
      const options = {
        method: 'GET',
        url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${batId}`,
        headers: {
          'X-RapidAPI-Key': VITE_RapidAPI_Key,
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
    };

try {
      const response = await axios.request(options);
      const playerInfo = response.data;
        console.log(playerInfo);
        return playerInfo
      // Process the playerInfo as per your requirement
    
    } catch (error) {
      console.error(error);
    }
  };

export default getPlayerProfile