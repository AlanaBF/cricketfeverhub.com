import React from "react";
import CricketCardLayout from "../../components/News/CricketCardLayout";
import Cricketbanner from "../../assets/Cricketbanner.png";
import "../../assets/styles/pages.css";
import CricketHero from "../../assets/Cricketbanner.jpeg";

function Home() {
  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero}></img>

      <br />

      <p className="pageDescription" style={{ fontSize: "3rem" }}>
        Welcome to the Cricket Fever Hub!{" "}
      </p>

      <p className="pageDescription" style={{ fontSize: "1.5rem" }}>
        Here you can find information about Men's and Women's cricket matches,
        including live updates and upcoming fixtures. Explore the latest news.
      </p>
      {/* <Podcast /> */}
      <div className="newsContainer">
        <CricketCardLayout />
      </div>
      <img className="hero-image" src={Cricketbanner}></img>
    </div>
  );
}

export default Home;
