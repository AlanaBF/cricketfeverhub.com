import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "../../assets/styles/components.css";

const ExtrasDataComponent = ({ extrasData }) => {
  const [showData, setShowData] = useState(false);

  const renderExtrasData = () => {
    if (!extrasData) {
      return null;
    }

    const data = [
      { name: "Wides", value: extrasData.wides },
      { name: "No Balls", value: extrasData.noBalls },
      { name: "Byes", value: extrasData.byes },
      { name: "Leg Byes", value: extrasData.legByes },
    ];

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#dc143c"];

    return (
      <div>
        <Card className="scorecard-card">
          <Card.Header>Extras Data</Card.Header>
          <Card.Body>
            <div className="extras-data-container">
              <h4 className="extras-heading">Extras Data</h4>
              <PieChart width={400} height={300}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </Card.Body>
        </Card>
        <Button className="close-button" variant="primary" onClick={() => setShowData(false)}>
          Close Extras Data
        </Button>
      </div>
    );
  };

  const handleClick = () => {
    setShowData((prevShowData) => !prevShowData);
  };
  
  return (
    <div>
      <button onClick={handleClick} className="extras-button">
        {showData ? "Close Extras Data" : "Open Extras Data"}
      </button>
      {showData && renderExtrasData()}
    </div>
  );
};

export default ExtrasDataComponent;
