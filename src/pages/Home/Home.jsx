import React from "react";
import CricketCardLayout from "../../components/News/CricketCardLayout";
import "../../assets/styles/pages.css";


function Home() {
  return (
    <div className="pageBackground">
      <h1 className="pageTitle">Cricket Fever Hub</h1>
      <h3 className="pageDescription">
        Welcome to the Cricket Fever Hub! Here you can find information about Men's and Women's cricket matches, including live updates and upcoming
        fixtures. Explore the latest news and commentary.
      </h3>
      <div className="newsContainer">
        <CricketCardLayout />
      </div>
    </div>
  );
}

export default Home;