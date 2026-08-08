---
name: WPL — Wiebke Lefevre, Wirtschaftsprüferin
description: Arbeitspapier-System für eine selbständige Wirtschaftsprüferin im regionalen Mittelstand — Linienraster, Randspalte, Zahlen als Bild. Die vier Logofarben als präzise Akzente, nie als Fläche.
colors:
  graphite: "#23262A"
  graphite-deep: "#16181B"
  linen: "#EFEDE7"
  linen-bright: "#F9F8F5"
  muted: "#5E5A54"
  rule: "#7E786C"
  pruefung: "#D4780A"
  beratung: "#2E7DB8"
  steuern: "#2D8B57"
  check: "#D4A917"
typography:
  display:
    fontFamily: "Libre Franklin Variable, Libre Franklin, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5.2vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Libre Franklin Variable, Libre Franklin, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3.4vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.012em"
  body:
    fontFamily: "Libre Franklin Variable, Libre Franklin, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  sheet: "0px"
  control: "2px"
---

# Design-System: WPL — Wiebke Lefevre

## 1. Leitbild

**„Das Arbeitspapier."**

Das Kernartefakt einer Wirtschaftsprüferin ist das Arbeitspapier: liniertes Papier, ausgerichtete
Zahlenkolonnen, eine schmale Randspalte für Referenzen, der Doppelstrich unter der geprüften
Endsumme. Präzise, prüfbar, ohne Dekoration.

Dieser Formenvorrat ist die Grundlage des Systems — aus drei Gründen. Er ist **fachlich wahr**:
er zeigt, wie hier gearbeitet wird, statt es zu behaupten. Er **trägt ohne Fotografie**: für dieses
Projekt existiert kein einziges Bildasset, und ein Redesign, das auf Fotos wartet, wäre nie fertig.
Und er ist **weder Kanzlei-Klischee noch SaaS noch Magazin** — die drei Richtungen, in die eine
Website für Wirtschaftsprüfung von allein abrutscht.

Die Website ist eine Arbeitsprobe. Wer sie liest, soll denken: Die weiß, was sie tut, und muss mich
nicht überreden.

**Kernmerkmale**

- Flächen ausschließlich in Graphit, Leinen und Leinen-hell. Farbe ist nie Fläche.
- Die vier Logofarben sind Bereichsmarken: eine je Leistungsbereich, nur als Linie, Label oder Marke.
- Vollständig flach — null `box-shadow`. Tiefe entsteht aus Flächenwechsel und Linienstärke.
- Scharfe Ecken. Eine dokumentierte Ausnahme: 2 px an Formularfeldern und Buttons.
- Linienraster statt Karten. Es gibt keine Boxen, nur horizontale 1-px-Regeln.
- Randspalte ab 1024 px: Marginalien links, Inhalt rechts. Die Layout-Signatur des Systems.
- Zwei Schriftfamilien mit klarer Arbeitsteilung: Libre Franklin für Sprache, IBM Plex Mono für Zahlen.
- Bewegung an genau drei Stellen. Kein Scroll-Reveal.

## 2. Farbe

### 2.1 Grundton

| Token | Hex | Rolle |
|---|---|---|
| `--color-graphite` | `#23262A` | Dominante dunkle Fläche (Hero, Footer-Vorstufe) **und** Fließtextfarbe auf hellem Grund |
| `--color-graphite-deep` | `#16181B` | Footer und Hover auf dunklen Flächen. Nie eigenständige Sektionsfläche. |
| `--color-linen` | `#EFEDE7` | Primäre helle Fläche, warmes Papier |
| `--color-linen-bright` | `#F9F8F5` | Zweite helle Fläche für den Sektionswechsel |
| `--color-muted` | `#5E5A54` | Sekundärtext auf hell (Marginalien, Bildunterschriften, Hinweise) |
| `--color-rule` | `#7E786C` | Ränder von Steuerelementen — braucht 3:1 nach SC 1.4.11 |
| `--color-muted-on-graphite` | `#A8B0AD` | Sekundärtext auf Graphit |

Geprüfte Kontraste: Graphit auf Leinen 12,8:1 · Graphit auf Leinen-hell 14,2:1 · Leinen auf Graphit
12,8:1 · Muted auf Leinen 5,8:1 · Rule auf Leinen 3,9:1 · Muted-on-Graphite auf Graphit 6,6:1.

### 2.2 Die vier Logofarben

Orange, Blau, Grün und Gelb stammen aus dem Logo und bleiben unverändert erhalten. Sie sind das
einzige Farbelement des Systems — und sie sind ausschließlich **Markierung**, nie Fläche.

| Bereich | Logo (Signet) | auf Leinen | auf Graphit |
|---|---|---|---|
| Wirtschaftsprüfung | `#D4780A` | `#A55700` (4,51:1) | `#D4780A` (4,70:1) |
| Beratung | `#2E7DB8` | `#24709F` (4,58:1) | `#5AA3D6` (5,45:1) |
| Steuern | `#2D8B57` | `#247347` (4,90:1) | `#4FB37D` (5,80:1) |
| Prüfungspflicht-Check | `#D4A917` | `#82640A` (4,75:1) | `#D4A917` (6,83:1) |

**Warum drei Tokens je Farbe.** Keine der vier Logofarben erreicht auf Leinen die 4,5:1, die WCAG AA
für Fließtext verlangt; Orange verfehlt dort mit 2,73:1 sogar die 3:1 für nicht-textliche Elemente.
Die Logofarbe bleibt deshalb dem Signet und den Markierungen auf dunklem Grund vorbehalten, während
Text und Linien auf hellem Grund die abgedunkelte Variante nutzen. Der Farbeindruck bleibt erhalten,
der Kontrast stimmt. Für Blau und Grün gilt dasselbe auf Graphit in die andere Richtung.

### 2.3 Named Rules — Farbe

**Die Bereichsfarben-Regel.** Jede Logofarbe gehört genau einem Leistungsbereich: Orange der
Wirtschaftsprüfung, Blau der Beratung, Grün den Steuern, Gelb dem Prüfungspflicht-Check. Sie
erscheint dort nur als Hairline, Label, Tab-Markierung, Listenmarke oder Hover-Farbe — nie als
gefüllte Fläche über 4 px. Zwei Bereichsfarben treffen sich nirgends außer im Signet.

**Die Kontrast-Regel.** Auf Leinen und Leinen-hell gilt die `-on-paper`-Variante, auf Graphit die
`-on-graphite`-Variante. Die reine Logofarbe steht ausschließlich im Signet und in nicht-textlichen
Markierungen auf Graphit. Durchgesetzt über Descendant-Regeln unter `.on-graphite` in `styles.css`.

**Die Ampel-Regel.** Farbe transportiert nie allein eine Aussage. Im Prüfungspflicht-Check steht das
Ergebnis als vollständiger Satz und in einer Tabelle mit den Worten „überschritten" und „nicht
überschritten"; Gelb markiert lediglich zusätzlich die linke Kante überschreitender Zeilen. Kein
Grün für „gut", kein Rot für „schlecht" — Prüfungspflicht ist kein Fehlerzustand.

## 3. Typografie

Zwei Familien, aber die zweite hat einen **Job, keinen Stil**.

**Libre Franklin** (variabel, OFL-1.1) trägt die Sprache: Display, Headlines, Fließtext, Navigation.
Ein Franklin-Gothic-Abkömmling — die Schrift des seriösen Geschäftsberichts. Robust, mit spürbarem
Strichstärkenkontrast und humanistischen Details, also weder die Neo-Grotesk-Neutralität von
Helvetica und Inter noch die freundliche Geometrie von DM Sans.

**IBM Plex Mono** (400/500, OFL-1.1) trägt die Zahlen: Labels, Normzitate, Jahreszahlen, Beträge,
Tabellenwerte, CTA-Labels. Das Kernmaterial dieser Seite sind Zahlen in Spalten und Paragraphen —
`§ 267 Abs. 1 HGB`, `7.500.000 €`, `2014 – 2024`. Die brauchen Tabellenziffern und feste Laufweite,
sonst tanzen sie. Im echten Arbeitspapier ist das genauso. Plex Mono hat Schreibmaschinen-, nicht
Code-Anmutung — „technisches Dokument", nicht „Terminal".

| Rolle | Klasse | Familie | Größe | Gewicht |
|---|---|---|---|---|
| Display | `.type-display` | Sans | `clamp(2.25rem, 5.2vw, 4.5rem)` | 500 |
| Headline | `.type-headline` | Sans | `clamp(1.5rem, 3.4vw, 2.5rem)` | 500 |
| Subhead | `.type-subhead` | Sans | 1.125rem | 600 |
| Lead | `.type-lead` | Sans | `clamp(1.125rem, 1.6vw, 1.375rem)` | 400 |
| Body | `.type-body` | Sans | 1.0625rem, max 68ch | 400 |
| Label | `.type-label` | **Mono** | 0.75rem, uppercase, +0.08em | 500 |
| Zahl | `.type-figure` | **Mono** | erbt, `tabular-nums` | 500 |

**Die Skalen-Regel.** Hierarchie entsteht aus Größe, Linie und Position — nie aus Gewicht, nie aus
Farbe. Kein Gewicht über 600; einzige Ausnahme ist das Verdikt des Prüfungspflicht-Checks (700).
Braucht ein Wort Betonung, gehört es in eine eigene Zeile oder über eine Linie.

**Die Mono-Regel.** IBM Plex Mono ausschließlich für Marginalien-Labels, Normzitate, Jahreszahlen,
Geldbeträge, Tabellenzahlen, CTA-Labels und Formularfeld-Inhalte. Nie für Fließtext, nie für
Headlines, nie länger als eine Zeile. Erscheint Mono als Textblock, ist die Anwendung falsch.

**Kein Kursiv.** Nirgends. Kein Serif. Keine dritte Familie.

Headlines sind **Daten, kein Markup**: `DisplayHeadlineComponent` rendert ein `lines: string[]` aus
dem `ContentService`. Zeilenumbrüche in einer Display-Headline sind Gestaltung und gehören deshalb
in den Content, nicht ins Template.

## 4. Elevation, Radius, Bewegung

**Kein Schatten.** Null `box-shadow` im gesamten Projekt. Tiefe entsteht aus dem Wechsel der Flächen
Leinen → Leinen-hell → Graphit und aus der Linienstärke (1 px dekorativ, 2 px strukturell). Wer nach
einem Schatten greift, hat das Element falsch gebaut.

**Radius 0**, `--radius-sheet: 0px`, für alle Flächen, Sektionen, Tabs und Listen. Genau eine
dokumentierte Ausnahme: `--radius-control: 2px` an Formularfeldern und Buttons — ein Eingabefeld soll
wie ein Eingabefeld aussehen und nicht wie eine Kante. Kein `rounded-full`, kein `rounded-2xl`.

**Bewegung** nutzt `--ease-precise: cubic-bezier(0.32, 0.72, 0, 1)` bei 160 ms oder 240 ms und
existiert an genau drei Stellen: Einblendung des Tab-Panels, Zustandswechsel des Scroll-Spy-Ticks,
Hover-Farbwechsel. Kein Scroll-Reveal, keine Hero-Staffelung, keine Endlosanimation. `styles.css`
enthält einen globalen `prefers-reduced-motion: reduce`-Block; jede animierende Datei hat zusätzlich
einen lokalen Guard.

## 5. Komponenten

### Section Wrapper

Der strukturelle Container aller Sektionen.

| Variante | Fläche | Text |
|---|---|---|
| `paper` | Leinen `#EFEDE7` | Graphit |
| `shade` | Leinen-hell `#F9F8F5` | Graphit |
| `graphite` | Graphit `#23262A` | Leinen — setzt zusätzlich `.on-graphite` |

Innen `.sheet` (max. 78 rem, Innenabstand 1,25 rem → 2,5 rem → 4 rem). Vertikaler Abstand
`normal` 2,5/4/5 rem, `large` 3,5/5/7 rem.

### Doppelstrich und Section-Mark

**Die Doppelstrich-Regel.** Jede Sektion öffnet mit dem Doppelstrich: 40 px breit, 2 px Graphit,
3 px Abstand, 1 px in der Bereichsfarbe. Darunter das Mono-Label, optional links in der Randspalte
die Mono-Referenz. Genau **einmal** pro Sektion — deshalb darf er nicht inflationär werden.
Herleitung: der Abschlussstrich unter der geprüften Endsumme. Auf Graphit invertiert der obere
Strich zu Leinen.

### Randspalte

**Die Randspalten-Regel.** Ab 1024 px liegt jede Sektion auf einem 12-Spalten-Raster: Spalte 1–2 ist
die Randspalte (Mono-Referenz, Jahreszahl, Normzitat, Scroll-Spy), Spalte 3–12 der Inhalt. Die
Randspalte enthält nie Fließtext, der Inhalt beginnt nie in Spalte 1. Unterhalb von 1024 px fällt die
Randspalte über den Inhalt. Das ist die Layout-Signatur, an der man diese Seite erkennt.

### Rule Link

Der einzige CTA-Typ: ein Textlink mit 1-px-Unterlinie, kein Button. Mono, 0.8125 rem, versal,
Unterlinie in `--color-rule`; im Hover wechseln Text und Linie in die Bereichsfarbe. Fokus:
2 px Outline, 3 px Offset.

**Eine CTA pro Sektion.** Zwei gleichrangige Handlungsaufforderungen bedeuten, dass die Hierarchie
nicht stimmt.

### Zeilenraster statt Karten

Listenartige Inhalte werden nicht zu Karten, sondern zu Zeilen mit 1-px-Oberlinie (`.rule-row`):
Werdegang, FAQ, Leistungspunkte, Schwellenwerttabelle. `DefinitionListComponent` rendert ein echtes
`<dl>`. Es gibt in diesem System keine Boxen mit Rahmen.

### Formular

Nur im Prüfungspflicht-Check. Transparente Fläche auf Leinen, 1 px `--color-rule`, Radius 2 px,
Inhalt in Mono mit Tabellenziffern. Fokus: 2 px Outline in der Bereichsfarbe. Fehler werden zusätzlich
über eine 3 px starke linke Kante markiert, nicht nur über Farbe.

## 6. Do's and Don'ts

### Do

- **Do** die Logofarbe je Bereich konsequent durchhalten: Orange = Prüfung, Blau = Beratung, Grün = Steuern, Gelb = Check.
- **Do** auf hellem Grund die `-on-paper`-Variante nutzen, auf Graphit die `-on-graphite`-Variante.
- **Do** jede Sektion mit genau einem Doppelstrich und einem Mono-Label öffnen.
- **Do** Marginalien in die Randspalte setzen und den Inhalt in Spalte 3–12 beginnen.
- **Do** Zahlen, Jahreszahlen, Beträge und Normzitate in IBM Plex Mono setzen.
- **Do** Listen als Zeilenraster mit 1-px-Oberlinie bauen.
- **Do** alles linksbündig setzen.
- **Do** `prefers-reduced-motion` in jeder animierenden Datei respektieren.
- **Do** sämtliche Texte und ARIA-Attribute auf Deutsch halten.
- **Do** `ChangeDetectionStrategy.OnPush` in jeder Komponente setzen.
- **Do** `input()` und `output()` statt Decorators verwenden.
- **Do** Anker über das `host`-Objekt im Decorator setzen, nicht über `@HostBinding`.
- **Do** fehlende Inhalte hinter `@if`-Guards verbergen.

### Don't

- **Don't** eine Logofarbe als Fläche über 4 px einsetzen — auch nicht als Hero-Hintergrund.
- **Don't** eine reine Logofarbe als Text auf Leinen setzen; keine erreicht dort 4,5:1.
- **Don't** zwei Bereichsfarben nebeneinander zeigen, außer im Signet.
- **Don't** `box-shadow` verwenden.
- **Don't** `border-radius` verwenden, außer den 2 px an Formularfeldern und Buttons.
- **Don't** Karten mit Rahmen bauen — das System kennt nur Linien.
- **Don't** Kursiv, Serif oder eine dritte Schriftfamilie einführen.
- **Don't** Gewicht über 600 verwenden, außer im Verdikt des Prüfungspflicht-Checks.
- **Don't** Fließtext in Mono setzen.
- **Don't** Headlines oder Textblöcke zentrieren.
- **Don't** Scroll-Reveal, Blur-Blobs, Verläufe oder dekorative Icons einsetzen.
- **Don't** mehr als eine CTA pro Sektion setzen.
- **Don't** Grün-Rot-Ampeln als alleinigen Bedeutungsträger verwenden.
- **Don't** `ngClass` oder `ngStyle` benutzen — `[class.x]` und `[style.x]` reichen.
- **Don't** `standalone: true` in Decorators schreiben (ab Angular v20 Standard).
- **Don't** Platzhalter in den gerenderten Output lassen.
