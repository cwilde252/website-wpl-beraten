/**
 * Prüft die Zutrittsseite (netlify/edge-functions/site-gate.ts) — die Seite, die alle
 * Besucher sehen, solange die Site hinter dem Passwort liegt.
 *
 * Zwei Teile: das Schloss und die Seite.
 *
 * Das Schloss ist der einzige Teil dieses Projekts, bei dem ein Fehler nicht nur schlecht
 * aussieht, sondern die Site öffnet. Geprüft wird deshalb nicht nur der glückliche Fall,
 * sondern vor allem: manipulierte Cookies, abgelaufene Cookies, Cookies aus einem alten
 * Passwort, Weiterleitungen auf fremde Adressen und ein fehlendes SITE_PASSWORD.
 *
 * Die Seite selbst läuft gegen axe-core, in Desktop- und Handybreite, in allen drei
 * Zuständen (Abfrage, falsches Passwort, kein Passwort hinterlegt).
 *
 * Kein Build nötig: Die Funktion wird direkt eingelesen.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from '@playwright/test';

const PORT = 4324;
const PASSWORD = 'ein-langes-passwort-nur-fuer-diese-pruefung';

// Die Funktion liest das Passwort über `Netlify.env` — außerhalb von Netlify gibt es das
// nicht, also wird es hier gestellt. `currentPassword` lässt sich im Test umschalten.
let currentPassword = PASSWORD;
globalThis.Netlify = {
  env: { get: (key) => (key === 'SITE_PASSWORD' ? currentPassword : undefined) },
};

const gate = await import('../netlify/edge-functions/site-gate.ts');
const siteGate = gate.default;

let failed = 0;
function check(name, ok, detail = '') {
  if (!ok) failed += 1;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);
}

/* --- Das Schloss --------------------------------------------------------- */

let passedThrough = 0;
let nextStatus = 200;
let rewrittenTo = null;
const context = {
  next: async () => {
    passedThrough += 1;
    return new Response('inhalt', { status: nextStatus });
  },
  rewrite: async (path) => {
    rewrittenTo = path;
    return new Response('app', { status: 200 });
  },
};

const request = (path, init) => new Request(`https://wpl-beraten.de${path}`, init);
const cookieRequest = (path, ticket) =>
  request(path, { headers: { cookie: `wpl_zutritt=${ticket}` } });
const loginRequest = (password, target = '/') =>
  request('/__zutritt', {
    method: 'POST',
    body: new URLSearchParams({ passwort: password, weiter: target }),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });

passedThrough = 0;
let response = await siteGate(request('/'), context);
check('Ohne Cookie kommt niemand durch', response.status === 401 && passedThrough === 0);
check(
  'Die Abfrage bleibt aus dem Index',
  response.headers.get('x-robots-tag') === 'noindex, nofollow',
);
check('Die Abfrage wird nicht gecacht', response.headers.get('cache-control') === 'no-store');

response = await siteGate(loginRequest('daneben'), context);
check(
  'Falsches Passwort öffnet nichts',
  response.status === 401 && !response.headers.get('set-cookie'),
);

response = await siteGate(loginRequest(PASSWORD, '/leistungen'), context);
const cookie = response.headers.get('set-cookie') ?? '';
const ticket = cookie.split(';')[0].split('=').slice(1).join('=');
check(
  'Richtiges Passwort leitet ans Ziel',
  response.status === 303 && response.headers.get('location') === '/leistungen',
);
check(
  'Das Cookie ist HttpOnly, Secure und SameSite=Lax',
  cookie.includes('HttpOnly') && cookie.includes('Secure') && cookie.includes('SameSite=Lax'),
);
check('Im Cookie steht nicht das Passwort', !cookie.includes(PASSWORD));

passedThrough = 0;
response = await siteGate(cookieRequest('/leistungen', ticket), context);
check('Gültiges Cookie öffnet die Seite', response.status === 200 && passedThrough === 1);

nextStatus = 404;
rewrittenTo = null;
response = await siteGate(cookieRequest('/gibt-es-nicht', ticket), context);
check(
  'Unbekannte Pfade bekommen hinter dem Schloss die App',
  response.status === 200 && rewrittenTo === '/index.html',
);
nextStatus = 200;

const separator = ticket.lastIndexOf('.');
const forged = [
  ['gefälschte Signatur', `${ticket.slice(0, separator + 1)}${'A'.repeat(43)}`],
  ['hochgesetzter Ablauf', `${Math.floor(Date.now() / 1000) + 999999}${ticket.slice(separator)}`],
  [
    'abgelaufen',
    `${Math.floor(Date.now() / 1000) - 10}.${await gate.signature(String(Math.floor(Date.now() / 1000) - 10), PASSWORD)}`,
  ],
  ['unsinniger Wert', 'kein-ticket'],
  ['leerer Wert', ''],
];
for (const [name, value] of forged) {
  passedThrough = 0;
  response = await siteGate(cookieRequest('/', value), context);
  check(`Abgelehnt: ${name}`, response.status === 401 && passedThrough === 0);
}

currentPassword = 'ein-anderes-passwort-als-vorher';
passedThrough = 0;
response = await siteGate(cookieRequest('/', ticket), context);
check(
  'Ein neues Passwort entwertet alle alten Cookies',
  response.status === 401 && passedThrough === 0,
);
currentPassword = PASSWORD;

for (const target of [
  'https://woanders.example/x',
  '//woanders.example/x',
  '/\\woanders.example',
]) {
  response = await siteGate(loginRequest(PASSWORD, target), context);
  check(`Keine Weiterleitung nach außen: ${target}`, response.headers.get('location') === '/');
}
response = await siteGate(loginRequest(PASSWORD, '/leistungen?bilanzsumme=8.200.000'), context);
check(
  'Das ursprüngliche Ziel bleibt samt Query erhalten',
  response.headers.get('location') === '/leistungen?bilanzsumme=8.200.000',
);

// Der wichtigste Fall: Ein vergessenes SITE_PASSWORD darf die Site nicht öffnen.
currentPassword = undefined;
passedThrough = 0;
response = await siteGate(request('/'), context);
const lockedPage = await response.text();
check('Ohne SITE_PASSWORD bleibt die Tür zu', response.status === 401 && passedThrough === 0);
check(
  'Ohne SITE_PASSWORD gibt es kein Feld zum Ausfüllen',
  !lockedPage.includes('name="passwort"'),
);
currentPassword = PASSWORD;

/* --- Die Seite ----------------------------------------------------------- */

const pages = {
  '/': await pageFor({ target: '/' }),
  '/falsch': await pageFor({ target: '/', notice: 'wrong' }),
  '/ohne-passwort': await pageFor({ target: '/', notice: 'unconfigured' }),
};

async function pageFor(options) {
  currentPassword = options.notice === 'unconfigured' ? undefined : PASSWORD;
  const isWrong = options.notice === 'wrong';
  const result = isWrong
    ? await siteGate(loginRequest('daneben', options.target), context)
    : await siteGate(request(options.target), context);
  currentPassword = PASSWORD;
  return result.text();
}

const server = createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (path in pages) {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(pages[path]);
    return;
  }
  // Die Schrift liegt außerhalb des Schlosses und wird hier aus public/ nachgereicht.
  if (path.startsWith('/assets/fonts/')) {
    try {
      res.writeHead(200, { 'content-type': 'font/woff2' });
      res.end(await readFile(join('public', path)));
    } catch {
      res.writeHead(404).end();
    }
    return;
  }
  res.writeHead(404).end();
});

await new Promise((resolve) => server.listen(PORT, resolve));

// Wie in playwright.config.ts: Der Container liefert Chromium unter einem festen Pfad,
// die npm-Playwright-Version bringt ihre eigene Build-Nummer mit. CHROMIUM_PATH
// überbrückt beides.
const executablePath = process.env.CHROMIUM_PATH ?? undefined;
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const axeSource = await readFile('node_modules/axe-core/axe.min.js', 'utf8');

for (const path of Object.keys(pages)) {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 800 },
  ]) {
    const page = await browser.newPage({ viewport });
    await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axeSource });
    const { violations } = await page.evaluate(() =>
      window.axe.run(document, { resultTypes: ['violations'] }),
    );
    check(
      `axe: ${path} bei ${viewport.width} px`,
      violations.length === 0,
      violations.map((violation) => `${violation.id} (${violation.impact})`).join(', '),
    );

    // Archivo trägt die Gestaltung. Lädt sie nicht, steht die Seite in einer
    // Ersatzschrift da und sieht nach allem aus, nur nicht nach cwilde.
    check(
      `Archivo steht bereit: ${path} bei ${viewport.width} px`,
      await page.evaluate(() => document.fonts.check('800 3rem Archivo')),
    );
    // oto gehört zur Seite, nicht zur Dekoration am Rand: Fällt die Figur weg oder
    // steht sie doppelt, fällt es hier auf. Eine pro Bildschirm, so will es der Auftritt.
    check(
      `Genau ein oto: ${path} bei ${viewport.width} px`,
      (await page.locator('svg.oto').count()) === 1,
    );
    // Ohne Knauf ist die Glocke eine Glatze — er gehört zur Figur wie im Original.
    check(
      `oto hat seinen Knauf: ${path} bei ${viewport.width} px`,
      (await page.locator('svg.oto .oto-knauf').count()) === 1,
    );
    // Und er sagt nichts, was die Überschrift nicht schon sagt — also bleibt er für
    // Vorlesesoftware unsichtbar.
    check(
      `oto bleibt für Screenreader stumm: ${path} bei ${viewport.width} px`,
      (await page.getAttribute('svg.oto', 'aria-hidden')) === 'true',
    );
    // Ein Favicon als data-URI faellt lautlos aus, wenn beim Kodieren etwas verrutscht:
    // Der Browser meldet nichts, im Tab steht das Standardzeichen. Also wird es hier
    // wirklich geladen und nach seinen Massen gefragt.
    check(
      `Das Logo im Tab laedt: ${path} bei ${viewport.width} px`,
      await page.evaluate(async () => {
        const href = document.querySelector('link[rel="icon"]')?.getAttribute('href');
        if (!href?.startsWith('data:image/svg+xml,')) return false;
        const bild = new Image();
        bild.src = href;
        try {
          await bild.decode();
        } catch {
          return false;
        }
        return bild.naturalWidth > 0;
      }),
    );
    check(
      `Kein Querscrollen: ${path} bei ${viewport.width} px`,
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    );
    await page.close();
  }
}

await browser.close();
server.close();

console.log(
  failed === 0 ? '\nZutrittsseite in Ordnung.' : `\n${failed} Prüfung(en) fehlgeschlagen.`,
);
process.exit(failed === 0 ? 0 : 1);
