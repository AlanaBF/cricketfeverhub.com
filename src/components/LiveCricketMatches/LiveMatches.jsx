import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getLiveMatchesData from "../../utils/getLiveMatches_API";
import "../../assets/styles/components.css";
import "../../assets/styles/pages.css";
//import Map from "../../utils/Leaflet/Leaflet_API";
import { Button } from "react-bootstrap";
import CricketHero from "../../assets/Cricketbanner.jpeg";

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLiveMatchesData();
        const matchesData = data?.typeMatches.flatMap((typeMatch) =>
          typeMatch.seriesMatches.filter(
            (seriesMatch) => seriesMatch.seriesAdWrapper
          )
        );
        setMatches(matchesData);
      } catch (error) {
        console.error("Error fetching live matches data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = matches.flatMap(
      (seriesMatch) => seriesMatch.seriesAdWrapper.matches
    );
    setFilteredMatches(filteredData);
  }, [matches]);

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString();
  };

  return (
    <div className="live-matches">
      <img className="hero-image" src={CricketHero}></img>

      <br />
      <h1 className="pageTitle">Live Matches</h1>
      {filteredMatches.length > 0 ? (
        filteredMatches.map((match, index) => (
          <div key={index} className="match-container">
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
                    {convertTimestampToDate(match.matchInfo.startDate)}
                  </td>
                  <td className="live-match-table">
                    {convertTimestampToDate(match.matchInfo.endDate)}
                  </td>
                  <td className="live-match-table">{match.matchInfo.status}</td>
                </tr>
              </tbody>
            </table>

            {/* <Map venue={match.matchInfo.venueInfo} /> */}

            <Button
              onClick={() => navigate(`/scorecard/${match.matchInfo.matchId}`)}
            >
              View Scorecard
            </Button>
          </div>
        ))
      ) : (
        <p className="pageDescription">No live matches available.</p>
      )}
    </div>
  );
};

export default LiveMatches;
