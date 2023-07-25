import "../../assets/styles/components.css";
import "../../assets/styles/pages.css";
import CricketImage from "../../assets/CricketImage.jpeg";

function Podcast() {
  return (
    <div className="podcast">
      <div className="image-container">
        <img className="cricket-image" src={CricketImage}></img>
        <h1 className="heading">Cricket Podcasts</h1>
        <img className="cricket-image" src={CricketImage}></img>
      </div>
      <br/>
      <div>
        <p className="pageDescription">
          {" "}
          Click to view the day's top cricket podcasts on BBC Sounds{" "}
        </p>
      </div>
      <div>
        <div className="podcast-container"></div>
        <a href="https://www.bbc.co.uk/programmes/m001j5cp" target="_blank">
          <img
            src="https://ichef.bbci.co.uk/images/ic/640x360/p0fts28l.jpg"
            target="_blank"
          />
        </a>
        <div>
          <div className="podcast-container">
            <div className="podcast-text-container">
              <h1 className="pageTitle">
                The Sleeping Forecast with Nish Kumar
              </h1>
              <p className="pageDescription">
                Fall asleep to the gentle sounds with Nish Kumar
              </p>
            </div>
            <div className="podcast-image-container">
              <a
                href="https://www.bbc.co.uk/sounds/play/curation:m001j5cp/p0fvc309"
                target="_blank"
              >
                <img
                  src="https://ichef.bbci.co.uk/images/ic/640x360/p0fw3140.jpg"
                  alt="BBC's The Sleeping Forecast Podcast"
                />
              </a>
            </div>
          </div>

          <div className="podcast-container">
            <div className="podcast-text-container">
              <h1 className="pageTitle">Sport's Strangest Crimes</h1>
              <p className="pageDescription">
                Allen Stanford: The Man Who Bought Cricket
              </p>
            </div>
            <div className="podcast-image-container">
              <a
                href="https://www.bbc.co.uk/sounds/play/curation:m001j5cp/p09wywvg"
                target="_blank"
              >
                <img
                  src="https://ichef.bbci.co.uk/images/ic/640x360/p0fwcgjt.jpg"
                  alt="BBC's The Sleeping Forecast Podcast"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Podcast;
