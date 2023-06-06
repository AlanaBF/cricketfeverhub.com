import React, { useEffect, useState } from "react";
import getLiveMatchesData from "../../../utils/getLiveMatches_API";
import ScoreTableRow from "../../ScoreTableRow/ScoreTableRow";
import "../LiveMatches.css"; // Import CSS file for styling
import MatchComms from "../../Comms/MatchComms";

const LiveWomenMatches = () => {
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

  return (
    <div className="live-cricket-matches">
      <h1>Live Women's International Matches</h1>
      {matches.length === 0 ? (
        <p>No live matches available</p>
      ) : (
        <>
          {matches.some(
            (matchType) =>
              matchType.matchType === "Women"
          ) ? (
            matches
              .filter(
                (matchType) =>
                  matchType.matchType === "Women"
              )
              .map((matchType, index) => (
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
                            <MatchComms matchId={match.matchId} />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <p>No live matches available</p>
          )}
        </>
      )}
    </div>
  );
};

export default LiveWomenMatches;