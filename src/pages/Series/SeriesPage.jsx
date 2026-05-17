import { useEffect } from "react";
import SeriesList from "../../components/Series/SeriesList";
import CricketHero from "../../assets/Cricketbanner.jpeg";
import Cricketbanner from "../../assets/Cricketbanner.png";
import "../../assets/styles/pages.css";

function SeriesPage() {
  useEffect(() => {
    document.title = "Series - Cricket Fever Hub";
  }, []);

  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero} alt="Cricket players in action" />
      <SeriesList />
      <img className="hero-image" src={Cricketbanner} alt="Cricket Fever Hub banner" />
    </div>
  );
}

export default SeriesPage;
