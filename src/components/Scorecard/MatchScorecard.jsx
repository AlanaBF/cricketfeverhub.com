import React from "react";

const MatchScorecard = ({ scoreCard, matchHeader }) => {
  if (!scoreCard || !matchHeader) {
    return <div>Loading...</div>;
  }

  const {
    matchId,
    matchDescription,
    matchFormat,
    matchType,
    matchStartTimestamp,
    team1,
    team2,
    status,
  } = matchHeader;

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString();
  };

//   const renderBatsmenData = (batsmenData) => {
//     return Object.values(batsmenData).map((batsman, index) => (
//       <div key={index}>
//         <h5>Batsman Name: {batsman.batName}</h5>
//         <p>Balls: {batsman.balls}</p>
//         <p>Runs: {batsman.runs}</p>
//         <p>Boundaries: {batsman.boundaries}</p>
//         <p>Sixes: {batsman.sixes}</p>
//         <p>Strike Rate: {batsman.strikeRate}</p>
//         <p>Dismissal: {batsman.outDesc}</p>
//         {/* Display other relevant data */}
//       </div>
//     ));
//   };

// const renderBowlersData = (bowlersData) => {
//     return Object.values(bowlersData).map((bowler, index) => (
//       <div key={index}>
//         <h5>Bowler Name: {bowler.bowlName}</h5>
//         <p>Overs: {bowler.overs}</p>
//         <p>Runs: {bowler.runs}</p>
//         <p>Wickets: {bowler.wickets}</p>
//         <p>Economy: {bowler.economy}</p>
//       </div>
//     ));
//   };

const renderBatsmenData = (batsmenData) => {
  if (!batsmenData) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Batsman Name</th>
          <th>Balls</th>
          <th>Runs</th>
          <th>Boundaries</th>
          <th>Sixes</th>
          <th>Strike Rate</th>
          <th>Dismissal</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(batsmenData).map((batsman, index) => (
          <tr key={index}>
            <td>{batsman.batName}</td>
            <td>{batsman.balls}</td>
            <td>{batsman.runs}</td>
            <td>{batsman.boundaries}</td>
            <td>{batsman.sixes}</td>
            <td>{batsman.strikeRate}</td>
            <td>{batsman.outDesc}</td>
          </tr>
        ))}
      </tbody>
    </table>
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

//const {
    // batTeamDetails,
    // bowlTeamDetails,
    //extrasData,
    // inningsId,
    // partnershipsData,
    // ppData,
    // scoreDetails,
    // timeScore,
    // wicketsData
 // } = scoreCard[0];

  // const renderExtrasData = (extrasData) => {
  //   return (
  //     <div>
  //       <h5>Extras:</h5>
  //       <p>Total: {extrasData.total}</p>
  //       <p>Wides: {extrasData.wides}</p>
  //       <p>No Balls: {extrasData.noBalls}</p>
  //       <p>Byes: {extrasData.byes}</p>
  //       <p>Leg Byes: {extrasData.legByes}</p>
  //     </div>
  //   );
  // };
  

//   const renderPartnershipsData = (partnershipsData) => {
//     if (!partnershipsData || !partnershipsData.partnership) {
//       return null;
//     }

//     const partnerships = partnershipsData.partnership;

//     return Object.values(partnerships).map((partnership, index) => (
//       <div key={index}>
//         <h5>Partnership {index + 1}</h5>
//         <p>Batsman 1: {partnership.bat1Name}</p>
//         <p>Batsman 1 Runs: {partnership.bat1Runs}</p>
//         <p>Batsman 1 Fours: {partnership.bat1fours}</p>
//         <p>Batsman 1 Sixes: {partnership.bat1sixes}</p>

//         <p>Batsman 2: {partnership.bat2Name}</p>
//         <p>Batsman 2 Runs: {partnership.bat2Runs}</p>
//         <p>Batsman 2 Fours: {partnership.bat2fours}</p>
//         <p>Batsman 2 Sixes: {partnership.bat2sixes}</p>

//         <p>Total Runs: {partnership.totalRuns}</p>
//         <p>Total Balls: {partnership.totalBalls}</p>
//       </div>
//     ));
//   };

//   const renderScoreDetails = (scoreDetails) => {
//     if (!scoreDetails || !scoreDetails.ballNbr) {
//       return null;
//     }
//     return (
//       <div>
//         <h4>Score Details</h4>
//         <p>Ball Number: {scoreDetails.ballNbr}</p>
//         <p>Is Declared: {scoreDetails.isDeclared ? "Yes" : "No"}</p>
//         <p>Is Follow On: {scoreDetails.isFollowOn ? "Yes" : "No"}</p>
//         <p>Overs: {scoreDetails.overs}</p>
//         <p>Revised Overs: {scoreDetails.revisedOvers}</p>
//         <p>Run Rate: {scoreDetails.runRate}</p>
//         <p>Runs: {scoreDetails.runs}</p>
//         <p>Runs Per Ball: {scoreDetails.runsPerBall}</p>
//         <p>Wickets: {scoreDetails.wickets}</p>
//       </div>
//     );
//   };

//   const renderWicketsData = (wicketsData) => {
//     if (!wicketsData || !wicketsData.wicket) {
//       return null;
//     }
//     return Object.values(wicketsData.wicket).map((wicket, index) => (
//     <div><h4>Wickets Data</h4> 
//       <div key={wicket.wktNbr}>  
      
//         <h5>Wicket: {index + 1}</h5>
//         <h4>Wicket {wicket.wktNbr}</h4>
//         <p>Ball Number: {wicket.ballNbr}</p>
//         <p>Batsman ID: {wicket.batId}</p>
//         <p>Batsman Name: {wicket.batName}</p>
//         <p>Wicket Over: {wicket.wktOver}</p>
//         <p>Wicket Runs: {wicket.wktRuns}</p>
//       </div>
//       </div>
//     ));
//   };
  

  return (
    <div>
      <div>
        <h2>Match Details</h2>
        <p>Match ID: {matchId}</p>
        <p>Description: {matchDescription}</p>
        <p>Format: {matchFormat}</p>
        <p>Type: {matchType}</p>
        <p>Start Date: {convertTimestampToDate(matchStartTimestamp)}</p>
        <p>Team 1: {team1.name}</p>
        <p>Team 2: {team2.name}</p>
        <p>Status: {status}</p>
      </div>
    
      {/* <div>
        <h4>Batsmen Data</h4>
        {renderBatsmenData(batTeamDetails.batsmenData)}
      </div>
   
      <div>
        <h4>Bowlers Data</h4>
        {renderBowlersData(bowlTeamDetails.bowlersData)}
      </div> */}
      <div>
  <h4>Batsmen Data</h4>
  {renderBatsmenData(scoreCard[0].batTeamDetails?.batsmenData)}
</div>

<div>
  <h4>Bowlers Data</h4>
  {renderBowlersData(scoreCard[0].bowlTeamDetails?.bowlersData)}
</div>

      {/* <div>
      <h4>Extras Data</h4>
      {renderExtrasData(scoreCard.extrasData)}</div> */}

      {/* <div>
        <h4>Partnerships Data</h4>
        {renderPartnershipsData(scoreCard.partnershipsData?.partnership)}
      </div>

      <div>{renderScoreDetails(scoreCard.scoreDetails)}</div>

      <div>
        <h4>Wickets Data</h4>
        {renderWicketsData(scoreCard.wicketsData)}
      </div> */}
    </div>
  );
};

export default MatchScorecard;