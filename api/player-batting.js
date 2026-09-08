const BASE = 'https://cricbuzz-cricket.p.rapidapi.com';
const HOST = 'cricbuzz-cricket.p.rapidapi.com';

export default async function handler(req, res) {
  const { playerId } = req.query;
  if (!playerId || !/^\d{1,15}$/.test(playerId)) return res.status(400).json({ error: 'Invalid playerId' });

  const response = await fetch(`${BASE}/stats/v1/player/${playerId}/batting`, {
    headers: {
      'X-RapidAPI-Key': process.env.RapidAPI_Key5,
      'X-RapidAPI-Host': HOST,
    },
  });

  if (!response.ok) return res.status(response.status).json({ error: 'Upstream error' });
  const data = await response.json();
  res.json(data);
}
