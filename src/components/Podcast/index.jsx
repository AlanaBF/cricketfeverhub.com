import "../../assets/styles/components.css";
import "../../assets/styles/pages.css";
import CricketImage from "../../assets/CricketImage.jpeg";

function Podcast() {
  return (
    <div className="podcast">
      <div className="image-container">
        <img className="cricket-image" src={CricketImage} alt="" />
        <h1 className="heading">Cricket Info and useful Links</h1>
        <img className="cricket-image" src={CricketImage} alt="" />
      </div>

      <div className="podcast-container">
        <div className="podcast-text-container">
          <h3 className="page-sub-title">ECB Cricket</h3>
          <p className="pageDescription">Home of ECB Cricket</p>
        </div>
        <div className="podcast-image-container">
          <a href="https://www.ecb.co.uk/" target="_blank" rel="noopener noreferrer" aria-label="Visit ECB Cricket website" className="podcast-link-button">
            Visit ECB Website
          </a>
        </div>
      </div>

      <div>
        <div className="podcast-container">
          <div className="podcast-text-container">
            <h3 className="page-sub-title">BBC Cricket</h3>
            <p className="pageDescription">
              Home of BBC Cricket; News, Videos, Podcasts, Top Stories
            </p>
          </div>
          <div className="podcast-image-container">
            <a href="https://www.bbc.co.uk/sport/cricket" target="_blank" rel="noopener noreferrer" aria-label="Visit BBC Sport Cricket website" className="podcast-link-button">
              Visit BBC Cricket
            </a>
          </div>
        </div>

        <h2 className="pageTitle">Random finds</h2>

        <div>
          <div className="podcast-container">
            <div className="podcast-text-container">
              <h3 className="page-sub-title">
                The Sleeping Forecast with Nish Kumar
              </h3>
              <p className="pageDescription">
                Fall asleep to the gentle sounds with Nish Kumar
              </p>
              <a
                href="https://www.bbc.co.uk/sounds/play/curation:m001j5cp/p0fvc309"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen to The Sleeping Forecast podcast on BBC Sounds"
              >
                <img
                  src="https://ichef.bbci.co.uk/images/ic/640x360/p0fw3140.jpg"
                  alt="The Sleeping Forecast podcast cover art"
                  style={{ width: "50%", borderRadius: "10px" }}
                />
              </a>
            </div>
          </div>
          <div className="podcast-container">
            <div className="podcast-text-container">
              <h3 className="page-sub-title">Sport's Strangest Crimes</h3>
              <p className="pageDescription">
                Allen Stanford: The Man Who Bought Cricket
              </p>
              <a
                href="https://www.bbc.co.uk/sounds/play/curation:m001j5cp/p09wywvg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen to Sport's Strangest Crimes podcast on BBC Sounds"
              >
                <img
                  src="https://ichef.bbci.co.uk/images/ic/640x360/p0fwcgjt.jpg"
                  alt="Sport's Strangest Crimes podcast cover art"
                  style={{ width: "50%", borderRadius: "10px" }}
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
