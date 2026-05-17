import { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import getPlayerProfile from "../../utils/getPlayerProfile";
import PlayerProfileCard from "./MatchPlayerData";
import "../../assets/styles/components.css";

const BatsmenDataComponent = ({ batsmenData }) => {
  const [selectedPlayerInfo, setSelectedPlayerInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const batsmen = Array.isArray(batsmenData)
    ? batsmenData
    : Object.values(batsmenData);

  const handleViewPlayerProfile = (playerId) => {
    getPlayerProfile(playerId)
      .then((playerData) => {
        setSelectedPlayerInfo(playerData);
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error fetching player profile:", error);
      });
  };

  useEffect(() => {
    setShowModal(false);
  }, [batsmenData]);

  return (
    <div>
      <Card className="scorecard-card">
        <Card.Header>Batsmen Data</Card.Header>
        <Card.Body>
          <div className="batsmen-data-container">
            <table className="batsmen-table" aria-label="Batsmen statistics">
              <thead>
                <tr>
                  <th>Batsman Name</th>
                  <th>Balls Faced</th>
                  <th>Runs</th>
                  <th>Fours</th>
                  <th>Sixes</th>
                  <th>Strike Rate</th>
                  <th>Dismissal</th>
                  <th>Player Info</th>
                </tr>
              </thead>
              <tbody>
                {batsmen.map((batsman) => (
                  <tr key={batsman.id || batsman.batId}>
                    <td>{batsman.name || batsman.batName}</td>
                    <td>{batsman.balls}</td>
                    <td>{batsman.runs}</td>
                    <td>{batsman.fours}</td>
                    <td>{batsman.sixes}</td>
                    <td>{batsman.strikerate || batsman.strikeRate}</td>
                    <td>{batsman.dismissal || batsman.outDesc || "-"}</td>
                    <td>
                      <Button
                        className="profile-button"
                        onClick={() => handleViewPlayerProfile(batsman.id || batsman.batId)}
                        aria-label={`View profile for ${batsman.name || batsman.batName}`}
                      >
                        View Profile
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="player-profile-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="player-profile-modal-title">Player Profile</Modal.Title>
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

export default BatsmenDataComponent;
