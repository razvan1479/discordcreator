# Discord Showcase

Site de prezentare pentru servere și boți de Discord, cu **date live** preluate automat din API-ul Discord (nume, iconițe, număr de membri, număr de servere ale boților etc.).

## Ce face

- **Servere** — se încarcă automat din API-ul Discord pe baza codurilor de invite (nume, icon, banner, număr de membri, membri online — toate reale).
- **Boți** — se încarcă automat din API-ul Discord pe baza `clientId` (nume, avatar, număr de servere, număr de utilizatori — reale când Discord le expune).
- **Statistici hero** — se calculează automat din datele reale fetchuite.
- **RO / EN** — toggle de limbă.
- Proxy server Node care evită problemele de **CORS** (de aceea avem nevoie de un mic backend, nu doar fișiere statice).

## Structură

```
discord-showcase/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js          # Express: servește site-ul + proxy Discord
├── package.json
├── render.yaml        # config opțional pentru Render
└── .gitignore
```

## Rulare locală

Ai nevoie de **Node.js 18+** (pentru `fetch` nativ).

```bash
npm install
npm start
```

Deschide http://localhost:3000

## Editare conținut

Tot ce ține de conținut e în `public/script.js`, sus de tot:

- **`SERVERS_CONFIG`** — adaugă serverele tale (cod de invite + descriere + tag-uri).
- **`BOTS_CONFIG`** — adaugă boții tăi (`clientId` din Discord Developer Portal + descriere).

Restul (nume, iconițe, membri) vine automat din API.

## Deploy pe GitHub

```bash
git init
git add .
git commit -m "Initial commit — Discord showcase"
git branch -M main
git remote add origin https://github.com/USERNAME/discord-showcase.git
git push -u origin main
```

## Deploy pe Render

1. Intră pe [render.com](https://render.com) → **New** → **Web Service**.
2. Conectează repo-ul de GitHub.
3. Setări:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Apasă **Create Web Service**.

Render setează automat variabila `PORT`, iar serverul o folosește. După deploy, site-ul tău va fi live pe `https://numele-tau.onrender.com`.

> **Notă:** pe planul gratuit Render, serviciul "adoarme" după inactivitate și pornește din nou la primul request (poate dura ~30s prima dată).

## De ce nu merge ca site static simplu?

Apelurile către API-ul Discord făcute direct din browser sunt blocate de **CORS**. De aceea folosim un mic server Node care face request-urile către Discord în numele tău și le trimite browser-ului. Serverul include și un **cache de 5 minute** ca să nu lovești rate-limit-ul Discord.
