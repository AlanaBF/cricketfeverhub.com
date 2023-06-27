import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../../assets/styles/components.css";

const BowlersDataComponent = ({ bowlersData }) => {
  const [showData, setShowData] = useState(false);


const renderBowlersData = () => {
    if (!bowlersData) {
      return null;
    }

    return (
      <div>
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
      <Button variant="primary" onClick={() => setShowData(false)}>
            Close Bowlers Data
          </Button>

      </div>
    );
  };

  const handleClick = () => {
    setShowData(true);
  };
  return (
    <div>
      <button className="bowlers-button" onClick={handleClick}>
        Show Bowlers Data
      </button>
      {showData && renderBowlersData()}
    </div>
  );
  };

export default BowlersDataComponent;