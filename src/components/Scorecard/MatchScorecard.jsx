import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import '../LiveCricketMatches/LiveMatches.css'
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

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString();
  };

  const renderBatsmenData = (batsmenData) => {
    if (!batsmenData) {
      return null;
    }

    return (
      <div>
      <table>
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
    );
  };

  const renderBowlersData = (bowlersData) => {
    if (!bowlersData) {
      return null;
    }

    return (
      <table>
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
            <tr key={index}>
              <td>{bowler.bowlName}</td>
              <td>{bowler.overs}</td>
              <td>{bowler.runs}</td>
              <td>{bowler.wickets}</td>
              <td>{bowler.economy}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
      <div>
        <h4>Extras Data</h4>
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    );
  };
  

    // const renderPartnershipsData = (partnershipsData) => {
    //   if (!partnershipsData || !partnershipsData.partnership) {
    //     return null;
    //   }

    //   const partnerships = partnershipsData.partnership;

    //   return Object.values(partnerships).map((partnership, index) => (
    //     <div key={index}>
    //       <h5>Partnership {index + 1}</h5>
    //       <p>Batsman 1: {partnership.bat1Name}</p>
    //       <p>Batsman 1 Runs: {partnership.bat1Runs}</p>
    //       <p>Batsman 1 Fours: {partnership.bat1fours}</p>
    //       <p>Batsman 1 Sixes: {partnership.bat1sixes}</p>

    //       <p>Batsman 2: {partnership.bat2Name}</p>
    //       <p>Batsman 2 Runs: {partnership.bat2Runs}</p>
    //       <p>Batsman 2 Fours: {partnership.bat2fours}</p>
    //       <p>Batsman 2 Sixes: {partnership.bat2sixes}</p>

    //       <p>Total Runs: {partnership.totalRuns}</p>
    //       <p>Total Balls: {partnership.totalBalls}</p>
    //     </div>
    //   ));
    // };

    const renderScoreDetails = (scoreDetails) => {
      if (!scoreDetails || !scoreDetails.ballNbr) {
        return null;
      }
    
      return (
        <div>
          <h4>Score Details</h4>
          <table>
            <tbody>
              <tr>
                <td>Ball Number:</td>
                <td>{scoreDetails.ballNbr}</td>
              </tr>
              <tr>
                <td>Is Declared:</td>
                <td>{scoreDetails.isDeclared ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>Is Follow On:</td>
                <td>{scoreDetails.isFollowOn ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>Overs:</td>
                <td>{scoreDetails.overs}</td>
              </tr>
              <tr>
                <td>Revised Overs:</td>
                <td>{scoreDetails.revisedOvers}</td>
              </tr>
              <tr>
                <td>Run Rate:</td>
                <td>{scoreDetails.runRate}</td>
              </tr>
              <tr>
                <td>Runs:</td>
                <td>{scoreDetails.runs}</td>
              </tr>
              <tr>
                <td>Runs Per Ball:</td>
                <td>{scoreDetails.runsPerBall}</td>
              </tr>
              <tr>
                <td>Wickets:</td>
                <td>{scoreDetails.wickets}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    };
    

    // const renderWicketsData = (wicketsData) => {
    //   if (!wicketsData || !wicketsData.wicket) {
    //     return null;
    //   }
    //   return Object.values(wicketsData.wicket).map((wicket, index) => (
    //   <div><h4>Wickets Data</h4>
    //     <div key={wicket.wktNbr}>

    //       <h5>Wicket: {index + 1}</h5>
    //       <h4>Wicket {wicket.wktNbr}</h4>
    //       <p>Ball Number: {wicket.ballNbr}</p>
    //       <p>Batsman ID: {wicket.batId}</p>
    //       <p>Batsman Name: {wicket.batName}</p>
    //       <p>Wicket Over: {wicket.wktOver}</p>
    //       <p>Wicket Runs: {wicket.wktRuns}</p>
    //     </div>
    //     </div>
    //   ));
    // };

  return (
    <div>
      <div>
      <h1>{seriesDesc}</h1>
        <h2>
          {team1.name} vs {team2.name}
        </h2>
        <p>
          {matchType} {matchDescription}
        </p>
        <p>Start Date: {convertTimestampToDate(matchStartTimestamp)}</p>
        <p>{tossResults.tossWinnerName} have won the toss and have elected {tossResults.decision} first</p>
        <p>Current Status: {status}</p>
        <p>{result.winningTeam} {result.winByRuns}</p>
        <p>{playersOfTheMatch}</p>
        <p>{playersOfTheSeries}</p>
      </div>

      <div>
        <h1>1st Innings </h1>
        <h4>Batsmen Data</h4>
        {renderBatsmenData(scoreCard[0].batTeamDetails?.batsmenData)}
      </div>

      <div>
        <h4>Bowlers Data</h4>
        {renderBowlersData(scoreCard[0].bowlTeamDetails?.bowlersData)}
      </div>

      <div>
      {renderExtrasData(scoreCard[0].extrasData)}</div>

  
      {/* <div>
        <h4>Partnerships Data</h4>
        {renderPartnershipsData(scoreCard[0].partnershipsData?.partnership)}
      </div> */}

      <div>{renderScoreDetails(scoreCard[0].scoreDetails)}</div>

      {/* <div>
        <h4>Wickets Data</h4>
        {renderWicketsData(scoreCard[0].wicketsData)}
      </div> */}

      <div>
        <h1>Innings 1</h1>
        <h4>Batsmen Data</h4>
        {renderBatsmenData(scoreCard[1].batTeamDetails?.batsmenData)}
      </div>

      <div>
        <h4>Bowlers Data</h4>
        {renderBowlersData(scoreCard[1].bowlTeamDetails?.bowlersData)}
      </div>

      <div>
      <h4>Extras Data</h4>
      {renderExtrasData(scoreCard[1].extrasData)}</div>

  
      {/* <div>
        <h4>Partnerships Data</h4>
        {renderPartnershipsData(scoreCard[1].partnershipsData?.partnership)}
      </div> */}

      <div>{renderScoreDetails(scoreCard[1].scoreDetails)}</div>

      {/* <div>
        <h4>Wickets Data</h4>
        {renderWicketsData(scoreCard[1].wicketsData)}
      </div> */}

      <div>
        <h1>Innings 2</h1>
        <h4>Batsmen Data</h4>
        {renderBatsmenData(scoreCard[2].batTeamDetails?.batsmenData)}
      </div>

      <div>
        <h4>Bowlers Data</h4>
        {renderBowlersData(scoreCard[2].bowlTeamDetails?.bowlersData)}
      </div>

      <div>
      <h4>Extras Data</h4>
      {renderExtrasData(scoreCard[2].extrasData)}</div>

  
      {/* <div>
        <h4>Partnerships Data</h4>
        {renderPartnershipsData(scoreCard[2].partnershipsData?.partnership)}
      </div> */}

      <div>{renderScoreDetails(scoreCard[2].scoreDetails)}</div>

      {/* <div>
        <h4>Wickets Data</h4>
        {renderWicketsData(scoreCard[2].wicketsData)}
      </div> */}

    </div>
  );
};

export default MatchScorecard;
