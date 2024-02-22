// import React, { useState } from "react";
// import { Card, Button, Modal } from "react-bootstrap";
// import getPlayerProfile from "../../utils/getPlayerProfile";
// import PlayerProfileCard from "./MatchPlayerData";
// import "../../assets/styles/components.css";

// const BatsmenDataComponent = ({ batsmenData }) => {
//   const [showData, setShowData] = useState(false);

//   const [selectedPlayerId, setSelectedPlayerId] = useState(null);
//   const [selectedPlayerInfo, setSelectedPlayerInfo] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const handleClickPlayerProfile = (batId) => {
//     getPlayerProfile(batId)
//       .then((playerData) => {
//         setSelectedPlayerId(playerData.batId); // Update to batId
//         setSelectedPlayerInfo({
//           ...playerData,
//           id: playerData.batId, // Update to batId
//         });
//         setShowModal(true);
//       })
//       .catch((error) => {
//         console.error("Error fetching player profile:", error);
//       });
//   };

//   const renderBatsmenData = () => {
//     if (!batsmenData) {
//       return null;
//     }

//     return (
//       <div>
//         <Card className="scorecard-card">
//           <Card.Header>Batsmen Data</Card.Header>
//           <Card.Body>
//             <div className="batsmen-data-container">
//               <table className="batsmen-table">
//                 <thead>
//                   <tr>
//                     <th>Batsman Name</th>
//                     <th>Balls Faced</th>
//                     <th>Runs</th>
//                     <th>Strike Rate</th>
//                     <th>Out</th>
//                     <th>Player Info</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Object.values(batsmenData).map((batsman, index) => (
//                     <tr key={index}>
//                       <td>{batsman.batName}</td>
//                       <td>{batsman.balls}</td>
//                       <td>{batsman.runs}</td>
//                       <td>{batsman.strikeRate}</td>
//                       <td>{batsman.outDesc}</td>
//                       <td>
//                         <Button
//                           className="profile-button"
//                           onClick={() =>
//                             handleClickPlayerProfile(batsman.batId)
//                           }
//                         >
//                           View Profile
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </Card.Body>
//         </Card>

//         <Button
//           className="close-button"
//           variant="primary"
//           onClick={() => setShowData(false)}
//         >
//           Close Batsmen Data
//         </Button>
//       </div>
//     );
//   };

//   const handleClick = () => {
//     setShowData((prevShowData) => !prevShowData);
//   };

//   return (
//     <div>
//       <button onClick={handleClick} className="batsmen-button">
//         {showData ? "Close Batsmen Data" : "Open Batsmen Data"}
//       </button>

//       {showData && renderBatsmenData()}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Player Profile</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedPlayerInfo && (
//             <PlayerProfileCard playerInfo={selectedPlayerInfo} />
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default BatsmenDataComponent;

import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import getPlayerProfile from "../../utils/getPlayerProfile";
import PlayerProfileCard from "./MatchPlayerData";
import "../../assets/styles/components.css";

const BatsmenDataComponent = ({ batsmenData }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedPlayerInfo, setSelectedPlayerInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClickPlayerProfile = (batId) => {
    getPlayerProfile(batId)
      .then((playerData) => {
        setSelectedPlayerId(playerData.batId); // Update to batId
        setSelectedPlayerInfo({
          ...playerData,
          id: playerData.batId, // Update to batId
        });
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error fetching player profile:", error);
      });
  };

  useEffect(() => {
    setShowModal(false); // Close modal when batsmen data is updated
  }, [batsmenData]);

  return (
    <div>
      <Card className="scorecard-card">
        <Card.Header>Batsmen Data</Card.Header>
        <Card.Body>
          <div className="batsmen-data-container">
            <table className="batsmen-table">
              <thead>
                <tr>
                  <th>Batsman Name</th>
                  <th>Balls Faced</th>
                  <th>Runs</th>
                  <th>Strike Rate</th>
                  <th>Out</th>
                  <th>Player Info</th>
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
                    <td>
                      <Button
                        className="profile-button"
                        onClick={() => handleClickPlayerProfile(batsman.batId)}
                      >
                        View Profile
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Player Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPlayerInfo && (
            <PlayerProfileCard playerInfo={selectedPlayerInfo} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BatsmenDataComponent;
