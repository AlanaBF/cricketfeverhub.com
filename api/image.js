export default async function handler(req, res) {
  const { id } = req.query;
  if (!id || !/^\d{1,10}$/.test(id)) return res.status(400).send("Invalid image id");

  const response = await fetch(
    `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${id}/i.jpg?p=de`,
    {
      headers: {
        "X-RapidAPI-Key": process.env.VITE_RapidAPI_Key2,
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
      },
    }
  );

  if (!response.ok) {
    return res.status(response.status).send("Image not found");
  }

  const contentType = response.headers.get("content-type") || "image/jpeg";
  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "public, max-age=86400");

  const buffer = await response.arrayBuffer();
  res.send(Buffer.from(buffer));
}
