import React, { useState, useEffect } from "react";
import GetTeamsData from "../../utils/getTeams_API";
import CountryList from "../../components/TeamSelection/CountryList";
import CricketHero from "../../assets/Cricketbanner.jpeg";
import "../../assets/styles/pages.css";
import "../../assets/styles/components.css";


const TeamSelectionPage = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [teams, setTeams] = useState([]);
  const [countries, setCountries] = useState([]);
  const [schedules, setSchedules] = useState([]);

  // Fetch countries from API
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch countries from API
  const fetchCountries = async () => {
    try {
      const response = await GetTeamsData();
      const fetchedCountries = response.list;
      setCountries(fetchedCountries);
    } catch (error) {
      console.log("Error fetching countries:", error);
    }
  };

  // Handle country selection
  const handleCountryClick = async (country) => {
    setSelectedCountry(country);
    const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key;

    try {
      const response = await fetch(
        `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${country.teamId}/schedule`,
        {
          headers: {
            "X-RapidAPI-Key": VITE_RapidAPI_Key,
          },
        }
      );
      setSchedules(response.schedule);
    } catch (error) {
      console.log("Error fetching schedules:", error);
    }

    // Fetch teams based on countryId
    try {
      const response = await GetTeamsData();
      const fetchedTeams = response.list.filter(
        (team) => team.teamId === country.teamId
      );
      setTeams(fetchedTeams);
    } catch (error) {
      console.log("Error fetching teams:", error);
    }
  };

  return (
    <div className="pageBackground">
     
        <img className="hero-image" src={CricketHero}></img>
        <h1 className="heading">COMING SOON</h1>
        
  
      <br />
      <h1>Teams Page</h1>
      <br />
      <h1>COMING SOON</h1>
      {/* Render CountryList component */}
      {/* <CountryList
        countries={countries}
        selectedCountry={selectedCountry}
        handleCountryClick={handleCountryClick}
      /> */}

      {/* Display schedules */}
      {/* {schedules && schedules.length > 0 ? (
        <div>
          <h2>Schedules for {selectedCountry && selectedCountry.name}</h2>
          <ul>
            {schedules.map((schedule, index) => (
              <li key={index}>{schedule}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No schedules available</div>
      )} */}
    </div>
  );
};

export default TeamSelectionPage;
