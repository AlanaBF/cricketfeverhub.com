module.exports = async function handler(req, res) {
  const { city } = req.query;
  if (!city || typeof city !== 'string' || city.length > 100) return res.status(400).json({ error: 'Invalid city' });

  const params = new URLSearchParams({ q: city.trim(), appid: process.env.RapidAPI_Key_Weather });
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?${params}`);

  if (!response.ok) return res.status(response.status).json({ error: 'Upstream error' });
  const data = await response.json();
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
  res.json(data);
}
