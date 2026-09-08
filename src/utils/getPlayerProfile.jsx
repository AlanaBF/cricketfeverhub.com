const getPlayerProfile = async (playerId) => {
  const params = new URLSearchParams({ playerId });
  const response = await fetch(`/api/player-profile?${params}`);
  if (!response.ok) throw new Error(`Player profile API error: ${response.status}`);
  return response.json();
};

export default getPlayerProfile;
