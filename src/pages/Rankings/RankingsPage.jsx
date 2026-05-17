import { useEffect } from "react";
import Rankings from "../../components/Rankings";
import CricketHero from "../../assets/Cricketbanner.jpeg";
import Cricketbanner from "../../assets/Cricketbanner.png";
import "../../assets/styles/pages.css";

function RankingsPage() {
  useEffect(() => {
    document.title = "ICC Rankings - Cricket Fever Hub";
  }, []);

  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero} alt="Cricket players in action" />
      <Rankings />
      <img className="hero-image" src={Cricketbanner} alt="Cricket Fever Hub banner" />
    </div>
  );
}

export default RankingsPage;
