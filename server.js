/* ============================================================
   server.js — Discord Showcase
   Servește site-ul static și face proxy la API-ul Discord
   (ca să eviți erorile CORS din browser).
   ============================================================ */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Discord API base
const DISCORD_API = 'https://discord.com/api/v10';

// User-Agent cerut de Discord pentru request-uri
const HEADERS = {
  'User-Agent': 'DiscordShowcase (https://github.com, 1.0)',
  'Accept': 'application/json'
};

// Cache simplu în memorie (5 minute) ca să nu lovești rate-limit-ul Discord
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minute

function getCached(key) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.time < CACHE_TTL) return hit.data;
  return null;
}
function setCached(key, data) {
  cache.set(key, { data, time: Date.now() });
}

/* ─── Servește fișierele statice din /public ─── */
app.use(express.static(path.join(__dirname, 'public')));

/* ─── Proxy: invite server ─── */
app.get('/api/invites/:code', async (req, res) => {
  const code = req.params.code;
  const cacheKey = `invite:${code}`;

  const cached = getCached(cacheKey);
  if (cached) return res.json(cached);

  try {
    const r = await fetch(`${DISCORD_API}/invites/${code}?with_counts=true`, { headers: HEADERS });
    if (!r.ok) return res.status(r.status).json({ error: `Discord HTTP ${r.status}` });
    const data = await r.json();
    setCached(cacheKey, data);
    res.json(data);
  } catch (err) {
    console.error('[invite proxy]', code, err.message);
    res.status(502).json({ error: 'Proxy error', detail: err.message });
  }
});

/* ─── Proxy: bot / application ─── */
app.get('/api/bot/:clientId', async (req, res) => {
  const clientId = req.params.clientId;
  const cacheKey = `bot:${clientId}`;

  const cached = getCached(cacheKey);
  if (cached) return res.json(cached);

  try {
    const r = await fetch(`${DISCORD_API}/applications/${clientId}/rpc`, { headers: HEADERS });
    if (!r.ok) return res.status(r.status).json({ error: `Discord HTTP ${r.status}` });
    const data = await r.json();
    setCached(cacheKey, data);
    res.json(data);
  } catch (err) {
    console.error('[bot proxy]', clientId, err.message);
    res.status(502).json({ error: 'Proxy error', detail: err.message });
  }
});

/* ─── Health check (util pentru Render) ─── */
app.get('/health', (req, res) => res.json({ status: 'ok' }));

/* ─── Fallback: orice altceva → index.html ─── */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Discord Showcase rulează pe portul ${PORT}`);
});
