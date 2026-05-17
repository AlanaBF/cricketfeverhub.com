import { Card } from "react-bootstrap";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "../../assets/styles/components.css";

const ExtrasDataComponent = ({ extrasData }) => {
  const chartData = [
    { name: "Wides", value: extrasData.wides || 0 },
    { name: "No Balls", value: extrasData.noballs || extrasData.noBalls || 0 },
    { name: "Byes", value: extrasData.byes || 0 },
    { name: "Leg Byes", value: extrasData.legbyes || extrasData.legByes || 0 },
  ];

  const totalExtras = extrasData.total || chartData.reduce((sum, item) => sum + item.value, 0);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

  return (
    <div>
      <Card className="scorecard-card">
        <Card.Header>Extras Data (Total: {totalExtras})</Card.Header>
        <Card.Body>
          <div className="extras-data-container">
            <PieChart width={400} height={300}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[chartData.indexOf(entry) % COLORS.length]}
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
