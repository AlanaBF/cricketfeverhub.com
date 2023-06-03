import React, { useEffect, useState } from "react";
import getUpcomingMatchesData from "../../utils/getUpcomingMatches_API";

const MatchDetails = ({ match }) => {
  const team1 = match.matchInfo?.team1;
  const team2 = match.matchInfo?.team2;

  return (
    <div>
      {team1 && team2 && (
        <p>
          {team1.teamName} vs {team2.teamName}
        </p>
      )}
      <p>{match.matchInfo.matchDesc}</p>
      <p>{match.matchInfo.matchFormat}</p>
    </div>
  );
};

const MatchDate = ({ timestamp }) => {
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <p>Start Date: {convertTimestampToDate(timestamp)}</p>
  );
};

const UpcomingCricketMatches = () => {
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

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };
 
    return (
      <div>
        <h1>Upcoming Cricket Matches</h1>
        {matches
          .filter((matchType) =>
            matchType.seriesMatches.some((seriesMatch) =>
              seriesMatch.seriesAdWrapper?.matches.some(
                ({ matchInfo }) =>
                  matchInfo?.team1?.teamName === "England" ||
                  matchInfo?.team2?.teamName === "England"
              )
            )
          )
          .map((matchType, index) => (
            <div key={index}>
              <h2>{matchType.matchType}</h2>
              {matchType.seriesMatches.map((seriesMatch, seriesIndex) => (
                <div key={seriesIndex}>
                  {seriesMatch.seriesAdWrapper?.seriesName && (
                    <h3>{seriesMatch.seriesAdWrapper.seriesName}</h3>
                  )}
                  {seriesMatch.seriesAdWrapper?.matches.map(
                    (match, matchIndex) =>
                      (match.matchInfo?.team1?.teamName === "England" ||
                        match.matchInfo?.team2?.teamName === "England") && (
                        <div key={matchIndex}>
                          <MatchDetails match={match} />
                          {match.matchInfo.startDate && (
                            <MatchDate timestamp={match.matchInfo.startDate} />
                          )}
                          {match.matchInfo.endDate && (
                            <MatchDate timestamp={match.matchInfo.endDate} />
                          )}
                        </div>
                      )
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
    );
  };


export default UpcomingCricketMatches;
