import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getTrendingPlayers from "../../utils/getTrendingPlayers_API";
import getCricbuzzImageUrl from "../../utils/getCricbuzzImageUrl";
import LoadingSpinner from "../LoadingSpinner";
import "../../assets/styles/components.css";

const TrendingPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingPlayers();
        const playerList = data.player || data.players || [];
        setPlayers(playerList.slice(0, 10));
      } catch (error) {
        console.error("Error fetching trending players:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading trending players..." />;
  }

  if (players.length === 0) {
    return null;
  }

  return (
    <section className="trending-section">
      <h2 className="trending-title">Trending Players</h2>
      <div className="trending-scroll">
        {players.map((player) => (
          <Link
            key={player.id}
            to={`/player/${player.id}`}
            className="trending-card"
            aria-label={`View profile for ${player.name}`}
          >
            <img
              className="trending-card-image"
              src={getCricbuzzImageUrl(player.faceImageId || player.id)}
              alt={`${player.name}`}
              onError={(event) => { event.target.onerror = null; event.target.src = "/CricketImage.jpeg"; }}
            />
            <div className="trending-card-info">
              <p className="trending-card-name">{player.name}</p>
              <p className="trending-card-team">{player.teamName || player.team || ""}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingPlayers;
