import React, { useEffect, useState } from "react";
import { findCurrentMatch } from "./helpers";
import Map from "../../utils/Leaflet/Leaflet_API";
import getLiveMatchesData from "../../utils/getLiveMatches_API";
import fetchWeatherData from "../../utils/Weather/index";
import "./matchMap.css";

const generateFunForecast = (description, temp, wind, humidity) => {
    let funForecast = "It's a ";

    // Add temperature-related description
    if (temp > 30) {
        funForecast += "scorching hot day! ";
    } else if (temp > 20) {
        funForecast += "beautiful warm day! ";
    } else if (temp > 10) {
        funForecast += "pleasant day! ";
    } else if (temp > 0) {
        funForecast += "chilly day! ";
    } else {
        funForecast += "freezing cold day! ";
    }

    // Add weather condition description
    if (description.includes("rain")) {
        funForecast += "Don't forget your umbrella because it might rain. ";
    } else if (description.includes("cloud")) {
        funForecast += "Expect some clouds but no rain. ";
    } else if (description.includes("clear")) {
        funForecast += "The sky will be clear and blue. ";
    }

    // Add wind-related description
    if (wind > 20) {
        funForecast += "It's quite windy, so hold onto your hat!";
    } else if (wind > 10) {
        funForecast += "A nice breeze is blowing.";
    } else {
        funForecast += "Winds are calm and gentle.";
    }

    return funForecast;
};

const MatchMap = ({ matchId, venueInfo }) => {
  // State to hold venue details and weather data
  const [venueDetails, setVenueDetails] = useState(venueInfo);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchVenueAndWeatherData = async () => {
      try {
        let venue = venueInfo;

        if (!venue) {
          // Fetch live match data
          const data = await getLiveMatchesData();

          // Extract series matches data
          const matchesData = data?.typeMatches.flatMap((typeMatch) =>
            typeMatch.seriesMatches.filter(
              (seriesMatch) => seriesMatch.seriesAdWrapper
            )
          );

          // Find the current match based on matchId
          const currentMatch = findCurrentMatch(matchId, matchesData);

          // Update state with the venue information of the current match
          venue = currentMatch?.matchInfo?.venueInfo;
          setVenueDetails(venue);
        }

        if (venue?.city) {
          // Fetch weather data for the venue city
          const weather = await fetchWeatherData(venue.city);
          setWeatherData(weather);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVenueAndWeatherData();
  }, [matchId, venueInfo]);

  const renderWeather = weatherData ? (
    <div className="cloud-container">
      <img className="weather-icon" src={weatherData.iconURL} alt="Weather Icon" />
      <p style={{ color: "white" }}>Temp: {weatherData.tempC}°C</p>
      <p style={{ color: "white" }}>Wind Speed: {weatherData.wind} MPH</p>
      <p style={{ color: "white" }}>Humidity: {weatherData.humidity}%</p>
      <p style={{ color: "white" }}>{generateFunForecast(weatherData.description, weatherData.tempC, weatherData.wind, weatherData.humidity)}</p>
    </div>
  ) : (
    <p>Loading weather data...</p>
  );
  

  const renderMap = venueDetails ? (
    <div>
      <p style={{ color: "#fff" }}>
        Venue: {venueDetails.ground}, {venueDetails.city}
      </p>
      <Map venue={venueDetails} />
      {renderWeather}
    </div>
  ) : (
    <div>No Map Available</div>
  );

  return renderMap;
};

export default MatchMap;
