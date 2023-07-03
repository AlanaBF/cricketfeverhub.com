// import React, { useEffect, useState } from 'react';
// import GetTeamsData from '../../utils/getTeams_API';

// const TeamSelector = ({teams}) => {
//   const [players, setPlayers] = useState([]);
//   const [selectedPlayers, setSelectedPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//         const response = await GetTeamsData();
//         setPlayers(response.player);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching player data:', error);
//       }
//     };

//     fetchPlayers();
//   }, []);

//   const handlePlayerSelect = (player) => {
//     const updatedSelectedPlayers = [...selectedPlayers, player];
//     setSelectedPlayers(updatedSelectedPlayers);
//   };

//   const handlePlayerRemove = (player) => {
//     const updatedSelectedPlayers = selectedPlayers.filter(
//       (selectedPlayer) => selectedPlayer.id !== player.id
//     );
//     setSelectedPlayers(updatedSelectedPlayers);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Squad Selection</h2>
//       <div>
//         <h3>Available Players</h3>
//         <ul>
//           {players.map((player) => (
//             <li key={player.id}>
//               {player.name}
//               <button onClick={() => handlePlayerSelect(player)}>
//                 Select
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h3>Your Ideal Team</h3>
//         <ul>
//           {selectedPlayers.map((player) => (
//             <li key={player.id}>
//               {player.name}
//               <button onClick={() => handlePlayerRemove(player)}>
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default TeamSelector;

import React from "react";

const TeamSelector = ({ teams }) => {
  return (
    <div>
      {/* Render the teams */}
      {teams.map((team, index) => (
        <div key={index}>{team}</div>
      ))}
    </div>
  );
};

export default TeamSelector;

