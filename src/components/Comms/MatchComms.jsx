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
      {commentaryData.commentaryList &&
        commentaryData.commentaryList.length > 0 &&
        commentaryData.commentaryList.map((commentary, index) => (
          <div key={index}>
            <p>{commentary.commText}</p>
            <p>Timestamp: {timestampToTimeString(commentary.timestamp)}</p>
          </div>
        ))}
        
    </div>
  );
};

export default MatchCommentary;
