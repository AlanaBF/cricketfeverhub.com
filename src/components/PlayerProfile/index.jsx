import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPlayerProfile from "../../utils/getPlayerProfile";
import getPlayerBatting from "../../utils/getPlayerBatting_API";
import getPlayerBowling from "../../utils/getPlayerBowling_API";
import getCricbuzzImageUrl from "../../utils/getCricbuzzImageUrl";
import LoadingSpinner from "../LoadingSpinner";
import ErrorState from "../ErrorState";
import "../../assets/styles/components.css";

const TABS = ["Overview", "Batting", "Bowling"];

const PlayerProfile = () => {
  const { playerId } = useParams();
  const [playerInfo, setPlayerInfo] = useState(null);
  const [battingStats, setBattingStats] = useState(null);
  const [bowlingStats, setBowlingStats] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlayerData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const profileData = await getPlayerProfile(playerId);
      setPlayerInfo(profileData);

      const [batting, bowling] = await Promise.allSettled([
        getPlayerBatting(playerId),
        getPlayerBowling(playerId),
      ]);

      if (batting.status === "fulfilled") setBattingStats(batting.value);
      if (bowling.status === "fulfilled") setBowlingStats(bowling.value);
    } catch (fetchError) {
      console.error("Error fetching player data:", fetchError);
      setError("Unable to load player profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayerData();
  }, [playerId]);

  if (isLoading) return <LoadingSpinner message="Loading player profile..." />;
  if (error) return <ErrorState message={error} onRetry={fetchPlayerData} />;
  if (!playerInfo) return <ErrorState message="Player not found." />;

  const imageURL = playerInfo.image || getCricbuzzImageUrl(playerInfo.faceImageId);

  return (
    <div className="player-full-profile">
      <div className="player-profile-header">
        <img
          className="player-profile-image"
          src={imageURL}
          alt={`${playerInfo.name} profile photo`}
          onError={(event) => { event.target.onerror = null; event.target.src = "/CricketImage.jpeg"; }}
        />
        <div className="player-profile-details">
          <h1>{playerInfo.name}</h1>
          {playerInfo.intlTeam && <p className="player-team">{playerInfo.intlTeam}</p>}
          {playerInfo.role && <p className="player-role">{playerInfo.role}</p>}
          <div className="player-meta">
            {playerInfo.bat && <span>Bat: {playerInfo.bat}</span>}
            {playerInfo.bowl && <span>Bowl: {playerInfo.bowl}</span>}
            {playerInfo.DoB && <span>Born: {playerInfo.DoB}</span>}
            {playerInfo.birthPlace && <span>From: {playerInfo.birthPlace}</span>}
          </div>
        </div>
      </div>

      <div className="player-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`player-tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="player-tab-content">
        {activeTab === "Overview" && renderOverview(playerInfo)}
        {activeTab === "Batting" && renderStatsTable(battingStats, "batting")}
        {activeTab === "Bowling" && renderStatsTable(bowlingStats, "bowling")}
      </div>
    </div>
  );
};

const renderOverview = (playerInfo) => {
  const bio = playerInfo.bio;
  const safeBio = bio && typeof bio === "string"
    ? bio.replace(/<\/?b>/g, "").replace(/<br\/><br\/>/g, "<br/>").split("<br/>")
    : null;

  return (
    <div className="player-overview">
      {playerInfo.teams && (
        <div className="player-teams-section">
          <h3>Teams</h3>
          <p>{playerInfo.teams}</p>
        </div>
      )}
      {safeBio && (
        <div className="player-bio-section">
          <h3>Biography</h3>
          {safeBio.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}
        </div>
      )}
      {!safeBio && <p>No biography available for this player.</p>}
    </div>
  );
};

const renderStatsTable = (stats, type) => {
  if (!stats) {
    return <p className="pageDescription">No {type} statistics available.</p>;
  }

  const headers = stats.headers || [];
  const values = stats.values || [];

  if (values.length === 0) {
    return <p className="pageDescription">No {type} statistics available.</p>;
  }

  const getRowCells = (row) => {
    if (Array.isArray(row.values)) return row.values;
    if (Array.isArray(row)) return row;
    return Object.values(row);
  };

  return (
    <div className="table-scroll-wrapper">
      <table className="stats-table" aria-label={`${type} statistics`}>
        <thead>
          <tr>
            {headers.map((header, headerIndex) => (
              <th key={headerIndex}>{header === "ROWHEADER" ? "" : header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {getRowCells(row).map((cell, cellIndex) => (
                <td key={cellIndex} className={cellIndex === 0 ? "stats-row-label" : ""}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerProfile;
