import { Card } from "react-bootstrap";
import "../../assets/styles/components.css";

const PartnershipDataComponent = ({ partnershipsData }) => {
  const partnerships = Array.isArray(partnershipsData)
    ? partnershipsData
    : Object.values(partnershipsData);

  return (
    <div>
      <Card>
        <Card.Header>
          <h2>Partnerships Data</h2>
        </Card.Header>
        <Card.Body>
          <table className="table mt-3" aria-label="Partnership statistics">
            <thead>
              <tr>
                <th>Batsman 1</th>
                <th>Batsman 2</th>
                <th>Total Runs</th>
                <th>Total Balls</th>
              </tr>
            </thead>
            <tbody>
              {partnerships.map((partnership, partnershipIndex) => (
                <tr key={partnershipIndex}>
                  <td>{partnership.bat1Name || partnership.bat1name || "-"}</td>
                  <td>{partnership.bat2Name || partnership.bat2name || "-"}</td>
                  <td>{partnership.totalRuns || partnership.runs || "-"}</td>
                  <td>{partnership.totalBalls || partnership.balls || "-"}</td>
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
