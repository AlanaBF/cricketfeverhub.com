import React, { useEffect, useState } from 'react';
import getScorecard from '../../utils/getScorecard_API';
import Scorecard from './Scorecard';

const MatchScorecard = ({ matchId }) => {
  const [scorecardData, setScorecardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getScorecard(matchId);
        setScorecardData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [matchId]);

  return (
    <div>
      <h2>Match Scorecard</h2>
      <Scorecard scorecard={scorecardData} />
    </div>
  );
};

export default MatchScorecard;
