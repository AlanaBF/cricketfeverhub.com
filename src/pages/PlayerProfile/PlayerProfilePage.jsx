import { useEffect } from "react";
import PlayerProfile from "../../components/PlayerProfile";
import CricketHero from "../../assets/Cricketbanner.jpeg";
import Cricketbanner from "../../assets/Cricketbanner.png";
import "../../assets/styles/pages.css";

function PlayerProfilePage() {
  useEffect(() => {
    document.title = "Player Profile - Cricket Fever Hub";
  }, []);

  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero} alt="Cricket players in action" />
      <PlayerProfile />
      <img className="hero-image" src={Cricketbanner} alt="Cricket Fever Hub banner" />
    </div>
  );
}

export default PlayerProfilePage;
