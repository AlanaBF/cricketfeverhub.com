const getPlayerBowling = async (playerId) => {
  const params = new URLSearchParams({ playerId });
  const response = await fetch(`/api/player-bowling?${params}`);
  if (!response.ok) throw new Error(`Player bowling API error: ${response.status}`);
  return response.json();
};

export default getPlayerBowling;
