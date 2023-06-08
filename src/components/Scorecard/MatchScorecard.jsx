import React, { useEffect, useState } from 'react';
import getScorecard from '../../utils/getScorecard_API';

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
      <div>
      {scorecardData.map((inning, index) => (
        <div key={index}>
          <h3>Inning {index + 1}</h3>
          <div>
            <h4>Batting Figures:</h4>
            <table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Runs</th>
                  <th>Balls</th>
                </tr>
              </thead>
              <tbody>
                {inning.battingFigures.map((player, index) => (
                  <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.runs}</td>
                    <td>{player.balls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h4>Bowling Figures:</h4>
            <table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Overs</th>
                  <th>Runs</th>
                  <th>Wickets</th>
                </tr>
              </thead>
              <tbody>
                {inning.bowlingFigures.map((player, index) => (
                  <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.overs}</td>
                    <td>{player.runs}</td>
                    <td>{player.wickets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default MatchScorecard;
