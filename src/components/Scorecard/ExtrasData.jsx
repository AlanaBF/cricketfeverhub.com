import React from "react";
import { Card } from "react-bootstrap";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "../../assets/styles/components.css";

const ExtrasDataComponent = ({ extrasData }) => {
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
    </div>
  );
};

export default ExtrasDataComponent;
