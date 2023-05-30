import { useEffect, useState } from "react";
import getPlayersData from "../../utils/getPlayers_API";
import getPlayerImages from "../../utils/getImage_API";
import "../../assets/styles/pages.css";

import PlayerCard from "../PlayerCard";
const PlayerDataComponent = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [playerImage, setPlayerImage] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getPlayersData(playerName);
      setPlayerData(data);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(playerData);
    if (playerData && playerImage) {
      console.log("data");
      try {
        const data = await getPlayerImages(playerData.player?.faceImageId);
        setPlayerImage(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleSearch = () => {
    if (playerName) {
      fetchData();
    }
  };
console.log(playerData)
  return (
    <div className="playerDataComponent">
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter player name"
      />
      <button onClick={handleSearch}>Search</button>

      {playerData ? (
        <div>
          {playerData.player.map((player) => (
            
            <PlayerCard
              key={player.id}
              id={player?.id}
              faceImageId={player?.faceImageId}
              name={player?.name}
              teamName={player?.teamName}
            />
          ))}
        </div>
      ) : (
        <p>No player data available</p>
      )}
    </div>
  );
};

export default PlayerDataComponent;