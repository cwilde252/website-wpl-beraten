/**
 * Zutritt zur WPL-Seite, solange sie im Bau ist.
 *
 * Ersetzt das frühere Schloss (`auth.ts` mit `login-template.ts`). Das war in zwei Punkten
 * offen: Ohne SITE_PASSWORD galt das Passwort „fallback“, und das Cookie `auth=ok` ließ
 * sich von Hand setzen — wer es kannte, kam ohne Passwort hinein.
 *
 * Wortgleich aufgebaut wie das Schloss der BBS-Seite (`website-bbs`), der Fewo-Seite
 * (`website-fewo-sussebach`) und der Kräuterleben-Seite (`website-kraeuter-erleben`):
 * dasselbe Verfahren, dieselbe Prüfung, nur eigener Cookie-Name, eigener Text — und oto,
 * das Maskottchen von cwilde, in der eigens für diese Seite gebauten Form s'häkle, mit
 * Prüferbrille über einer Zahlenkolonne, die noch nicht zu Ende abgehakt ist. Wer dort
 * etwas ändert, sollte hier nachsehen.
 *
 * Netlifys eingebauter Passwortschutz muss aus sein — er greift vor den Edge Functions
 * und würde diese Seite nie zu Gesicht kommen lassen. Siehe README.md, „Zutritt“.
 *
 * Sicherheitsverhalten:
 * - Ohne gesetztes SITE_PASSWORD bleibt die Tür für alle zu (fail closed). Ein fehlender
 *   Wert darf die Seite nicht öffnen — sie liegt nicht ohne Grund hinter dem Passwort.
 * - Im Cookie steht nicht das Passwort, sondern ein signierter Ablaufzeitpunkt. Wer das
 *   Cookie liest, kann daraus das Passwort nicht zurückrechnen.
 * - Schlüssel der Signatur ist das Passwort selbst: Wird es geändert, sind alle
 *   ausgegebenen Cookies sofort ungültig.
 * - Vergleiche laufen über Hashes fester Länge, damit die Antwortzeit nichts über das
 *   Passwort verrät.
 */
import type { Config, Context } from '@netlify/edge-functions';

const COOKIE_NAME = 'wpl_zutritt';
const SESSION_SECONDS = 60 * 60 * 12;
const LOGIN_PATH = '/__zutritt';

/** Bremst das Durchprobieren von Passwörtern aus, ohne echte Besucher zu stören. */
const WRONG_PASSWORD_DELAY_MS = 400;

export default async function siteGate(request: Request, context: Context): Promise<Response> {
  const password = Netlify.env.get('SITE_PASSWORD');
  const url = new URL(request.url);

  if (!password) {
    return gateResponse({ notice: 'unconfigured', target: '/' });
  }

  if (request.method === 'POST' && url.pathname === LOGIN_PATH) {
    return handleLogin(request, password);
  }

  if (await hasValidTicket(request, password)) {
    // Die Anmeldeadresse selbst hat keinen Inhalt — wer sie mit gültigem Cookie aufruft,
    // landet auf der Startseite statt auf einer 404.
    if (url.pathname === LOGIN_PATH) {
      return Response.redirect(new URL('/', request.url), 303);
    }
    const response = await context.next();
    // Wie beim früheren Schloss: Unbekannte Pfade bekommen die App, deren Router sie auf
    // die Startseite leitet. Die Seite hat (noch) keine eigene 404-Seite.
    if (response.status === 404) {
      return context.rewrite('/index.html');
    }
    return response;
  }

  return gateResponse({ target: url.pathname + url.search });
}

export const config: Config = {
  path: '/*',
  // Die Zutrittsseite lädt ihre Schrift aus diesem Ordner. Läge er hinter dem Passwort,
  // stünde die Seite in einer Ersatzschrift da — offen liegt hier nur eine freie Schrift.
  excludedPath: '/assets/fonts/*',
};

/* ---------------------------------------------------------------------------
   Anmeldung
   --------------------------------------------------------------------------- */

async function handleLogin(request: Request, password: string): Promise<Response> {
  const form = await request.formData();
  const entered = String(form.get('passwort') ?? '');
  const target = safeTarget(String(form.get('weiter') ?? '/'));

  if (!(await equalsSecret(entered, password))) {
    await sleep(WRONG_PASSWORD_DELAY_MS);
    return gateResponse({ notice: 'wrong', target });
  }

  const expiry = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const ticket = `${expiry}.${await signature(String(expiry), password)}`;

  return new Response(null, {
    status: 303,
    headers: {
      location: target,
      'set-cookie': `${COOKIE_NAME}=${ticket}; Path=/; Max-Age=${SESSION_SECONDS}; HttpOnly; Secure; SameSite=Lax`,
      'cache-control': 'no-store',
    },
  });
}

async function hasValidTicket(request: Request, password: string): Promise<boolean> {
  const ticket = readCookie(request.headers.get('cookie'), COOKIE_NAME);
  if (!ticket) {
    return false;
  }

  const separator = ticket.lastIndexOf('.');
  if (separator < 1) {
    return false;
  }

  const expiry = ticket.slice(0, separator);
  const seal = ticket.slice(separator + 1);

  if (!/^\d+$/.test(expiry) || Number(expiry) <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  return equalsSecret(seal, await signature(expiry, password));
}

/**
 * Nur seiteneigene Pfade sind als Ziel zugelassen. Ohne diese Prüfung könnte ein
 * präparierter Link nach der Anmeldung auf eine fremde Adresse weiterleiten.
 */
function safeTarget(value: string): string {
  return /^\/(?!\/)[^\\]*$/.test(value) && value !== LOGIN_PATH ? value : '/';
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) {
    return null;
  }
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) {
      return rest.join('=');
    }
  }
  return null;
}

/* ---------------------------------------------------------------------------
   Signatur und Vergleich
   --------------------------------------------------------------------------- */

const encoder = new TextEncoder();

// Exportiert allein für scripts/check-gate.mjs — die Prüfung baut damit ein echtes,
// aber abgelaufenes Cookie und weist nach, dass es abgewiesen wird.
export async function signature(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sealed = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return toBase64Url(new Uint8Array(sealed));
}

/**
 * Vergleicht über SHA-256-Abdrücke statt über die Zeichen selbst: Beide Seiten sind
 * damit immer 32 Byte lang, und die Laufzeit verrät weder Länge noch Inhalt.
 */
async function equalsSecret(a: string, b: string): Promise<boolean> {
  const [left, right] = await Promise.all([digest(a), digest(b)]);
  let diff = 0;
  for (let i = 0; i < left.length; i += 1) {
    diff |= left[i] ^ right[i];
  }
  return diff === 0;
}

async function digest(value: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value)));
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ---------------------------------------------------------------------------
   Die Zutrittsseite

   Gestaltet im System von cwilde consulting: weiße Fläche, schwarze Schrift, Violett
   als einzige Akzentfarbe und nur dort, wo es etwas bedeutet. Flach — keine Schatten,
   keine Verläufe. Überschriften und Schaltflächen in Kleinschreibung, Fließtext und
   Feldbeschriftungen normal. Archivo in 400 / 600 / 800.

   Das Bautagebuch steht bewusst neben der Passwortabfrage: Wer hier landet, soll auf
   einen Blick sehen, dass die Seite noch entsteht und woran es gerade hängt.
   --------------------------------------------------------------------------- */

type Notice = 'wrong' | 'unconfigured';

interface GateOptions {
  notice?: Notice;
  target: string;
}

/**
 * Das Bautagebuch — der einzige Teil dieser Datei, der gepflegt werden muss. Der Stand
 * folgt FRAGEN-AN-WIEBKE.md. Der Eintrag, der gerade läuft, bekommt als einziger das
 * violette Zeichen.
 */
const BUILD_LOG: ReadonlyArray<{ step: string; state: string; running?: boolean }> = [
  { step: 'Inhalte', state: 'stehen' },
  { step: 'Gestaltung', state: 'in Abstimmung', running: true },
  { step: 'Impressum', state: 'wartet auf Anschrift und Versicherer' },
  { step: 'Porträt', state: 'folgt' },
  { step: 'Freigabe', state: 'kommt zum Schluss' },
];

function gateResponse({ notice, target }: GateOptions): Response {
  return new Response(gatePage({ notice, target }), {
    // 401 statt 200: Suchmaschinen nehmen die Seite so gar nicht erst auf.
    status: 401,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow',
      'referrer-policy': 'strict-origin-when-cross-origin',
      'x-content-type-options': 'nosniff',
    },
  });
}

function gatePage({ notice, target }: GateOptions): string {
  const locked = notice === 'unconfigured';

  const message = locked
    ? `<p class="notice notice--closed" role="alert">Für diese Seite ist noch kein Passwort
         hinterlegt. Bis das nachgeholt ist, bleibt die Tür für alle zu — auch für die,
         die eigentlich reindürften.</p>`
    : notice === 'wrong'
      ? `<p class="notice" role="alert">Das war nicht das Passwort. Zweiter Versuch?</p>`
      : '';

  const form = locked
    ? ''
    : `<form class="form" method="post" action="${LOGIN_PATH}">
         <input type="hidden" name="weiter" value="${escapeHtml(target)}" />
         <div class="field">
           <label class="field__label" for="passwort">Passwort</label>
           <input
             class="field__input"
             id="passwort"
             name="passwort"
             type="password"
             autocomplete="current-password"
             autocapitalize="off"
             spellcheck="false"
             required
             autofocus
           />
         </div>
         <button class="btn" type="submit">aufschließen</button>
         <p class="field__hint">Wer eins hat, ist eingeladen. Wer keins hat, bekommt eins
           von uns — nicht von hier.</p>
       </form>`;

  const log = BUILD_LOG.map(
    (entry) => `<div class="log__row${entry.running ? ' log__row--running' : ''}">
        <dt class="log__step">${entry.step}</dt>
        <dd class="log__state">${entry.state}</dd>
      </div>`,
  ).join('');

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<title>Noch nicht testiert — Wiebke Lefevre, Wirtschaftsprüferin</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<meta name="theme-color" content="#ffffff" />
<link rel="icon" href="${LOGO_ICON}" type="image/svg+xml" />
<style>
${STYLES}
</style>
</head>
<body>
<main class="sheet">
  <section class="panel panel--front">
    <p class="slogan"><span class="tri tri--sm" aria-hidden="true"></span>simple &amp; smart it.</p>

    <h1 class="display">Noch nicht testiert.</h1>

    <p class="lead">Hier entsteht der neue Auftritt von Wiebke Lefevre, Wirtschaftsprüferin
      in Rottweil. Solange Impressum und Kontaktdaten nicht vollständig sind, bleibt die
      Seite hinter dieser Tür.</p>

    <p class="wink">Eine Seite über Wirtschaftsprüfung, die selbst noch auf ihr Testat
      wartet — die Ironie ist uns nicht entgangen.</p>

    ${message}
    ${form}
  </section>

  <span class="seam" aria-hidden="true"></span>

  <aside class="panel panel--log">
    ${OTO_SZENE}
    <h2 class="title"><span class="tri" aria-hidden="true"></span>Bautagebuch</h2>
    <dl class="log">${log}</dl>
    <p class="credit">Gebaut von <a href="https://cwilde.de" rel="noopener">cwilde consulting</a>.
      Sobald das Testat erteilt ist, verschwindet diese Seite — und mit ihr der Witz.</p>
  </aside>
</main>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/*
  Das Logo von cwilde als Favicon — dieselbe Zeichnung wie im Auftritt und wie in
  website-bbs, unverändert übernommen: Keil, Punkt und der Zug, der beides verbindet.
  Schwarz auf hellem Grund, weiß auf dunklem; Violett bleibt außen vor, das Logo führt
  die Marke einfarbig. Als data-URI eingebettet und nicht als Datei: kein zweiter Abruf,
  kein Pfad, der hinter dem Schloss liegt.
*/
const LOGO_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192.66 194.4' fill='%23000000'%3E%3Cstyle%3E@media(prefers-color-scheme:dark){svg{fill:%23ffffff}}%3C/style%3E%3Cpolygon points='84.42 63.71 188.48 63.71 136.45 175.9 84.42 63.71'/%3E%3Ccircle cx='136.45' cy='28.38' r='20.36'/%3E%3Cpath d='M105.75,48.52c-4.73-5.42-7.61-12.51-7.61-20.25s2.87-14.82,7.6-20.24H5.48l83.94,181.01,18.14-39.11L60.53,48.52h45.22Z'/%3E%3C/svg%3E";

/*
  oto, das Maskottchen von cwilde, in einer eigenen Form für diese Seite: s'häkle. Die
  Figur ist eine Windglocke; hier trägt sie eine Prüferbrille und hängt über einer
  Zahlenkolonne, die sie gerade abhakt — dem Handwerk der Seite hinter dieser Tür.

  Körper, Augen, Schnur und der violette Windfänger stammen unverändert aus
  `design/maskottchen-one/build.mjs` im Repository von cwilde (`website-cwilde`), wie
  schon in website-bbs; die Grundbewegung ebenfalls. Neu ist allein, was vor den Augen
  sitzt und was unter ihm liegt. Soll s'häkle über diese Seite hinaus Bestand haben,
  gehört die Form nach `website-cwilde` zurückgetragen, sonst laufen die Fassungen
  auseinander.

  Warum eine Brille und Häkchen, kein Taschenrechner und keine Waage: Die Waage ist das
  Klischee des Großkanzlei-Auftritts, den die Seite ausdrücklich meidet (PRODUCT.md,
  Anti-references), und ein Rechner sagt nur „Zahlen“. Was eine Prüferin tut, ist
  hinschauen und abhaken — Posten für Posten. Also schaut oto durch eine Lesebrille,
  und unter ihm stehen drei abgehakte Posten.

  Der vierte ist offen: kein Häkchen, dafür in Sonne markiert, so wie ein offener Posten
  in einer echten Prüfung markiert wird. Die Summe ist einfach unterstrichen; der zweite
  Strich — der, der in der Buchhaltung „abgeschlossen“ heißt — steht nur gestrichelt da.
  Beides ist Absicht und soll auch so aussehen: Die Seite ist noch nicht testiert.

  Bewegung: Die Häkchen werden einmal gesetzt, von oben nach unten, dann wird der offene
  Posten markiert. Danach steht die Liste still. Was weiterläuft, ist allein oto selbst:
  Er ist eine Windglocke, das ist seine Identität und keine Zutat dieser Seite. In der
  Pause schaut er nach unten links — auf die Liste.

  Die Figur steht dekorativ, nicht erklärend: Was die Seite zu sagen hat, sagt die
  Überschrift. Deshalb `aria-hidden` und keine Beschriftung.

  Regel aus dem Auftritt: ein oto pro Bildschirm, und die Bildmarke führt. Das Violett
  bleibt der Marke vorbehalten; die Liste trägt Tanne und Sonne, die beiden Farben der
  Seite hinter dieser Tür (DESIGN.md, „Tanne und Sonne“). Die Tür ist eine Fläche von
  cwilde, aber an dieser einen Stelle schaut die Seite schon durch.
*/

/** Die Posten der Kolonne: rechtsbündige Balken wie Beträge, der letzte ist offen. */
const POSTEN: ReadonlyArray<{ y: number; breite: number; offen?: boolean }> = [
  { y: 272, breite: 66 },
  { y: 287, breite: 48 },
  { y: 302, breite: 58 },
  { y: 317, breite: 40, offen: true },
];
const RECHTS = 142;

/*
  Die Verzögerung ergibt sich aus der Zeile: Was oben steht, wird zuerst abgehakt. Damit
  ist die Reihenfolge eine Eigenschaft der Liste und keine zweite Liste, die bei der
  nächsten Änderung nicht mehr stimmt.
*/
function zugFolge(zeile: number): string {
  return `style="--zug:${300 + zeile * 260}ms"`;
}

function kolonneZeichnen(): string {
  const teile: string[] = [];
  POSTEN.forEach(({ y, breite, offen }, zeile) => {
    if (offen) {
      teile.push(
        `<rect class="liste__marker" ${zugFolge(zeile)} x="${RECHTS - breite - 6}" y="${y - 6}" width="${breite + 12}" height="12" rx="2" />`,
      );
    }
    teile.push(`<path class="liste__betrag" d="M${RECHTS - breite} ${y} L ${RECHTS} ${y}" />`);
    if (!offen) {
      teile.push(
        `<path class="liste__haken" pathLength="1" ${zugFolge(zeile)} d="M${RECHTS + 12} ${y} L ${RECHTS + 17} ${y + 5} L ${RECHTS + 27} ${y - 6}" />`,
      );
    }
  });
  return teile.join('\n    ');
}

const KOLONNE = kolonneZeichnen();

const OTO_SZENE = `<svg class="oto" viewBox="0 0 200 350" width="200" height="350"
  focusable="false" aria-hidden="true">
  <g class="liste">
    ${KOLONNE}
    <!-- Die Summe: einmal unterstrichen, der Abschlussstrich fehlt noch. -->
    <path class="liste__summe" pathLength="1" style="--zug:1400ms" d="M60 330 L ${RECHTS} 330" />
    <path class="liste__offen" d="M60 335 L ${RECHTS} 335" />
  </g>

  <path class="oto-klong oto-klong--fern" d="M178 55 a 22 22 0 0 1 0 32"
    fill="none" stroke="#c7c7c7" stroke-width="3" stroke-linecap="round" />
  <path class="oto-klong" d="M170 60 a 16 16 0 0 1 0 22"
    fill="none" stroke="#c7c7c7" stroke-width="3.5" stroke-linecap="round" />
  <g class="oto-klopft">
    <g transform="rotate(-5 100 95)">
      <path d="M100 30 C 136 30, 158 58, 158 94 C 158 122, 146 140, 126 146
        L 132 153 L 119 150 L 100 153 L 81 150 L 68 153 L 74 146
        C 54 140, 42 122, 42 94 C 42 58, 64 30, 100 30 Z" fill="#000000" />
      <g class="oto-blick">
        <circle class="oto-auge" cx="84" cy="100" r="6" fill="#ffffff" />
        <circle class="oto-auge oto-auge--r" cx="116" cy="100" r="6" fill="#ffffff" />
      </g>
      <!-- Die Prüferbrille: zwei Gläser, ein Steg, zwei Bügel. Sie blinzelt nicht mit. -->
      <g class="brille">
        <circle cx="84" cy="100" r="12" />
        <circle cx="116" cy="100" r="12" />
        <path d="M96 99 Q 100 95, 104 99" />
        <path d="M72 98 L 58 92" />
        <path d="M128 98 L 142 92" />
      </g>
      <line x1="100" y1="153" x2="100" y2="170" stroke="#000000" stroke-width="2.5" />
      <path d="M88 170 L 112 170 C 113 198, 114 226, 111 250 Q 100 243, 89 252
        C 87 226, 87 198, 88 170 Z" fill="#8b3dff" />
    </g>
  </g>
</svg>`;

const STYLES = `
/*
  Archivo trägt das ganze System: 400 für Fließtext, 600 für Betonung und Schaltflächen,
  800 für Überschriften. Kein Schnitt darunter — der Browser würde ihn sonst selbst
  erfinden. Selbst ausgeliefert, nicht über ein CDN: Auch diese Seite gibt keine
  IP-Adressen an Dritte weiter.
*/
@font-face {
  font-family: 'Archivo';
  src: url('/assets/fonts/archivo-latin-400-normal.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Archivo';
  src: url('/assets/fonts/archivo-latin-600-normal.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Archivo';
  src: url('/assets/fonts/archivo-latin-800-normal.woff2') format('woff2');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}

:root {
  --black: #000000;
  --purple: #8b3dff;
  --purple-hover: #7a2df0;
  --purple-pressed: #6a20d6;
  --surface: #f8f8f8;
  --surface-alt: #f2f2f2;
  --border: #e3e3e3;
  --ink-dark: #2e2e2e;
  --ink-mid: #4a4a4a;
  --ink-muted: #6b6b6b;
  --danger: #c0271d;
  /* Der Grundtakt von oto. Jede seiner Dauern ist ein Vielfaches oder Teiler davon. */
  --oto-takt: 2.1s;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  background: #ffffff;
  color: var(--black);
  font-family: 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

/* Die Naht aus dem Auftritt: zwei Flächen, dazwischen ein violetter Balken. */
.sheet {
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
  flex-direction: column;
}

.panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3.5rem 1.5rem;
}

.panel--front {
  flex: 1;
  gap: 1.5rem;
  background: #ffffff;
}

.panel--log {
  gap: 1.75rem;
  background: var(--surface);
}

.seam {
  display: block;
  height: 8px;
  flex-shrink: 0;
  background: var(--purple);
  transform-origin: left center;
}

@media (min-width: 60rem) {
  .sheet {
    flex-direction: row;
  }

  .panel {
    padding: 5rem 3.5rem;
  }

  .panel--log {
    width: min(38%, 30rem);
    flex-shrink: 0;
    justify-content: center;
  }
}

/*
  Auf breiten Bildschirmen rückt der Textblock nach, statt eine leere Hälfte stehen zu
  lassen. Weißraum gliedert hier, er stellt sich nicht selbst aus.
*/
@media (min-width: 75rem) {
  .panel--front {
    padding-right: 4rem;
    padding-left: clamp(3.5rem, 8vw, 8rem);
  }

  .seam {
    width: 10px;
    height: auto;
    transform-origin: top center;
  }
}

/* Der Balken zeichnet sich einmal: quer von links, hochkant von oben. */
@media (prefers-reduced-motion: no-preference) {
  .seam {
    animation: seam-draw-h 700ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both;
  }

  @media (min-width: 60rem) {
    .seam {
      animation-name: seam-draw-v;
    }
  }
}

@keyframes seam-draw-h {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes seam-draw-v {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

/* Das Zeichen der Marke: das Dreieck aus dem Logo, sonst nichts Dekoratives. */
.tri {
  display: block;
  width: 24px;
  height: 26px;
  flex-shrink: 0;
  background: var(--purple);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

.tri--sm {
  width: 15px;
  height: 16px;
}

.slogan {
  display: inline-flex;
  align-items: center;
  margin: 0;
  gap: 0.75rem;
  color: var(--purple);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: lowercase;
}

.display {
  max-width: 14ch;
  margin: 0;
  font-size: clamp(2.25rem, 5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1;
  text-transform: lowercase;
}

.title {
  display: flex;
  align-items: center;
  margin: 0;
  gap: 0.75rem;
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-transform: lowercase;
}

.lead {
  max-width: 46ch;
  margin: 0;
  color: var(--ink-mid);
  font-size: 1.125rem;
}

.wink {
  max-width: 46ch;
  margin: 0;
  color: var(--ink-muted);
  font-size: 0.9375rem;
}

.notice {
  max-width: 46ch;
  margin: 0;
  color: var(--danger);
  font-weight: 600;
}

.notice--closed {
  color: var(--ink-dark);
  font-weight: 400;
}

/* --- Formular ------------------------------------------------------------ */

.form {
  display: flex;
  max-width: 22rem;
  flex-direction: column;
  align-items: flex-start;
  margin: 0.5rem 0 0;
  gap: 1.25rem;
}

.field {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.25rem;
}

/*
  Feldbeschriftungen bleiben in normaler Schreibweise — die Kleinschreibung der Marke
  gilt für Überschriften und Schaltflächen, nicht für das, was jemand ausfüllen soll.
*/
.field__label {
  font-size: 0.875rem;
  font-weight: 600;
}

/* Das Feld ist eine Linie, kein Kasten. */
.field__input {
  width: 100%;
  padding: 0.375rem 0;
  border: 0;
  border-bottom: 1px solid var(--border);
  border-radius: 0;
  background: transparent;
  color: var(--black);
  font: inherit;
  transition: border-color 200ms ease-out;
}

.field__input:hover {
  border-bottom-color: var(--ink-muted);
}

.field__input:focus {
  border-bottom-color: var(--black);
  outline: none;
}

.field__hint {
  max-width: 34ch;
  margin: 0;
  color: var(--ink-muted);
  font-size: 0.875rem;
  line-height: 1.5;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  border-radius: 4px;
  background: var(--black);
  color: #ffffff;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.2;
  text-transform: lowercase;
  cursor: pointer;
  transition: background-color 200ms ease-out;
}

.btn:hover {
  background: var(--ink-dark);
}

.btn:active {
  background: var(--purple-pressed);
}

/* Der Fokus ist ein gestalteter Zustand, keine Voreinstellung des Browsers. */
:where(a, button, input):focus-visible {
  outline: 2px solid var(--purple);
  outline-offset: 2px;
}

/* --- oto, die Brille und die Kolonne -------------------------------------- */

/*
  Die Szene steht über dem Bautagebuch: erst wer sie sieht, liest, woran gebaut wird.
  Sie wird nie größer als die Spalte und nie so groß, dass sie die Passwortabfrage
  überstimmt — sie kommentiert die Seite, sie ist nicht ihr Inhalt.

  Tanne und Sonne stehen so im @theme-Block von „src/styles.css", der Palette der Seite
  hinter dieser Tür. Es sind die einzigen Farben hier, die nicht cwilde gehören, und sie
  haben einen Grund: Die Seite, die hinter dieser Tür entsteht, schaut an dieser einen
  Stelle schon durch. Das Violett bleibt der Marke — ein Akzent führt, der andere zitiert.
*/
.oto {
  --tanne: #1e4636;
  --tanne-hell: #9fb4a7;
  --sonne: #f5c331;
  --brille: #e7efe9;
  /* Ein Windstoß pro Runde. Vier Takte: drei zum Arbeiten, einer für den Wind. */
  --wind: calc(var(--oto-takt) * 4);
  --ease-draw: cubic-bezier(0.22, 0.61, 0.36, 1);
  display: block;
  width: clamp(96px, 22vw, 150px);
  height: auto;
  margin: 0 0 -0.5rem;
  overflow: visible;
}

/* --- die Kolonne --------------------------------------------------------- */

/* Die Beträge: rechtsbündige Striche, keine Ziffern — lesbar wären sie hier ohnehin nicht. */
.liste__betrag {
  fill: none;
  stroke: var(--tanne-hell);
  stroke-width: 4;
  stroke-linecap: round;
}

.liste__haken,
.liste__summe {
  fill: none;
  stroke: var(--tanne);
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.liste__summe {
  stroke-width: 2;
  stroke-linecap: square;
}

/*
  Der Abschlussstrich, der noch fehlt. Gestrichelt und in der leiseren Farbe: Er ist da,
  weil die Summe abgeschlossen werden wird, aber er behauptet nicht, es schon zu sein.
*/
.liste__offen {
  fill: none;
  stroke: var(--tanne-hell);
  stroke-width: 2;
  stroke-dasharray: 5 5;
}

/* Der offene Posten, in Sonne markiert wie mit dem Textmarker. */
.liste__marker {
  fill: var(--sonne);
  transform-box: fill-box;
  transform-origin: left center;
}

/*
  Die eine Bewegung, die diese Zeichnung hat: Ein Häkchen wird gesetzt, genau einmal.
  „pathLength" normiert jede Länge auf 1. Der Ruhewert ist der fertige Zustand
  (Versatz 0), nicht der leere — bei reduzierter Bewegung steht die Liste fertig da.
*/
@keyframes linieZieht {
  from {
    stroke-dashoffset: 1;
  }
}

@keyframes markerZieht {
  from {
    transform: scaleX(0);
  }
}

.liste__haken,
.liste__summe {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: linieZieht 330ms var(--ease-draw) var(--zug, 0ms) both;
}

.liste__marker {
  animation: markerZieht 420ms var(--ease-draw) var(--zug, 0ms) both;
}

/* --- die Brille ---------------------------------------------------------- */

/*
  Sie liegt auf dem schwarzen Kopf, deshalb hell statt in Tanne: Auf Schwarz wäre Tanne
  eine dunkle Linie auf dunklem Grund und damit keine.
*/
.brille {
  fill: none;
  stroke: var(--brille);
  stroke-width: 2.2;
  stroke-linecap: round;
}

/* --- oto ------------------------------------------------------------------ */

/*
  s'häkle arbeitet drei Takte lang — Haken, Haken, Haken —, hält einen Takt inne und
  schaut auf die Liste. Dann erreicht ihn ein Windstoß, und er schwingt aus. Diese
  Schleife gehört oto und nicht dieser Seite: Er ist eine Windglocke, und eine
  Windglocke, die stillsteht, ist eine Lampe.
*/
@keyframes otoKlopf {
  0% {
    transform: rotate(0deg);
  }
  3% {
    transform: rotate(-2.6deg);
  }
  7% {
    transform: rotate(1.3deg);
  }
  11% {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(-1.9deg);
  }
  19% {
    transform: rotate(0.9deg);
  }
  23% {
    transform: rotate(0deg);
  }
  27% {
    transform: rotate(-2.6deg);
  }
  31% {
    transform: rotate(1.3deg);
  }
  35% {
    transform: rotate(0deg);
  }
  44% {
    transform: rotate(0.4deg);
  }
  52% {
    transform: rotate(0deg);
  }
  59% {
    transform: rotate(-6.5deg);
  }
  66% {
    transform: rotate(3.4deg);
  }
  73% {
    transform: rotate(-2deg);
  }
  80% {
    transform: rotate(1.1deg);
  }
  87% {
    transform: rotate(-0.5deg);
  }
  93% {
    transform: rotate(0.2deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/*
  Bei jedem Schlag klingt es an — beim Windstoß am lautesten. Harter Anschlag, langes
  Abklingen; die Nullwerte kurz vor jedem Anschlag verhindern, dass der Browser über die
  Pause hinweg einblendet.
*/
@keyframes otoKlong {
  0%,
  2.5% {
    opacity: 0;
  }
  3% {
    opacity: 0.85;
  }
  9%,
  14.5% {
    opacity: 0;
  }
  15% {
    opacity: 0.6;
  }
  21%,
  26.5% {
    opacity: 0;
  }
  27% {
    opacity: 0.85;
  }
  33%,
  56% {
    opacity: 0;
  }
  58.5% {
    opacity: 1;
  }
  68%,
  100% {
    opacity: 0;
  }
}

/* Der zweite Bogen läuft nur beim Windstoß mit und trägt ihn nach außen. */
@keyframes otoKlongFern {
  0%,
  57% {
    opacity: 0;
    transform: scale(0.8);
  }
  63% {
    opacity: 0.7;
  }
  78%,
  100% {
    opacity: 0;
    transform: scale(1.12);
  }
}

/* In der Pause schaut er nach unten links — auf die Liste. */
@keyframes otoBlick {
  0%,
  33% {
    transform: translate(0, 0);
  }
  40%,
  50% {
    transform: translate(-2.2px, 3px);
  }
  57%,
  100% {
    transform: translate(0, 0);
  }
}

/* Beide Augen blinzeln minimal versetzt — exakt synchron wirkt tot. */
@keyframes otoBlinzeln {
  0%,
  93%,
  100% {
    transform: scaleY(1);
  }
  95.5% {
    transform: scaleY(0.06);
  }
}

.oto-klopft {
  transform-box: view-box;
  transform-origin: 100px 250px;
  animation: otoKlopf var(--wind) ease-in-out infinite;
}

.oto-klong {
  opacity: 0;
  animation: otoKlong var(--wind) linear infinite;
}

.oto-klong--fern {
  transform-box: view-box;
  transform-origin: 178px 71px;
  animation: otoKlongFern var(--wind) ease-out infinite;
}

.oto-blick {
  transform-box: view-box;
  animation: otoBlick var(--wind) ease-in-out infinite;
}

.oto-auge {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  animation: otoBlinzeln calc(var(--oto-takt) * 2.6) ease-in-out infinite;
}

.oto-auge--r {
  animation-delay: 40ms;
}

/*
  Reduzierte Bewegung heißt Stillstand — nicht langsamer, nicht kleiner, aus. Was die
  Bewegung aufgebaut hätte, steht dann fertig da: Die Haken sind gesetzt, der offene
  Posten ist markiert, der nahe Klangbogen bleibt sichtbar. Der ferne gehört allein dem
  Windstoß und bleibt weg.
*/
@media (prefers-reduced-motion: reduce) {
  .oto *,
  .oto {
    animation: none !important;
  }

  .oto-klong {
    opacity: 1;
  }

  .oto-klong--fern {
    display: none;
  }
}

/* --- Bautagebuch --------------------------------------------------------- */

.log {
  margin: 0;
}

.log__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border);
}

.log__row:first-child {
  border-top: 1px solid var(--border);
}

/* Alle Einträge beginnen an derselben Kante; das Zeichen sitzt in der Rinne davor. */
.log__step {
  position: relative;
  padding-left: 1.375rem;
  font-weight: 600;
}

.log__state {
  margin: 0;
  color: var(--ink-muted);
  font-size: 0.9375rem;
  text-align: right;
}

/*
  Der laufende Schritt ist der Eintrag, der zählt — und der einzige, der dafür Violett
  bekommt. Die Farbe steht auf dem Punkt, nicht auf dem Text: Violett auf Grau erreicht
  den Kontrastwert für Fließtext nicht zuverlässig.
*/
.log__row--running .log__step::before {
  content: '';
  position: absolute;
  top: 0.5em;
  left: 0;
  width: 9px;
  height: 10px;
  background: var(--purple);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

.log__row--running .log__state {
  color: var(--black);
  font-weight: 600;
}

.credit {
  max-width: 34ch;
  margin: 0;
  color: var(--ink-muted);
  font-size: 0.875rem;
  line-height: 1.5;
}

.credit a {
  color: var(--black);
  font-weight: 600;
  text-decoration-color: var(--purple);
  text-underline-offset: 3px;
  transition: color 200ms ease-out;
}

.credit a:hover {
  color: var(--purple-hover);
}
`;
