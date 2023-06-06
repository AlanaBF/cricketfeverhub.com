import React, { useEffect, useState } from "react";
import getLiveMatchesData from "../../../utils/getLiveMatches_API";
import "../LiveMatches.css";
import ScoreTableRow from "../../ScoreTableRow/ScoreTableRow";
import MatchComms from "../../Comms/MatchComms";

const LiveMenLeagueMatches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatchesData = async () => {
      try {
        const data = await getLiveMatchesData();
        const matchesData = data.typeMatches;
        setMatches(matchesData);
      } catch (error) {
        console.log("Error fetching cricket match data:", error);
      }
    };

    fetchMatchesData();
  }, []);

  const isT20Blast2023Match = (match) => {
    return match.seriesMatchInfo?.seriesName === "T20 Blast 2023";
  };

  const filterT20Blast2023Matches = (matches) => {
    return matches.filter((matchType) =>
      matchType.seriesMatches.some((seriesMatch) =>
        seriesMatch.seriesAdWrapper?.matches.some(isT20Blast2023Match)
      )
    );
  };

  const filteredMatches = filterT20Blast2023Matches(matches);

  return (
    <div className="live-matches">
      <h1>Live Men's T20 Blast 2023 Matches</h1>
      {filteredMatches.length > 0 ? (
        filteredMatches.map((matchType, index) => (
          <div key={index} className="match-type-container">
            <h2>{matchType.matchType}</h2>
            {matchType.seriesMatches.map((seriesMatch, seriesIndex) => (
              <div key={seriesIndex} className="series-match-container">
                {seriesMatch.seriesAdWrapper?.matchFormat && (
                  <h3>{seriesMatch.seriesAdWrapper.matchFormat}</h3>
                )}
                {seriesMatch.seriesAdWrapper?.matches
                  .filter(isT20Blast2023Match)
                  .map((match, matchIndex) => (
                    <div key={matchIndex} className="match-container">
                      <p>
                        {match.matchInfo?.team1?.teamName} vs{" "}
                        {match.matchInfo?.team2?.teamName}
                      </p>
                      <table className="score-table">
                        <thead>
                          <tr>
                            <th>Innings</th>
                            <th>{match.matchInfo?.team1?.teamName}</th>
                            <th>{match.matchInfo?.team2?.teamName}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <ScoreTableRow
                            label="1"
                            team1Score={match.matchScore?.team1Score?.inngs1}
                            team2Score={match.matchScore?.team2Score?.inngs1}
                          />
                          <ScoreTableRow
                            label="2"
                            team1Score={match.matchScore?.team1Score?.inngs2}
                            team2Score={match.matchScore?.team2Score?.inngs2}
                          />
                        </tbody>
                      </table>
                      <MatchComms matchId={match.matchId} />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No live T20 Blast 2023 matches available.</p>
      )}
    </div>
  );
};

export default LiveMenLeagueMatches;