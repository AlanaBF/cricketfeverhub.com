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
          </div>
        ))}
        
    </div>
  );
};

export default MatchCommentary;
