import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import PartnershipDataComponent from "./PartnershipsData";
import WicketsDataComponent from "./WicketsData";
import ExtrasDataComponent from "./ExtrasData";
import "../../assets/styles/components.css";
import getPlayerProfile from "../../utils/getPlayerProfile";
import PlayerProfileCard from "./MatchPlayerData";

const MatchScorecard = ({ scoreCard, matchHeader }) => {
  const [inningsDataVisible, setInningsDataVisible] = useState(
    Array(scoreCard.length).fill(false)
  );

  const {
    matchId,
    dayNumber,
    matchDescription,
    matchFormat,
    seriesDesc,
    matchType,
    matchStartTimestamp,
    tossResults,
    matchTeamInfo,
    team1,
    team2,
    status,
    playersOfTheMatch,
    playersOfTheSeries,
    result,
  } = matchHeader;

  // ADD TEAM 1 and TEAM 2 ASSIGN WHO BATS FIRST
  const Team1 = scoreCard[0]?.batTeamDetails?.batTeamName || "";
  const Team2 = scoreCard[1]?.batTeamDetails?.batTeamName || "";

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString();
  };

  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedPlayerInfo, setSelectedPlayerInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClickPlayerProfile = (batId) => {
    getPlayerProfile(batId)
      .then((playerData) => {
        setSelectedPlayerId(playerData.batId); // Update to batId
        setSelectedPlayerInfo({
          ...playerData,
          id: playerData.batId, // Update to batId
        });
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error fetching player profile:", error);
      });
  };

  const renderBatsmenData = (batsmenData) => {
    if (!batsmenData) {
      return null;
    }

    return (
      <Card className="scorecard-card">
        <Card.Header>Batsmen Data</Card.Header>
        <Card.Body>
          <div className="batsmen-data-container">
            <table className="batsmen-table">
              <thead>
                <tr>
                  <th>Batsman Name</th>
                  <th>Balls Faced</th>
                  <th>Runs</th>
                  <th>Strike Rate</th>
                  <th>Out</th>
                  <th>Player Info</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(batsmenData).map((batsman, index) => (
                  <tr key={index}>
                    <td>{batsman.batName}</td>
                    <td>{batsman.balls}</td>
                    <td>{batsman.runs}</td>
                    <td>{batsman.strikeRate}</td>
                    <td>{batsman.outDesc}</td>
                    <td>
                      <Button
                        onClick={() => handleClickPlayerProfile(batsman.batId)}
                      >
                        Player Profile
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      
      </Card>
    );
  };

  const renderBowlersData = (bowlersData) => {
    if (!bowlersData) {
      return null;
    }

    return (
      <Card className="scorecard-card">
        <Card.Header>Bowlers Data</Card.Header>
        <Card.Body>
          <table className="bowlers-table">
            <thead>
              <tr>
                <th>Bowler Name</th>
                <th>Overs</th>
                <th>Runs</th>
                <th>Wickets</th>
                <th>Economy</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(bowlersData).map((bowler, index) => (
                <tr key={index} className="bowler-row">
                  <td>{bowler.bowlName}</td>
                  <td>{bowler.overs}</td>
                  <td>{bowler.runs}</td>
                  <td>{bowler.wickets}</td>
                  <td>{bowler.economy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  };

  const renderScoreDetails = (scoreDetails) => {
    if (!scoreDetails) {
      return <div>No data yet</div>;
    }

    return (
      <Card className="scorecard-card">
        <Card.Header>Innings Summary</Card.Header>
        <Card.Body>
          <p className="innings-summary">
            Overs: {scoreDetails.overs}
            <br />
            Run Rate: {scoreDetails.runRate}
            <br />
            Runs: {scoreDetails.runs}
            <br />
            Runs Per Ball: {scoreDetails.runsPerBall}
            <br />
            Wickets: {scoreDetails.wickets}
            <br />
          </p>
        </Card.Body>
      </Card>
    );
  };

  const toggleInningsData = (index) => {
    setInningsDataVisible((prevVisible) => {
      const updatedVisible = [...prevVisible];
      updatedVisible[index] = !prevVisible[index];
      return updatedVisible;
    });
  };

  return (
    <div>
      <div className="scorecard-container">
        <h1 className="intro-description">{seriesDesc}</h1>
        <h2 className="intro-description">
          {team1.name} vs {team2.name}
        </h2>
        <p className="intro-description">
          {matchType} {matchDescription}
        </p>
        <p className="intro-description">
          Start Date: {convertTimestampToDate(matchStartTimestamp)}
        </p>
        <p className="intro-description">
          {tossResults.tossWinnerName} have won the toss and have elected{" "}
          {tossResults.decision} first
        </p>
        <p className="intro-description">Current Status: {status}</p>
        <p className="intro-description">
          {result.winningTeam} {result.winByRuns}
        </p>
        <p className="intro-description">{playersOfTheMatch}</p>
        <p className="intro-description">{playersOfTheSeries}</p>
      </div>

      <div className="teams-container">
        <div className="team-container">
          <h2>{Team1}</h2>
          <p>1st Innings</p>
          <div className="scorecard-column">
            {scoreCard[0] ? (
              renderScoreDetails(scoreCard[0].scoreDetails)
            ) : (
              <div>No data yet</div>
            )}
          </div>
          <button
            onClick={() => toggleInningsData(0)}
            className="innings-button"
          >
            {inningsDataVisible[0] ? "Close" : "Open"}
          </button>
          {inningsDataVisible[0] && scoreCard[0] ? (
            <div className="scorecard-section">
              <div className="scorecard-column">
                {renderBatsmenData(scoreCard[0].batTeamDetails?.batsmenData)}
              </div>
              <div className="scorecard-column">
                {renderBowlersData(scoreCard[0].bowlTeamDetails?.bowlersData)}
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
                <WicketsDataComponent wicketsData={scoreCard[0].wicketsData} />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="team-container">
          <h2>{Team2}</h2>
          <p>1st Innings</p>
          <div className="scorecard-column">
            {scoreCard[1] ? (
              renderScoreDetails(scoreCard[1].scoreDetails)
            ) : (
              <div>No data yet</div>
            )}
          </div>
          <button
            onClick={() => toggleInningsData(1)}
            className="innings-button"
          >
            {inningsDataVisible[1] ? "Close" : "Open"}
          </button>
          {inningsDataVisible[1] && scoreCard[1] ? (
            <div className="scorecard-section">
              <div className="scorecard-column">
                {renderBatsmenData(scoreCard[1].batTeamDetails?.batsmenData)}
              </div>
              <div className="scorecard-column">
                {renderBowlersData(scoreCard[1].bowlTeamDetails?.bowlersData)}
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
                <WicketsDataComponent wicketsData={scoreCard[1].wicketsData} />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="team-container">
          <h2>{Team1}</h2>
          <p>2nd Innings</p>
          <div className="scorecard-column">
            {scoreCard[2] ? (
              renderScoreDetails(scoreCard[2].scoreDetails)
            ) : (
              <div>No data yet</div>
            )}
          </div>
          <button
            onClick={() => toggleInningsData(2)}
            className="innings-button"
          >
            {inningsDataVisible[2] ? "Close" : "Open"}
          </button>
          {inningsDataVisible[2] && scoreCard[2] ? (
            <div className="scorecard-section">
              <div className="scorecard-column">
                {renderBatsmenData(scoreCard[2].batTeamDetails?.batsmenData)}
              </div>
              <div className="scorecard-column">
                {renderBowlersData(scoreCard[2].bowlTeamDetails?.bowlersData)}
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
                <WicketsDataComponent wicketsData={scoreCard[2].wicketsData} />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="team-container">
          <h2>{Team2}</h2>
          <p>2nd Innings</p>
          {scoreCard[3] ? (
            renderScoreDetails(scoreCard[3].scoreDetails)
          ) : (
            <div>No data yet</div>
          )}
          <button
            onClick={() => toggleInningsData(3)}
            className="innings-button"
          >
            {inningsDataVisible[3] ? "Close" : "Open"}
          </button>
          {inningsDataVisible[3] && scoreCard[3] ? (
            <div className="scorecard-section">
              <div className="scorecard-column">
                {renderBatsmenData(scoreCard[3].batTeamDetails?.batsmenData)}
              </div>
              <div className="scorecard-column">
                {renderBowlersData(scoreCard[3].bowlTeamDetails?.bowlersData)}
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
                <WicketsDataComponent wicketsData={scoreCard[3].wicketsData} />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Player Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPlayerInfo && (
              <PlayerProfileCard playerInfo={selectedPlayerInfo} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default MatchScorecard;
