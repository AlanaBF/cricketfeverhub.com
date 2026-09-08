const BASE = 'https://cricbuzz-cricket.p.rapidapi.com';
const HOST = 'cricbuzz-cricket.p.rapidapi.com';

const VALID_CATEGORIES = new Set(['batsmen', 'bowlers', 'allrounders', 'teams']);
const VALID_FORMATS = new Set(['test', 'odi', 'odi-w', 't20', 't20-w']);

module.exports = async function handler(req, res) {
  const { category = 'batsmen', formatType = 'test' } = req.query;

  if (!VALID_CATEGORIES.has(category)) return res.status(400).json({ error: 'Invalid category' });
  if (!VALID_FORMATS.has(formatType)) return res.status(400).json({ error: 'Invalid formatType' });

  const params = new URLSearchParams({ formatType });
  const response = await fetch(`${BASE}/stats/v1/rankings/${category}?${params}`, {
    headers: {
      'X-RapidAPI-Key': process.env.RapidAPI_Key1,
      'X-RapidAPI-Host': HOST,
    },
  });

  if (!response.ok) return res.status(response.status).json({ error: 'Upstream error' });
  const data = await response.json();
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.json(data);
}
