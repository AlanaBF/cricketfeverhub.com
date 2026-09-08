const getUpcomingMatchesData = async () => {
  const response = await fetch('/api/upcoming-matches');
  if (!response.ok) throw new Error(`Upcoming matches API error: ${response.status}`);
  return response.json();
};

export default getUpcomingMatchesData;
