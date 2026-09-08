const BASE = 'https://cricbuzz-cricket.p.rapidapi.com';
const HOST = 'cricbuzz-cricket.p.rapidapi.com';

module.exports = async function handler(req, res) {
  const { id } = req.query;
  if (!id || !/^\d{1,15}$/.test(id)) return res.status(400).json({ error: 'Invalid id' });

  const response = await fetch(`${BASE}/news/v1/detail/${id}`, {
    headers: {
      'X-RapidAPI-Key': process.env.RapidAPI_Key4,
      'X-RapidAPI-Host': HOST,
    },
  });

  if (!response.ok) return res.status(response.status).json({ error: 'Upstream error' });
  const data = await response.json();
  res.json(data);
}
