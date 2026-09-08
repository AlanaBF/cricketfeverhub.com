const BASE = 'https://cricbuzz-cricket.p.rapidapi.com';
const HOST = 'cricbuzz-cricket.p.rapidapi.com';

export default async function handler(req, res) {
  const response = await fetch(`${BASE}/news/v1/index`, {
    headers: {
      'X-RapidAPI-Key': process.env.RapidAPI_Key4,
      'X-RapidAPI-Host': HOST,
    },
  });

  if (!response.ok) return res.status(response.status).json({ error: 'Upstream error' });
  const data = await response.json();
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.json(data);
}
