import React, { useEffect, useState } from "react";
import getLiveMatchesData from "../../utils/getLiveMatches_API";
import { Link } from "react-router-dom"; // Step 1: Import Link component
import "./LiveMatches.css";

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);

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
    // Filter live matches
    const filteredData = matches.flatMap(
      (seriesMatch) => seriesMatch.seriesAdWrapper.matches
    );
    setFilteredMatches(filteredData);
  }, [matches]);

  return (
    <div className="live-matches">
      <h1>Live Matches</h1>
      {filteredMatches.length > 0 ? (
        filteredMatches.map((match, index) => (
          <div key={index} className="match-container">  
              <p>
                {match.matchInfo.team1.teamName} vs{" "}
                {match.matchInfo.team2.teamName}
              </p>
              <p>{match.matchInfo.seriesName}</p>
              <p>Match Format: {match.matchInfo.matchFormat}</p>
             <table className="score-table">
<thead>
  <tr>
    <th>Innings</th>
    <th>{match.matchInfo.team1.teamName}</th>
    <th>{match.matchInfo.team2.teamName}</th>
  </tr>
</thead>
<tbody>
  {match.matchScore ? (
    <>
      <tr>
        <td>1</td>
        <td>
          <li>
            Runs: {match.matchScore.team1Score?.inngs1?.runs}
          </li>
          <li>
            Wickets:{" "}
            {match.matchScore.team1Score?.inngs1?.wickets}
          </li>
          <li>
            Overs: {match.matchScore.team1Score?.inngs1?.overs}
          </li>
        </td>

        <td>
          <li>
            Runs: {match.matchScore.team2Score?.inngs1?.runs}
          </li>
          <li>
            Wickets:{" "}
            {match.matchScore.team2Score?.inngs1?.wickets}
          </li>
          <li>
            Overs: {match.matchScore.team2Score?.inngs1?.overs}
          </li>
        </td>
      </tr>

      <tr>
        <td>2</td>
        <td>
          <li>
            Runs: {match.matchScore.team1Score?.inngs2?.runs}
          </li>
          <li>
            Wickets:{" "}
            {match.matchScore.team1Score?.inngs2?.wickets}
          </li>
          <li>
            Overs: {match.matchScore.team1Score?.inngs2?.overs}
          </li>
        </td>

        <td>
          <li>
            Runs: {match.matchScore.team2Score?.inngs2?.runs}
          </li>
          <li>
            Wickets:{" "}
            {match.matchScore.team2Score?.inngs2?.wickets}
          </li>
          <li>
            Overs: {match.matchScore.team2Score?.inngs2?.overs}
          </li>
        </td>
      </tr>
    </>
  ) : (
    <tr>
      <td colSpan="3">Match score not available</td>
    </tr>
  )}
</tbody>
</table>

<Link to={`/match/${match.matchInfo.matchId}`}>
  <button>Go to Match Info</button>
</Link>

          </div>
        ))
      ) : (
        <p>No live matches available.</p>
      )}
    </div>
  );
};

export default LiveMatches;


