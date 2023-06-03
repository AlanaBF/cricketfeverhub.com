import { useEffect, useState } from "react";
import getPlayersData from "../../utils/getPlayers_API";
import getPlayerImages from "../../utils/getImage_API";
import { Button, Card } from "react-bootstrap";
import "../../assets/styles/components.css";
import "../../assets/styles/pages.css";

const PlayerCard = ({ id, name, teamName, faceImageId, fetchData }) => {
  const imageURL = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${faceImageId}/i.jpg?p=de`;

  useEffect(() => {
    const fetchPlayerImage = async () => {
      try {
        const data = await getPlayerImages(faceImageId);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPlayerImage();
  }, [faceImageId]);

  return (
    <Card key={id} className="playerCard">
      <Card.Img className="playerCardImage" variant="top" src={imageURL} alt="Player" />
      <Card.Body className="playerCardBody">
        <Card.Title className="playerCardTitle">Player Name: {name}</Card.Title>
        <Card.Text className="playerCardText">Team Name: {teamName}</Card.Text>
      </Card.Body>
      <Button className="playerCardButton" variant="primary">Go somewhere</Button>
    </Card>
  );
};

const PlayerDataComponent = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getPlayersData(playerName);
      setPlayerData(data);
    } catch (error) {
      console.error("Error:", error);
    }

    if (playerData) {
      playerData.player.forEach(async (player) => {
        try {
          const data = await getPlayerImages(player.faceImageId);
          console.log(data);
        } catch (error) {
          console.error("Error:", error);
        }
      });
    }
  };

  const handleSearch = () => {
    if (playerName) {
      fetchData();
    }
  };

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
              id={player.id}
              faceImageId={player.faceImageId}
              name={player.name}
              teamName={player.teamName}
              fetchData={fetchData}
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
