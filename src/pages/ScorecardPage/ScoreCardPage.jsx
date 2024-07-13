import "../../assets/styles/pages.css";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import getScorecard from "../../utils/getScorecard_API";
//import MatchScorecard from "../../components/Scorecard/MatchScorecard";
import "../../assets/styles/components.css";
import LiveMatchScoreCard from "../../components/Scorecard/MatchScorecard";
import CricketHero from "../../assets/Cricketbanner.jpeg";

const ScorecardPage = () => {
  const { matchId } = useParams();
  const [scorecardData, setScorecardData] = useState(null);

  const location = useLocation();

  const fetchScorecardData = async () => {
    try {
      const response = await getScorecard(matchId);

      setScorecardData(response.data);
    } catch (error) {
      console.error("Error fetching scorecard data:", error);
    }
  };

  useEffect(() => {
    fetchScorecardData();
    // Set up polling to fetch new data every 30 seconds
    const interval = setInterval(fetchScorecardData, 30000);
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [matchId]);

  return (
    <div className="pageBackground">
      <div className="scorecard-page">
        <img className="hero-image" src={CricketHero}></img>

        <br />
        <h1 className="pageTitle">Scorecard Page</h1>
        <button className="btn btn-info" onClick={fetchScorecardData}>
          Refresh Scorecard
        </button>

        {scorecardData && (
          <LiveMatchScoreCard
            scoreCard={scorecardData.scoreCard}
            matchHeader={scorecardData.matchHeader}
            venueInfo={location.state?.venueInfo}
            matchId={matchId}
          />
        )}
      </div>
    </div>
  );
};

export default ScorecardPage;
