import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import MatchCommentary from '../../components/Comms/MatchComms';
import MatchScorecard from '../../components/Scorecard/MatchScorecard';
import getLiveMatchesData from '../../utils/getLiveMatches_API';
import '../../assets/styles/pages.css';

function MatchInfo() {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const data = await getLiveMatchesData(matchId); // Fetch match data based on matchId
        setMatchData(data);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatchData();
  }, [matchId]);

  return (
    <div className="pageBackground">
      <h1 className="pageTitle">Match Info</h1>
      {/* <MatchScorecard matchId={matchId} /> */}
      {/* {matchData && <MatchCommentary matchData={matchData} />} */}
    </div>
  );
}

export default MatchInfo;



