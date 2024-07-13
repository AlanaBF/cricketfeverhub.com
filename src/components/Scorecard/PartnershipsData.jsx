import React from "react";
import { Card } from "react-bootstrap";
import "../../assets/styles/components.css";

const PartnershipDataComponent = ({ partnershipsData }) => {
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default PartnershipDataComponent;
