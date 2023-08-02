import React, { useState } from "react";
import "../../assets/styles/components.css";
import "../../assets/styles/pages.css";
import CricketHero from "../../assets/Cricketbanner.jpeg";
import PartnershipDataComponent from "./PartnershipsData";
import WicketsDataComponent from "./WicketsData";
import ExtrasDataComponent from "./ExtrasData";
import BatsmenDataComponent from "./BattersData";
import BowlersDataComponent from "./BowlersData";
import { useLocation } from "react-router-dom";

import SummaryInningsDataComponent from "./SummaryInningsCard";
import MatchMap from "../MatchMap";

const LiveMatchScoreCard = ({
  scoreCard,
  // matchInfo,
  venueInfo,
  matchHeader,
  matchId,
}) => {
  const [inningsDataVisible, setInningsDataVisible] = useState(
    Array(scoreCard.length).fill(false)
  );

  const Team1 = scoreCard[0]?.batTeamDetails?.batTeamName || "";
  const Team2 = scoreCard[1]?.batTeamDetails?.batTeamName || "";

  const location = useLocation();
  const { matchData } = location.state || {}; // Extract the matchData prop from the location state

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
  console.log(matchData);
  return (
    <div className="live-matches">
      <img className="hero-image" src={CricketHero}></img>

      <br />
      <div className="scorecard-container">
        <h1 className="intro-description">{matchHeader.seriesDesc}</h1>
        <h2 className="intro-description">
          {matchHeader.team1.name} vs {matchHeader.team2.name}
        </h2>
        <div className="intro-description">
          {matchHeader.matchType} {matchHeader.matchDescription}
        </div>
        <div className="intro-description">
          Start Date: {convertTimestampToDate(matchHeader.matchStartTimestamp)}
        </div>
        <div className="intro-description">
          {matchHeader.tossResults.tossWinnerName} have won the toss and have
          elected {matchHeader.tossResults.decision} first
        </div>
        <div className="intro-description">
          Current Status: {matchHeader.status}
        </div>
        <div className="intro-description">
          Winning Team: {matchHeader.result.winningTeam}
        </div>
      </div>

      {matchData && (
        <div>
          <p>
            Start Date:{" "}
            {convertTimestampToDate(matchHeader.matchStartTimestamp)}
          </p>
          <p>{"matchFormat"}</p>

          <MatchMap venueInfo={venueInfo} matchId={matchId} />

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
                          batsmenData={
                            scoreCard[index].batTeamDetails?.batsmenData
                          }
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
      )}
    </div>
  );
};

export default LiveMatchScoreCard;
