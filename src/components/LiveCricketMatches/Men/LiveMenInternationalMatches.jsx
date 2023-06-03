import React, { useEffect, useState } from "react";
import getLiveMatchesData from "../../../utils/getLiveMatches_API";
import "../LiveMatches.css";
import ScoreTableRow from "../../ScoreTableRow/ScoreTableRow";

const LiveMenInternationalMatches = () => {
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

  const isEnglandMatch = (team1, team2) => {
    return (
      (team1 && team1.teamName === "England") ||
      (team2 && team2.teamName === "England")
    );
  };

  const isEnglishTournament = (seriesMatch) => {
    return seriesMatch.seriesAdWrapper?.matches.some((match) =>
      isEnglandMatch(match.matchInfo?.team1, match.matchInfo?.team2)
    );
  };

  const filterEnglandMatches = (matches) => {
    return matches.filter((matchType) =>
      matchType.seriesMatches.some((seriesMatch) =>
        isEnglishTournament(seriesMatch)
      )
    );
  };

  const filteredMatches = filterEnglandMatches(matches);

  return (
    <div className="live-matches">
      <h1>Live Men's International Matches</h1>
      {filteredMatches.map((matchType, index) => (
        <div key={index} className="match-type-container">
          <h2>{matchType.matchType}</h2>
          {matchType.seriesMatches.map((seriesMatch, seriesIndex) => (
            <div key={seriesIndex} className="series-match-container">
              {seriesMatch.seriesAdWrapper?.matchFormat && (
                <h3>{seriesMatch.seriesAdWrapper.matchFormat}</h3>
              )}
              {seriesMatch.seriesAdWrapper?.matches
                .filter(
                  ({ matchInfo }) =>
                    matchInfo?.team1?.teamName === "England" ||
                    matchInfo?.team2?.teamName === "England"
                )
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
                  </div>
                ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LiveMenInternationalMatches;
