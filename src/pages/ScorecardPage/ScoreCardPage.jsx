import '../../assets/styles/pages.css'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getScorecard from "../../utils/getScorecard_API";
//import MatchScorecard from "../../components/Scorecard/MatchScorecard";
import "../../assets/styles/components.css"
import LiveMatchScoreCard from '../../components/Scorecard/practice';

const ScorecardPage = () => {
  const { matchId } = useParams();
  const [scorecardData, setScorecardData] = useState(null);

  useEffect(() => {
    const fetchScorecardData = async () => {
      try {
        const response = await getScorecard(matchId);
        setScorecardData(response.data);
      } catch (error) {
        console.error("Error fetching scorecard data:", error);
      }
    };

    fetchScorecardData();
  }, [matchId]);

  return (
    <div className="pageBackground">
      <h1 className='pageTitle'>Scorecard Page</h1>
      
      {scorecardData && (
        <LiveMatchScoreCard
          scoreCard={scorecardData.scoreCard}
          matchHeader={scorecardData.matchHeader}
        />
      )}


    </div>
  );
};

export default ScorecardPage;
