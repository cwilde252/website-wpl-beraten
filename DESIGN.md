---
name: WPL — Wiebke Lefevre, Wirtschaftsprüferin
description: Ein Gesprächssystem für eine selbständige Wirtschaftsprüferin im regionalen Mittelstand — Sprechblasen als Formsignatur, die vier Logofarben als echte Flächen, eine fast unbunte Papierfläche. Fachlich belastbar, ohne kanzleikühl zu sein.
colors:
  ink: "#241C17"
  ink-soft: "#57493F"
  ink-lift: "#3A2C22"
  paper: "#FBFAF8"
  mist: "#F2F0EB"
  stone: "#ECE9E3"
  edge: "#E0D3C0"
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
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariationSettings: "'SOFT' 60, 'WONK' 1, 'opsz' 100"
  display-sub:
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "clamp(2.125rem, 4.4vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.06
    fontVariationSettings: "'SOFT' 55, 'WONK' 1, 'opsz' 72"
  headline:
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.12
    fontVariationSettings: "'SOFT' 50, 'WONK' 1, 'opsz' 40"
  subhead:
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.35
  lead:
    fontFamily: "Instrument Sans Variable, Instrument Sans, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Instrument Sans Variable, Instrument Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  legend:
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 600
  control:
    fontFamily: "Instrument Sans Variable, Instrument Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
  small:
    fontFamily: "Instrument Sans Variable, Instrument Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
  fine:
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
  bubble: "1.75rem"
  corner: "0.25rem"
  soft: "1rem"
  control: "0.625rem"
  pill: "999px"
---

# Design-System: WPL — Wiebke Lefevre

## 1. Leitbild

**„Das Gespräch."**

Wiebkes Versprechen ist keine Methode und kein Apparat, sondern eine Person: „Sie arbeiten direkt
mit mir." Der Formenvorrat des Systems kommt deshalb aus dem Gespräch — die Sprechblase mit drei
weichen Ecken und einer scharfen, die Frage, auf die eine Antwort folgt, die Reihe von Punkten, die
anzeigt, dass jemand tippt.

Die Website ist damit kein Prospekt, sondern ein Vorgespräch. Wer sie öffnet, wird als Erstes etwas
gefragt und bekommt eine Antwort, bevor er ein Formular sieht.

### Was das Vorgängersystem war und warum es ersetzt wurde

Bis zu diesem Redesign trug die Seite ein System namens **„Das Arbeitspapier"**: Linienraster,
Randspalte, Doppelstrich unter jeder Sektionsüberschrift, Mono-Versal-Labels, null Schatten, null
Rundung, und die harte Regel *Farbe ist nie Fläche*.

Das war konsequent gebaut und fachlich stimmig. Es hatte zwei Probleme, die es nicht überleben
konnte:

1. **Es war austauschbar geworden.** Strenger Swiss-Minimalismus in Graphit und Beige mit
   Mono-Labels ist die Standardsprache hunderter Agentur-, Studio- und Fintech-Auftritte. Was als
   Abgrenzung von der Großkanzlei gedacht war, las sich als Vorlage.
2. **Es war gegen Wärme gebaut.** „Bewegung an genau drei Stellen", „keine Fotografie", „Prüfung als
   Handwerk, nicht als Apparat" — offen, freundlich und ungezwungen kam darin nicht vor. Das war
   keine Ausführungsschwäche, sondern der erklärte Entwurf.

Übernommen wurden aus dem alten System genau drei Dinge, weil sie fachlich richtig waren: die vier
Logofarben als Bereichsmarken, Zahlen und Normzitate in Mono mit Tabellenziffern, und die
Ampel-Regel (siehe 2.4).

**Kernmerkmale**

- Die Sprechblase ist die Formsignatur: drei weiche Ecken, unten links eine scharfe.
- Farbe ist **Fläche**. Jede der vier Logofarben füllt Panels, Kacheln und Reiter.
- Eine fast unbunte Papierfläche, damit die Farbflächen als Ereignis lesen.
- Karten mit weicher Kante statt Linienraster — und ohne Schatten.
- Zwei Werkzeuge tragen die Leistungsseite: Prüfungspflicht-Check und Fristen-Zeitstrahl.
- Bewegung ist Antwort auf Handlung — plus ein zurückhaltendes Scroll-Reveal.
- Fraunces mit den Achsen SOFT und WONK für die Stimme, Instrument Sans für den Text,
  IBM Plex Mono für Zahlen und Normzitate.

## 2. Farbe

### 2.1 Grundton

| Token | Hex | Rolle |
|---|---|---|
| `--color-ink` | `#241C17` | Fließtext und dunkle Fläche |
| `--color-ink-soft` | `#57493F` | Sekundärtext auf hell |
| `--color-ink-lift` | `#3A2C22` | aufgehellte Tinte, nur als Hover gefüllter Flächen |
| `--color-paper` | `#FBFAF8` | primäre helle Fläche |
| `--color-mist` | `#F2F0EB` | zweite helle Fläche für den Flächenwechsel |
| `--color-stone` | `#ECE9E3` | dritte Stufe, eingebettete Panels |
| `--color-edge` | `#E0D3C0` | dekorative Trennlinien, bewusst unter 3:1 |
| `--color-edge-strong` | `#96826A` | Ränder von Steuerelementen, 3,5:1 nach SC 1.4.11 |
| `--color-paper-soft` | `#C6B6A4` | Sekundärtext auf Tinte |

**Papier, nicht Creme.** Die erste Fassung dieses Systems trug ein warmes Creme (`#FDF8F0`) als
Seitenfläche. Das ist der Reflexgriff: warmes Off-White als „geschmackvoller" Standarduntergrund,
den jedes zweite generierte Interface trägt — derselbe Vorwurf wie beim Vorgängersystem, nur eine
Modestufe später. Der Impeccable-Detector hat es unter `cream-palette` benannt.

Die drei hellen Stufen sind jetzt fast unbunt. Die Wärme liegt dort, wo sie etwas bedeutet: in der
Tinte (einem warmen Braunschwarz), in den vier Bereichsfarben als Flächen, in Fraunces und in der
Stimme. Vor einer beinahe neutralen Fläche werden die Farbflächen zu Ereignissen, statt im Beige
mitzuschwimmen.

### 2.2 Die vier Logofarben, jede in drei Rollen

| Bereich | `--color-X` (Fläche/Signet) | `--color-X-deep` (Text und dunkle Fläche) | `--color-X-tint` (helle Fläche) |
|---|---|---|---|
| Wirtschaftsprüfung | `#D4780A` | `#9C5200` | `#FBE7CF` |
| Beratung | `#2E7DB8` | `#1F5F8F` | `#E2EFF9` |
| Steuern | `#2D8B57` | `#1E6B41` | `#DFF0E6` |
| Prüfungspflicht-Check | `#D4A917` | `#7A5F09` | `#FAEFCC` |

Auf dunkler Fläche gelten aufgehellte Textvarianten: Beratung `#7FB8E0`, Steuern `#6EC795`;
Orange und Gelb tragen dort ihren Logoton selbst.

### 2.3 Named Rules — Farbe

**Die Flächen-Regel.** Jede Vollfarbfläche bringt ihre eigene Textfarbe mit, weil die vier
Logofarben unterschiedlich hell sind. Orange (5,2:1) und Gelb (7,6:1) sind hell genug für
Tintentext. Blau und Grün sind es nicht — sie treten als Fläche ausschließlich in der
`deep`-Variante mit Papiertext auf (6,4:1 und 6,1:1). Das ist die zentrale Neuerung gegenüber dem
Vorgängersystem, und sie ist der Grund, warum es drei Tokens je Farbe gibt.

**Die Kontext-Regel.** Eine Sektion setzt ihre Bereichsfarbe genau einmal über eine Klasse
(`.area-pruefung`, `.area-beratung`, `.area-steuern`, `.area-check`). Alle Kinder lesen daraus
`--area-solid`, `--area-deep`, `--area-tint`, `--area-on-solid` und `--area-text`. Kein Template
entscheidet selbst über Kontrast; `.on-ink` dreht die Zuordnung für dunkle Flächen um.

**Die Bereichsfarben-Regel.** Orange gehört der Wirtschaftsprüfung, Blau der Beratung, Grün den
Steuern, Gelb dem Prüfungspflicht-Check. Innerhalb der Sektionen ist diese Zuordnung unverhandelbar.

Zwei Farben treffen sich nur dort, wo nichts zugeordnet wird: im Signet und in der Farbwäsche des
Heros. Dazu kommt eine dritte, ausdrücklich beschlossene Ausnahme — die **Kopfleiste ist orange**.
Sie ist kein Inhalt, sondern Rahmen: Sie beansprucht keinen Leistungsbereich, sondern trägt die
Leitfarbe der Marke, so wie das Signet alle vier Farben führt, ohne für alle vier Bereiche zu
stehen. Wer über die Seite scrollt, sieht Orange deshalb an zwei Orten mit zwei Bedeutungen — als
Marke oben und als Bereichsmarke in der Wirtschaftsprüfung. Das ist der Preis dieser Entscheidung
und war bewusst.

Die vier Haltungskarten auf der Startseite tragen die Farben reihum als Rhythmus, nicht als
Bedeutung — dort erscheinen sie nur als Kante beim Zeigen.

**Die Deckkraft-Regel.** Textfarben werden **nie** gedämpft, indem man sie durchsichtig macht,
sondern über eine eigene deckende Farbe (`--color-ink-soft`, `--color-paper-soft`). Das gilt für
`opacity` genauso wie für `color-mix(…, transparent)` — beide mischen den Text mit dem
tatsächlichen Hintergrund und senken den Kontrast unkontrolliert.

Die Regel hat sich zweimal gerächt, beide Male von AXE gefunden: auf der orangefarbenen
Reiterfläche (3,88:1 statt 5,18:1) und später an der Rolle „Wirtschaftsprüferin" in der ebenfalls
orangefarbenen Kopfleiste (3,74:1). Auf einer Fläche mit nur 5,2:1 Spielraum ist für eine
gedämpfte Zweitfarbe schlicht kein Platz — dort trägt die Hierarchie Größe und Schriftschnitt.

**Die Ampel-Regel.** Farbe transportiert nie allein eine Aussage. Das Ergebnis des
Prüfungspflicht-Checks steht als vollständiger Satz und in einer Tabelle mit den Worten
„überschritten" und „nicht überschritten"; die Fläche ist in beiden Fällen dieselbe. Kein Grün für
„gut", kein Rot für „schlecht" — Prüfungspflicht ist kein Fehlerzustand.

### 2.4 Kontraste sind gerechnet, nicht behauptet

`src/design-system.spec.ts` liest die Tokens aus `styles.css` und rechnet **36 Paarungen** nach:
Fließtext auf jeder Grundfläche, jede Vollfarbfläche gegen ihre Textfarbe, jeder Tint gegen Tinte
und gegen die eigene `deep`-Variante, jede Bereichsfarbe als Text auf hell und auf dunkel, und die
Steuerelement-Ränder gegen 3:1. Ein aufgehelltes Token bricht den Test.

Was diese Prüfung nicht sehen kann — Deckkraft, Überblendungen, Verläufe —, fängt die AXE-Suite in
`e2e/a11y.spec.ts` ab: jede Route, jeder Reiterzustand, das Ergebnis des Checks.

## 3. Typografie

**Fraunces** (variabel, OFL-1.1) trägt die Stimme. Genutzt werden ausdrücklich die Achsen **SOFT**
(weiche Terminals) und **WONK** (das schräg geschnittene `g`, das kippende `y`) — ohne sie wäre
Fraunces nur eine weitere Serif. Genau diese beiden Achsen machen den Unterschied zwischen
„Geschäftsbericht" und „jemand spricht mit mir". Eine Serif für die Stimme ist zugleich die Brücke
zur Seriosität, die eine Wirtschaftsprüferin braucht.

**Instrument Sans** (variabel, OFL-1.1) trägt den Fließtext: humanistisch, offen, gut lesbar in
langen Absätzen, ohne die Neutralität von Inter.

**IBM Plex Mono** (400/500, OFL-1.1) trägt, was in Spalten steht oder ein Aktenzeichen ist:
Geldbeträge, Tabellenwerte, Datumsangaben, Normzitate. Das Kernmaterial dieser Seite sind
`7.500.000 €`, `31.03.2027` und `§ 267 Abs. 1 HGB` — die brauchen Tabellenziffern.

| Rolle | Klasse | Familie | Größe |
|---|---|---|---|
| Display | `.type-display` | Fraunces | `clamp(2.5rem, 6vw, 5rem)` |
| Headline | `.type-headline` | Fraunces | `clamp(1.75rem, 3.6vw, 2.75rem)` |
| Subhead | `.type-subhead` | Fraunces | 1.375rem |
| Lead | `.type-lead` | Instrument Sans | `clamp(1.125rem, 1.5vw, 1.375rem)`, max 40ch |
| Body | `.type-body` | Instrument Sans | 1.0625rem, max 66ch |
| Zahl | `.type-figure` | **Mono** | erbt, `tabular-nums` |
| Norm | `.type-norm` | **Mono** | 0.8125rem |

**Die Mono-Regel.** Mono nur für Zahlen in Spalten, Datumsangaben und Normzitate. Nie für
Fließtext, nie für Überschriften, nie länger als eine Zeile.

**Keine Etiketten über Überschriften.** Das Vorgängersystem öffnete jede Sektion mit einem
Mono-Versal-Label. Die erste Fassung dieses Systems ersetzte es durch eine farbige Pille — also
dasselbe Muster in freundlich. Beides ist ein *Eyebrow*: eine kleine Kategoriezeile über der
Überschrift, die das Rezept „Label → Headline → Text" auf jeder Sektion wiederholt und dabei
nichts sagt, was die Überschrift nicht schon sagt.

Beides ist ersatzlos entfallen. Eine Sektion beginnt mit ihrer Überschrift. Die Normzitate, die in
den Etiketten mitliefen (`§§ 267, 267a HGB` und so weiter), standen ohnehin doppelt — im Fließtext,
in den Tabellen und an jeder Frist des Zeitstrahls.

Datumsangaben über einem Titel sind kein Eyebrow: Im Werdegang und im Fristen-Zeitstrahl ist das
Datum der eigentliche Inhalt der Zeile, nicht eine Kategorie darüber.

**Headlines sind Daten, kein Markup.** `DisplayHeadlineComponent` rendert ein `lines: string[]` aus
dem `ContentService`. Zeilenumbrüche in einer großen Headline sind Gestaltung und gehören deshalb
in den Content.

## 4. Form, Tiefe, Bewegung

**Die Sprechblase.** `border-radius: 1.75rem 1.75rem 1.75rem 0.25rem` — drei weiche Ecken, unten
links eine scharfe. `.bubble`, gespiegelt `.bubble-mirror`, nach oben geöffnet `.bubble-top`. Sie
kehrt in Karten, Dialogblasen, Reitern, Ergebnispanels und im Signet wieder und ist das Element, an
dem man diese Seite wiedererkennt. Steuerelemente bekommen `0.625rem`, Pillen und Buttons
`999px`.

**Genau ein Schatten.** Er liegt unter dem Kopf, wenn dieser über den Inhalt wandert, und nirgends
sonst — `--shadow-header`, warm getönt über `--shadow-tint` statt schwarz-transparent. Karten
tragen eine Kante statt einer Erhebung: Hairline plus breiter, diffuser Schatten ist die
wiedererkennbare Signatur generierter Oberflächen, zwei Mittel für dieselbe Aussage, von denen
keines sich festlegt.

**Bewegung** hat zwei exponentielle Kurven, beide ohne Überschwung: `--ease-soft` für Zustände,
`--ease-quick` für alles, was direkt auf eine Handlung antwortet. Eine frühere Federkurve mit
Überschwung 1,4 ist ersatzlos entfallen — sie federte hübsch und las sich auf der Seite einer
Wirtschaftsprüferin als Anbiederung. Sie erscheint an fünf Stellen: Antwortblasen im
Einstiegsdialog, Reiterwechsel, Ergebnis des Checks, Hover auf Karten und Buttons, und das
Scroll-Reveal.

**Scroll-Reveal mit drei Sicherungen.** `RevealDirective` versteckt nur, was beim Laden *unterhalb*
des Viewports liegt (sonst verschwände vorgerenderter Inhalt und käme wieder), blendet nach
spätestens 3 Sekunden in jedem Fall ein, und räumt seine Klassen nach der Animation wieder ab, damit
kein Element dauerhaft in einer eigenen Compositing-Ebene hängt. Ein Druck-Stylesheet hebt den
Zustand ohnehin auf. Ein Reveal, das Inhalt versteckt und auf ein Ereignis wartet, ist sonst eine
Wette darauf, dass dieses Ereignis eintritt.

`prefers-reduced-motion: reduce` neutralisiert global alle Übergänge, das Reveal und die
Hover-Verschiebungen.

## 5. Komponenten

### Section Wrapper

| Variante | Fläche | Text |
|---|---|---|
| `cream` | `#FBFAF8` | Tinte |
| `sand` | `#F2F0EB` | Tinte |
| `ink` | `#241C17` | Papier — setzt zusätzlich `.on-ink` |

Innen `.sheet` (max. 78 rem). **Jede Seite öffnet auf der Tintenfläche** — daraus folgt, dass der
Kopf oben transparent mit hellem Text liegen kann und keine Fallunterscheidung nach Route braucht.

### Kopf

Ein durchgehend orangefarbenes Band, fest über dem Inhalt (`position: fixed`), mit Tintentext
(5,2:1). Es wechselt seine Farbe nie — beim Scrollen setzt es sich nur über eine dunklere Kante und
den einzigen Schatten des Systems vom Inhalt ab. Die Begründung für das Orange steht bei der
Bereichsfarben-Regel.

Weil er fest liegt, bekommt **alles mit `id` global `scroll-margin-block-start: 6.5rem`** — sonst
verschwindet jedes Sprungziel hinter ihm. Die Fläche ist volldeckend und verlässt sich nicht auf
`backdrop-filter`: Wo der nicht greift, stünde der Seitentext lesbar hinter dem Kopf.

### Einstiegsdialog

Drei Fragen in der Stimme der Besucherin, drei Antworten in Wiebkes. Gebaut aus nativen
`<details name="hero-dialog">`: exklusives Aufklappen, `aria-expanded` vom Element selbst,
funktionsfähig im vorgerenderten HTML. Eine Signal-Nachbildung wäre mehr Code mit weniger
Barrierefreiheit — deshalb liegt der Zustand hier ausnahmsweise nicht in einem Signal.

### Werkzeuge

Zwei, und sie sind der inhaltliche Kern der Leistungsseite.

**Prüfungspflicht-Check** — Größenklasse nach §§ 267, 267a HGB, inklusive der Zwei-Stichtags-Regel.
Formular links, Schwellenwerte rechts, damit man beim Tippen sieht, wogegen gerechnet wird.

**Fristen-Zeitstrahl** — Abschlussstichtag und Größenklasse wählen, und die gesetzlichen Termine
stehen da: Aufstellung (§ 264 Abs. 1 Satz 3/4 HGB), Feststellung (§ 42a Abs. 2 Satz 1 GmbHG),
Offenlegung (§ 325 Abs. 1a Satz 1 HGB). Dazwischen liegt orange markiert das **Prüfungsfenster** —
nicht als Werbeblock, sondern weil ohne Prüfung nicht festgestellt werden kann
(§ 316 Abs. 1 Satz 2 HGB). Das Argument der Seite steht damit im Gesetz und muss nicht behauptet
werden.

Beide rechnen ausschließlich im Browser. Beide tragen einen Hinweis, was sie *nicht* abbilden.

### Signet

Sprechblase mit vier Punkten in den Logofarben; beim Zeigen federn sie nacheinander an wie ein
Tippindikator. Der einzige Ort, an dem die vier Farben zusammen auftreten, die Marke solange keine
Logodatei vorliegt, und die Herleitung der Formsignatur. **Standardmäßig dekorativ** — an jeder
Stelle steht der Name schon als Text daneben, ein zweiter gleichlautender Bildname wäre für
Screenreader nur Rauschen.

**Mono-Variante.** Auf farbigen Flächen verschwindet der gleichfarbige Punkt der Vierfarbfassung —
auf der orangefarbenen Kopfleiste wären es sichtbar nur noch drei. Wie jedes Logo hat diese Marke
deshalb eine einfarbige Fassung (`[mono]="true"`), die die Textfarbe ihrer Fläche übernimmt.

### Porträt

`PortraitComponent` hält den Platz für Wiebkes Foto (4:5, Sprechblasenrahmen). Solange keines
vorliegt, steht dort keine graue Silhouette und kein „Bild folgt", sondern eine gestaltete Fläche
aus Signet und Farbverlauf. Kommt das Foto, wird `portraitSrc` im `ContentService` gesetzt.

### Handlungslinks

`CtaLinkComponent`, zwei Stufen: `btn-primary` (gefüllt) und `btn-ghost` (Kontur). Pille mit Pfeil,
der beim Zeigen nachrückt. Der unterstrichene Versal-Textlink des Vorgängersystems ist entfallen —
korrekt, aber unfreundlich: Man musste raten, ob etwas anklickbar ist.

### Scrollbare Tabellen

Jeder Container mit `overflow-x-auto` bekommt `tabindex="0"`, `role="group"` und ein
`aria-labelledby` auf die Tabellenbeschriftung. Ohne das kommt man an abgeschnittene Spalten nur mit
der Maus (SC 2.1.1).

## 6. Audit

Das System wird gegen drei Instanzen geprüft, und jede sieht etwas, das die anderen nicht sehen.

| Prüfung | Befehl | Sieht |
|---|---|---|
| Kontrast-Tokens | `npm test` | Jede dokumentierte Farbpaarung, aus `styles.css` gerechnet |
| Barrierefreiheit | `npx playwright test` | AXE auf jeder Route, jedem Reiterzustand, dem Ergebnis des Checks |
| Design-Detektor | `npx impeccable detect` | Muster, Rampen, Zeilenlängen, Überschriftenkette, Reflexgriffe |

Der Detektor läuft zweimal: gegen `src/` und gegen die laufende Seite unter
`http://localhost:4300`. Der zweite Durchgang ist der wichtigere — er sieht die berechneten Werte
statt der Templates. Details in `.impeccable/README.md`.

### Was das erste Audit ergab

Aus 49 Quelltext- und 15 Laufzeitbefunden blieben nach der Korrektur null. Fünf Änderungen waren
mehr als Kosmetik und stehen deshalb hier:

1. **`cream-palette`.** Die Seitenfläche war ein warmes Creme — der Reflexgriff, gegen den dieses
   Redesign angetreten war. Ersetzt durch eine fast unbunte Papierskala (siehe 2.1).
2. **`skipped-heading`.** Auf der Leistungsseite folgte auf die `h1` direkt eine `h3`: Beim Umbau
   der Reiter war die `h2` des Bereichsnamens verloren gegangen. AXE hatte das nicht gemeldet,
   weil Überschriftenreihenfolge dort als Best Practice und nicht als WCAG-A-Verstoß zählt.
3. **`line-length`.** `max-width: 66ch` auf dem Fließtext ergab gemessene **85 Zeichen** pro Zeile.
   Die Einheit `ch` misst die Breite der Ziffer 0, und die ist deutlich breiter als der
   Durchschnittsbuchstabe im deutschen Satz. Jetzt 54ch, real rund 70.
4. **`side-tab`.** Das Ergebnispanel des Prüfungspflicht-Checks trug für „prüfungspflichtig" eine
   6 px starke farbige Kante — ein Verstoß gegen die eigene Ampel-Regel, denn Prüfungspflicht ist
   kein Fehlerzustand. Ersatzlos entfernt.
5. **`gpt-thin-border-wide-shadow`.** Karten trugen Hairline *und* 24-px-Schatten. Jetzt tragen sie
   nur die Kante.

Ignoriert wird genau eine Regel-Wert-Paarung, dokumentiert in `.impeccable/config.json`:
`design-system-color` für `rgb(0, 0, 0)`. Angular-Templates werden ohne `styles.css` analysiert,
weshalb jedes Textelement auf die Browser-Vorgabe Schwarz zurückfällt; im Browser rendert kein
einziges Element so. Der URL-Durchgang prüft dieselbe Regel gegen die echten Werte.

## 7. Do's and Don'ts

### Do

- **Do** die Bereichsfarbe über eine `.area-*`-Klasse auf der Sektion setzen und Kinder aus
  `--area-*` lesen lassen.
- **Do** Blau und Grün als Fläche nur in der `deep`-Variante mit Cremetext einsetzen.
- **Do** Sekundärtext über `--color-ink-soft` beziehungsweise `--color-paper-soft` dämpfen.
- **Do** die Sprechblasenform für alles verwenden, was ein Angebot ist: Karten, Panels, Reiter.
- **Do** Zahlen, Datumsangaben und Normzitate in IBM Plex Mono setzen.
- **Do** Normzitate mit Absatz und Satz angeben und gegen den Primärtext prüfen.
- **Do** jede Sektion mit ihrer Überschrift öffnen.
- **Do** alles linksbündig setzen.
- **Do** `prefers-reduced-motion` in jeder animierenden Datei respektieren.
- **Do** sämtliche Texte und ARIA-Attribute auf Deutsch halten.
- **Do** `ChangeDetectionStrategy.OnPush`, `input()` und `output()` verwenden.
- **Do** fehlende Inhalte hinter `@if`-Guards verbergen.

### Don't

- **Don't** Textfarben über `opacity` dämpfen — siehe die Deckkraft-Regel.
- **Don't** eine Logofarbe als Fläche einsetzen, ohne die Textfarbe der Flächen-Regel mitzunehmen.
- **Don't** zwei Bereichsfarben nebeneinander zeigen, außer im Signet und in der Hero-Farbwäsche.
- **Don't** ein Etikett über eine Überschrift setzen — weder als Versal-Label noch als Pille.
- **Don't** die Vierfarbfassung des Signets auf eine farbige Fläche setzen.
- **Don't** Fließtext in Mono setzen.
- **Don't** Überschriften oder Textblöcke zentrieren.
- **Don't** Kursiv verwenden.
- **Don't** ein Scroll-Reveal ohne Sicherheits-Timeout bauen.
- **Don't** eine Hairline und einen weiten Schatten am selben Element kombinieren.
- **Don't** Federkurven mit Überschwung verwenden.
- **Don't** eine Schriftgröße erfinden, die nicht in der Rampe oben steht.
- **Don't** einen weichen Radialverlauf als Flächendekoration einsetzen.
- **Don't** eine Zeitangabe, Prüfungsdauer oder Empfehlung in die Werkzeuge schreiben, die nicht
  unmittelbar aus dem Gesetz folgt.
- **Don't** mehr als eine gleichrangige Handlungsaufforderung pro Sektion setzen.
- **Don't** Grün-Rot-Ampeln als alleinigen Bedeutungsträger verwenden.
- **Don't** `ngClass` oder `ngStyle` benutzen — `[class.x]` und `[style.x]` reichen.
- **Don't** `standalone: true` in Decorators schreiben (ab Angular v20 Standard).
- **Don't** Platzhalter in den gerenderten Output lassen.
