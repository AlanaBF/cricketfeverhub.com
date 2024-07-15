import Podcast from "../../components/Podcast";
import Cricketbanner from "../../assets/Cricketbanner.png";
import CricketHero from "../../assets/Cricketbanner.jpeg";
function Fun() {
  return (
    <div className="pageBackground">
      <img className="hero-image" src={CricketHero}></img>

      <br />
      <Podcast />
      <img className="hero-image" src={Cricketbanner}></img>
    </div>
  );
}

export default Fun;
