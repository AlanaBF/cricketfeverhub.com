import React from "react";
import { Card } from "react-bootstrap";
import "../../assets/styles/components.css";

const WicketsDataComponent = ({ wicketsData }) => {
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
      </Card.Body>
    </Card>
  );
};

export default WicketsDataComponent;
