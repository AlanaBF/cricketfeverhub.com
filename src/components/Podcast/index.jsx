import "../../assets/styles/components.css";
import "../../assets/styles/pages.css";
import CricketImage from "../../assets/CricketImage.jpeg";
function Podcast() {
  return (
    <div className="podcast">
      <div className="image-container">
        <img className="cricket-image" src={CricketImage}></img>
        <h1 className="heading">Cricket Info and useful Links</h1>
        <img className="cricket-image" src={CricketImage}></img>
      </div>
      <br />

      <div className="podcast-container">
        <div className="podcast-text-container">
          <h3 className="page-sub-title">ECB Cricket</h3>
          <p className="pageDescription">Home of ECB Cricket</p>
        </div>
        <div className="podcast-image-container">
          <a href="https://www.ecb.co.uk/" target="_blank">
            <img
              src="data:image/png;base64,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"
              alt=""
              style={{ width: "50%", borderRadius: "10px" }}
            />
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
            <a href="https://www.bbc.co.uk/sport/cricket" target="_blank">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJcuXv7U_BQQxd9RJ-d3nyxYHfTU0LODNm2A&s"
                alt=""
                style={{ width: "50%", borderRadius: "10px" }}
              />
            </a>
          </div>
        </div>

        <h1 className="pageTitle">Random finds</h1>

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
              >
                <img
                  src="https://ichef.bbci.co.uk/images/ic/640x360/p0fw3140.jpg"
                  alt="BBC's The Sleeping Forecast Podcast"
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
              >
                <img
                  src="https://ichef.bbci.co.uk/images/ic/640x360/p0fwcgjt.jpg"
                  alt="BBC's The Sleeping Forecast Podcast"
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
