import React, { useEffect, useState } from "react";
import getUpcomingMatchesData from "../../../utils/getUpcomingMatches_API";
import "../UpcomingMatches.css"; // Import CSS file for styling


const UpcomingWomenMatches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatchesData = async () => {
      try {
        const data = await getUpcomingMatchesData();
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
      <h1>Upcoming Women's International Matches</h1>
      {matches.length === 0 ? (
        <p>No Upcoming matches available</p>
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
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <p>No Upcoming matches available</p>
          )}
        </>
      )}
    </div>
  );
};

export default UpcomingWomenMatches;
