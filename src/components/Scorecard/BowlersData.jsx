import { Card } from "react-bootstrap";
import "../../assets/styles/components.css";

const BowlersDataComponent = ({ bowlersData }) => {
  const bowlers = Array.isArray(bowlersData)
    ? bowlersData
    : Object.values(bowlersData);

  return (
    <div>
      <Card className="scorecard-card">
        <Card.Header>Bowlers Data</Card.Header>
        <Card.Body>
          <table className="bowlers-table" aria-label="Bowlers statistics">
            <thead>
              <tr>
                <th>Bowler Name</th>
                <th>Overs</th>
                <th>Maidens</th>
                <th>Runs</th>
                <th>Wickets</th>
                <th>Economy</th>
              </tr>
            </thead>
            <tbody>
              {bowlers.map((bowler) => (
                <tr key={bowler.id || bowler.bowlId} className="bowler-row">
                  <td>{bowler.name || bowler.bowlName}</td>
                  <td>{bowler.overs}</td>
                  <td>{bowler.maidens}</td>
                  <td>{bowler.runs}</td>
                  <td>{bowler.wickets}</td>
                  <td>{bowler.economy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BowlersDataComponent;
