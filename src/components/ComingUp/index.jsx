import React, { useEffect, useState } from "react";
import getUpcomingMatchesData from "../../utils/getUpcomingMatches_API";

const UpcomingCricketMatches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatchesData = async () => {
      try {
        const data = await getUpcomingMatchesData();
        console.log("Data:", data); // Log the retrieved data
        const matchesData = data.typeMatches;
        console.log("Matches Data:", matchesData); // Log the matches data
        setMatches(matchesData);
      } catch (error) {
        console.log("Error fetching cricket match data:", error);
      }
    };

    fetchMatchesData();
  }, []);

  return (
    <div>
      <h1>Upcoming Cricket Matches</h1>
      {matches
        .filter(
          (matchType) =>
            matchType.matchType === "International" ||
            matchType.matchType === "Women"
        )
        .map((matchType, index) => (
          <div key={index}>
            <h2>{matchType.matchType}</h2>
            {matchType.seriesMatches.map((seriesMatch, index) => (
              <div key={index}>
                {seriesMatch.seriesAdWrapper && seriesMatch.seriesAdWrapper.seriesName && (
                  <h3>{seriesMatch.seriesAdWrapper.seriesName}</h3>
                )}
                {seriesMatch.seriesAdWrapper &&
                  seriesMatch.seriesAdWrapper.matches.map((match, index) => (
                    <div key={index}>
                      {match.matchInfo.team1 && match.matchInfo.team2 && (
                        <p>{match.matchInfo.team1.teamName} vs {match.matchInfo.team2.teamName}</p>
                      )}
                      {match.matchInfo && <p>Status: {match.matchInfo.status}</p>}
                      {/* Display other match details */}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default UpcomingCricketMatches;
