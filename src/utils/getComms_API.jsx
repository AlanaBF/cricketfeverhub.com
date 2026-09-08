const getMatchCommentary = async (matchId) => {
  const params = new URLSearchParams({ matchId });
  const response = await fetch(`/api/commentary?${params}`);
  if (!response.ok) throw new Error(`Commentary API error: ${response.status}`);
  return response.json();
};

export default getMatchCommentary;
