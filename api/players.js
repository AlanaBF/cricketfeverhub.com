const BASE = 'https://cricbuzz-cricket.p.rapidapi.com';
const HOST = 'cricbuzz-cricket.p.rapidapi.com';

export default async function handler(req, res) {
  const { plrN } = req.query;
  if (!plrN || typeof plrN !== 'string' || plrN.length > 100) return res.status(400).json({ error: 'Invalid plrN' });

  const params = new URLSearchParams({ plrN: plrN.trim() });
  const response = await fetch(`${BASE}/stats/v1/player/search?${params}`, {
    headers: {
      'X-RapidAPI-Key': process.env.RapidAPI_Key2,
      'X-RapidAPI-Host': HOST,
    },
  });

  if (!response.ok) return res.status(response.status).json({ error: 'Upstream error' });
  const data = await response.json();
  res.json(data);
}
