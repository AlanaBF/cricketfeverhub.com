import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../../assets/styles/components.css"


const WicketsDataComponent = ({ wicketsData }) => {
    const [showData, setShowData] = useState(false);


const renderWicketsData = () => {
    if (!wicketsData) {
      return null;
    }
    const sortedWickets = Object.values(wicketsData).sort(
      (a, b) => a.wktNbr - b.wktNbr
    );

    return (
      <Card className="scorecard-card">
        <Card.Header>Wickets Data</Card.Header>
        <Card.Body>
          <div className="wickets-container">
            {sortedWickets.map((wicket, index) => (
              <div key={index} className="wicket-card">
                <h4>Wicket {wicket.wktNbr}</h4>
                <p>Ball Number: {wicket.ballNbr}</p>
                <p>Batsman Name: {wicket.batName}</p>
                <p>Wicket Over: {wicket.wktOver}</p>
                <p>Wicket Runs: {wicket.wktRuns}</p>
              </div>
            ))}
          </div>
          <Button className="close-button" variant="primary" onClick={() => setShowData(false)}>
              Close Wickets Data
            </Button>
        </Card.Body>
      </Card>
    );
  };

  const handleClick = () => {
    setShowData((prevShowData) => !prevShowData);
  };
  
  return (
    <div>
      <button onClick={handleClick} className="wickets-button">
        {showData ? "Close Wickets Data" : "Open Wickets Data"}
      </button>
      {showData && renderWicketsData()}
    </div>
  );
};

export default WicketsDataComponent;