const BASE = 'https://cricbuzz-cricket.p.rapidapi.com';
const HOST = 'cricbuzz-cricket.p.rapidapi.com';

module.exports = async function handler(req, res) {
  const { matchId } = req.query;
  if (!matchId || !/^\d{1,15}$/.test(matchId)) return res.status(400).json({ error: 'Invalid matchId' });

  const response = await fetch(`${BASE}/mcenter/v1/${matchId}/comm`, {
    headers: {
      'X-RapidAPI-Key': process.env.RapidAPI_Key1,
      'X-RapidAPI-Host': HOST,
    },
  });

  if (!response.ok) return res.status(response.status).json({ error: 'Upstream error' });
  const data = await response.json();
  res.json(data);
}
