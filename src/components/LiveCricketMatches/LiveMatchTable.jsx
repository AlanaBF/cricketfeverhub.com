import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const LiveMatchTable = ({ match }) => {
  return (
    <div className="live-match-table">
      <h2>Live Match Information</h2>
      <table>
        <tbody>
          <tr>
            <th>Match ID:</th>
            <td>{match.matchInfo.matchId}</td>
          </tr>
          <tr>
            <th>Series:</th>
            <td>{match.seriesMatches[0].seriesName}</td>
          </tr>
          <tr>
            <th>Format:</th>
            <td>{match.matchInfo.matchFormat}</td>
          </tr>
          <tr>
            <th>Description:</th>
            <td>{match.matchInfo.matchDesc}</td>
          </tr>
          <tr>
            <th>Start Date:</th>
            <td>{new Date(parseInt(match.matchInfo.startDate)).toLocaleString()}</td>
          </tr>
          <tr>
            <th>End Date:</th>
            <td>{new Date(parseInt(match.matchInfo.endDate)).toLocaleString()}</td>
          </tr>
          <tr>
            <th>State:</th>
            <td>{match.matchInfo.state}</td>
          </tr>
          <tr>
            <th>Status:</th>
            <td>{match.matchInfo.status}</td>
          </tr>
          <tr>
            <th>Team 1:</th>
            <td>{match.matchInfo.team1.teamName}</td>
          </tr>
          <tr>
            <th>Team 2:</th>
            <td>{match.matchInfo.team2.teamName}</td>
          </tr>
          <tr>
            <th>City:</th>
            <td>{match.matchInfo.venueInfo.city}</td>
          </tr>
          <tr>
            <th>Ground:</th>
            <td>{match.matchInfo.venueInfo.ground}</td>
          </tr>
          <tr>
            <th>Latitude:</th>
            <td>{match.matchInfo.venueInfo.latitude}</td>
          </tr>
          <tr>
            <th>Longitude:</th>
            <td>{match.matchInfo.venueInfo.longitude}</td>
          </tr>
        </tbody>
      </table>

      {/* Add a button to navigate to the MatchScorecard component */}
      <Link to={`/match/${match.matchInfo.matchId}`}>
        <button>View Scorecard</button>
      </Link>
     
      
    </div>
  );
};

export default LiveMatchTable;