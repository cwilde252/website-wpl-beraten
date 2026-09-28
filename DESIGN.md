---
name: WPL — Wiebke Lefevre, Wirtschaftsprüferin
description: „Offene Tür“ — Logo-Orange als tragende Fläche mit dunkler Schrift, Tinte und Tanne als Gegenfarben, satte Flächen statt Pastell, Überschriften als Fragen der Mandanten, ein Porträt-Bogen als Zeichen.
colors:
  white: "#FFFFFF"
  nebel: "#EDF2EE"
  ink: "#17231D"
  ink-soft: "#4A5A51"
  hairline: "#DCE3DD"
  control: "#6F7D74"
  orange: "#E0892A"
  orange-soft: "#3B2A1A"
  orange-hover: "#EA9D4B"
  ink-hover: "#2E3A33"
  pine: "#1E4636"
  pine-deep: "#16352A"
  mint: "#CFE3D6"
  pruefung: "#A64F00"
  beratung: "#1F5F92"
  steuern: "#2D7550"
  logo-orange: "#D4780A"
  logo-blue: "#2E7DB8"
  logo-green: "#2D8B57"
  logo-yellow: "#D4A917"
  error: "#8A1C12"
typography:
  display:
    fontFamily: "Red Hat Display Variable, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.4vw + 0.5rem, 6rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.022em"
  h1:
    fontFamily: "Red Hat Display Variable, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 3.6vw + 1rem, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Red Hat Display Variable, system-ui, sans-serif"
    fontSize: "clamp(2rem, 2.4vw + 1.1rem, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: "-0.018em"
  h3:
    fontFamily: "Red Hat Display Variable, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 0.8vw + 1.1rem, 2rem)"
    fontWeight: 600
    lineHeight: 1.18
  title:
    fontFamily: "Red Hat Display Variable, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 0.4vw + 1.1rem, 1.5625rem)"
    fontWeight: 600
    lineHeight: 1.3
  lead:
    fontFamily: "Red Hat Text Variable, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 0.5vw + 1rem, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Red Hat Text Variable, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  card: "1.75rem"
  control: "0.875rem"
  arch: "999px 999px 0 0"
spacing:
  gutter: "clamp(1rem, 5.5vw, 5rem)"
  card-pad: "clamp(1.75rem, 3vw, 2.75rem)"
  section: "clamp(4.5rem, 9vw, 8rem)"
  section-tight: "clamp(3.5rem, 6vw, 5.5rem)"
components:
  button-primary:
    backgroundColor: "var(--action-bg)"
    textColor: "var(--action-ink)"
    rounded: "{rounded.control}"
    height: "3.5rem"
  button-quiet:
    backgroundColor: "transparent"
    borderColor: "var(--quiet-border)"
    rounded: "{rounded.control}"
    height: "3.5rem"
  card-area:
    backgroundColor: "{colors.pruefung} | {colors.beratung} | {colors.steuern}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
  field:
    backgroundColor: "{colors.white}"
    borderColor: "{colors.control}"
    rounded: "{rounded.control}"
    height: "3.375rem"
---

# Design-System: WPL — Wiebke Lefevre

Stand: Redesign „Offene Tür“, September 2026. Es ersetzt vollständig das Registerblatt-System.
Normativ sind die Tokens oben und in `src/styles.css` (`@theme static` und die `data-surface`-Blöcke);
der Text erklärt, wo und warum sie gelten.

## 1. Leitbild: „Offene Tür“

Die Seite fühlt sich an wie das erste Gespräch in Wiebke Lefevres Büro: Die Tür steht offen,
draußen Schwarzwald, drinnen Sonne, man wird mit Namen begrüßt, und niemand schiebt ein Formular
über den Tisch. Die Fachlichkeit ist da — sie kommt, wenn man danach fragt.

**Vier Prinzipien**

1. **Mensch vor Leistung.** Zuerst ist Wiebke Lefevre zu sehen, dann ihre Arbeit. Porträt und
   Ich-Stimme tragen die Seite.
2. **Fragen statt Kategorien.** Überschriften greifen die Fragen der Mandanten auf („Müssen wir
   unseren Abschluss prüfen lassen?“), nicht die Namen im Leistungskatalog. Der Katalogbegriff
   steht als fetter Einstieg im ersten Absatz.
3. **Satt statt blass.** Die Logofarben dürfen leuchten: als ganze Flächen mit klarer Rolle, nicht
   als Pastell-Leitsystem.
4. **Fachlichkeit auf Nachfrage.** Paragrafen, Schwellen und Normzitate stehen im Check und in den
   Fragen — dort, wo man sie sucht, nicht beim ersten Hallo.

**Warum nicht mehr Registerblätter:** Ordner, Reiter und Ablage sind fachlich ehrlich, erzeugen aber
genau das Behördengefühl, das die Seite vermeiden soll. Blaugraue Tinte auf reinem Weiß machte die
Temperatur kalt, vier Pastelltöne als Leitsystem machten sie unruhig.

**Warum Logo-Orange als Grund (Entscheidung 28.09.2026):** Im Vergleich von vier Grundfarben
(Tanne, Cognac, Logo-Orange, Sonne; Canvas, Reihe 4) wirkte das Logo-Orange am offensten und
wärmsten. Weiß ist darauf nicht lesbar (2,7:1), deshalb tragen Text und Buttons auf Orange
Tinte. Der früher verworfene orange Auftritt hatte weiße Schrift, Karten und Pill-Buttons; hier
bleiben Buttons eckig-rund (0,875rem), und Tanne steht als Gegenfarbe im Bogen. Wiebke Lefevres
Bestätigung steht noch aus (FRAGEN-AN-WIEBKE.md, 15a).

**Warum kein Sonnengelb mehr (Entscheidung 28.09.2026):** Die Sonnen-Fläche des Checks biss sich
mit dem Orange im Kopf; zwei laute Warmtöne auf einer Seite konkurrieren. Der Check steht jetzt
auf Tinte in weißen Tafeln. Das Logo-Gelb bleibt nur als Punkt im Logo-Zeichen.

**Warum nicht Creme und Terrakotta:** Ein erster Entwurf dieses Redesigns landete bei warmem
Cremegrund, Serif-Display und Terrakotta. Das ist laut impeccable der am häufigsten generierte
AI-Look und wurde vom Detektor (`cream-palette`) markiert. Orange und Tanne kommen direkt aus den
Logofarben und aus der Region.

## 2. Farbe

### 2.1 Flächen (`data-surface`)

Jede farbige Fläche setzt `data-surface` und bekommt damit Grund, Text, Nebentext, Aktionsfarbe,
Fokusfarbe und Hover-Farbe für Links. Komponenten lesen nur diese Variablen
(`--surface-bg`, `--surface-ink`, `--surface-soft`, `--action-bg`, `--action-ink`,
`--action-hover`, `--quiet-border`, `--focus`, `--link-hover`).

| Fläche | Grund | Text / Nebentext | Button | Fokus |
|---|---|---|---|---|
| `orange` | `#E0892A` | Tinte 6,0:1 / `#3B2A1A` 5,1:1 | Tinte, Weiß | Tinte |
| `ink` | `#17231D` | Weiß 16,2:1 / Minze 12,1:1 | Orange, Tinte 6,0:1 | Orange |
| `white` (Standard) | `#FFFFFF` | Tinte 16,2:1 / Tinte weich 7,3:1 | Tanne, Weiß | Tinte |
| `nebel` | `#EDF2EE` | Tinte 14,3:1 / Tinte weich 6,5:1 | Tanne, Weiß | Tinte |
| `pruefung` | `#A64F00` | Weiß 5,6:1 | Weiß, Tinte | Weiß |
| `beratung` | `#1F5F92` | Weiß 6,8:1 | Weiß, Tinte | Weiß |
| `steuern` | `#2D7550` | Weiß 5,6:1 | Weiß, Tinte | Weiß |

Jede Fläche liefert außerdem `--surface-accent` (Unterstrich der aktiven Seite) und
`--surface-line` (Trenner). Weiße Tafeln in farbigen Flächen (`.panel`) setzen die Variablen
lokal auf Weiß zurück. Tanne ist keine Fläche mehr, nur Farbe für Bogen und Buttons auf Weiß.

### 2.2 Regeln

- **Farbe besitzt Flächen.** Eine Farbe nimmt einen ganzen Abschnitt oder eine ganze Karte ein —
  nie als zarter Schleier, nie als Randstreifen.
- **Rhythmus pro Seite.** Orange oben (Kopf und Einstieg), Weiß zum Lesen, Tinte für den Check
  und zum Schluss. Nie zwei gleiche Farbflächen hintereinander.
- **Auf Orange nie Weiß.** Text, Buttons und Fokus auf Orange sind Tinte; der orange Button
  steht nur auf Tinte.
- **Bereichsfarben** gehören den drei Leistungsbereichen: Orange-tief Prüfung, Blau Beratung,
  Grün Steuern. Sie tragen Anliegen-Karten und Bereichskarten, sonst nichts.
- **Logofarben sind Zeichen.** Die reinen Logofarben (`#D4780A`, `#2E7DB8`, `#2D8B57`, `#D4A917`)
  erscheinen nur als 10-px-Punkte und als Anführungszeichen — nie als Text (Orange 3,0:1 auf Weiß).
- **Farbe trägt nie allein Bedeutung.** Im Check steht „überschritten“ als Wort in der Zeile;
  Feldfehler zeigen sich zusätzlich über 2,5 px Randstärke und einen Text. Prüfungspflicht ist
  kein Fehlerzustand: kein Rot, kein Grün für „gut“. Rot (`#8A1C12`) gibt es nur für Feldfehler.

## 3. Typografie

**Red Hat Display** für Überschriften, **Red Hat Text** für Fließtext. Eine Familie, zwei
Schnitte: Display ist freundlich-professionell mit leicht runden Formen, Text ist für kleine
Größen gezeichnet. Beide unter SIL Open Font License, selbst gehostet über Fontsource — keine
Verbindung zu Google (DSGVO).

Die Schrift wurde in einem Vergleich von sechs Optionen am selben Ausschnitt gewählt (Fraunces
und Source Serif 4 waren vorher verworfen: „nicht professionell genug“ bzw. „nicht geeignet“).

| Rolle | Klasse | Größe | Gewicht / Zeilenhöhe |
|---|---|---|---|
| Display | `.t-display` | `clamp(2.5rem, 5.4vw + 0.5rem, 6rem)` | 600 / 1,02 |
| Seitentitel | `.t-h1` | `clamp(2.25rem, 3.6vw + 1rem, 4.5rem)` | 600 / 1,05 |
| Abschnitt | `.t-h2` | `clamp(2rem, 2.4vw + 1.1rem, 3.75rem)` | 600 / 1,07 |
| Anliegen, Block | `.t-h3` | `clamp(1.375rem, 0.8vw + 1.1rem, 2rem)` | 600 / 1,18 |
| Titel | `.t-title` | `clamp(1.25rem, 0.4vw + 1.1rem, 1.5625rem)` | 600 / 1,3 |
| Lead | `.t-lead` | `clamp(1.125rem, 0.5vw + 1rem, 1.375rem)` | 400 / 1,55, max. 58ch |
| Fließtext | `.t-body` | 1,125rem (18 px) | 400 / 1,65, max. 62ch |
| Klein | `.t-small` | 0,9375rem | 400 / 1,55, max. 62ch |

Red Hat Text läuft schmal: 62ch entsprechen rund 75 echten Zeichen. Überschriften nutzen
`text-wrap: balance`, Fließtext `pretty`. Unter 640 px trennen Überschriften mit `hyphens: auto`,
damit „Ansprechpartnerin“ und „Wirtschaftsprüfung“ nicht über den Rand laufen. Zahlen stehen mit
Tabellenziffern (`.num`).

**Keine Dachzeilen.** Keine kleinen Etiketten über Überschriften, keine Versalien-Labels, keine
Abschnittsnummern, kein Kursiv als Betonung.

## 4. Layout

- **Container:** `.wrap`, max. 90rem, seitlicher Rand `clamp(1rem, 5.5vw, 5rem)`; Kinder mit
  `min-width: 0` (keine horizontale Scrollleiste ab 320 px).
- **Raster:** 12 Spalten ab `lg` (1024 px). Wiederkehrende Teilungen: 7/5 im Hero, 7/4 für
  Überschrift und Lead, 4/7 für Bereichskarte und Blöcke, 5/7 im Check. Mobil einspaltig.
- **Rhythmus:** Abschnitte `clamp(4.5rem, 9vw, 8rem)`, enge Abschnitte `clamp(3.5rem, 6vw, 5.5rem)`.
- **Kopf:** klebend, Orange, geht nahtlos in das Orange-Einstiegsband jeder Seite über.
- **Fuß:** Tinte mit der Einladung zum Erstgespräch (auf `/kontakt` ausgeblendet, dort wäre
  sie doppelt), darunter Leistungen, Kontakt, Rechtliches und die vier Logopunkte.
- **Sprungziele:** `scroll-margin-block-start: 5.5rem` (`.scroll-anchor`).

**Tailwind-Falle:** Ungeschichtetes CSS (global und in Komponenten) schlägt in Tailwind 4 jede
Utility aus `@layer utilities`. Eine Klasse mit `margin: 0` hebelt also `mt-8` am selben Element aus.
Deshalb setzen Komponentenklassen keine Außenabstände, wenn das Template sie über Utilities setzt.

## 5. Form, Tiefe und Bewegung

- **Der Bogen** (`border-radius: 999px 999px 0 0`): das Zeichen des Systems, eine offene Tür in
  Tanne. Er steht im Hero auf der Unterkante der Orange-Fläche und nimmt das Porträt auf, sobald
  eines freigegeben ist; bis dahin bleibt er eine reine Farbfläche. Auf „Über mich“ trägt das
  Porträt dieselbe Form. Nur für das Porträt, einmal pro Seite.
- **Karten:** 1,75rem Radius, volle Fläche, kein Rand, kein Schatten.
- **Steuerelemente:** Buttons und Felder 0,875rem Radius, 3,375–3,5rem hoch. Keine Pillen.
- **Ein Schatten:** nur unter der Notiz am Bogen (`0 1.5rem 3rem -1.25rem rgb(10 25 18 / 0.45)`).
- **Bewegung, ruhig:** Hover 180 ms, Pfeil gleitet 3 px, Accordion und Menü 280 ms. Das eine
  inszenierte Moment: Beim Laden steigt der Bogen von unten auf (720 ms), die Notiz folgt.
  Animiert wird nur `transform`, nie `opacity`. Kein Einblenden beim Scrollen.
- **Reduzierte Bewegung:** keine Wege, Farb- und Zustandswechsel bleiben.

## 6. Komponenten

### Aktionen (`app-action-link`)
Primär (Fläche in `--action-bg`), ruhig (Rand in `--quiet-border`), Textlink (unterstrichen,
Hover in `--link-hover` mit 2 px Unterstrich). `[arrow]="false"` für Buttons, die Ziel statt Weg
sind (Kopf, Bereichskarten). Mindesthöhe 2,75rem für Textlinks.

### Kopf (`app-header`)
Auf Orange: Name in Red Hat Display, darunter Rolle und Ort in `#3B2A1A`. Navigation in Tinte,
Hover und aktive Seite mit 3-px-Unterstrich in `--surface-accent`. Der Prüfungspflicht-Check ist
ein eigener Menüpunkt (aktiv nur bei exaktem Fragment). Ab `lg` volle Navigation, darunter
Menü-Button mit Rand in Tinte.

### Mobilmenü
Nimmt den ganzen Bildschirm ein: Orange-Fläche unter dem Kopf (Name und Schließen-Button bleiben
obenauf), große Links in Red Hat Display mit Pfeil, unten „Erstgespräch vereinbaren“. Beim Öffnen
liegt der Fokus auf dem ersten Link, `main` und Fuß sind `inert`, die Seite scrollt nicht
(`body.menu-offen`). Escape schließt und gibt den Fokus an den Menü-Button zurück; wird das
Fenster breiter als `lg`, schließt es von selbst. Geprüft in `e2e/menu.spec.ts`.

### Anliegen-Karten (Startseite)
Je Bereich eine Karte in der Bereichsfarbe: Frage des Mandanten als `h3`, Antwort in Ich-Form,
Textlink zum Abschnitt der Leistungsseite. Daten: `ServiceArea.question` und `.answer`.

### Haltung (Startseite)
Ein echter Satz aus dem Profil als Zitat (ein Unit-Test prüft, dass er wörtlich im Profil steht),
darunter die vier Grundsätze mit 3-px-Linie in Tanne.

### Schnell-Check (Startseite)
Drei Felder in weißer Tafel auf Tinte. Ohne JavaScript ein GET-Formular auf `/leistungen#pruefungspflicht`, mit
JavaScript eine Router-Navigation. Der Check übernimmt `bilanzsumme`, `umsatz` und `arbeitnehmer`
aus der Adresse und wertet sofort aus — nur wenn alle drei gesetzt sind.

### Leistungsbereiche (Leistungsseite)
Alle drei Bereiche offen untereinander, abwechselnd auf Weiß und Nebel, oben eine Sprungnavigation.
Links die Bereichskarte (ab `lg` klebend), rechts die Blöcke: Anliegen als `h3`, Katalogbegriff
fett als Einstieg, Punkte als echte Liste.

### Prüfungspflicht-Check (`app-audit-check`)
Auf Tinte: Formular in weißer Tafel links (laufendes Jahr, Vorjahr, Sonderfälle aufklappbar),
rechts das Ergebnis über der Schwellenwerttabelle. Das Vorjahr bleibt sichtbar, weil die
Rechtsfolge an zwei Stichtagen hängt (§ 267 Abs. 4 HGB) — ohne Vorjahr gibt es eine Einordnung,
aber keine belastbare Aussage. Überschrittene Zeilen: Orange-Tönung (30 % auf Weiß) plus das Wort „überschritten“.

### FAQ (`app-faq-accordion`)
Natives `details`/`summary`, Frage als `h3` in `.t-title`, Auf-zu-Marke im Nebelkreis, geöffnet
Tanne mit weißem Kreuz.

### Zeitleiste (`.timeline`)
Linie links, Punkte in Tanne, aktuelle Station Orange mit Tannenrand und fetter Jahreszahl.

## 7. Qualität

- **WCAG AA:** AXE läuft in `e2e/a11y.spec.ts` auf allen Seiten, im Mobilmenü, mit geöffneten
  Sonderfällen und FAQ und auf dem Check-Ergebnis.
- **Ohne JavaScript:** Inhalte, Schwellenwerttabelle, FAQ und Schnell-Check-Formular funktionieren
  im vorgerenderten HTML (`e2e/prerender.spec.ts`).
- **Anti-Slop:** `npx impeccable detect` gegen die gerenderten Seiten — Stand 28.09.2026 (Orange):
  keine Befunde auf allen sechs Seiten. Läuft in `.github/workflows/quality.yml`.

## 8. Do's and Don'ts

### Do
- Jede farbige Fläche über `data-surface` setzen, nie Farben direkt in Komponenten mischen.
- Überschriften als Fragen oder Aussagen der Mandanten schreiben, den Katalogbegriff in den Text.
- Den Bogen leer lassen, bis ein freigegebenes Porträt vorliegt.
- Neue lange Überschriften bei 320 px prüfen.
- Nur `transform` animieren und jede Bewegung mit Reduced-Motion-Pfad versehen.

### Don't
- Keine Dachzeilen, keine Pastell-Leitsysteme, keine Creme-Gründe.
- Keine Logofarbe als Text, keine Bereichsfarbe außerhalb ihres Bereichs.
- Keine Tabs für Inhalte, die man kennenlernen soll.
- Keine weiteren Schatten, keine Karten mit Rand, keine Pill-Buttons.
- Kein `margin: 0` in Klassen, deren Elemente Abstände über Tailwind-Utilities bekommen.
