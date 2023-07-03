import React, { useEffect, useState } from 'react';
import GetTeamsData from "../../utils/getTeams_API";


const FantasyTeamCreator = () => {
        const [players, setPlayers] = useState([]);
        const [selectedPlayers, setSelectedPlayers] = useState([]);
      
        useEffect(() => {
          // Fetch player data from the API for fantasy team creation
          const fetchPlayers = async () => {
            try {
              const response = await GetTeamsData();
             
              setPlayers(response.player);
            } catch (error) {
              console.error('Error fetching player data:', error);
            }
          };
      
          fetchPlayers();
        }, []);
      
        const handlePlayerSelect = (player) => {
          const updatedSelectedPlayers = [...selectedPlayers, player];
          setSelectedPlayers(updatedSelectedPlayers);
        };
      
        const handlePlayerRemove = (player) => {
          const updatedSelectedPlayers = selectedPlayers.filter(
            (selectedPlayer) => selectedPlayer.id !== player.id
          );
          setSelectedPlayers(updatedSelectedPlayers);
        };
      
        return (
          <div>
            <h2>Fantasy Team</h2>
            <div>
              <h3>Available Players</h3>
              <ul>
                {players.map((player) => (
                  <li key={player.id}>
                    {player.name}
                    <button onClick={() => handlePlayerSelect(player)}>
                      Select
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Your Fantasy Team</h3>
              <ul>
                {selectedPlayers.map((player) => (
                  <li key={player.id}>
                    {player.name}
                    <button onClick={() => handlePlayerRemove(player)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      };

export default FantasyTeamCreator;
