import { useEffect } from "react";
import CricketCardLayout from "../../components/News/CricketCardLayout";
import TrendingPlayers from "../../components/TrendingPlayers";
import Cricketbanner from "../../assets/Cricketbanner.png";
import "../../assets/styles/pages.css";
import CricketHero from "../../assets/Cricketbanner.jpeg";

function Home() {
  useEffect(() => {
    document.title = "Cricket Fever Hub - Live Cricket Scores and News";
  }, []);

  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero} alt="Cricket players in action" />

      <section className="pageDescription" style={{ fontSize: "3rem" }}>
        <h1>Welcome to the Cricket Fever Hub!</h1>
      </section>

      <p className="pageDescription" style={{ fontSize: "1.5rem" }}>
        Here you can find information about Men's and Women's cricket matches,
        including live updates and upcoming fixtures. Explore the latest news.
      </p>

      <TrendingPlayers />

      <div className="newsContainer">
        <CricketCardLayout />
      </div>
      <img className="hero-image" src={Cricketbanner} alt="Cricket Fever Hub banner" />
    </div>
  );
}

export default Home;
