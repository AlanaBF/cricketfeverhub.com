import { useEffect } from "react";
import "../../assets/styles/pages.css";
import UpcomingMatches from "../../components/UpComingMatches/UpcomingMatches";
import CricketHero from "../../assets/Cricketbanner.jpeg";
import Cricketbanner from "../../assets/Cricketbanner.png";

function UpcomingMatchesPage() {
  useEffect(() => {
    document.title = "Upcoming Matches - Cricket Fever Hub";
  }, []);

  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero} alt="Cricket players in action" />
      <UpcomingMatches />
      <img className="hero-image" src={Cricketbanner} alt="Cricket Fever Hub banner" />
    </div>
  );
}

export default UpcomingMatchesPage;
