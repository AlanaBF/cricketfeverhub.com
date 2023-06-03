import React, { useEffect, useState } from "react";
import getUpcomingMatchesData from "../../../utils/getUpcomingMatches_API";
import "../UpcomingMatches.css";

const UpcomingMenInternationalMatches = () => {
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
      <h1>Upcoming Men's International Matches</h1>
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
        <p>No Upcoming International Matches available</p>
      )}
    </div>
  );
};

export default UpcomingMenInternationalMatches;

