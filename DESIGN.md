---
name: WPL — Wiebke Lefevre, Wirtschaftsprüferin
description: Ein gesetztes Dokument statt einer Oberfläche. Newsreader für Überschriften und Fließtext, fast keine Farbe, keine Kacheln, ein Porträt. Die Wärme kommt aus Sprache, Satz und Bild.
colors:
  ink: "#241C17"
  ink-soft: "#57493F"
  ink-lift: "#3A2C22"
  paper: "#FBFAF8"
  mist: "#F2F0EB"
  stone: "#ECE9E3"
  edge: "#DDD8CF"
  edge-strong: "#96826A"
  paper-soft: "#C6B6A4"
  pruefung: "#D4780A"
  pruefung-deep: "#9C5200"
  pruefung-tint: "#FBE7CF"
  beratung: "#2E7DB8"
  beratung-deep: "#1F5F8F"
  beratung-tint: "#E2EFF9"
  steuern: "#2D8B57"
  steuern-deep: "#1E6B41"
  steuern-tint: "#DFF0E6"
  check: "#D4A917"
  check-deep: "#7A5F09"
  check-tint: "#FAEFCC"
  beratung-on-ink: "#7FB8E0"
  steuern-on-ink: "#6EC795"
typography:
  display:
    fontFamily: "Newsreader Variable, Newsreader, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.1
    fontVariationSettings: "'opsz' 60"
  display-sub:
    fontFamily: "Newsreader Variable, Newsreader, Georgia, serif"
    fontSize: "clamp(2rem, 3.8vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.12
    fontVariationSettings: "'opsz' 44"
  headline:
    fontFamily: "Newsreader Variable, Newsreader, Georgia, serif"
    fontSize: "clamp(1.625rem, 2.6vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.2
    fontVariationSettings: "'opsz' 32"
  subhead:
    fontFamily: "Newsreader Variable, Newsreader, Georgia, serif"
    fontSize: "1.3125rem"
    fontWeight: 500
    lineHeight: 1.35
  lead:
    fontFamily: "Newsreader Variable, Newsreader, Georgia, serif"
    fontSize: "clamp(1.1875rem, 1.5vw, 1.4375rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Newsreader Variable, Newsreader, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.72
  wordmark:
    fontFamily: "Newsreader Variable, Newsreader, Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 500
  legend:
    fontFamily: "Newsreader Variable, Newsreader, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 500
  control:
    fontFamily: "Instrument Sans Variable, Instrument Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
  ui:
    fontFamily: "Instrument Sans Variable, Instrument Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
  norm:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
  tag:
    fontFamily: "Instrument Sans Variable, Instrument Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
  figure:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontWeight: 500
    fontVariantNumeric: "tabular-nums"
rounded:
  control: "2px"
---

# Design-System: WPL — Wiebke Lefevre

## 1. Leitbild

**„Ein gesetztes Dokument."**

Die Seite soll aussehen, als hätte sie jemand gesetzt, der nichts beweisen muss. Keine Bühne, kein
Auftritt, keine Bedienoberfläche — ein Text mit Überschriften, Linien, Rand und einem Porträt.

Die Wärme liegt in drei Dingen, und in keinem davon ist Gestaltung: **in der Sprache** (Wiebke
spricht in der Ich-Form und sagt Sätze, die sich jemand getraut hat), **im Satz** (großzügiger
Rand, ruhige Zeilen, ein Lesetext-Serif) und **im Porträt**. Alles andere hält sich zurück.

### Die Vorgeschichte, weil sie die Regeln erklärt

Dieses Repository trägt das dritte Gestaltungssystem. Die beiden Vorgänger sind gescheitert, und
beide Male an derselben Sache: Sie haben eine Haltung behauptet, statt sie zu unterlassen.

**Erstes System, „Das Arbeitspapier".** Linienraster, Randspalte, Doppelstrich, Mono-Versal-Labels,
Graphit auf Beige, die Regel *Farbe ist nie Fläche*. Fachlich stimmig und sauber gebaut — aber
strenger Swiss-Minimalismus ist die Standardsprache hunderter Agentur- und Fintech-Auftritte.
Verworfen als austauschbar.

**Zweites System, „Das Gespräch".** Als Antwort auf „zu kalt" wurde alles ins Freundliche gedreht:
Sprechblasen als Formsignatur, aufklappbare Chat-Blasen als Einstieg, ein Messenger-Signet mit vier
bunten Punkten, eine dunkle Bühne mit farbigem Leuchten, gefüllte Reiter, Pillen-Schaltflächen,
28-px-Radien, federnde Bewegung. Das Ergebnis las sich nicht als freundlich, sondern als
**Software** — der Auftritt eines Start-ups, nicht der einer Wirtschaftsprüferin.

Der Fehler war eine Verwechslung: *freundlich* wurde mit *app-artig* gleichgesetzt. Alle Mittel, mit
denen Wärme erzeugt werden sollte — runde Ecken, Farbflächen, Chat-Metaphern, Bewegung — kommen aus
dem Baukasten für Bedienoberflächen. Sie machen eine Seite nicht menschlich, sondern bedienbar.

**Was daraus folgt, ist die tragende Regel dieses Systems:** Wärme entsteht nicht durch Formen,
sondern durch Inhalt. Wo eine Gestaltungsentscheidung „freundlicher wirken" soll, ist sie
wahrscheinlich falsch; sie soll lesbar sein und sich sonst heraushalten.

**Kernmerkmale**

- Newsreader — ein Lesetext-Serif mit optischer Achse — trägt Überschriften **und** Fließtext.
  Software setzt Sans, ein Dokument setzt Serif.
- Fast keine Farbe. Die vier Logofarben sind Linien, Listenmarken und Textfarbe, nie Fläche.
- Ein Radius im ganzen System: 2 px an Steuerelementen. Sonst nichts Rundes.
- Kein Schatten, keine Kachelraster als Grundstruktur, keine Pillen.
- Gegliedert wird mit Linien, Weißraum und Schriftgrößen.
- Bewegung nur als Antwort auf einen Klick. Kein Scroll-Reveal.
- Das Porträt ist der einzige Blickfang und der Hauptträger der Wärme.

## 2. Farbe

### 2.1 Grundton

| Token | Hex | Rolle |
|---|---|---|
| `--color-ink` | `#241C17` | Überschriften und Fließtext, warmes Braunschwarz |
| `--color-ink-soft` | `#57493F` | Sekundärtext, Bildunterschriften, Marginalien |
| `--color-ink-lift` | `#3A2C22` | Hover auf tintenfarbener Fläche |
| `--color-paper` | `#FBFAF8` | die Seitenfläche |
| `--color-mist` | `#F2F0EB` | zweite Fläche für den Sektionswechsel |
| `--color-stone` | `#ECE9E3` | dritte Stufe, eingebettete Tabellen |
| `--color-edge` | `#DDD8CF` | Trennlinien |
| `--color-edge-strong` | `#96826A` | Ränder von Steuerelementen, 3,5:1 nach SC 1.4.11 |
| `--color-paper-soft` | `#C6B6A4` | Sekundärtext auf Tinte |

### 2.2 Die vier Logofarben

| Bereich | `--color-X` (Linie, Marke) | `--color-X-deep` (Text auf hell) | `--color-X-tint` (blasse Fläche) |
|---|---|---|---|
| Wirtschaftsprüfung | `#D4780A` | `#9C5200` | `#FBE7CF` |
| Beratung | `#2E7DB8` | `#1F5F8F` | `#E2EFF9` |
| Steuern | `#2D8B57` | `#1E6B41` | `#DFF0E6` |
| Prüfungspflicht-Check | `#D4A917` | `#7A5F09` | `#FAEFCC` |

Auf dunkler Fläche gelten aufgehellte Textvarianten: Beratung `#7FB8E0`, Steuern `#6EC795`.

### 2.3 Named Rules — Farbe

**Die Markierungs-Regel.** Eine Bereichsfarbe erscheint als Linie, Listenmarke, Textfarbe oder
Hover — **nie als gesättigte Fläche.** Das Vorgängersystem füllte Reiter, Antwortblasen und die
Kopfleiste vollflächig; genau diese Flächen ließen die Seite nach Anwendung aussehen. Erlaubt sind
die `-tint`-Varianten als sehr blasser Grund für eingebettete Panels.

**Die Kontext-Regel.** Eine Sektion setzt ihre Bereichsfarbe einmal über eine Klasse
(`.area-pruefung` und so weiter). Alle Kinder lesen `--area-line`, `--area-deep`, `--area-tint` und
`--area-text` daraus. Kein Template entscheidet selbst über Kontrast; `.on-ink` dreht die Zuordnung
für dunkle Flächen um.

**Die Bereichsfarben-Regel.** Orange gehört der Wirtschaftsprüfung, Blau der Beratung, Grün den
Steuern, Gelb dem Prüfungspflicht-Check. Die einzige Farbe außerhalb einer Sektion ist die
2-px-Linie unter der Kopfzeile: Sie steht in Orange als Leitfarbe der Marke.

**Die Deckkraft-Regel.** Textfarben werden **nie** gedämpft, indem man sie durchsichtig macht,
sondern über eine eigene deckende Farbe. Das gilt für `opacity` genauso wie für
`color-mix(…, transparent)` — beide mischen den Text mit dem tatsächlichen Hintergrund und senken
den Kontrast unkontrolliert. Die Regel wurde dreimal verletzt und dreimal von AXE gefunden, zuletzt
an der Rolle „Wirtschaftsprüferin" in der Kopfzeile (3,74:1 statt 5,18:1).

**Die Ampel-Regel.** Farbe transportiert nie allein eine Aussage. Das Ergebnis des
Prüfungspflicht-Checks steht als vollständiger Satz und in einer Tabelle mit den Worten
„überschritten" und „nicht überschritten"; beide Ausgänge sehen gleich aus. Kein Grün für „gut",
kein Rot für „schlecht" — Prüfungspflicht ist kein Fehlerzustand.

### 2.4 Kontraste sind gerechnet, nicht behauptet

`src/design-system.spec.ts` liest die Tokens aus `styles.css` und rechnet jede dokumentierte
Paarung nach: Fließtext auf allen drei hellen Flächen, jeder Tint gegen Tinte und gegen die eigene
`deep`-Variante, jede Bereichsfarbe als Text auf hell und auf dunkel, die Steuerelement-Ränder
gegen 3:1. Ein aufgehelltes Token bricht den Test.

Was diese Prüfung nicht sehen kann — Deckkraft, Überblendungen, Verläufe —, fängt die AXE-Suite in
`e2e/a11y.spec.ts` ab: jede Route, jeder Reiterzustand, das Ergebnis des Checks.

## 3. Typografie

**Newsreader** (variabel, OFL-1.1) trägt Überschriften und Fließtext. Genutzt wird die Achse
`opsz`, und sie ist der Grund für diese Schrift: Bei 60 px braucht ein Serif feinere Haarstriche und
engere Punzen als bei 18 px. Wer nur skaliert, bekommt entweder klobige Überschriften oder
brüchigen Lesetext.

Dass der **Fließtext** ein Serif ist, ist die eigentliche Antwort auf „soll nicht nach Software
aussehen". Bedienoberflächen setzen Sans. Bücher, Zeitungen, Gutachten und Prüfungsberichte setzen
Serif. Die Schriftwahl entscheidet den Eindruck, bevor ein einziges Wort gelesen ist.

**Instrument Sans** trägt ausschließlich Bedienelemente: Navigation, Formularlabels, Schalter,
Schaltflächen. Sie soll nicht auffallen.

**IBM Plex Mono** trägt, was in Spalten steht oder ein Aktenzeichen ist: Beträge, Datumsangaben,
Normzitate, Marginalien. `§ 267 Abs. 1 HGB` und `7.500.000 €` brauchen Tabellenziffern.

| Rolle | Klasse | Familie | Größe |
|---|---|---|---|
| Display | `.type-display` | Serif | `clamp(2.25rem, 4.6vw, 3.75rem)` |
| Display, Unterseiten | `.type-display-sub` | Serif | `clamp(2rem, 3.8vw, 3rem)` |
| Headline | `.type-headline` | Serif | `clamp(1.625rem, 2.6vw, 2.25rem)` |
| Subhead | `.type-subhead` | Serif | 1.3125rem |
| Lead | `.type-lead` | Serif | `clamp(1.1875rem, 1.5vw, 1.4375rem)`, max 44ch |
| Body | `.type-body` | Serif | 1.125rem, max **52ch** |
| Bedienelement | `.type-ui` | Sans | 0.9375rem |
| Zahl | `.type-figure` | Mono | erbt, `tabular-nums` |
| Norm, Marginalie | `.type-norm` | Mono | 0.8125rem |

**Die Zeilenlängen-Regel.** `max-width: 52ch`, nicht mehr. Die Einheit `ch` misst die Breite der
Ziffer 0 und ist deutlich breiter als der Durchschnittsbuchstabe im deutschen Satz: 66ch ergaben
gemessene 85 Zeichen pro Zeile. 52ch landen bei rund 70.

**Die Gewichts-Regel.** Kein Gewicht über 600. Newsreader trägt Überschriften in 400 — ein
Lesetext-Serif bei 48 px braucht keine Fettung, um Überschrift zu sein. Hierarchie entsteht aus
Größe, Abstand und Linie.

**Headlines sind Daten, kein Markup.** `DisplayHeadlineComponent` rendert ein `lines: string[]` aus
dem `ContentService`. Zeilenumbrüche in einer großen Headline sind Gestaltung und gehören in den
Content.

## 4. Form, Tiefe, Bewegung

**Ein Radius.** `--radius-control: 2px`, an Formularfeldern und Schaltflächen. Sonst nichts
Rundes. Es gibt keine Formsignatur mehr — die Sprechblase des Vorgängersystems mit ihren
28-px-Ecken ist ersatzlos entfallen.

**Kein Schatten.** Tiefe entsteht aus dem Flächenwechsel Papier → Nebel → Stein. Die einzige
Ausnahme ist eine 1-px-Kante unter der Kopfzeile beim Scrollen, und die ist genau genommen auch nur
eine Linie.

**Linien statt Kacheln.** Das Gliederungsmittel ist die Haarlinie (`.hairline`). Karten
(`.card`) gibt es noch, aber als Ausnahme: eine Kante, kein Schatten, kein Anheben beim Zeigen.

**Die Sektionsmarke** ist ein 40 × 2 px langer Strich in der Bereichsfarbe über der Überschrift
(`.rule-mark`) — kein Etikett und keine Kategorie, nur ein Anstrich. Etiketten über Überschriften
(*Eyebrows*) sind verboten; siehe Do's and Don'ts.

**Die Marginalie** (`.leaf`) ist die Layout-Signatur: ab 1024 px eine 9 rem schmale Randnotiz links
neben dem Text, für Normzitate, Jahreszahlen und Bildunterschriften. Sie enthält nie Fließtext.

**Bewegung** hat eine Kurve (`--ease-soft`), kurze Dauern und existiert nur, wo etwas auf einen
Klick antwortet: Aufklappen einer Antwort, Reiterwechsel, Erscheinen des Check-Ergebnisses. Kein
Scroll-Reveal — Inhalt, der erst beim Scrollen erscheint, ist ein Effekt, kein Argument, und er
kann hängenbleiben. `prefers-reduced-motion: reduce` neutralisiert global.

## 5. Komponenten

### Kopfzeile

Eine Zeile auf Papier mit einer 2-px-Linie in Orange darunter, fest über dem Inhalt
(`position: fixed`). Die Vorfassung trug hier ein durchgehend orangefarbenes Band; eine gesättigte
Vollfläche am oberen Rand ist die Signatur einer Anwendung. Geblieben ist dieselbe Farbe am
selben Ort, ohne den Auftritt.

Weil die Zeile fest liegt, bekommt **alles mit `id` global `scroll-margin-block-start: 6.5rem`** —
sonst verschwindet jedes Sprungziel dahinter.

### Wortmarke

Name in Newsreader, Rolle in Instrument Sans daneben. Es gibt **kein Signet**: Die vier bunten
Punkte in einer Sprechblase sahen aus wie ein Messenger-Logo. Solange Wiebkes echtes Logo fehlt,
ist die Wortmarke die Marke.

### Porträt

`PortraitComponent`, Hochformat 4:5 mit Kante und optionaler Bildunterschrift. Es ist der einzige
Blickfang der Seite und trägt den Großteil dessen, was „freundlich" ausmachen soll.

Solange kein Foto vorliegt, steht dort eine ruhige Fläche mit dem Satz „Porträt folgt." — keine
graue Silhouette, kein Platzhalterbild. **Einbau:** Datei nach `public/wiebke-lefevre.jpg`
(mindestens 900 × 1125 px), dann `portraitSrc` und `portraitAlt` in `ContentService.getProfile()`
füllen. Mehr nicht.

### Einstieg

Drei Fragen in der Stimme der Besucherin, als Liste auf Haarlinien mit aufklappbarer Antwort. Die
Idee „erst fragen, dann erzählen" ist geblieben, das Chatfenster ist weg: keine Sprechblasen, keine
gefüllten Antwortflächen, nur ein Plus, das beim Öffnen zum Minus wird.

Gebaut aus nativen `<details name="hero-dialog">`: exklusives Aufklappen, `aria-expanded` vom
Element selbst, funktionsfähig im vorgerenderten HTML.

### Register

Die drei Leistungsbereiche als Reiterzeile mit Unterlinie — der gewählte Reiter trägt volle Tinte
plus eine Linie in der Bereichsfarbe, also zwei Signale (WCAG 1.4.1). Die gefüllten Farbkacheln der
Vorfassung sind entfallen.

### Werkzeuge

**Prüfungspflicht-Check** — Größenklasse nach §§ 267, 267a HGB, inklusive der Zwei-Stichtags-Regel.
Das Ergebnis wird von einer kräftigen Oberlinie eingeleitet, nicht von einer gefüllten Fläche.

**Fristen-Zeitstrahl** — Abschlussstichtag und Größenklasse wählen, und die gesetzlichen Termine
stehen da: Aufstellung (§ 264 Abs. 1 Satz 3/4 HGB), Feststellung (§ 42a Abs. 2 Satz 1 GmbHG),
Offenlegung (§ 325 Abs. 1a Satz 1 HGB). Dazwischen liegt das **Prüfungsfenster** — nicht als
Werbeblock, sondern weil ohne Prüfung nicht festgestellt werden kann (§ 316 Abs. 1 Satz 2 HGB).

Beide rechnen ausschließlich im Browser. Beide tragen einen Hinweis, was sie *nicht* abbilden.

### Handlungslinks

`CtaLinkComponent`, zwei Stufen: `primary` als schlichte Fläche in Tinte, `quiet` als Textlink mit
Unterlinie in der Bereichsfarbe. Die zweite Stufe ist bewusst kein umrandeter Knopf — zwei gerahmte
Flächen nebeneinander sehen aus wie ein Dialogfeld.

### Scrollbare Tabellen

Jeder Container mit `overflow-x-auto` bekommt `tabindex="0"`, `role="group"` und ein
`aria-labelledby` auf die Tabellenbeschriftung. Ohne das kommt man an abgeschnittene Spalten nur
mit der Maus (SC 2.1.1).

## 6. Audit

| Prüfung | Befehl | Sieht |
|---|---|---|
| Kontrast-Tokens | `npm test` | Jede dokumentierte Farbpaarung, aus `styles.css` gerechnet |
| Barrierefreiheit | `npx playwright test` | AXE auf jeder Route, jedem Reiterzustand, dem Check-Ergebnis |
| Design-Detektor | `npx impeccable detect` | Muster, Rampen, Zeilenlängen, Überschriftenkette, Reflexgriffe |

Der Detektor läuft zweimal: gegen `src/` und gegen die laufende Seite. Der zweite Durchgang ist der
wichtigere — er sieht die berechneten Werte statt der Templates. Details in
`.impeccable/README.md`.

Zwei Regel-Wert-Paarungen sind dokumentiert stillgelegt, beide Werkzeuggrenzen und keine echten
Befunde: `design-system-color` für `rgb(0, 0, 0)` (Angular-Templates werden ohne `styles.css`
analysiert, im Browser rendert kein Element schwarz) und `broken-image` an der Porträtkomponente
(das `<img>` steht hinter `@if (src())`).

## 7. Do's and Don'ts

### Do

- **Do** Fließtext und Überschriften in der Serif setzen, Bedienelemente in der Sans.
- **Do** die Bereichsfarbe über eine `.area-*`-Klasse auf der Sektion setzen.
- **Do** eine Bereichsfarbe als Linie, Marke oder Textfarbe einsetzen.
- **Do** mit Haarlinien und Weißraum gliedern.
- **Do** Sekundärtext über `--color-ink-soft` beziehungsweise `--color-paper-soft` dämpfen.
- **Do** Zahlen, Datumsangaben und Normzitate in IBM Plex Mono setzen.
- **Do** Normzitate mit Absatz und Satz angeben und gegen den Primärtext prüfen.
- **Do** jede Sektion mit ihrer Überschrift öffnen.
- **Do** alles linksbündig setzen.
- **Do** `prefers-reduced-motion` in jeder animierenden Datei respektieren.
- **Do** sämtliche Texte und ARIA-Attribute auf Deutsch halten.
- **Do** `ChangeDetectionStrategy.OnPush`, `input()` und `output()` verwenden.
- **Do** fehlende Inhalte hinter `@if`-Guards verbergen.

### Don't

- **Don't** eine Bereichsfarbe als gesättigte Fläche einsetzen.
- **Don't** einen Radius über 6 px verwenden — ein Test erzwingt das.
- **Don't** Pillen-Schaltflächen, Sprechblasen oder Chat-Metaphern einführen.
- **Don't** einen Schatten einsetzen.
- **Don't** Textfarben über `opacity` oder `color-mix(…, transparent)` dämpfen.
- **Don't** ein Etikett über eine Überschrift setzen (*Eyebrow*).
- **Don't** ein Scroll-Reveal einbauen.
- **Don't** Federkurven mit Überschwung verwenden.
- **Don't** eine Schriftgröße erfinden, die nicht in der Rampe oben steht.
- **Don't** eine Gestaltungsentscheidung damit begründen, dass sie „freundlicher wirkt".
- **Don't** Fließtext in Mono oder in der Sans setzen.
- **Don't** Überschriften oder Textblöcke zentrieren.
- **Don't** eine Zeitangabe oder Prüfungsdauer in die Werkzeuge schreiben, die nicht unmittelbar
  aus dem Gesetz folgt.
- **Don't** Grün-Rot-Ampeln als alleinigen Bedeutungsträger verwenden.
- **Don't** `ngClass` oder `ngStyle` benutzen — `[class.x]` und `[style.x]` reichen.
- **Don't** `standalone: true` in Decorators schreiben (ab Angular v20 Standard).
- **Don't** Platzhalter in den gerenderten Output lassen.
