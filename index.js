import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// PLAYER ROUTE
app.get("/player", async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "Missing id" });

  const url = `https://kingshot.net/api/player-info?playerId=${id}`;
  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data);
});

// GIFT CODES ROUTE
app.get("/gift-codes", async (req, res) => {
  try {
    const response = await fetch("https://kingshot.net/api/gift-codes");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Gift Codes Error:", error);
    res.status(500).json({ error: "Failed to fetch gift codes" });
  }
});

// SERVER START — ONLY ONE LISTEN CALL
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
