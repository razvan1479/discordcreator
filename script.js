/* ============================================================
   DISCORD SHOWCASE — script.js
   ============================================================ */

/* ============================================================
   API BASE
   Lasă gol ("") — apelurile merg prin proxy-ul Node de pe același
   domeniu (/api/...), care le trimite mai departe la Discord.
   Așa eviți erorile CORS pe Render / orice domeniu real.
   ============================================================ */
const API_BASE = "";

/* ============================================================
   CONFIGURARE SERVERE
   Editează această secțiune cu serverele tale reale.
   - invite  : codul sau linkul complet (ex: "abc123" sau "https://discord.gg/abc123")
   - description : { ro: "...", en: "..." }  — scris de tine, nu vine din API
   - tags    : array de { label, cls }  — cls poate fi: tag-blue | tag-pink | tag-green | tag-gold
   - gradient: [culoareStart, culoareStop] pentru banner-ul cardului
   ============================================================ */
const SERVERS_CONFIG = [
  {
    invite: "https://discord.gg/cBMfcgnGVf",
    description: {
      ro: "Comunitate de gaming românească cu turnee, giveaway-uri și canale dedicate pentru fiecare joc popular.",
      en: "Romanian gaming community with tournaments, giveaways and dedicated channels for every popular game."
    },
    tags: [
      { label: "Gaming",  cls: "tag-blue"  },
      { label: "Activ",   cls: "tag-green" },
      { label: "Turnee",  cls: "tag-gold"  }
    ],
    gradient: ["#5865F2", "#EB459E"]
  },
  {
    invite: "discord.gg/apollo2",
    description: {
      ro: "Hub pentru developeri din România. Code reviews, ajutor la proiecte, job posts și resurse de programare.",
      en: "Hub for Romanian developers. Code reviews, project help, job posts and programming resources."
    },
    tags: [
      { label: "Games",       cls: "tag-green" },
      { label: "Active",      cls: "tag-blue"  },
      { label: "Community",   cls: "tag-pink"  }
    ],
    gradient: ["#57F287", "#5865F2"]
  },
  {
    invite: "https://discord.gg/3m9y4gHcye",
    description: {
      ro: "Spațiu pentru artiști digitali și tradiționali. Feedback constructiv, showcase-uri și colaborări.",
      en: "Space for digital and traditional artists. Constructive feedback, showcases and collaborations."
    },
    tags: [
      { label: "Artă",   cls: "tag-pink" },
      { label: "Design", cls: "tag-gold" },
      { label: "Creative", cls: "tag-blue" }
    ],
    gradient: ["#EB459E", "#FEE75C"]
  },
  {
    invite: "discord-api",
    description: {
      ro: "Liga competitivă pentru CS2, Valorant și League of Legends. Clasamente, meciuri și coaching.",
      en: "Competitive league for CS2, Valorant and League of Legends. Rankings, matches and coaching."
    },
    tags: [
      { label: "Esports",    cls: "tag-gold"  },
      { label: "Competitiv", cls: "tag-blue"  },
      { label: "Live",       cls: "tag-green" }
    ],
    gradient: ["#FEE75C", "#ED4245"]
  }
];

/* ============================================================
   CONFIGURARE BOȚI
   Editează această secțiune cu boții tăi reali.
   - clientId   : ID-ul aplicației Discord (din Developer Portal)
   - fallback   : { name, emoji } — folosit dacă API-ul nu răspunde
   - description: { ro, en } — scris de tine, nu vine din API
   - category   : { ro, en } — categoria botului
   - version, commands, stats, inviteUrl, docsUrl, gradient
   ============================================================ */
const BOTS_CONFIG = [
  {
    clientId: "1045800378228281345",
    fallback: { name: "GuardBot Pro", emoji: "🛡️" },
    description: {
      ro: "Sistem complet de moderare cu anti-spam, auto-role, logs detaliate și sistem de avertizări automate.",
      en: "Full moderation system with anti-spam, auto-role, detailed logs and automatic warning system."
    },
    category: { ro: "Moderare", en: "Moderation" },
    version: "v2.4.1",
    commands: ["/ban", "/kick", "/mute", "/warn", "/automod", "/logs"],
    stats: { servers: "48", users: "12k", uptime: "99.9%" },
    inviteUrl: "https://discord.com/oauth2/authorize?client_id=1045800378228281345&permissions=8&scope=bot",
    docsUrl: "#",
    gradient: ["#5865F2", "#57F287"]
  },
  {
    clientId: "235088799074484224",
    fallback: { name: "SoundWave", emoji: "🎵" },
    description: {
      ro: "Player muzical de înaltă calitate cu suport pentru YouTube, Spotify, SoundCloud și playlist-uri custom.",
      en: "High-quality music player with support for YouTube, Spotify, SoundCloud and custom playlists."
    },
    category: { ro: "Muzică", en: "Music" },
    version: "v1.8.0",
    commands: ["/play", "/skip", "/queue", "/loop", "/filter", "/lyrics"],
    stats: { servers: "120", users: "35k", uptime: "99.7%" },
    inviteUrl: "https://discord.com/oauth2/authorize?client_id=235088799074484224&permissions=8&scope=bot",
    docsUrl: "#",
    gradient: ["#EB459E", "#FEE75C"]
  },
  {
    clientId: "282859044593598464",
    fallback: { name: "LevelUp XP", emoji: "📊" },
    description: {
      ro: "Sistem avansat de XP și nivele cu carduri personalizate, leaderboard-uri și recompense automate per nivel.",
      en: "Advanced XP and level system with custom rank cards, leaderboards and automatic per-level rewards."
    },
    category: { ro: "Niveluri", en: "Leveling" },
    version: "v3.1.0",
    commands: ["/rank", "/leaderboard", "/xp", "/rewards", "/card"],
    stats: { servers: "85", users: "28k", uptime: "100%" },
    inviteUrl: "https://discord.com/oauth2/authorize?client_id=282859044593598464&permissions=8&scope=bot",
    docsUrl: "#",
    gradient: ["#57F287", "#5865F2"]
  },
  {
    clientId: "557628352828014614",
    fallback: { name: "TicketMaster", emoji: "🎟️" },
    description: {
      ro: "Sistem de tickete profesional cu categorii multiple, transcripturi, rating-uri și integrare cu canale private.",
      en: "Professional ticket system with multiple categories, transcripts, ratings and private channel integration."
    },
    category: { ro: "Support", en: "Support" },
    version: "v2.0.5",
    commands: ["/ticket", "/close", "/claim", "/transcript", "/setup"],
    stats: { servers: "62", users: "18k", uptime: "99.5%" },
    inviteUrl: "https://discord.com/oauth2/authorize?client_id=557628352828014614&permissions=8&scope=bot",
    docsUrl: "#",
    gradient: ["#FEE75C", "#ED4245"]
  }
];

/* ============================================================
   TRADUCERI
   ============================================================ */
const translations = {
  ro: {
    pageTitle:    "Discord Universe — Servere & Boți",
    navServers:   "Servere", navBots: "Boți", navFeatures: "Features", navContact: "Contact",
    heroBadge:    "Discord Developer · Activ 2024",
    heroLine1:    "Servere și", heroLine2: "Boți de", heroLine3: "Discord",
    heroDesc:     "Servere construite cu pasiune, boți programați cu precizie. Fiecare proiect e o experiență unică, gândită până la ultimul detaliu.",
    heroCta1:     "Vezi Serverele", heroCta2: "Descoperă Boții →",
    stat1: "Servere Create", stat2: "Boți Activi", stat3: "Membri Total", stat4: "% Uptime",
    scrollHint: "scroll",
    serversTag:   "// Servere Discord",
    serversTitle: "Comunități construite<br>cu grijă",
    serversDesc:  "Fiecare server are propria identitate, reguli clare și o comunitate activă.",
    members: "membri", joinBtn: "Join",
    botsTag:      "// Boți Discord",
    botsTitle:    "Boți programați<br>cu precizie",
    botsDesc:     "Automatizare inteligentă, comenzi rapide și funcții avansate pentru orice comunitate.",
    b1desc: "Sistem complet de moderare cu anti-spam, auto-role, logs detaliate și sistem de avertizări automate.",
    b2desc: "Player muzical de înaltă calitate cu suport pentru YouTube, Spotify, SoundCloud și playlist-uri custom.",
    b3desc: "Sistem avansat de XP și nivele cu carduri personalizate, leaderboard-uri și recompense automate per nivel.",
    b4desc: "Sistem de tickete profesional cu categorii multiple, transcripturi, rating-uri și integrare cu canale private.",
    catModeration: "Moderation", catMusic: "Music", catLeveling: "Leveling", catSupport: "Support",
    cmdLabel:    "Comenzi principale",
    bstatServers: "Servere", bstatUsers: "Utilizatori",
    inviteBtn:   "Invită Botul", docsBtn: "Docs",
    featuresTag:   "// De ce eu?",
    featuresTitle: "Calitate la fiecare<br>linie de cod",
    f1title: "Performanță maximă",  f1desc: "Cod optimizat, răspuns sub 100ms, hosting premium cu uptime garantat.",
    f3title: "Design custom",       f3desc: "Fiecare server și bot e gândit vizual — branding coerent de la icon la canale.",
    f4title: "Support continuu",    f4desc: "Asistență rapidă, update-uri regulate și funcții noi la cerere.",
    f6title: "Multi-language",      f6desc: "Suport pentru română și engleză nativ, extensibil la orice limbă.",
    ctaTag:   "// Să colaborăm",
    ctaTitle: "Ai un proiect<br>în minte?",
    ctaDesc:  "Contactează-mă și construim împreună ceva remarcabil pe Discord.",
    ctaBtn1:  "Contactează-mă pe Discord", ctaBtn2: "✉ Email",
    footerCopy: "© 2024 · Construit cu ❤ în România"
  },
  en: {
    pageTitle:    "Discord Universe — Servers & Bots",
    navServers:   "Servers", navBots: "Bots", navFeatures: "Features", navContact: "Contact",
    heroBadge:    "Discord Developer · Active since 2024",
    heroLine1:    "Discord", heroLine2: "Servers", heroLine3: "& Bots",
    heroDesc:     "Servers built with passion, bots crafted with precision. Every project is a unique experience, designed down to the last detail.",
    heroCta1:     "Browse Servers", heroCta2: "Explore Bots →",
    stat1: "Servers Created", stat2: "Active Bots", stat3: "Total Members", stat4: "% Uptime",
    scrollHint: "scroll",
    serversTag:   "// Discord Servers",
    serversTitle: "Communities built<br>with care",
    serversDesc:  "Each server has its own identity, clear rules and an active community.",
    members: "members", joinBtn: "Join",
    botsTag:      "// Discord Bots",
    botsTitle:    "Bots engineered<br>with precision",
    botsDesc:     "Smart automation, fast commands and advanced features for any community.",
    b1desc: "Full moderation system with anti-spam, auto-role, detailed logs and automatic warning system.",
    b2desc: "High-quality music player with support for YouTube, Spotify, SoundCloud and custom playlists.",
    b3desc: "Advanced XP and level system with custom rank cards, leaderboards and automatic per-level rewards.",
    b4desc: "Professional ticket system with multiple categories, transcripts, ratings and private channel integration.",
    catModeration: "Moderation", catMusic: "Music", catLeveling: "Leveling", catSupport: "Support",
    cmdLabel:    "Main commands",
    bstatServers: "Servers", bstatUsers: "Users",
    inviteBtn:   "Invite Bot", docsBtn: "Docs",
    featuresTag:   "// Why me?",
    featuresTitle: "Quality in every<br>line of code",
    f1title: "Top performance",    f1desc: "Optimized code, sub-100ms response, premium hosting with guaranteed uptime.",
    f3title: "Custom design",      f3desc: "Every server and bot is visually conceived — coherent branding from icon to channels.",
    f4title: "Ongoing support",    f4desc: "Fast assistance, regular updates and new features on request.",
    f6title: "Multi-language",     f6desc: "Native Romanian and English support, extensible to any language.",
    ctaTag:   "// Let's collaborate",
    ctaTitle: "Got a project<br>in mind?",
    ctaDesc:  "Reach out and let's build something remarkable on Discord together.",
    ctaBtn1:  "Contact me on Discord", ctaBtn2: "✉ Email",
    footerCopy: "© 2024 · Built with ❤ in Romania"
  }
};

/* ============================================================
   STARE GLOBALĂ
   ============================================================ */
let currentLang = 'ro';

/* ============================================================
   SCHIMBARE LIMBĂ
   ============================================================ */
function setLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;

  document.getElementById('btnRO').classList.toggle('active', lang === 'ro');
  document.getElementById('btnEN').classList.toggle('active', lang === 'en');
  document.documentElement.lang = lang;

  const t = translations[lang];
  document.body.classList.add('lang-fade-out');

  setTimeout(() => {
    // Actualizează toate elementele cu data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    document.title = t.pageTitle;

    // Re-randează cardurile serverelor cu noua limbă
    document.querySelectorAll('#servers-grid .server-card:not(.loading)').forEach((card, i) => {
      const cfg = SERVERS_CONFIG[i];
      if (!cfg || !card._discordData) return;

      const desc        = cfg.description[lang] || cfg.description.ro;
      const membersLabel = t.members || 'membri';
      const joinLabel    = t.joinBtn || 'Join';
      const memberCount  = card._discordData.approximate_member_count || 0;
      const onlineCount  = card._discordData.approximate_presence_count || 0;

      const descEl = card.querySelector('.card-desc');
      if (descEl) descEl.textContent = desc;

      const membersEl = card.querySelector('.members');
      if (membersEl) membersEl.innerHTML =
        `${formatMembers(memberCount)} ${membersLabel}` +
        (onlineCount ? ` <span style="color:var(--accent3);font-size:0.72rem;margin-left:4px;">(${formatMembers(onlineCount)} online)</span>` : '');

      const joinEl = card.querySelector('.card-btn');
      if (joinEl) joinEl.textContent = joinLabel;
    });

    // Re-randează cardurile boților cu noua limbă
    document.querySelectorAll('#bots-grid .bot-card:not(.loading)').forEach((card, i) => {
      const cfg = BOTS_CONFIG[i];
      if (!cfg) return;

      const descEl = card.querySelector('.bot-desc');
      if (descEl) descEl.textContent = cfg.description[lang] || cfg.description.ro;

      const catEl = card.querySelector('.bot-category');
      if (catEl) catEl.textContent = cfg.category[lang] || cfg.category.ro;

      const cmdLabelEl = card.querySelector('.cmd-label');
      if (cmdLabelEl) cmdLabelEl.textContent = t.cmdLabel || 'Comenzi principale';

      const inviteEl = card.querySelector('.bot-btn-invite');
      if (inviteEl) inviteEl.textContent = t.inviteBtn || 'Invită Botul';

      const docsEl = card.querySelector('.bot-btn-docs');
      if (docsEl) docsEl.textContent = t.docsBtn || 'Docs';

      card.querySelectorAll('.bot-stat-label').forEach((s, j) => {
        if (j === 0) s.textContent = t.bstatServers || 'Servere';
        if (j === 1) s.textContent = t.bstatUsers   || 'Utilizatori';
      });
    });

    document.body.classList.remove('lang-fade-out');
    document.body.classList.add('lang-fade-in');
    setTimeout(() => document.body.classList.remove('lang-fade-in'), 250);
  }, 180);
}

/* ============================================================
   CURSOR CUSTOM
   ============================================================ */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

function attachCursorHover(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform  = 'translate(-50%,-50%) scale(2.5)';
      ring.style.width        = '60px';
      ring.style.height       = '60px';
      ring.style.borderColor  = 'rgba(88,101,242,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform  = 'translate(-50%,-50%) scale(1)';
      ring.style.width        = '38px';
      ring.style.height       = '38px';
      ring.style.borderColor  = 'rgba(88,101,242,0.5)';
    });
  });
}

attachCursorHover('a, button, .server-card, .bot-card, .feature-item');

/* ============================================================
   PARTICULE (canvas)
   ============================================================ */
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;

const particles = Array.from({ length: 80 }, () => ({
  x:  Math.random() * W,
  y:  Math.random() * H,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  r:  Math.random() * 1.5 + 0.5,
  o:  Math.random() * 0.5 + 0.1
}));

function drawParticles() {
  ctx.clearRect(0, 0, W, H);

  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(88,101,242,${p.o})`;
    ctx.fill();
  });

  // Conexiuni între particule apropiate
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(88,101,242,${0.06 * (1 - d / 120)})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawParticles);
}

drawParticles();

window.addEventListener('resize', () => {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ============================================================
   COUNT-UP ANIMAT (statistici hero)
   Valorile se calculează automat din datele fetchuite.
   ============================================================ */
function countUp(el, target, suffix = '') {
  const dur   = 1800;
  const start = Date.now();

  const tick = () => {
    const p    = Math.min((Date.now() - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    const val  = Math.floor(ease * target);
    el.textContent = val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val + suffix;
    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target >= 1000
        ? (target / 1000).toFixed(0) + 'k+'
        : target + suffix;
    }
  };

  tick();
}

/* Stări pentru sincronizare: așteptăm atât fetch-urile cât și vizibilitatea hero */
let statsReady   = false;
let heroVisible  = false;
let statsPlayed  = false;

function tryPlayStats() {
  if (!statsReady || !heroVisible || statsPlayed) return;
  statsPlayed = true;

  const elServers = document.getElementById('stat-servers');
  const elBots    = document.getElementById('stat-bots');
  const elMembers = document.getElementById('stat-members');
  const elUptime  = document.getElementById('stat-uptime');

  if (elServers) countUp(elServers, parseInt(elServers.dataset.count) || 0);
  if (elBots)    countUp(elBots,    parseInt(elBots.dataset.count)    || 0);
  if (elMembers) countUp(elMembers, parseInt(elMembers.dataset.count) || 0);
  if (elUptime)  countUp(elUptime,  parseFloat(elUptime.dataset.count) || 0, '%');
}

/* Calculează statisticile din datele reale fetchuite */
function computeAndSetStats() {
  // Servere Create = câte servere s-au încărcat cu succes
  const serverCards = document.querySelectorAll('#servers-grid .server-card:not(.loading)');
  let serverCount = 0;
  let totalMembers = 0;

  serverCards.forEach(card => {
    if (card._discordData && card._discordData.guild) {
      serverCount++;
      totalMembers += card._discordData.approximate_member_count || 0;
    }
  });

  // Boți Activi = câți boți s-au încărcat cu succes
  const botCards = document.querySelectorAll('#bots-grid .bot-card:not(.loading)');
  let botCount = 0;

  // Adună și serverele reale ale boților (approximate_guild_count din API)
  let totalBotServers = 0;
  botCards.forEach((card, i) => {
    botCount++;
    const api = card._botApiData;
    if (api && api.approximate_guild_count) {
      totalBotServers += api.approximate_guild_count;
    }
  });

  // Membri Total = membri servere proprii + servere deservite de boți
  // (sumă realistă a reach-ului total)
  const grandTotal = totalMembers + totalBotServers;

  // % Uptime = media uptime-urilor din BOTS_CONFIG
  let uptimeSum = 0;
  let uptimeCount = 0;
  BOTS_CONFIG.forEach(cfg => {
    const val = parseFloat(cfg.stats.uptime);
    if (!isNaN(val)) { uptimeSum += val; uptimeCount++; }
  });
  const avgUptime = uptimeCount > 0 ? Math.round((uptimeSum / uptimeCount) * 10) / 10 : 99;

  // Setează data-count pe fiecare element
  const elServers = document.getElementById('stat-servers');
  const elBots    = document.getElementById('stat-bots');
  const elMembers = document.getElementById('stat-members');
  const elUptime  = document.getElementById('stat-uptime');

  if (elServers) elServers.dataset.count = serverCount;
  if (elBots)    elBots.dataset.count    = botCount;
  if (elMembers) elMembers.dataset.count = grandTotal;
  if (elUptime)  elUptime.dataset.count  = avgUptime;

  statsReady = true;
  tryPlayStats();
}

/* Observer: detectează când hero-ul e vizibil */
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      heroVisible = true;
      tryPlayStats();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ============================================================
   MOUSE TRACK PE CARDURI SERVERE
   ============================================================ */
function attachCardMouseTrack(card) {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
  });
}

/* ============================================================
   DISCORD SERVER FETCH
   ============================================================ */
function extractCode(invite) {
  // Acceptă orice format: "apollo2", "discord.gg/apollo2", "https://discord.gg/apollo2"
  return invite
    .trim()
    .replace(/^https?:\/\//i, '')                       // scoate https:// sau http://
    .replace(/^www\./i, '')                              // scoate www.
    .replace(/^discord\.(gg|com\/invite)\//i, '')        // scoate discord.gg/ sau discord.com/invite/
    .split('/')[0]                                        // ia doar codul (primul segment rămas)
    .split('?')[0];                                       // scoate query params dacă există
}

function formatMembers(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k';
  return n.toString();
}

function buildSkeletonCard(cfg, index) {
  const [c1, c2] = cfg.gradient;
  const card = document.createElement('div');
  card.className = `server-card reveal reveal-delay-${(index % 4) + 1} loading`;
  card.innerHTML = `
    <div class="card-banner">
      <div class="card-banner-gradient" style="--c1:${c1};--c2:${c2};"></div>
    </div>
    <div class="card-body">
      <div class="skeleton sk-icon"></div>
      <div class="skeleton sk-name"></div>
      <div class="skeleton sk-desc"></div>
      <div class="skeleton sk-desc2"></div>
      <div class="sk-tags">
        <div class="skeleton sk-tag"></div>
        <div class="skeleton sk-tag"></div>
      </div>
      <div class="sk-footer">
        <div class="skeleton sk-members"></div>
        <div class="skeleton sk-btn"></div>
      </div>
    </div>`;
  return card;
}

function populateCard(card, data, cfg) {
  const [c1, c2] = cfg.gradient;
  const t           = translations[currentLang];
  const desc         = cfg.description[currentLang] || cfg.description.ro;
  const membersLabel = t.members || 'membri';
  const joinLabel    = t.joinBtn || 'Join';
  const memberCount  = data.approximate_member_count  || 0;
  const onlineCount  = data.approximate_presence_count || 0;

  const iconUrl = data.guild.icon
    ? `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.webp?size=128`
    : null;

  // Banner real > splash > fallback gradient
  const bannerUrl = data.guild.banner
    ? `https://cdn.discordapp.com/banners/${data.guild.id}/${data.guild.banner}.webp?size=480`
    : data.guild.splash
      ? `https://cdn.discordapp.com/splashes/${data.guild.id}/${data.guild.splash}.webp?size=480`
      : null;

  const tagsHtml = cfg.tags.map(tg => `<span class="tag ${tg.cls}">${tg.label}</span>`).join('');

  const iconHtml = iconUrl
    ? `<img src="${iconUrl}" alt="${data.guild.name}" style="width:100%;height:100%;border-radius:12px;object-fit:cover;">`
    : `<span style="font-size:1.6rem;">🎮</span>`;

  const bannerHtml = bannerUrl
    ? `<img src="${bannerUrl}" alt="banner" style="width:100%;height:100%;object-fit:cover;display:block;">
       <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,var(--card) 100%);"></div>`
    : `<div class="card-banner-gradient" style="--c1:${c1};--c2:${c2};"></div>`;

  card.classList.remove('loading');
  card._discordData = data; // stocat pentru schimbare limbă

  card.innerHTML = `
    <div class="card-banner">
      ${bannerHtml}
    </div>
    <div class="card-body">
      <div class="card-icon" style="overflow:hidden;">${iconHtml}</div>
      <div class="card-name">${data.guild.name}</div>
      <div class="card-desc">${desc}</div>
      <div class="card-tags">${tagsHtml}</div>
      <div class="card-footer">
        <span class="members">
          ${formatMembers(memberCount)} ${membersLabel}
          ${onlineCount
            ? `<span style="color:var(--accent3);font-size:0.72rem;margin-left:4px;">(${formatMembers(onlineCount)} online)</span>`
            : ''}
        </span>
        <a href="https://discord.gg/${extractCode(cfg.invite)}" target="_blank" class="card-btn" rel="noopener">${joinLabel}</a>
      </div>
    </div>`;

  attachCardMouseTrack(card);
  attachCursorHover('.server-card');
  observer.observe(card);
}

function showCardError(card, cfg, code) {
  const [c1, c2] = cfg.gradient;
  card.classList.remove('loading');
  card.innerHTML = `
    <div class="card-banner">
      <div class="card-banner-gradient" style="--c1:${c1};--c2:${c2};"></div>
    </div>
    <div class="card-body">
      <div class="card-error">
        <div class="card-error-icon">⚠️</div>
        <div class="card-error-text">
          Nu s-a putut încărca serverul<br>
          <code style="font-size:0.7rem;opacity:0.5">${code}</code>
        </div>
      </div>
    </div>`;
}

async function fetchAndBuildServers() {
  const grid  = document.getElementById('servers-grid');
  grid.innerHTML = '';
  const cards = [];

  // 1. Afișează skeleton-uri instant
  SERVERS_CONFIG.forEach((cfg, i) => {
    const card = buildSkeletonCard(cfg, i);
    grid.appendChild(card);
    cards.push(card);
    observer.observe(card);
  });

  // 2. Fetch paralel din API-ul Discord
  await Promise.all(SERVERS_CONFIG.map(async (cfg, i) => {
    const code = extractCode(cfg.invite);
    try {
      const res  = await fetch(`${API_BASE}/api/invites/${code}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.guild) throw new Error('No guild in response');
      populateCard(cards[i], data, cfg);
    } catch (err) {
      console.warn(`[Discord Fetch] ${code}:`, err.message);
      showCardError(cards[i], cfg, code);
    }
  }));
}

/* Pornește fetch-ul serverelor (statisticile se calculează după ce și boții sunt gata) */
const serversReady = fetchAndBuildServers();

/* ============================================================
   DISCORD BOT FETCH
   Funcționează identic cu serverele — skeleton → fetch → populate.
   API: GET /api/v10/applications/{clientId}/rpc  (public, fără auth)
   Returnează: id, name, icon, description, bot_public, etc.
   ============================================================ */

function buildBotSkeletonCard(cfg, index) {
  const [c1, c2] = cfg.gradient;
  const card = document.createElement('div');
  card.className = `bot-card reveal reveal-delay-${(index % 4) + 1} loading`;
  card.innerHTML = `
    <div class="bot-header">
      <div class="bot-avatar" style="--c1:${c1};--c2:${c2};">
        <div class="skeleton" style="width:100%;height:100%;border-radius:50%;"></div>
      </div>
      <div style="flex:1;">
        <div class="skeleton sk-name"></div>
        <div class="skeleton" style="height:10px;width:40%;margin-top:6px;border-radius:4px;"></div>
      </div>
    </div>
    <div class="skeleton sk-desc"></div>
    <div class="skeleton sk-desc2"></div>
    <div class="sk-tags">
      <div class="skeleton sk-tag"></div>
      <div class="skeleton sk-tag"></div>
      <div class="skeleton sk-tag"></div>
    </div>
    <div class="skeleton" style="height:50px;width:100%;border-radius:8px;margin-bottom:14px;"></div>
    <div class="sk-footer">
      <div class="skeleton sk-members"></div>
      <div class="skeleton sk-btn"></div>
    </div>`;
  return card;
}

function populateBotCard(card, apiData, cfg) {
  const t    = translations[currentLang];
  const desc = cfg.description[currentLang] || cfg.description.ro;
  const cat  = cfg.category[currentLang]    || cfg.category.ro;
  const [c1, c2] = cfg.gradient;

  // Nume și avatar din API (cu fallback la config)
  const botName = apiData.name || cfg.fallback.name;
  const iconUrl = apiData.icon
    ? `https://cdn.discordapp.com/app-icons/${apiData.id}/${apiData.icon}.webp?size=128`
    : null;

  const avatarHtml = iconUrl
    ? `<img src="${iconUrl}" alt="${botName}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`
    : `<span style="font-size:1.4rem;">${cfg.fallback.emoji}</span>`;

  const cmdsHtml = cfg.commands.map(cmd => `<span class="cmd">${cmd}</span>`).join('');

  // Statistici reale din API (cu fallback la config)
  const realServers = apiData.approximate_guild_count
    ? formatMembers(apiData.approximate_guild_count)
    : cfg.stats.servers;

  const realUsers = apiData.approximate_user_install_count
    ? formatMembers(apiData.approximate_user_install_count)
    : cfg.stats.users;

  const realUptime = cfg.stats.uptime;   // uptime nu vine din API

  card.classList.remove('loading');
  card._botApiData = apiData;
  card._botCfg     = cfg;

  card.innerHTML = `
    <div class="bot-header">
      <div class="bot-avatar" style="--c1:${c1};--c2:${c2};">${avatarHtml}</div>
      <div>
        <div class="bot-name">${botName}</div>
        <div class="bot-version">${cfg.version} · <span class="bot-category">${cat}</span></div>
      </div>
    </div>
    <div class="bot-desc">${desc}</div>
    <div class="bot-commands">
      <div class="cmd-label">${t.cmdLabel || 'Comenzi principale'}</div>
      <div class="cmd-list">${cmdsHtml}</div>
    </div>
    <div class="bot-stats">
      <div class="bot-stat"><div class="bot-stat-num">${realServers}</div><div class="bot-stat-label">${t.bstatServers || 'Servere'}</div></div>
      <div class="bot-stat"><div class="bot-stat-num">${realUsers}</div><div class="bot-stat-label">${t.bstatUsers || 'Utilizatori'}</div></div>
      <div class="bot-stat"><div class="bot-stat-num">${realUptime}</div><div class="bot-stat-label">Uptime</div></div>
    </div>
    <div class="bot-actions">
      <a href="${cfg.inviteUrl}" target="_blank" rel="noopener" class="bot-btn-invite">${t.inviteBtn || 'Invită Botul'}</a>
      <a href="${cfg.docsUrl}" target="_blank" rel="noopener" class="bot-btn-docs">${t.docsBtn || 'Docs'}</a>
    </div>`;

  attachCursorHover('.bot-card');
  observer.observe(card);
}

async function fetchAndBuildBots() {
  const grid = document.getElementById('bots-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const cards = [];

  // 1. Afișează skeleton-uri instant
  BOTS_CONFIG.forEach((cfg, i) => {
    const card = buildBotSkeletonCard(cfg, i);
    grid.appendChild(card);
    cards.push(card);
    observer.observe(card);
  });

  // 2. Fetch paralel din API-ul Discord (endpoint public pentru aplicații)
  await Promise.all(BOTS_CONFIG.map(async (cfg, i) => {
    try {
      const res = await fetch(`${API_BASE}/api/bot/${cfg.clientId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      populateBotCard(cards[i], data, cfg);
    } catch (err) {
      console.warn(`[Bot Fetch] ${cfg.clientId}:`, err.message);
      // Fallback: populează cu datele din config (fără date API)
      populateBotCard(cards[i], { id: cfg.clientId, name: cfg.fallback.name, icon: null }, cfg);
    }
  }));
}

/* Pornește ambele fetch-uri în paralel, apoi calculează statisticile hero */
const botsReady = fetchAndBuildBots();
Promise.all([serversReady, botsReady]).then(() => computeAndSetStats());

/* ============================================================
   NAV — scroll effect
   ============================================================ */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.background = window.scrollY > 50
    ? 'rgba(7,6,15,0.9)'
    : 'rgba(7,6,15,0.6)';

  // Ascunde scroll hint după ce user-ul dă scroll
  const hint = document.getElementById('scrollHint');
  if (hint) {
    hint.classList.toggle('hidden', window.scrollY > 80);
  }
});