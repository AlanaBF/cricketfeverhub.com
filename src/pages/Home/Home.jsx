import React from "react";
import CricketCardLayout from "../../components/News/CricketCardLayout";
import Cricketbanner from "../../assets/Cricketbanner.png";
import Podcast from "../../components/Podcast";
import "../../assets/styles/pages.css";
import CricketHero from "../../assets/Cricketbanner.jpeg";

function Home() {
  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero}></img>

      <br />

      <p className="pageDescription">
        Welcome to the Cricket Fever Hub! Here you can find information about
        Men's and Women's cricket matches, including live updates and upcoming
        fixtures. Explore the latest news and commentary.
      </p>
      <Podcast />
      <div className="newsContainer">
        <CricketCardLayout />
      </div>
      <img className="hero-image" src={Cricketbanner}></img>
    </div>
  );
}

export default Home;
