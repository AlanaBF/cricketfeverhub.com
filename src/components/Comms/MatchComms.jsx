import React, { useEffect, useState } from "react";
import getComms from "../../utils/getComms_API";
import "../../assets/styles/components.css";

const MatchComms = ({ matchId }) => {
  const [comms, setComms] = useState([]);

  useEffect(() => {
    const fetchComms = async () => {
      try {
        const data = await getComms(matchId);
        const matchComms = data.commentaryList.filter((item) => item.commText);
        setComms(matchComms);
      } catch (error) {
        console.error("Error fetching cricket commentary data:", error);
      }
    };

    fetchComms();
  }, [matchId]);

  return (
    <div>
      {comms.map((item) => {
        // Convert timestamp to Date object
        const timestamp = new Date(item.timeStamp);
  
        // Format the timestamp as desired (e.g., using toLocaleString)
        const formattedTimestamp = timestamp.toLocaleString();
  
        return (
          <div key={item.timeStamp}>
            <div>{formattedTimestamp}</div>
            <div>{item.commText}</div>
            <div>{item.author}</div>
            {/* Add more details as needed */}
          </div>
        );
      })}
    </div>
  );
};

export default MatchComms;

