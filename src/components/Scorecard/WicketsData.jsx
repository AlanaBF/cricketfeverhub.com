import { Card } from "react-bootstrap";
import "../../assets/styles/components.css";

const WicketsDataComponent = ({ wicketsData }) => {
  const wickets = Array.isArray(wicketsData)
    ? wicketsData
    : Object.values(wicketsData);

  return (
    <Card className="scorecard-card">
      <Card.Header>Fall of Wickets</Card.Header>
      <Card.Body>
        <div className="wickets-container">
          {wickets.map((wicket, wicketIndex) => (
            <div key={wicket.wktNbr || wicketIndex} className="wicket-card">
              <h4>Wicket {wicket.wktNbr || wicketIndex + 1}</h4>
              <p>Batsman: {wicket.batName || wicket.name || "-"}</p>
              <p>Score at wicket: {wicket.wktRuns || wicket.runs || "-"}</p>
              <p>Over: {wicket.wktOver || wicket.overs || "-"}</p>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default WicketsDataComponent;
