import React, { useEffect, useState } from "react";
import getUpcomingMatchesData from "../../utils/getUpcomingMatches_API";
import "./UpcomingMatches.css";

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUpcomingMatchesData();
        setMatches(data.typeMatches); // Update the state with fetched match data
      } catch (error) {
        console.error("Error fetching upcoming matches data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter the matches based on criteria
    const filteredData = matches.reduce((filtered, typeMatch) => {
      const seriesMatches = typeMatch.seriesMatches;
      const filteredSeriesMatches = seriesMatches.reduce((filteredSeries, seriesMatch) => {
        if (isDesiredSeriesMatch(seriesMatch)) {
          return [...filteredSeries, ...seriesMatch.seriesAdWrapper.matches];
        }
        return filteredSeries;
      }, []);
      return [...filtered, ...filteredSeriesMatches];
    }, []);

    // Sort matches by start date
    const sortedData = filteredData.sort((a, b) => {
      const dateA = new Date(a.matchInfo.startDate);
      const dateB = new Date(b.matchInfo.startDate);
      return dateA - dateB;
    });

    setFilteredMatches(sortedData);
  }, [matches, selectedSeries]);

  const isDesiredSeriesMatch = (seriesMatch) => {
    const seriesName = seriesMatch.seriesAdWrapper?.seriesName;
    const matchType = seriesMatch.matchInfo?.matchType;
  
    if (selectedSeries === "All") {
      return (
        matchType === "International" ||
        (seriesName && seriesName.includes("Women")) ||
        seriesName === "The Ashes, 2023"
      );
    } else {
      return seriesName === selectedSeries || (seriesName && seriesName.includes("Women"));
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(parseInt(dateString));
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const seriesNames = [
    "T20 Blast 2023",
    "County Championship Division One 2023",
    "Women's Matches",
    "The Ashes, 2023",
  ];

  const handleSeriesChange = (event) => {
    setSelectedSeries(event.target.value);
  };

  return (
    <div className="live-matches">
      <h1>Upcoming Matches</h1>
      <div className="filter-container">
        <label htmlFor="series-select">Filter by Series:</label>
        <select id="series-select" value={selectedSeries} onChange={handleSeriesChange}>
          {seriesNames.map((series, index) => (
            <option key={index} value={series}>
              {series}
            </option>
          ))}
        </select>
      </div>
      {filteredMatches.length > 0 ? (
        <>
          {filteredMatches.map((match, index) => (
            <div key={index} className="match-container">
              <p>
                {match.matchInfo.team1.teamName} vs {match.matchInfo.team2.teamName}
              </p>
              <p>{formatDate(match.matchInfo.startDate)}</p>
            </div>
          ))}
        </>
      ) : (
        <p>No upcoming matches available.</p>
      )}
    </div>
  );
};

export default UpcomingMatches;
