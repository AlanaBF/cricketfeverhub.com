import React from "react";
import "../../assets/styles/pages.css";
import UpcomingMatches from "../../components/UpComingMatches/UpcomingMatches";
import CricketHero from "../../assets/Cricketbanner.jpeg";
import Cricketbanner from "../../assets/Cricketbanner.png";

function UpcomingMatchesPage() {
  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero}></img>
      <UpcomingMatches />
      <img className="hero-image" src={Cricketbanner}></img>
    </div>
  );
}

export default UpcomingMatchesPage;
