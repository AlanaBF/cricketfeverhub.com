import { useEffect } from "react";
import Podcast from "../../components/Podcast";
import Cricketbanner from "../../assets/Cricketbanner.png";
import CricketHero from "../../assets/Cricketbanner.jpeg";

function Fun() {
  useEffect(() => {
    document.title = "Discover - Cricket Fever Hub";
  }, []);

  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero} alt="Cricket players in action" />
      <Podcast />
      <img className="hero-image" src={Cricketbanner} alt="Cricket Fever Hub banner" />
    </div>
  );
}

export default Fun;
