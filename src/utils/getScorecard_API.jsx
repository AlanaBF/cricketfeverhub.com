const getScorecard = async (matchId) => {
  const params = new URLSearchParams({ matchId });
  const response = await fetch(`/api/scorecard?${params}`);
  if (!response.ok) throw new Error(`Scorecard API error: ${response.status}`);
  return response.json();
};

export default getScorecard;
