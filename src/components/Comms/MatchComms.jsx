import React, { useEffect, useState } from "react";
import getComms from "../../utils/getComms_API";

const MatchCommentary = ({ matchId }) => {
  const [commentaryData, setCommentaryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommentaryData = async () => {
      try {
        const data = await getComms(matchId);
        setCommentaryData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCommentaryData();
  }, [matchId]);

  const timestampToTimeString = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Match Commentary</h2>
      <div>
        {commentaryData.matchHeader &&
          commentaryData.matchHeader.length > 0 &&
          commentaryData.matchHeader.map((header, index) => (
            <div key={index}>
              <p>
                {header.matchType} {header.matchFormat}{" "}
                {header.matchDescription}
              </p>
              <p>
                {header.tossResults.tossWinnerName}, chose{" "}
                {header.tossResults.decision}
              </p>
              <p>
                {header.team1.name} vs {header.team2.name}
              </p>
              <p>{header.status}</p>
            </div>
          ))}
      </div>
      {commentaryData.commentaryList &&
        commentaryData.commentaryList.length > 0 &&
        commentaryData.commentaryList.map((commentary, index) => (
          <div key={index}>
            <p>{commentary.commText}</p>
            <p>Timestamp: {timestampToTimeString(commentary.timestamp)}</p>
            <p>Ball Number: {commentary.ballNbr}</p>
            <p>Over Number: {commentary.overNumber}</p>
            <p>Innings ID: {commentary.inningsId}</p>
            <p>Event: {commentary.event}</p>
            <p>Batting Team Name: {commentary.batTeamName}</p>
            <hr />
          </div>
        ))}
      {Array.isArray(commentaryData.responseLastUpdated) &&
        commentaryData.responseLastUpdated.length > 0 && (
          <div>
            {commentaryData.responseLastUpdated.map((update, index) => (
              <div key={index}>
                <p>Last Updated: {update}</p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default MatchCommentary;
