const getPlayersData = async (playerName) => {
  const params = new URLSearchParams({ plrN: playerName });
  const response = await fetch(`/api/players?${params}`);
  if (!response.ok) throw new Error(`Players API error: ${response.status}`);
  return response.json();
};

export default getPlayersData;
