import React, { useState } from "react";
import PartnershipDataComponent from "./PartnershipsData";
import WicketsDataComponent from "./WicketsData";
import ExtrasDataComponent from "./ExtrasData";
import BatsmenDataComponent from "./BattersData";
import BowlersDataComponent from "./BowlersData";
import SummaryInningsDataComponent from "./SummaryInningsCard";
import "../../assets/styles/components.css";

const MatchScorecard = ({ scoreCard, matchHeader }) => {
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
    <div className="scorecard-page">
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
          {matchHeader.tossResults.tossWinnerName} have won the toss and have elected
          {matchHeader.tossResults.decision} first
        </div>
        <div className="intro-description">Current Status: {matchHeader.status}</div>
        <div className="intro-description">
          Winning Team: {matchHeader.result.winningTeam}
        </div>
         </div>

      <div>
        <div className="section-dark">
          <div className="teams-container">
            <div className="team-container">
              <h2 className="dark-heading">{Team1}</h2>
              <div className="dark-heading">
                1st Innings
                <button
                  onClick={() => toggleInningsData(0)}
                  className="innings-button"
                >
                  {inningsDataVisible[0] ? "Close Scorecard" : "Open Scorecard"}
                </button>
              </div>
              <div className="scorecard-column">
                {scoreCard[0] ? (
                  <SummaryInningsDataComponent
                    scoreDetails={scoreCard[0]?.scoreDetails}
                  />
                ) : (
                  <div>No data yet</div>
                )}
              </div>

              {inningsDataVisible[0] && scoreCard[0] ? (
                <div className="scorecard-section">
                  <div className="scorecard-column">
                    <BatsmenDataComponent
                      batsmenData={scoreCard[0].batTeamDetails?.batsmenData}
                    />
                  </div>
                  <div className="scorecard-column">
                    <BowlersDataComponent
                      bowlersData={scoreCard[0].bowlTeamDetails?.bowlersData}
                    />
                  </div>
                  <div className="scorecard-column">
                    <ExtrasDataComponent extrasData={scoreCard[0].extrasData} />
                  </div>
                  <div className="scorecard-column">
                    <PartnershipDataComponent
                      partnershipsData={scoreCard[0].partnershipsData}
                    />
                  </div>
                  <div className="scorecard-column">
                    <WicketsDataComponent
                      wicketsData={scoreCard[0].wicketsData}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="team-container">
            <h2 className="dark-heading">{Team2}</h2>
            <div className="dark-heading">
              1st Innings
              <button
                onClick={() => toggleInningsData(1)}
                className="innings-button"
              >
                {inningsDataVisible[1] ? "Close Scorecard" : "Open Scorecard"}
              </button>
            </div>

            <div className="scorecard-column">
              {scoreCard[1] ? (
                <SummaryInningsDataComponent
                  scoreDetails={scoreCard[1]?.scoreDetails}
                />
              ) : (
                <div>No data yet</div>
              )}
            </div>

            {inningsDataVisible[1] && scoreCard[1] ? (
              <div className="scorecard-section">
                <div className="scorecard-column">
                  <BatsmenDataComponent
                    batsmenData={scoreCard[1].batsmenData}
                  />
                </div>
                <div className="scorecard-column">
                  <BowlersDataComponent
                    bowlersData={scoreCard[1].bowlTeamDetails?.bowlersData}
                  />
                </div>
                <div className="scorecard-column">
                  <ExtrasDataComponent extrasData={scoreCard[1].extrasData} />
                </div>
                <div className="scorecard-column">
                  <PartnershipDataComponent
                    partnershipsData={scoreCard[1].partnershipsData}
                  />
                </div>
                <div className="scorecard-column">
                  <WicketsDataComponent
                    wicketsData={scoreCard[1].wicketsData}
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className="section-light">
          <div className="team-container">
            <h2>{Team1}</h2>
            <div>
              2nd Innings
              <button
                onClick={() => toggleInningsData(2)}
                className="innings-button"
              >
                {inningsDataVisible[2] ? "Close Scorecard" : "Open Scorecard"}
              </button>
            </div>
            <div className="scorecard-column">
              {scoreCard[2] ? (
                <SummaryInningsDataComponent
                  scoreDetails={scoreCard[2]?.scoreDetails}
                />
              ) : (
                <div>No data yet</div>
              )}
            </div>

            {inningsDataVisible[2] && scoreCard[2] ? (
              <div className="scorecard-section">
                <div className="scorecard-column">
                  <BatsmenDataComponent
                    batsmenData={scoreCard[2].batsmenData}
                  />
                </div>
                <div className="scorecard-column">
                  <BowlersDataComponent
                    bowlersData={scoreCard[2].bowlTeamDetails?.bowlersData}
                  />
                </div>
                <div className="scorecard-column">
                  <ExtrasDataComponent extrasData={scoreCard[2].extrasData} />
                </div>
                <div className="scorecard-column">
                  <PartnershipDataComponent
                    partnershipsData={scoreCard[2].partnershipsData}
                  />
                </div>

                <div className="scorecard-column">
                  <WicketsDataComponent
                    wicketsData={scoreCard[2].wicketsData}
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div className="team-container">
            <h2>{Team2}</h2>
            <div>
              2nd Innings
              <button
                onClick={() => toggleInningsData(3)}
                className="innings-button"
              >
                {inningsDataVisible[3] ? "Close Scorecard" : "Open Scorecard"}
              </button>
            </div>
            {scoreCard[3] ? (
              <SummaryInningsDataComponent
                scoreDetails={scoreCard[3]?.scoreDetails}
              />
            ) : (
              <div>No data yet</div>
            )}

            {inningsDataVisible[3] && scoreCard[3] ? (
              <div className="scorecard-section">
                <div className="scorecard-column">
                  <BatsmenDataComponent
                    batsmenData={scoreCard[3].batsmenData}
                  />
                </div>
                <div className="scorecard-column">
                  <BowlersDataComponent
                    bowlersData={scoreCard[3].bowlTeamDetails?.bowlersData}
                  />
                </div>
                <div className="scorecard-column">
                  <ExtrasDataComponent extrasData={scoreCard[3].extrasData} />
                </div>
                <div className="scorecard-column">
                  <PartnershipDataComponent
                    partnershipsData={scoreCard[3].partnershipsData}
                  />
                </div>
                <div className="scorecard-column">
                  <WicketsDataComponent
                    wicketsData={scoreCard[3].wicketsData}
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchScorecard;
