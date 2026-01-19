import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/player", async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "Missing id" });

  const url = `https://kingshot.net/api/player-info?playerId=${id}`;
  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port);
