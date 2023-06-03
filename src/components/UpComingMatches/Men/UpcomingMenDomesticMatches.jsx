import React, { useEffect, useState } from "react";
import getUpcomingMatchesData from "../../../utils/getUpcomingMatches_API";
import "../UpcomingMatches.css";

const UpcomingMenDomesticMatches = () => {
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

  const isCountyDiv1Match = (match) => {
    return match.matchInfo?.matchDesc === "County Div 1";
  };

  const filterCountyDiv1Matches = (matches) => {
    return matches.filter((matchType) =>
      matchType.seriesMatches.some((seriesMatch) =>
        seriesMatch.seriesAdWrapper?.matches.some(isCountyDiv1Match)
      )
    );
  };

  const filteredMatches = filterCountyDiv1Matches(matches);

  return (
    <div className="live-matches">
      <h1>Upcoming Men's County Div 1 Matches</h1>
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
                  .filter(isCountyDiv1Match)
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
        <p>No Upcoming County Div 1 matches available.</p>
      )}
    </div>
  );
};

export default UpcomingMenDomesticMatches;
