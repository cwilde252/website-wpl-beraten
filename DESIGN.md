---
name: WPL — Wiebke Lefevre, Wirtschaftsprüferin
description: Ein Gesprächssystem für eine selbständige Wirtschaftsprüferin im regionalen Mittelstand — Sprechblasen als Formsignatur, die vier Logofarben als echte Flächen, warme Grundtöne. Fachlich belastbar, ohne kanzleikühl zu sein.
colors:
  ink: "#241C17"
  ink-soft: "#57493F"
  cream: "#FDF8F0"
  sand: "#F5EDE0"
  shell: "#EBDFCD"
  edge-strong: "#96826A"
  pruefung: "#D4780A"
  beratung: "#2E7DB8"
  steuern: "#2D8B57"
  check: "#D4A917"
typography:
  display:
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariationSettings: "'SOFT' 60, 'WONK' 1, 'opsz' 100"
  headline:
    fontFamily: "Fraunces Variable, Fraunces, Georgia, serif"
    fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.12
    fontVariationSettings: "'SOFT' 50, 'WONK' 1, 'opsz' 40"
  body:
    fontFamily: "Instrument Sans Variable, Instrument Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  figure:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontWeight: 500
    fontVariantNumeric: "tabular-nums"
rounded:
  bubble: "1.75rem 1.75rem 1.75rem 0.25rem"
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
- Warme Grundtöne. Kein reines Schwarz, kein reines Weiß, kein kaltes Grau.
- Karten mit weicher Kante und warmem Schatten statt reinem Linienraster.
- Zwei Werkzeuge tragen die Leistungsseite: Prüfungspflicht-Check und Fristen-Zeitstrahl.
- Bewegung ist Antwort auf Handlung — plus ein zurückhaltendes Scroll-Reveal.
- Fraunces mit den Achsen SOFT und WONK für die Stimme, Instrument Sans für den Text,
  IBM Plex Mono für Zahlen und Normzitate.

## 2. Farbe

### 2.1 Grundton

Die ganze unbunte Skala liegt auf der warmen Seite, damit auch Flächen ohne Bereichsfarbe
freundlich wirken.

| Token | Hex | Rolle |
|---|---|---|
| `--color-ink` | `#241C17` | Fließtext und dunkle Fläche |
| `--color-ink-soft` | `#57493F` | Sekundärtext auf hell |
| `--color-cream` | `#FDF8F0` | primäre helle Fläche |
| `--color-sand` | `#F5EDE0` | zweite helle Fläche für den Flächenwechsel |
| `--color-shell` | `#EBDFCD` | dritte Stufe, eingebettete Panels auf Sand |
| `--color-edge` | `#E0D3C0` | dekorative Trennlinien, bewusst unter 3:1 |
| `--color-edge-strong` | `#96826A` | Ränder von Steuerelementen, 3,5:1 nach SC 1.4.11 |
| `--color-cream-soft` | `#C6B6A4` | Sekundärtext auf Tinte |

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
`deep`-Variante mit Cremetext auf (6,4:1 und 6,1:1). Das ist die zentrale Neuerung gegenüber dem
Vorgängersystem, und sie ist der Grund, warum es drei Tokens je Farbe gibt.

**Die Kontext-Regel.** Eine Sektion setzt ihre Bereichsfarbe genau einmal über eine Klasse
(`.area-pruefung`, `.area-beratung`, `.area-steuern`, `.area-check`). Alle Kinder lesen daraus
`--area-solid`, `--area-deep`, `--area-tint`, `--area-on-solid` und `--area-text`. Kein Template
entscheidet selbst über Kontrast; `.on-ink` dreht die Zuordnung für dunkle Flächen um.

**Die Bereichsfarben-Regel.** Orange gehört der Wirtschaftsprüfung, Blau der Beratung, Grün den
Steuern, Gelb dem Prüfungspflicht-Check. Zwei Bereichsfarben treffen sich an genau zwei Orten: im
Signet und in der Farbwäsche des Heros. Die vier Haltungskarten auf der Startseite tragen die
Farben reihum als Rhythmus, nicht als Bedeutung — dort erscheinen sie nur als Ziffer und
Hover-Kante.

**Die Deckkraft-Regel.** Textfarben werden **nie** über `opacity` gedämpft, sondern über eine
eigene Farbe (`--color-ink-soft`, `--color-cream-soft`). `opacity` mischt den Text mit dem
tatsächlichen Hintergrund und senkt den Kontrast unkontrolliert — auf der orangefarbenen
Reiterfläche hat genau das AA gerissen (3,88:1 statt 5,18:1), gefunden vom AXE-Test.

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

**Keine Versal-Labels.** Die Mono-Versal-Labels des Vorgängersystems sind ersatzlos entfallen — sie
waren der Hauptgrund, warum die Seite kühl wirkte. An ihre Stelle tritt die **Pille**: kleines
Etikett in der Bereichsfarbe, Gemischtschreibung, Sans. Ein Etikett soll man lesen, nicht
entziffern.

**Headlines sind Daten, kein Markup.** `DisplayHeadlineComponent` rendert ein `lines: string[]` aus
dem `ContentService`. Zeilenumbrüche in einer großen Headline sind Gestaltung und gehören deshalb
in den Content.

## 4. Form, Tiefe, Bewegung

**Die Sprechblase.** `border-radius: 1.75rem 1.75rem 1.75rem 0.25rem` — drei weiche Ecken, unten
links eine scharfe. `.bubble`, gespiegelt `.bubble-mirror`, nach oben geöffnet `.bubble-top`. Sie
kehrt in Karten, Dialogblasen, Reitern, Ergebnispanels und im Signet wieder und ist das Element, an
dem man diese Seite wiedererkennt. Steuerelemente bekommen `0.625rem`, Pillen und Buttons
`999px`.

**Schatten sind warm.** `rgba(70, 46, 24, …)` statt Schwarztransparenz, immer weit gestreut und
schwach. Ein kalter Schatten auf warmem Papier sieht aus wie ein Fehler.

**Bewegung** hat zwei Kurven: `--ease-soft` für Zustände, `--ease-spring` (mit leichtem Überschwung)
für alles, was auf eine Handlung antwortet. Sie erscheint an fünf Stellen: Antwortblasen im
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
| `cream` | `#FDF8F0` | Tinte |
| `sand` | `#F5EDE0` | Tinte |
| `ink` | `#241C17` | Creme — setzt zusätzlich `.on-ink` |

Innen `.sheet` (max. 78 rem). **Jede Seite öffnet auf der Tintenfläche** — daraus folgt, dass der
Kopf oben transparent mit hellem Text liegen kann und keine Fallunterscheidung nach Route braucht.

### Kopf

Fest über dem Inhalt (`position: fixed`), oben transparent, ab 40 px gescrollt eine cremefarbene
Fläche mit Rückenunschärfe und Tintentext. Weil er fest liegt, bekommt **alles mit `id` global
`scroll-margin-block-start: 6.5rem`** — sonst verschwindet jedes Sprungziel hinter ihm.

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

## 6. Do's and Don'ts

### Do

- **Do** die Bereichsfarbe über eine `.area-*`-Klasse auf der Sektion setzen und Kinder aus
  `--area-*` lesen lassen.
- **Do** Blau und Grün als Fläche nur in der `deep`-Variante mit Cremetext einsetzen.
- **Do** Sekundärtext über `--color-ink-soft` beziehungsweise `--color-cream-soft` dämpfen.
- **Do** die Sprechblasenform für alles verwenden, was ein Angebot ist: Karten, Panels, Reiter.
- **Do** Zahlen, Datumsangaben und Normzitate in IBM Plex Mono setzen.
- **Do** Normzitate mit Absatz und Satz angeben und gegen den Primärtext prüfen.
- **Do** jede Sektion mit genau einer Pille öffnen.
- **Do** alles linksbündig setzen.
- **Do** `prefers-reduced-motion` in jeder animierenden Datei respektieren.
- **Do** sämtliche Texte und ARIA-Attribute auf Deutsch halten.
- **Do** `ChangeDetectionStrategy.OnPush`, `input()` und `output()` verwenden.
- **Do** fehlende Inhalte hinter `@if`-Guards verbergen.

### Don't

- **Don't** Textfarben über `opacity` dämpfen — siehe die Deckkraft-Regel.
- **Don't** eine Logofarbe als Fläche einsetzen, ohne die Textfarbe der Flächen-Regel mitzunehmen.
- **Don't** zwei Bereichsfarben nebeneinander zeigen, außer im Signet und in der Hero-Farbwäsche.
- **Don't** Mono-Versal-Labels wieder einführen.
- **Don't** Fließtext in Mono setzen.
- **Don't** Überschriften oder Textblöcke zentrieren.
- **Don't** Kursiv verwenden.
- **Don't** ein Scroll-Reveal ohne Sicherheits-Timeout bauen.
- **Don't** eine Zeitangabe, Prüfungsdauer oder Empfehlung in die Werkzeuge schreiben, die nicht
  unmittelbar aus dem Gesetz folgt.
- **Don't** mehr als eine gleichrangige Handlungsaufforderung pro Sektion setzen.
- **Don't** Grün-Rot-Ampeln als alleinigen Bedeutungsträger verwenden.
- **Don't** `ngClass` oder `ngStyle` benutzen — `[class.x]` und `[style.x]` reichen.
- **Don't** `standalone: true` in Decorators schreiben (ab Angular v20 Standard).
- **Don't** Platzhalter in den gerenderten Output lassen.
