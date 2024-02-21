import axios from 'axios';

async function displayWeatherInfo(city) {
    const APIKey = import.meta.env.VITE_RapidAPI_Key_OpenWeatherAPI;
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;
    try {
        const response = await axios.get(queryURL);
        const iconcode = response.data.list[0].weather[0].icon;
        const iconURL = `http://openweathermap.org/img/w/${iconcode}.png`;
        $(".weather-icon").attr("src", iconURL);
        const tempC = Math.floor(response.data.list[0].main.temp - 273.15);
        const wind = response.data.list[0].wind.speed;
        const humidity = response.data.list[0].main.humidity;

        //append the data to web application
        $("#temperature").text(`Temp: ${tempC}°C`);
        $("#wind").text(`Wind Speed: ${wind}MPH`);
        $("#humidity").text(`Humidity: ${humidity}%`);
    } catch (error) {
        console.error(error);
    }
}

