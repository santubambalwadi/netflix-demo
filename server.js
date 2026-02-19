const path = require('path');
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const OMDB_API_BASE = 'https://www.omdbapi.com/';
const OMDB_API_KEY = process.env.OMDB_API_KEY;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/search', async (req, res) => {
  try {
    if (!OMDB_API_KEY) return res.status(500).json({ Response: 'False', Error: 'Missing OMDB_API_KEY' });
    const s = req.query.s || '';
    const page = req.query.page || '1';
    const url = `${OMDB_API_BASE}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(s)}&type=movie&page=${encodeURIComponent(page)}`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(502).json({ Response: 'False', Error: 'Proxy error' });
  }
});

app.get('/api/movie', async (req, res) => {
  try {
    if (!OMDB_API_KEY) return res.status(500).json({ Response: 'False', Error: 'Missing OMDB_API_KEY' });
    const i = req.query.i || '';
    const url = `${OMDB_API_BASE}?apikey=${OMDB_API_KEY}&i=${encodeURIComponent(i)}&plot=full`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(502).json({ Response: 'False', Error: 'Proxy error' });
  }
});

app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`StreamX server running at http://localhost:${PORT}`);
});
