import React from "react";

const ScoreTableRow = ({ label, team1Score, team2Score }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>
        <p>Runs: {team1Score?.runs}</p>
        <p>Wickets: {team1Score?.wickets}</p>
        <p>Overs: {team1Score?.overs}</p>
      </td>
      <td>
        <p>Runs: {team2Score?.runs}</p>
        <p>Wickets: {team2Score?.wickets}</p>
        <p>Overs: {team2Score?.overs}</p>
      </td>
    </tr>
  );
};

export default ScoreTableRow;
