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
    const pollingInterval = setInterval(fetchMatchCommentary, 30000);
    return () => clearInterval(pollingInterval);
  }, [matchId]);

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  const formatCommentaryText = (commText, commentaryFormats) => {
    if (!commText) return null;

    let formattedText = commText;

    if (commentaryFormats && commentaryFormats.bold) {
      const formatIds = commentaryFormats.bold.formatId || [];
      const formatValues = commentaryFormats.bold.formatValue || [];
      formatIds.forEach((formatId, position) => {
        formattedText = formattedText.replace(formatId, formatValues[position] || "");
      });
    }

    formattedText = formattedText
      .replace(/@B\d+\$/g, "")
      .replace(/@I\d+\$/g, "")
      .replace(/B\d+\$/g, "");

    return formattedText.split('\\n').map((line, lineIndex) => (
      <React.Fragment key={lineIndex}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const renderMatchSummary = () => {
    const matchHeaders = commentaryData.matchheaders || commentaryData.matchHeader;
    const miniscore = commentaryData.miniscore;

    if (!matchHeaders && !miniscore) {
      return <div className="pageDescription">Match summary is not available.</div>;
    }

    return (
      <table className="match-summary-table" aria-label="Match summary details">
        <thead>
          <tr>
            <th>Key Info</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {matchHeaders?.matchDescription && (
            <tr>
              <td>Match Description</td>
              <td>{matchHeaders.matchDescription}</td>
            </tr>
          )}
          {matchHeaders?.status && (
            <tr>
              <td>Match Status</td>
              <td>{matchHeaders.status}</td>
            </tr>
          )}
          {matchHeaders?.result?.winningTeam && (
            <tr>
              <td>Winning Team</td>
              <td>{matchHeaders.result.winningTeam}</td>
            </tr>
          )}
          {matchHeaders?.result?.winningMargin && (
            <tr>
              <td>Winning Margin</td>
              <td>{matchHeaders.result.winningMargin}</td>
            </tr>
          )}
          {miniscore?.batTeam && (
            <tr>
              <td>Current Score</td>
              <td>{`${miniscore.batTeam.teamScore} / ${miniscore.batTeam.teamWkts}`}</td>
            </tr>
          )}
          {miniscore?.target && (
            <tr>
              <td>Target</td>
              <td>{miniscore.target}</td>
            </tr>
          )}
          {miniscore?.currentRunRate && (
            <tr>
              <td>Current Run Rate</td>
              <td>{miniscore.currentRunRate}</td>
            </tr>
          )}
          {miniscore?.requiredRunRate && (
            <tr>
              <td>Required Run Rate</td>
              <td>{miniscore.requiredRunRate}</td>
            </tr>
          )}
          {miniscore?.overs && (
            <tr>
              <td>Overs</td>
              <td>{miniscore.overs}</td>
            </tr>
          )}
          {miniscore?.lastWicket && (
            <tr>
              <td>Last Wicket</td>
              <td>{miniscore.lastWicket}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const getCommentaryList = () => {
    const rawList = commentaryData.comwrapper || commentaryData.commentaryList || [];
    return rawList.map((item) => item.commentary || item);
  };

  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero} alt="Cricket players in action" />

      <h1 className="pageDescription" style={{ fontSize: "3rem" }}>Match Commentary</h1>
      <p className="pageDescription">Bowling figures format: [overs-maidens-runs-wickets]</p>
      <button
        className="btn btn-info"
        onClick={fetchMatchCommentary}
        aria-label="Refresh commentary"
      >
        Refresh Commentary
      </button>

      {commentaryData && renderMatchSummary()}

      {commentaryData && (
        <div className="pageDescription commentary-container">
          {getCommentaryList().map((commentary, commentaryIndex) => (
            <div key={commentaryIndex} className="commentary">
              <div className="commentary-description">
                {formatCommentaryText(
                  commentary.commtxt || commentary.commText,
                  commentary.commentaryformats || commentary.commentaryFormats
                )}
              </div>
              {commentary.timestamp && (
                <div className="intro-description">
                  Over {commentary.overnum} - {convertTimestampToDate(commentary.timestamp)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <img className="hero-image" src={Cricketbanner} alt="Cricket Fever Hub banner" />
    </div>
  );
}

export default Commentary;
