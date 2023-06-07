import React, { useEffect, useState } from 'react';
import getScorecard from '../../utils/getScorecard_API';

function MatchScorecard({ matchId }) {
  const [scorecard, setScorecard] = useState(null);

  useEffect(() => {
    const fetchScorecard = async () => {
      try {
        const scorecardData = await getScorecard(matchId);
        console.log('Received scorecard data:', scorecardData);
        setScorecard(scorecardData);
      } catch (error) {
        console.error('Error fetching scorecard data:', error);
      }
    };

    fetchScorecard();
  }, [matchId]);

  if (!scorecard) {
    return <div>Loading scorecard...</div>;
  }

  console.log('Rendering scorecard:', scorecard);

  const {
    matchDescription,
    batTeamName,
    bowlTeamName,
    inningsData,
    result
  } = scorecard;

  const renderPlayerData = (playersData) => {
    return playersData.map((player) => (
      <tr key={player.batId}>
        <td>{player.batName}</td>
        <td>{player.runs}</td>
        <td>{player.balls}</td>
        <td>{player.fours}</td>
        <td>{player.sixes}</td>
        <td>{player.strikeRate}</td>
      </tr>
    ));
  };

  const renderBowlerData = (bowlersData) => {
    return bowlersData.map((bowler) => (
      <tr key={bowler.bowlerId}>
        <td>{bowler.bowlName}</td>
        <td>{bowler.overs}</td>
        <td>{bowler.runs}</td>
        <td>{bowler.wickets}</td>
        <td>{bowler.economy}</td>
      </tr>
    ));
  };

  const renderInningsData = (inningsData) => {
    return inningsData.map((innings) => (
      <div key={innings.inningsId}>
        <h3>{innings.batTeamName} Innings ({innings.overs} overs)</h3>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Runs</th>
              <th>Balls</th>
              <th>4s</th>
              <th>6s</th>
              <th>Strike Rate</th>
            </tr>
          </thead>
          <tbody>
            {renderPlayerData(innings.batsmenData)}
          </tbody>
        </table>
        <p>Total: {innings.runs}/{innings.wickets}</p>
        <p>Extras: {innings.extrasData.total} ({innings.extrasData.wides} wides, {innings.extrasData.byes} byes)</p>
        <p>Fall of Wickets:</p>
        <ul>
          {innings.wicketsData.map((wicket) => (
            <li key={wicket.wktNbr}>{wicket.batName} - {wicket.wktRuns} ({wicket.wktOver})</li>
          ))}
        </ul>
      </div>
    ));
  };

  const renderBowlingFigures = (inningsData) => {
    return inningsData.map((innings) => (
      <div key={innings.inningsId}>
        <h3>{innings.bowlTeamName} Bowling Figures</h3>
        <table>
          <thead>
            <tr>
              <th>Bowler</th>
              <th>Overs</th>
              <th>Runs</th>
              <th>Wickets</th>
              <th>Economy</th>
            </tr>
          </thead>
          <tbody>
            {renderBowlerData(innings.bowlersData)}
          </tbody>
        </table>
      </div>
    ));
  };

  return (
    <div>
      <h2>{matchDescription}</h2>
      <h3>{batTeamName} vs {bowlTeamName}</h3>
      {renderInningsData(inningsData)}
      {renderBowlingFigures(inningsData)}
      <h3>Result: {result.resultType}</h3>
      <p>{result.winningTeam} won by {result.winningMargin} runs/innings.</p>
      <p>Player of the Match: {result.playersOfTheMatch[0].name}</p>
    </div>
  );
}

export default MatchScorecard;
