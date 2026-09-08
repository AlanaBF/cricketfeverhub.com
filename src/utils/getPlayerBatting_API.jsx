const getPlayerBatting = async (playerId) => {
  const params = new URLSearchParams({ playerId });
  const response = await fetch(`/api/player-batting?${params}`);
  if (!response.ok) throw new Error(`Player batting API error: ${response.status}`);
  return response.json();
};

export default getPlayerBatting;
