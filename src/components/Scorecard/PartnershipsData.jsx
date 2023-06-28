import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../../assets/styles/components.css"

const PartnershipDataComponent = ({ partnershipsData }) => {
  const [showData, setShowData] = useState(false);

  const renderPartnershipsData = () => {
    if (!partnershipsData) {
      return null;
    }

    const partnerships = Object.values(partnershipsData);

    const sortedPartnerships = partnerships.sort(
      (a, b) => b.totalRuns - a.totalRuns
    );

    return (
      <div>
        <Card>
          <Card.Header>
            <h2>Partnerships Data</h2>
          </Card.Header>
          <Card.Body>
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Batsman 1</th>
                  <th>Batsman 2</th>
                  <th>Total Runs</th>
                  <th>Total Balls</th>
                </tr>
              </thead>
              <tbody>
                {sortedPartnerships.map((partnership, index) => (
                  <tr key={index}>
                    <td>{partnership.bat1Name}</td>
                    <td>{partnership.bat2Name}</td>
                    <td>{partnership.totalRuns}</td>
                    <td>{partnership.totalBalls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button className="close-button" variant="primary" onClick={() => setShowData(false)}>
              Close Partnership Data
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const handleClick = () => {
    setShowData((prevShowData) => !prevShowData);
  };
  
  return (
    <div>
      <button onClick={handleClick} className="partnerships-button">
        {showData ? "Close Partnerships Data" : "Open Partnerships Data"}
      </button>
      {showData && renderPartnershipsData()}
    </div>
  );
};

export default PartnershipDataComponent;
