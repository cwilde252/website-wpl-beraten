---
name: WPL — Wiebke Lefevre, Wirtschaftsprüferin
description: Registerblatt-System für eine selbständige Wirtschaftsprüferin im regionalen Mittelstand — weißes Papier, zart getönte Blätter mit herausstehenden Reitern, Farbe heißt Bereich.
colors:
  paper: "#FFFFFF"
  neutral: "#F3F4F1"
  ink: "#1D2731"
  ink-hover: "#2E3D4B"
  ink-soft: "#4A5561"
  hairline: "#E1E4E0"
  control: "#7D868F"
  pruefung: "#D4780A"
  pruefung-tint: "#FDEDDA"
  pruefung-deep: "#8F4A00"
  beratung: "#2E7DB8"
  beratung-tint: "#E5EFF8"
  beratung-deep: "#1E5E8E"
  steuern: "#2D8B57"
  steuern-tint: "#E2F1E7"
  steuern-deep: "#1C6A40"
  check: "#D4A917"
  check-tint: "#FBF2CF"
  check-deep: "#6F5300"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, Figtree Variable, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 9vw - 0.25rem, 4.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque Variable, Figtree Variable, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 2.2vw + 1.1rem, 3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Bricolage Grotesque Variable, Figtree Variable, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 0.5vw + 1.1rem, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Figtree Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.125rem, 0.45vw + 1rem, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Figtree Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Figtree Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 650
    lineHeight: 1.2
rounded:
  sheet: "1.75rem"
  tab: "0.875rem"
  control: "0.75rem"
  inset: "1.25rem"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  sheet-pad: "clamp(1.5rem, 4vw, 3.5rem)"
  section: "clamp(4rem, 9vw, 7.5rem)"
  section-tight: "clamp(3rem, 6vw, 5rem)"
  tab-height: "2.75rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.8rem 1.35rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
  button-quiet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.8rem 1.35rem"
    height: "3rem"
  button-quiet-hover:
    backgroundColor: "{colors.neutral}"
  sheet-pruefung:
    backgroundColor: "{colors.pruefung-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "{spacing.sheet-pad}"
  sheet-neutral:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "{spacing.sheet-pad}"
  tab-pruefung:
    backgroundColor: "{colors.pruefung-tint}"
    textColor: "{colors.pruefung-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.tab}"
    padding: "0.55rem 1.15rem 0.35rem"
    height: "2.75rem"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0.65rem 0.9rem"
    height: "3rem"
---

# Design-System: WPL — Wiebke Lefevre

Dieses Dokument beschreibt das gebaute System (Stand: Redesign „Registerblätter", September 2026).
Es ersetzt vollständig das frühere dunkle „Arbeitspapier"-System. Normativ sind die Tokens oben und
in `src/styles.css` (`@theme static`); der Text erklärt, wo und warum sie gelten.

## 1. Leitbild

**„Der gut geführte Ordner."**

Die Website ist ein Ordner mit farbigen Registerblättern. Jeder Leistungsbereich hat sein Blatt,
jedes Blatt seinen Reiter, und wer die Seite öffnet, greift den passenden Reiter. Das Bild ist
fachlich ehrlich — Ordnung, Ablage, Nachvollziehbarkeit sind das Handwerk einer Prüferin — und es ist
freundlich: weißes Papier, zarte Töne der vier Logofarben, weich gerundete Ecken.

Das System verweigert die übliche Berater-Seite (Hero-Foto, Icon-Karten-Raster, Dunkelblau) ebenso
wie das vorige dunkle Arbeitspapier. Es ist hell, ruhig, einladend und nicht überladen. Die Form
trägt ohne Fotografie; ein Porträt kann später hinzukommen, ohne dass sich etwas verschiebt.

**Kernmerkmale**

- Weißes Papier als Grund, darauf Registerblätter in den Tönungen der vier Logofarben.
- Farbe heißt Bereich: Orange Prüfung, Blau Beratung, Grün Steuern, Gelb Check. Alles andere neutral.
- Reiter wachsen mit konkaven Übergängen aus dem Blatt und stehen versetzt wie echte Trennblätter.
- Tinte in tiefem Blaugrau statt Schwarz; Bricolage Grotesque für Überschriften, Figtree für Text.
- Flach bis auf einen einzigen weichen Schatten unter dem Deckblatt im Hero.
- Bewegung heißt „Register ziehen": nur Transform, nie Transparenz.
- Keine Karten-Raster, keine Monospace-Labels, keine Abschnittsnummern.

## 2. Farbe

Weißes Papier, eine tiefe blaugraue Tinte und vier Logofarben, die als zarte Fläche einen Bereich
anzeigen und als tiefe Variante darin Text tragen.

### 2.1 Grund und Tinte

| Token | Hex | Rolle |
|---|---|---|
| `--color-paper` | `#FFFFFF` | Seitengrund, Deckblatt, Formularfelder, eingelegte Tafeln im Blatt |
| `--color-neutral` | `#F3F4F1` | Neutrales Blatt (Schluss-Aufruf, Werdegang-Auszug), Footer, Hover-Grund |
| `--color-ink` | `#1D2731` | Tiefes Blaugrau: Text, primärer Button, Fokusring |
| `--color-ink-hover` | `#2E3D4B` | Hover des primären Buttons |
| `--color-ink-soft` | `#4A5561` | Sekundärtext, Tabellenköpfe, Beschriftungen |
| `--color-hairline` | `#E1E4E0` | Rein dekorative Trennlinien (Listenzeilen, Kopf beim Scrollen) |
| `--color-control` | `#7D868F` | Ränder von Steuerelementen (Feld, ruhiger Button, Tabellenkopf) |

Geprüfte Kontraste: Tinte auf Weiß 15,1:1 · Ink-soft auf Weiß 7,6:1 und ≥ 6,5:1 auf jeder Tönung ·
Control-Rand ≥ 3,29:1 auf Weiß und auf der Check-Tönung (SC 1.4.11).

### 2.2 Die vier Logofarben

Jede Logofarbe kommt in drei Stufen: **rein** (Markierung), **Tönung** (Blattfläche),
**tief** (Text und Linien im Ton).

| Bereich | rein | Tönung | tief (auf eigener Tönung) |
|---|---|---|---|
| Wirtschaftsprüfung | `#D4780A` | `#FDEDDA` | `#8F4A00` (5,8:1) |
| Beratung | `#2E7DB8` | `#E5EFF8` | `#1E5E8E` (5,9:1) |
| Steuern | `#2D8B57` | `#E2F1E7` | `#1C6A40` (5,6:1) |
| Prüfungspflicht-Check | `#D4A917` | `#FBF2CF` | `#6F5300` (6,4:1) |

Die Töne werden über `data-tone` (`plain`, `neutral`, `pruefung`, `beratung`, `steuern`, `check`)
gesetzt und liefern drei Variablen: `--tone-bg` (Fläche), `--tone-ink` (Text im Ton), `--tone-mark`
(reine Markierung). Komponenten lesen nur diese Variablen, nie die Bereichsfarbe direkt.

### 2.3 Named Rules — Farbe

**Die Bereichsfarben-Regel.** Farbe heißt Bereich: Orange gehört der Prüfung, Blau der Beratung,
Grün den Steuern, Gelb dem Check. Was keinem Bereich gehört — Kopf, Navigation, Haltung, Profil,
Schluss-Aufruf, Footer — bleibt weiß oder neutral. Eine Logofarbe als Schmuck ohne Bereich gibt es nicht.

**Die Markierungs-Regel.** Die reinen Logofarben (`#D4780A`, `#2E7DB8`, `#2D8B57`, `#D4A917`) sind
nur Marken — der Tonpunkt im Reiter, die Punkte der Footer-Reiter —, nie Text. Orange erreicht auf
Weiß nur 3,2:1, Gelb 2,2:1. Text im Ton nutzt immer die tiefe Variante.

**Die Ampel-Regel.** Farbe trägt nie allein eine Aussage. Im Check steht „überschritten" als Wort in
der Zeile, die gelbe Hinterlegung ist nur redundant; Feldfehler zeigen sich zusätzlich über die
doppelte Randstärke (2 px) und einen Text. Prüfungspflicht ist kein Fehlerzustand: kein Rot, kein Grün für „gut".

## 3. Typografie

**Überschriften:** Bricolage Grotesque (variabel, mit optischer Größe), Rückfall Figtree.
**Text:** Figtree (variabel), Rückfall system-ui. Beide selbst gehostet über Fontsource (DSGVO: keine
Verbindung zu Dritten).

**Charakter:** Bricolage bringt in großen Größen eine eigenwillige, warme Grotesk-Stimme mit engem
Laufweitenschnitt; Figtree ist klar, rund und gut lesbar im Fließtext. Zahlen stehen in derselben
Familie mit Tabellenziffern (`.num`: `tnum`, `lnum`) — es gibt keine Monospace-Schrift.

### 3.1 Hierarchie

| Rolle | Klasse | Familie | Größe | Gewicht / Zeilenhöhe |
|---|---|---|---|---|
| Display | `.t-display` | Bricolage | `clamp(1.75rem, 9vw − 0.25rem, 4.75rem)`, ab 1024 px `clamp(2.75rem, 4.6vw, 4.75rem)` | 600 / 1,02, −0,035em |
| Headline | `.t-h2` | Bricolage | `clamp(1.875rem, 2.2vw + 1.1rem, 3rem)` | 600 / 1,08, −0,028em |
| Titel | `.t-h3` | Bricolage | `clamp(1.25rem, 0.5vw + 1.1rem, 1.5rem)` | 600 / 1,2, −0,015em |
| Lead | `.t-lead` | Figtree | `clamp(1.125rem, 0.45vw + 1rem, 1.3125rem)` | 400 / 1,55, max. 60ch |
| Fließtext | `.t-body` | Figtree | 1,0625rem (17 px) | 400 / 1,65, max. 68ch |
| Klein | `.t-small` | Figtree | 0,9375rem | 400 / 1,55 |
| Reiter / Label | `.tab`, `.field-label` | Figtree | 0,9375rem | 650 bzw. 600 / 1,2 |

Überschriften nutzen `text-wrap: balance`, Fließtext `text-wrap: pretty`. Display-Zeilen werden
bewusst gesetzt (`.line` je Zeile), nicht dem Umbruch überlassen.

### 3.2 Named Rules — Typografie

**Die Kompositum-Regel.** Die Display-Größe ist an der Spaltenbreite bemessen, nicht am Viewport
allein: das längste Wort („Wirtschaftsprüfung") passt ab 320 px ungetrennt — einspaltig bis 1024 px,
danach in der 7/12-Spalte. Neue Display-Texte werden am längsten Kompositum geprüft; `.t-h3` hat
`hyphens: auto` nur als Notbremse.

**Die Eine-Stimme-Regel.** Keine Monospace-Labels, keine Versalien-Etiketten, keine Abschnittsnummern.
Zahlen bekommen Tabellenziffern, keinen Schriftwechsel.

## 4. Layout

- **Container:** `.wrap`, max. 76rem, seitlicher Rand `clamp(1rem, 4vw, 3rem)`; Kinder mit
  `min-width: 0`, damit nichts horizontal überläuft (320 px aufwärts).
- **Raster:** 12 Spalten ab `lg` (1024 px). Wiederkehrende Teilungen: 7/5 im Hero, 4/8 für
  Überschrift links und Inhalt rechts, 6/6 innerhalb eines Blatts. Mobil alles einspaltig.
- **Rhythmus:** Abschnitte `clamp(4rem, 9vw, 7.5rem)` vertikal, enge Abschnitte
  `clamp(3rem, 6vw, 5rem)`; Blattinnenraum `clamp(1.5rem, 4vw, 3.5rem)`.
- **Gestapelte Blätter:** Folgende Blätter legen sich mit ihrem Reiter über die Unterkante des
  vorigen (`margin-top: 2.75rem − Blattradius`), Reiter stehen versetzt (`--tab-at`) wie Trennblätter.
- **Hero:** links Headline, Lead, primärer Button und Textlink; rechts der Stapel aus vier getönten
  Blättern mit versetzten Reitern (je ein Link auf den Bereich), vorne das weiße Deckblatt mit Name,
  Rolle, Ort. Mobil folgt der Stapel unter der Headline, die Reiter als gestaffelte Streifen.
- **Sticky-Kopf:** weiß, erhält beim Scrollen eine Hairline; Sprungziele haben
  `scroll-margin-top: 5.5rem`.
- **Tabellen:** unter 640 px wird jede Zeile zum Block mit Beschriftung je Wert (`.table--stack`) —
  keine Spalte verschwindet hinter einem Querscroll.
- **Porträt:** Der Porträtplatz (Deckblatt, Profil-Teaser) ist vorbereitet, bleibt aber unsichtbar,
  solange `portrait` `null` ist. Bis dahin trägt ein neutrales Blatt mit dem Werdegang die Spalte.

## 5. Elevation, Form und Bewegung

### 5.1 Tiefe

Das System ist flach. Tiefe entsteht aus Tönung gegen Weiß und aus dem Überlappen der Blätter.
Es gibt genau einen Schatten:

- **Deckblatt-Schatten** (`box-shadow: 0 1.5rem 3rem -1.75rem rgb(29 39 49 / 0.35)`): nur unter dem
  weißen Deckblatt im Hero-Stapel, zusammen mit einer Hairline-Kante.

**Die Ein-Schatten-Regel.** Kein anderes Element bekommt einen Schatten — keine Karten, keine
Buttons, kein Hover-Heben per Schatten. Der Fokusring des Felds (3 px Tinte zu 22 %) ist ein Ring, kein Schatten.

### 5.2 Form

- **Blatt:** weich gerundete Ecken (1,75rem). Ein Blatt mit Reiter verliert die Rundung an der Ecke,
  aus der der Reiter wächst; wird der Reiter verschoben, bleibt sie erhalten.
- **Reiter:** oben gerundet (0,875rem), unten offen, mit konkaven Übergängen (radiale Verläufe im
  Blattton) — er wächst aus dem Blatt, statt aufzusitzen. Mindesthöhe 2,75rem.
- **Steuerelemente:** Buttons und Felder 0,75rem; eingelegte weiße Tafeln im Blatt 1,25rem.
- **Tonpunkt:** 0,5rem-Kreis in der reinen Logofarbe, immer `aria-hidden`.
- **Icons:** eigene Strich-Icons, 24er-Raster, 1,75 px, runde Enden, immer dekorativ.

**Die Reiter-Regel.** Ein Reiter benennt sein Blatt. Er darf eine echte Überschrift sein (h2/h3 im
Reiter), aber nie ein Etikett, das als Dachzeile über einer Überschrift sitzt.

### 5.3 Bewegung: „Register ziehen"

| Token | Wert | Einsatz |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Standard für alle Zustandswechsel |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | reserviert |
| `--dur-quick` | 160 ms | Hover-Farben, Button-Druck |
| `--dur-base` | 280 ms | Reiter heben, Tab-Wechsel, Accordion, Menü |
| `--dur-slow` | 640 ms | das eine inszenierte Moment |

- **Das eine Moment:** Beim Laden setzt sich der Hero-Stapel einmal Blatt für Blatt
  (`sheet-settle`, 2,25rem, 90 ms Versatz je Blatt).
- **Reiter heben:** Hero-Blätter heben sich bei Hover/Fokus um 0,5rem; nicht gewählte Leistungs-Reiter
  stecken 0,5rem tiefer im Ordner.
- **Tab-Wechsel:** Das Panel färbt seine Fläche in den neuen Ton um (`background-color`), der Inhalt
  rückt 0,75rem nach (`panel-in`).
- **Scroll:** Reiter heben sich, wenn ihr Blatt ins Bild kommt (`animation-timeline: view()`) — nur wo
  unterstützt, sonst stehen sie einfach. Die einzige Bewegung beim Scrollen.

**Die Kontrast-in-jedem-Frame-Regel.** Animiert wird nur `transform`, nie `opacity`. Inhalte sind ohne
Animation sichtbar; Bewegung kommt nur obendrauf, und der Kontrast gilt auch mitten in der Animation.

**Reduzierte Bewegung:** keine Wege (Animationen auf 0,01 ms, kein Button-Druck, kein Pfeilgleiten,
kein Scroll-Reiter), aber Farb- und Zustandswechsel bleiben.

## 6. Komponenten

### Registerblatt (`app-register-sheet`)
Das tragende Element. Getönte Fläche über `tone`, optionaler Reiter über `tabbed`, Reiterlage über
`tabAt`. Der Reiterinhalt kommt per `[sheetTab]`-Slot, damit er eine echte Überschrift sein kann.
Tonpunkt vor dem Reitertext. Blätter stehen einzeln oder in `.sheet-stack`, nie in einem Karten-Raster.

### Hero-Stapel und Deckblatt
Vier getönte Blätter als Navigationsliste (`nav` „Leistungsbereiche"), jedes ein Link auf seinen
Bereich; Fokus zeigt den Ring am Reiter. Davor das weiße Deckblatt mit Name (Bricolage,
`clamp(1.5rem, 1vw + 1.2rem, 1.875rem)`), Rolle, Fakten als `dl` — und dem einzigen Schatten.

### Aktionen (`app-action-link`)
- **Primär:** Tinte gefüllt, weißer Text, 3rem hoch, Radius 0,75rem, Pfeil-Icon. Hover `ink-hover`,
  Druck `scale(0.98)`.
- **Ruhig:** weiß mit Control-Rand, Hover neutral (Footer).
- **Klein:** 2,5rem (Kopf).
- **Textlink:** Tinte, 600, Unterstreichung 1 px mit 45 % Deckkraft, Hover in `--tone-ink` —
  also im Ton des Blatts, in dem er steht. Mindesthöhe 2,75rem.
- Der Pfeil gleitet beim Hover 3 px nach vorn.

### Leistungs-Reiter (`app-service-tabs`)
ARIA-Tablist mit Pfeiltastensteuerung. Jeder Reiter trägt seinen Ton; der gewählte steht voll oben,
die anderen stecken tiefer. Das Panel ist ein Blatt im Ton des gewählten Bereichs; Blöcke darin
trennt eine Linie in `--tone-ink` zu 22 %. Mobil (≤ 640 px) Kurztitel, voller Titel als `aria-label`.

### Prüfungspflicht-Check (`app-audit-check`)
Formular auf der Check-Tönung, Schwellen-Tabelle auf eingelegter weißer Tafel (1,25rem).
- **Feld:** weiß, 1 px Control-Rand, 3rem hoch, Tabellenziffern. Hover `ink-soft`, Fokus Tintenrand
  plus 3-px-Ring. Fehler: Rand `pruefung-deep` in 2 px plus Fehlertext mit `role="alert"`.
- **Überschrittene Zeile:** Check-Tönung als Hinterlegung plus das Wort „überschritten".
- **Ergebnis:** Rahmen in `--tone-ink` zu 30 %, rückt mit `panel-in` nach.

### Definitionsliste und FAQ
Zeilen statt Karten: Hairline oben, Titel in `.t-h3`, Beschreibung in Ink-soft; ab 768 px optional
zweispaltig. FAQ auf nativem `details`/`summary`, Höhe animiert über `::details-content`, Plus-Icon
im neutralen Kreis dreht sich beim Öffnen um 45°.

### Navigation
Weißer Sticky-Kopf: Name in Bricolage 1,1875rem, darunter Rolle und Ort in Ink-soft. Links mit
neutralem Hover-Grund; aktive Seite mit 2-px-Unterstrich, der per `scaleX` einfährt. Kleiner
primärer Button „Erstgespräch". Mobil: Menü-Button (2,75rem), ausfahrende Liste mit großen
Bricolage-Links und Hairlines.

### Footer
Vier kleine neutrale Reiter mit je einem Tonpunkt der vier Bereiche (rein dekorativ) auf einer
neutralen Fläche — das Ordner-Motiv als Abschluss jeder Seite.

## 7. Do's and Don'ts

### Do
- **Do** jedem Bereich seine Farbe geben und nur ihm: Orange Prüfung, Blau Beratung, Grün Steuern, Gelb Check.
- **Do** Text im Ton immer in der tiefen Variante setzen (`--tone-ink`), die reine Logofarbe nur als Marke.
- **Do** Inhalte auf Registerblättern ordnen; Reiter versetzen, damit Stapel wie Trennblätter wirken.
- **Do** einen Reiter, wenn er Text trägt, zur echten Überschrift seines Blatts machen.
- **Do** nur `transform` animieren und jede Bewegung mit einem Reduced-Motion-Pfad versehen.
- **Do** neue Display-Texte am längsten Kompositum bei 320 px prüfen.
- **Do** Fokus immer sichtbar halten: 2 px Tinte, 3 px Abstand.
- **Do** den Porträtplatz leer lassen, bis ein freigegebenes Foto vorliegt.

### Don't
- **Don't** eine Logofarbe ohne Bereich einsetzen oder Seiten „bunt" machen; Neutrales bleibt weiß oder neutral.
- **Don't** Orange oder Gelb als Textfarbe verwenden (3,2:1 bzw. 2,2:1 auf Weiß).
- **Don't** einen Reiter als Etikett oder Dachzeile über eine Überschrift setzen.
- **Don't** `opacity` animieren oder Inhalte erst per Einblenden sichtbar machen.
- **Don't** Karten-Raster, Icon-Kacheln, Monospace-Labels oder Abschnittsnummern einführen.
- **Don't** weitere Schatten hinzufügen; der Deckblatt-Schatten bleibt der einzige.
- **Don't** Tabellen auf schmalen Displays quer scrollen lassen; `.table--stack` nutzen.
- **Don't** Farbe allein Bedeutung tragen lassen.
