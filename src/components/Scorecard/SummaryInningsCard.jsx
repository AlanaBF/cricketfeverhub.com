import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const SummaryInningsDataComponent = ({ scoreDetails }) => {
  const renderScoreDetails = () => {
    if (!scoreDetails) {
      return <div>No data yet</div>;
    }

    return (
      <Card className="summary-scorecard-card">
        <Card.Header className="scorecard-header">Innings Summary</Card.Header>
        <Card.Body className="innings-summary">
          <div className="summary-details">
            <p>Overs: {scoreDetails.overs} </p>
            <p>Run Rate: {scoreDetails.runRate} </p>
            <p>Runs: {scoreDetails.runs} </p>
            <p>Runs Per Ball: {scoreDetails.runsPerBall} </p>
            <p>Wickets: {scoreDetails.wickets}</p>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <Row className="summary-scorecard">
        <Col>{renderScoreDetails()}</Col>
      </Row>
    </div>
  );
};

export default SummaryInningsDataComponent;
