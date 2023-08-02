import React, { useEffect, useState } from "react";
import getLiveMatchesData from "../../utils/getLiveMatches_API";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../assets/styles/components.css";
import "../../assets/styles/pages.css";
import CricketHero from "../../assets/Cricketbanner.jpeg";

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState("");
  const [selectedMatch, setSelectedMatch] = useState(null);

  const navigate = useNavigate();

  const isDesiredSeriesMatch = (seriesMatch) => {
    const seriesName = seriesMatch.seriesAdWrapper?.seriesName;

    if (selectedSeries === "All") {
      return true; // Return true for all matches
    } else if (selectedSeries === "The Ashes, 2023") {
      return (
        seriesName === "The Ashes, 2023" || seriesName === "Womens Ashes, 2023"
      );
    } else {
      return seriesName && seriesName.includes(selectedSeries);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLiveMatchesData();
        setMatches(data.typeMatches); // Update the state with fetched match data
      } catch (error) {
        console.error("Error fetching upcoming matches data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter the matches based on criteria
    let filteredData = [];

    if (selectedSeries === "All") {
      filteredData = matches.reduce((filtered, typeMatch) => {
        const seriesMatches = typeMatch.seriesMatches || [];
        const filteredSeriesMatches = seriesMatches.reduce(
          (filteredSeries, seriesMatch) => {
            const seriesAdWrapper = seriesMatch.seriesAdWrapper;
            if (seriesAdWrapper && seriesAdWrapper.matches) {
              return [...filteredSeries, ...seriesAdWrapper.matches];
            }
            return filteredSeries;
          },
          []
        );
        return [...filtered, ...filteredSeriesMatches];
      }, []);
    } else {
      filteredData = matches.reduce((filtered, typeMatch) => {
        const seriesMatches = typeMatch.seriesMatches || [];
        const filteredSeriesMatches = seriesMatches.reduce(
          (filteredSeries, seriesMatch) => {
            const seriesAdWrapper = seriesMatch.seriesAdWrapper;
            if (
              isDesiredSeriesMatch(seriesMatch) &&
              seriesAdWrapper &&
              seriesAdWrapper.matches
            ) {
              return [...filteredSeries, ...seriesAdWrapper.matches];
            }
            return filteredSeries;
          },
          []
        );
        return [...filtered, ...filteredSeriesMatches];
      }, []);
    }

    // Sort matches by start date
    const sortedData = filteredData.sort((a, b) => {
      const timestampA = parseInt(a.matchInfo.startDate);
      const timestampB = parseInt(b.matchInfo.startDate);

      // Compare the timestamps
      return timestampA - timestampB;
    });

    setFilteredMatches(sortedData);
  }, [matches, selectedSeries]);

  const formatDate = (dateString) => {
    const date = new Date(parseInt(dateString));
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const seriesNames = [
    "All",
    "T20 Blast 2023",
    "County Championship Division One 2023",
    "Women",
    "The Ashes, 2023",
    "The Hundred Mens Competition 2023",
    "The Hundred Womens Competition 2023",
  ];

  const handleSeriesChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Women") {
      setSelectedSeries("Women");
    } else {
      setSelectedSeries(selectedValue);
    }
  };

  return (
    <div className="live-matches">
      <img className="hero-image" src={CricketHero}></img>

      <h1 className="pageTitle">Live Matches</h1>
      <div className="filter-container">
        <label className="pageDescription" htmlFor="series-select">
          Filter by Series:
        </label>
        <select
          id="series-select"
          value={selectedSeries}
          onChange={handleSeriesChange}
        >
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
            <div
              key={index}
              className="match-container"
              onClick={() => setSelectedMatch(match)}
            >
              <h2>
                {match.matchInfo?.team1?.teamName} vs{" "}
                {match.matchInfo?.team2?.teamName}
              </h2>
              <div className="teams-heading">
                {match.matchInfo.team1.teamName} vs{" "}
                {match.matchInfo.team2.teamName}
              </div>
              <div className="teams-subheading">
                {match.matchInfo.venueInfo.ground},{" "}
                {match.matchInfo.venueInfo.city}
              </div>
              <table className="live-match-container">
                <thead>
                  <tr className="live-match-table">
                    <th className="live-match-table">Series Name</th>
                    <th className="live-match-table">Match Format</th>
                    <th className="live-match-table">Start Date</th>
                    <th className="live-match-table">End Date</th>
                    <th className="live-match-table">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index}>
                    <td className="live-match-table">
                      {match.matchInfo.seriesName}
                    </td>
                    <td className="live-match-table">
                      {match.matchInfo.matchFormat}
                    </td>
                    <td className="live-match-table">
                      {formatDate(match.matchInfo.startDate)}
                    </td>
                    <td className="live-match-table">
                      {formatDate(match.matchInfo.endDate)}
                    </td>
                    <td className="live-match-table">
                      {match.matchInfo.status}
                    </td>
                  </tr>
                </tbody>
              </table>

              <Link
                to={`/scorecard/${match.matchInfo.matchId}`}
                state={{
                  matchData: match,
                  venueInfo: match.matchInfo.venueInfo,
                }}
              >
                <Button>View Scorecard</Button>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <p className="pageDescription">No live matches available.</p>
      )}
    </div>
  );
};

export default LiveMatches;
