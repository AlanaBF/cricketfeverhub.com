import React from "react";
import PlayerDataComponent from "../../components/PlayerData/PlayerDataComponent";
import CricketCardLayout from "../../components/News/CricketCardLayout";
import "../../assets/styles/pages.css";


function Home() {
  return (
    <div className="pageBackground">
      <h1 className="pageTitle">Cricket Fever Hub</h1>
      <h3 className="pageDescription">
        Welcome to the Cricket Fever Hub! Here you can find information about
        England Men's and Women's matches, including live updates and upcoming
        fixtures. Search for players to discover their profiles and explore the
        latest news and commentary.
      </h3>
      <div className="newsContainer">
        <CricketCardLayout />
      </div>
      {/* <div className="playerSearch">
        <p>
          Search for a player by name to view their profile card with detailed
          information about them.
        </p>
        <PlayerDataComponent />
      </div> */}
    </div>
  );
}

export default Home;