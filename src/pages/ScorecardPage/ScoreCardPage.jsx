import "../../assets/styles/pages.css";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import getScorecard from "../../utils/getScorecard_API";
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
    const pollingInterval = setInterval(fetchScorecardData, 30000);
    return () => clearInterval(pollingInterval);
  }, [matchId]);

  return (
    <div className="pageBackground">
      <div className="scorecard-page">
        <img className="hero-image" src={CricketHero} alt="Cricket players in action" />

        <h1 className="pageTitle">Scorecard Page</h1>
        <button
          className="btn btn-info"
          onClick={fetchScorecardData}
          aria-label="Refresh scorecard data"
        >
          Refresh Scorecard
        </button>

        {scorecardData && (
          <LiveMatchScoreCard
            scoreCard={scorecardData.scorecard}
            matchHeader={scorecardData.matchHeader}
            venueInfo={location.state?.venueInfo}
            matchId={matchId}
            matchStatus={scorecardData.status}
          />
        )}
      </div>
    </div>
  );
};

export default ScorecardPage;
