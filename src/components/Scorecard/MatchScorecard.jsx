import React from "react";
import { Card, Button } from "react-bootstrap";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import "../../assets/styles/components.css";

const MatchScorecard = ({ scoreCard, matchHeader }) => {
  if (!scoreCard || !matchHeader) {
    return <div>Loading...</div>;
  }

  const {
    matchId,
    dayNumber,
    matchDescription,
    matchFormat,
    seriesDesc,
    matchType,
    matchStartTimestamp,
    tossResults,
    matchTeamInfo,
    team1,
    team2,
    status,
    playersOfTheMatch,
    playersOfTheSeries,
    result,
  } = matchHeader;

  const Team1 =
    (scoreCard[0]?.batTeamDetails?.batsmenData,
    scoreCard[0]?.batTeamDetails?.batTeamName);

  const Team2 =
    (scoreCard[1]?.batTeamDetails?.batsmenData,
    scoreCard[1]?.batTeamDetails?.batTeamName);

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString();
  };

  const renderBatsmenData = (batsmenData) => {
    if (!batsmenData) {
      return null;
    }

    const data = Object.values(batsmenData).map((batsman, index) => ({
      name: batsman.batName,
      runs: batsman.runs,
    }));

    return (
      <Card className="scorecard-card">
        <Card.Header>Batsmen Data</Card.Header>
        <Card.Body>
          <div className="batsmen-data-container">
            <div className="chart-container">
              <BarChart width={300} height={200} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="runs" fill="navy" />
              </BarChart>
            </div>
            <table className="batsmen-table">
              <thead>
                <tr>
                  <th>Batsman Name</th>
                  <th>Balls Faced</th>
                  <th>Runs</th>
                  <th>Strike Rate</th>
                  <th>Out</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(batsmenData).map((batsman, index) => (
                  <tr key={index}>
                    <td>{batsman.batName}</td>
                    <td>{batsman.balls}</td>
                    <td>{batsman.runs}</td>
                    <td>{batsman.strikeRate}</td>
                    <td>{batsman.outDesc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderBowlersData = (bowlersData) => {
    if (!bowlersData) {
      return null;
    }

    return (
      <Card className="scorecard-card">
        <Card.Header>Bowlers Data</Card.Header>
        <Card.Body>
          <table className="bowlers-table">
            <thead>
              <tr>
                <th>Bowler Name</th>
                <th>Overs</th>
                <th>Runs</th>
                <th>Wickets</th>
                <th>Economy</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(bowlersData).map((bowler, index) => (
                <tr key={index} className="bowler-row">
                  <td>{bowler.bowlName}</td>
                  <td>{bowler.overs}</td>
                  <td>{bowler.runs}</td>
                  <td>{bowler.wickets}</td>
                  <td>{bowler.economy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  };

  const renderExtrasData = (extrasData) => {
    if (!extrasData) {
      return null;
    }

    const data = [
      // { name: "Total", value: extrasData.total },
      { name: "Wides", value: extrasData.wides },
      { name: "No Balls", value: extrasData.noBalls },
      { name: "Byes", value: extrasData.byes },
      { name: "Leg Byes", value: extrasData.legByes },
    ];

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#dc143c"];

    return (
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
    );
  };

  const renderPartnershipsData = (partnershipsData) => {
    if (!partnershipsData) {
      return null;
    }

    const partnerships = Object.values(partnershipsData);

    // Sort partnerships based on total runs (from highest to lowest)
    const sortedPartnerships = partnerships.sort(
      (a, b) => b.totalRuns - a.totalRuns
    );

    return (
      <Card className="scorecard-card">
        <Card.Header>Partnerships Data</Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <table className="partnerships-table">
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
                  <tr key={index} className="partnership-row">
                    <td>
                      <div className="batsman-info">
                        <p className="batsman-name">{partnership.bat1Name}: </p>
                        <div className="batsman-stats">
                          <p>Runs: {partnership.bat1Runs}</p>
                          <p>Fours: {partnership.bat1fours}</p>
                          <p>Sixes: {partnership.bat1sixes}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="batsman-info">
                        <p className="batsman-name">{partnership.bat2Name}: </p>
                        <div className="batsman-stats">
                          <p>Runs: {partnership.bat2Runs}</p>
                          <p>Fours: {partnership.bat2fours}</p>
                          <p>Sixes: {partnership.bat2sixes}</p>
                        </div>
                      </div>
                    </td>
                    <td>{partnership.totalRuns}</td>
                    <td>{partnership.totalBalls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderScoreDetails = (scoreDetails) => {
    if (!scoreDetails) {
      return <div>Loading ...</div>;
    }

    return (
      <Card className="scorecard-card">
        <Card.Header>Innings Summary</Card.Header>
        <Card.Body>
          <p className="innings-summary">
            Ball Number: {scoreDetails.ballNbr}
            <br />
            Declared?: {scoreDetails.isDeclared ? "Yes" : "No"}
            <br />
            Follow On?: {scoreDetails.isFollowOn ? "Yes" : "No"}
            <br />
            Overs: {scoreDetails.overs}
            <br />
            Revised Overs: {scoreDetails.revisedOvers}
            <br />
            Run Rate: {scoreDetails.runRate}
            <br />
            Runs: {scoreDetails.runs}
            <br />
            Runs Per Ball: {scoreDetails.runsPerBall}
            <br />
            Wickets: {scoreDetails.wickets}
            <br />
          </p>
        </Card.Body>
      </Card>
    );
  };

  const renderWicketsData = (wicketsData) => {
    if (!wicketsData) {
      return null;
    }
    const sortedWickets = Object.values(wicketsData).sort(
      (a, b) => a.wktNbr - b.wktNbr
    );

    return (
      <Card className="scorecard-card">
        <Card.Header>Wickets Data</Card.Header>
        <Card.Body>
          <div className="wickets-container">
            {sortedWickets.map((wicket, index) => (
              <div key={index} className="wicket-card">
                <h4>Wicket {wicket.wktNbr}</h4>
                <p>Ball Number: {wicket.ballNbr}</p>
                <p>Batsman Name: {wicket.batName}</p>
                <p>Wicket Over: {wicket.wktOver}</p>
                <p>Wicket Runs: {wicket.wktRuns}</p>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <div className="scorecard-container">
        <h1 className="intro-description">{seriesDesc}</h1>
        <h2 className="intro-description">
          {team1.name} vs {team2.name}
        </h2>
        <p className="intro-description">
          {matchType} {matchDescription}
        </p>
        <p className="intro-description">
          Start Date: {convertTimestampToDate(matchStartTimestamp)}
        </p>
        <p className="intro-description">
          {tossResults.tossWinnerName} have won the toss and have elected{" "}
          {tossResults.decision} first
        </p>
        <p className="intro-description">Current Status: {status}</p>
        <p className="intro-description">
          {result.winningTeam} {result.winByRuns}
        </p>
        <p className="intro-description">{playersOfTheMatch}</p>
        <p className="intro-description">{playersOfTheSeries}</p>
      </div>

      <div className="teams-container">
        <div className="team-container">
          <h2>{team1.name}</h2>
          <p>1st Innings</p>
          <div className="scorecard-section">
            <div className="scorecard-column">
              {renderScoreDetails(scoreCard[0].scoreDetails)}
            </div>
            <div className="scorecard-column">
              {renderBatsmenData(scoreCard[0].batTeamDetails?.batsmenData)}
            </div>
            <div className="scorecard-column">
              {renderBowlersData(scoreCard[0].bowlTeamDetails?.bowlersData)}
            </div>
            <div className="scorecard-column">
              {renderExtrasData(scoreCard[0].extrasData)}
            </div>
            <div className="scorecard-column">
              {renderPartnershipsData(scoreCard[0].partnershipsData)}
            </div>
            <div className="scorecard-column">
              {renderWicketsData(scoreCard[0].wicketsData)}
            </div>
          </div>
        </div>
      </div>
      <div className="team-container">
        <h2>{team2.name}</h2>
        <p>1st Innings</p>
        {scoreCard[1] ? (
          <div className="scorecard-section">
            <div className="scorecard-column">
              {renderScoreDetails(scoreCard[1].scoreDetails)}
            </div>
            <div className="scorecard-column">
              {renderBatsmenData(scoreCard[1].batTeamDetails?.batsmenData)}
            </div>
            <div className="scorecard-column">
              {renderBowlersData(scoreCard[1].bowlTeamDetails?.bowlersData)}
            </div>
            <div className="scorecard-column">
              {renderExtrasData(scoreCard[1].extrasData)}
            </div>
            <div className="scorecard-column">
              {renderPartnershipsData(scoreCard[1].partnershipsData)}
            </div>
            <div className="scorecard-column">
              {renderWicketsData(scoreCard[1].wicketsData)}
            </div>
          </div>
        ) : (
          <div>No data available for innings</div>
        )}
      </div>

      {/* 2nd Innings */}

      <div className="teams-container">
        <div className="team-container">
          <h2>{team1.name}</h2>
          <p>2nd Innings</p>
          {scoreCard[2] ? (
            <div className="scorecard-section">
              <div className="scorecard-column">
                {renderScoreDetails(scoreCard[2].scoreDetails)}
              </div>
              <div className="scorecard-column">
                {renderBatsmenData(scoreCard[2].batTeamDetails?.batsmenData)}
              </div>
              <div className="scorecard-column">
                {renderBowlersData(scoreCard[2].bowlTeamDetails?.bowlersData)}
              </div>
              <div className="scorecard-column">
                {renderExtrasData(scoreCard[2].extrasData)}
              </div>
              <div className="scorecard-column">
                {renderPartnershipsData(scoreCard[2].partnershipsData)}
              </div>
              <div className="scorecard-column">
                {renderWicketsData(scoreCard[2].wicketsData)}
              </div>
            </div>
          ) : (
            <div>No data available for innings</div>
          )}
        </div>
      </div>

      <div className="team-container">
        <h2>{team2.name}</h2>
        <p>2nd Innings</p>
        {scoreCard[3] ? (
          <div className="scorecard-section">
            <div className="scorecard-column">
              {renderScoreDetails(scoreCard[3].scoreDetails)}
            </div>
            <div className="scorecard-column">
              {renderBatsmenData(scoreCard[3].batTeamDetails?.batsmenData)}
            </div>
            <div className="scorecard-column">
              {renderBowlersData(scoreCard[3].bowlTeamDetails?.bowlersData)}
            </div>
            <div className="scorecard-column">
              {renderExtrasData(scoreCard[3].extrasData)}
            </div>
            <div className="scorecard-column">
              {renderPartnershipsData(scoreCard[3].partnershipsData)}
            </div>
            <div className="scorecard-column">
              {renderWicketsData(scoreCard[3].wicketsData)}
            </div>
          </div>
        ) : (
          <div>No data available for innings</div>
        )}
      </div>
    </div>
  );
};

export default MatchScorecard;
