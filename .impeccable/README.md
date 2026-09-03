# Impeccable in diesem Projekt

Der Detector läuft in zwei Durchgängen, und beide sind nötig:

```bash
npx impeccable detect src/                       # Quelltext
npx impeccable detect http://localhost:4300/     # gerenderte Seite
```

Der Quelltext-Durchgang sieht Tokens, Größen und Formen. Der URL-Durchgang sieht,
was daraus tatsächlich wird: berechnete Farben, Zeilenlängen, Überschriftenkette,
Abstandsverhältnisse. Der zweite hat beim ersten Audit die schwerwiegenderen
Befunde geliefert — unter anderem `cream-palette` und den fehlenden `h2` auf der
Leistungsseite.

Für den URL-Durchgang startet man vorher den Prerender-Output:

```bash
npm run build && npx http-server dist/wpl-beraten/browser -p 4300 -s
```

## Warum `rgb(0, 0, 0)` ignoriert wird

Angular-Komponenten liegen als Template-Fragmente vor. Der Detector analysiert
sie einzeln und ohne `src/styles.css`, also ohne die Regel

```css
body { color: var(--color-ink); }
```

Damit fällt jedes Textelement auf die Browser-Vorgabe Schwarz zurück, und die
Regel `design-system-color` meldet 19-mal eine Farbe, die real nirgends
gerendert wird — nachgeprüft im Browser: kein einziges Element hat
`color: rgb(0, 0, 0)`.

Der Eintrag ist unbedenklich, weil der URL-Durchgang dieselbe Regel gegen die
tatsächlich berechneten Farben laufen lässt. Ein versehentlich eingeführtes
reines Schwarz würde dort auffallen.

## Was NICHT ignoriert wird

Alles andere aus dem ersten Audit wurde behoben, nicht stillgelegt. Die
Begründungen stehen bei den jeweiligen Regeln in `DESIGN.md` und als Kommentar
an der geänderten Stelle im Code.
