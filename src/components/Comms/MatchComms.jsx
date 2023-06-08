import React, { useEffect, useState } from "react";
import getComms from "../../utils/getComms_API";

const MatchCommentary = ({matchId}) => {
  const [commentaryData, setCommentaryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getComms(matchId);
        setCommentaryData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [matchId]);

  return (
    <div>
      <h2>Match Commentary</h2>
      <div>
        {commentaryData.matchHeader &&
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
        commentaryData.commentaryList.map((commentary, index) => (
          <div key={index}>
            <p>{commentary.commText}</p>
            <p>Timestamp: {commentary.timestamp}</p>
            <p>Ball Number: {commentary.ballNbr}</p>
            <p>Over Number: {commentary.overNumber}</p>
            <p>Innings ID: {commentary.inningsId}</p>
            <p>Event: {commentary.event}</p>
            <p>Batting Team Name: {commentary.batTeamName}</p>
            <p>Bold Format: {commentary.commentaryFormats.bold.formatValue}</p>
            <hr />
          </div>
        ))}
        {commentaryData.responseLastUpdated &&
        commentaryData.responseLastUpdated.map((update, index) => (
          <div key={index}>
        <div><p>Last Updated: {update}</p></div>
    </div>))}
    </div>
  );
};

export default MatchCommentary;
