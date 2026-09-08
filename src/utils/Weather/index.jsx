const fetchWeatherData = async (city) => {
  try {
    const params = new URLSearchParams({ city: city.trim() });
    const response = await fetch(`/api/weather?${params}`);
    if (!response.ok) return null;
    const data = await response.json();

    const weatherData = data.list[0];
    const iconURL = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const tempC = Math.floor(weatherData.main.temp - 273.15);
    const wind = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    const description = weatherData.weather[0].description;

    return { iconURL, tempC, wind, humidity, description };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export default fetchWeatherData;
