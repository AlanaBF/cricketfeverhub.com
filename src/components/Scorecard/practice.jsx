import React, { useEffect, useState } from "react";
import getLiveMatchesData from "../../utils/getLiveMatches_API";
import "../../assets/styles/components.css";
import "../../assets/styles/pages.css";
import Map from "../../utils/Leaflet/Leaflet_API";
import CricketHero from "../../assets/Cricketbanner.jpeg";
import PartnershipDataComponent from "./PartnershipsData";
import WicketsDataComponent from "./WicketsData";
import ExtrasDataComponent from "./ExtrasData";
import BatsmenDataComponent from "./BattersData";
import BowlersDataComponent from "./BowlersData";
import SummaryInningsDataComponent from "./SummaryInningsCard";

const LiveMatchScoreCard = ({ scoreCard, matchHeader }) => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);

  const [inningsDataVisible, setInningsDataVisible] = useState(
    Array(scoreCard.length).fill(false)
  );

  // ADD TEAM 1 and TEAM 2 ASSIGN WHO BATS FIRST
  const Team1 = scoreCard[0]?.batTeamDetails?.batTeamName || "";
  const Team2 = scoreCard[1]?.batTeamDetails?.batTeamName || "";


  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString();
  };

  const toggleInningsData = (index) => {
    setInningsDataVisible((prevVisible) => {
      const updatedVisible = [...prevVisible];
      updatedVisible[index] = !prevVisible[index];
      return updatedVisible;
    });
  };

  return (
    <div className="live-matches">
      <img className="hero-image" src={CricketHero}></img>

      <br />
            {/* <Map venue={matchInfo.venueInfo} /> */}
        


      {scoreCard.map((innings, index) => (
        <div
          key={index}
          className={index % 2 === 0 ? "section-dark" : "section-light"}
        >
          <div className="teams-container">
            <div className="team-container">
              <h2 className={index % 2 === 0 ? "dark-heading" : ""}>
                {index % 2 === 0 ? Team1 : Team2} {index + 1}
                {index === 0 ? "st" : "nd"} Innings
              </h2>
              <div className="scorecard-column">
                {scoreCard[index] ? (
                  
                    <SummaryInningsDataComponent
                    scoreDetails={scoreCard[index]?.scoreDetails}
                  /> 
                  
                ) : (
                  <div>No data yet</div>
                )}
              </div>
              <div className={index % 2 === 0 ? "dark-heading" : ""}>
                <button
                  onClick={() => toggleInningsData(index)}
                  className="innings-button"
                >
                  {inningsDataVisible[index]
                    ? "Close Scorecard"
                    : "Open Scorecard"}
                </button>
              </div>
              {inningsDataVisible[index] && scoreCard[index] && (
                <div className="scorecard-section">
                  <div className="scorecard-column">
                    <BatsmenDataComponent
                      batsmenData={scoreCard[index].batTeamDetails?.batsmenData}
                    />
                  </div>
                  <div className="scorecard-column">
                    <BowlersDataComponent
                      bowlersData={
                        scoreCard[index].bowlTeamDetails?.bowlersData
                      }
                    />
                  </div>
                  <div className="scorecard-column">
                    <ExtrasDataComponent
                      extrasData={scoreCard[index].extrasData}
                    />
                  </div>
                  <div className="scorecard-column">
                    <PartnershipDataComponent
                      partnershipsData={scoreCard[index].partnershipsData}
                    />
                  </div>
                  <div className="scorecard-column">
                    <WicketsDataComponent
                      wicketsData={scoreCard[index].wicketsData}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveMatchScoreCard;
