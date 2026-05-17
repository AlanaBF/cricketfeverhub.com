import { useState, useEffect, useRef } from "react";
import getPlayersData from "../../utils/getPlayers_API";
import getCricbuzzImageUrl from "../../utils/getCricbuzzImageUrl";
import { Button, Card } from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";
import "../../assets/styles/components.css";
import "../../assets/styles/pages.css";

const PlayerCard = ({ id, name, teamName, faceImageId }) => {
  const imageURL = getCricbuzzImageUrl(faceImageId);

  return (
    <Card key={id} className="playerCard">
      <Card.Img
        className="playerCardImage"
        variant="top"
        src={imageURL}
        alt={`${name} profile photo`}
        onError={(event) => { event.target.onerror = null; event.target.src = "/CricketImage.jpeg"; }}
      />
      <Card.Body className="playerCardBody">
        <Card.Title className="playerCardTitle">Player Name: {name}</Card.Title>
        <Card.Text className="playerCardText">Team Name: {teamName}</Card.Text>
      </Card.Body>
      <Button className="playerCardButton" variant="primary" aria-label={`View profile for ${name}`}>
        View Player Profile
      </Button>
    </Card>
  );
};

const PlayerDataComponent = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceTimer = useRef(null);

  const fetchPlayerData = async (searchTerm) => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    try {
      const data = await getPlayersData(searchTerm);
      setPlayerData(data);
    } catch (error) {
      console.error("Error fetching player data:", error);
      setPlayerData(null);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (!playerName.trim()) {
      setPlayerData(null);
      setHasSearched(false);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchPlayerData(playerName);
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [playerName]);

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      fetchPlayerData(playerName);
    }
  };

  return (
    <div className="playerDataComponent">
      <input
        type="text"
        value={playerName}
        onChange={(event) => setPlayerName(event.target.value)}
        onKeyDown={handleSearchKeyDown}
        placeholder="Search for a player..."
        aria-label="Search for cricket player by name"
      />

      {isSearching && <LoadingSpinner message="Searching players..." />}

      {!isSearching && playerData && playerData.player && playerData.player.length > 0 && (
        <div>
          {playerData.player.map((player) => (
            <PlayerCard
              key={player.id}
              id={player.id}
              faceImageId={player.faceImageId}
              name={player.name}
              teamName={player.teamName}
            />
          ))}
        </div>
      )}

      {!isSearching && hasSearched && (!playerData || !playerData.player || playerData.player.length === 0) && (
        <p className="pageDescription">No players found. Try a different name.</p>
      )}
    </div>
  );
};

export default PlayerDataComponent;
