import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMatchCommentary from '../../utils/getComms_API';
import './Commentary.css';
import CricketHero from "../../assets/Cricketbanner.jpeg";
import Cricketbanner from "../../assets/Cricketbanner.png";

function Commentary() {
  const { matchId } = useParams();
  const [commentaryData, setCommentaryData] = useState(null);

  const fetchMatchCommentary = async () => {
    try {
      const data = await getMatchCommentary(matchId);
      setCommentaryData(data);
    } catch (error) {
      console.error('Error fetching commentary data:', error);
    }
  };

  useEffect(() => {
    fetchMatchCommentary();

    // Set up polling to fetch new data every 30 seconds
    const interval = setInterval(fetchMatchCommentary, 30000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [matchId]);

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  const formatCommentaryText = (commText, commentaryFormats) => {
    if (commentaryFormats && commentaryFormats.bold) {
      commentaryFormats.bold.formatId.forEach((formatId, index) => {
        const formatValue = commentaryFormats.bold.formatValue[index];
        commText = commText.replace(formatId, formatValue);
      });
    }

    // Split the text on '\n' and return as an array of React Fragments with line breaks
    return commText.split('\\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const renderMatchSummary = () => {
    const { matchHeader, miniscore } = commentaryData;

    // Check if miniscore and required properties exist
    if (!miniscore) {
      return <div className="pageDescription">Match summary is not available.</div>;
    }
    return (
        <table className="match-summary-table">
        <thead>
          <tr>
            <th>Key Info</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Match Description</td>
            <td>{matchHeader.matchDescription}</td>
          </tr>
          <tr>
            <td>Match Status</td>
            <td>{matchHeader.status}</td>
          </tr>
          <tr>
            <td>Winning Team</td>
            <td>{matchHeader.result.winningTeam}</td>
          </tr>
          <tr>
            <td>Winning Margin</td>
            <td>{matchHeader.result.winningMargin}</td>
          </tr>
          <tr>
            <td>Current Score</td>
            <td>{`${miniscore.batTeam.teamScore} / ${miniscore.batTeam.teamWkts}`}</td>
          </tr>
          <tr>
            <td>Target</td>
            <td>{miniscore.target}</td>
          </tr>
          <tr>
            <td>Current Run Rate</td>
            <td>{miniscore.currentRunRate}</td>
          </tr>
          <tr>
            <td>Required Run Rate</td>
            <td>{miniscore.requiredRunRate}</td>
          </tr>
          <tr>
            <td>Overs</td>
            <td>{miniscore.overs}</td>
          </tr>
          <tr>
            <td>Last Wicket</td>
            <td>{miniscore.lastWicket}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero}></img>

      <br />
      <h1 className="pageDescription" style={{ fontSize: "3rem" }}>Match Commentary</h1>
      <p className="pageDescription">Bowling figures format: [overs-maidens-runs-wickets]</p>
      <button className="btn btn-info" onClick={fetchMatchCommentary}>Refresh Commentary</button>
      <br></br>
      <br></br>
      {commentaryData && renderMatchSummary()}
      <br></br>
      <br></br>
      {commentaryData && (
        <div className="pageDescription commentary-container">
          {commentaryData.commentaryList.map((commentary, index) => (
            <div key={index} className="commentary">
              <div className="commentary-description">
                {formatCommentaryText(commentary.commText, commentary.commentaryFormats)}
              </div>
              <div className="intro-description">
                Time: {convertTimestampToDate(commentary.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )}
      <img className="hero-image" src={Cricketbanner}></img>
    </div>
  );
}

export default Commentary;