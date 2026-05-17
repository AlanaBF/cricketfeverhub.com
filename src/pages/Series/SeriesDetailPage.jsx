import { useEffect } from "react";
import SeriesDetail from "../../components/Series/SeriesDetail";
import CricketHero from "../../assets/Cricketbanner.jpeg";
import Cricketbanner from "../../assets/Cricketbanner.png";
import "../../assets/styles/pages.css";

function SeriesDetailPage() {
  useEffect(() => {
    document.title = "Series Details - Cricket Fever Hub";
  }, []);

  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero} alt="Cricket players in action" />
      <SeriesDetail />
      <img className="hero-image" src={Cricketbanner} alt="Cricket Fever Hub banner" />
    </div>
  );
}

export default SeriesDetailPage;
