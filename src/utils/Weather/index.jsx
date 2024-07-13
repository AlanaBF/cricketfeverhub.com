import axios from 'axios';

const fetchWeatherData = async (city) => {
    const APIKey = import.meta.env.VITE_RapidAPI_Key_Weather;
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;
    try {
        const response = await axios.get(queryURL);
        const weatherData = response.data.list[0];
        const iconURL = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
        const tempC = Math.floor(weatherData.main.temp - 273.15);
        const wind = weatherData.wind.speed;
        const humidity = weatherData.main.humidity;
        const description = weatherData.weather[0].description;

        return {
            iconURL,
            tempC,
            wind,
            humidity,
            description,
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

export default fetchWeatherData;