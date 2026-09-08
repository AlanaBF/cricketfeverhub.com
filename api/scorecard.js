const BASE = 'https://cricbuzz-cricket.p.rapidapi.com';
const HOST = 'cricbuzz-cricket.p.rapidapi.com';

export default async function handler(req, res) {
  const { matchId } = req.query;
  if (!matchId || !/^\d{1,15}$/.test(matchId)) return res.status(400).json({ error: 'Invalid matchId' });

  const response = await fetch(`${BASE}/mcenter/v1/${matchId}/hscard`, {
    headers: {
      'X-RapidAPI-Key': process.env.RapidAPI_Key5,
      'X-RapidAPI-Host': HOST,
    },
  });

  if (!response.ok) return res.status(response.status).json({ error: 'Upstream error' });
  const data = await response.json();
  res.json(data);
}
