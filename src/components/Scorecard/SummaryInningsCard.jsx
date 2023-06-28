import React from "react";
import { Card } from "react-bootstrap";
import '../../assets/styles/components.css';

const SummaryInningsDataComponent = ({ scoreDetails }) => {
  const renderScoreDetails = () => {
    if (!scoreDetails) {
      return <div>No data yet</div>;
    }

    return (
      <div>
      <Card className="summary-scorecard-card">
        <Card.Header className="scorecard-header">Innings Summary</Card.Header>
        <Card.Body className="innings-summary">
          <div className="summary-details">
            <p className="summary-text"> | Overs: {scoreDetails.overs} | </p>
            <p className="summary-text"> Run Rate: {scoreDetails.runRate} | </p>
            <p className="summary-text"> Runs: {scoreDetails.runs} | </p>
            <p className="summary-text"> Runs Per Ball: {scoreDetails.runsPerBall} | </p>
            <p className="summary-text"> Wickets: {scoreDetails.wickets} | </p>
          </div>
        </Card.Body>
      </Card>
      </div>
    );
  };

  return (
    <div>
      <div className="summary-scorecard">
        <div>{renderScoreDetails()}</div>
      </div>
    </div>
  );
};

export default SummaryInningsDataComponent;
