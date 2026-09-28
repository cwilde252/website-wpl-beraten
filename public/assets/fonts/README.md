# Archivo

Diese drei Schnitte gehören **nicht** zur WPL-Seite selbst — die läuft auf Red Hat Display
und Red Hat Text. Sie tragen allein die Zutrittsseite (`netlify/edge-functions/site-gate.ts`),
die im Auftritt von cwilde consulting gestaltet ist und dort Archivo als einzige Schrift
verwendet.

Sie liegen als fertige Dateien hier statt als npm-Abhängigkeit, weil die Zutrittsseite vor
dem Angular-Build ausgeliefert wird und daher nicht auf dessen Ausgabe zugreifen kann.
Ein CDN scheidet aus demselben Grund aus wie beim Rest der Seite: keine Google Fonts,
keine IP-Adressen der Besucher an Dritte.

- Herkunft: [`@fontsource/archivo`](https://www.npmjs.com/package/@fontsource/archivo),
  Latin-Subset, Schnitte 400 / 600 / 800 (dieselben Dateien wie in `website-bbs`)
- Lizenz: SIL Open Font License 1.1 — siehe `ARCHIVO-LICENSE.txt`
- Projekt: https://github.com/Omnibus-Type/Archivo

Fällt der Passwortschutz weg, kann dieser Ordner mitsamt der Edge Function verschwinden.
