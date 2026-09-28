# WplBeraten

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Zutritt (Passwortschutz während des Baus)

Solange Impressum und Kontaktdaten fehlen (`FRAGEN-AN-WIEBKE.md`, Punkte 3–5), liegt die Seite
hinter einem Passwort. Die Abfrage übernimmt `netlify/edge-functions/site-gate.ts` — eine
Zutrittsseite im Auftritt von cwilde consulting mit oto in der Form „s'häkle“ und einem
Bautagebuch, aufgebaut wie in `website-bbs`.

**Im Netlify-Projekt einrichten**

1. **Site configuration → Access & security → Password protection: aus.** Netlifys eigener
   Schutz greift vor den Edge Functions; ist er an, sieht niemand die Zutrittsseite.
2. **Environment variables → `SITE_PASSWORD`** anlegen, alle Scopes (die Edge Function liest
   den Wert zur Laufzeit). Fehlt er, bleibt die Seite für alle zu.

**Verhalten**

- Antwort `401` mit `noindex` bis zur Anmeldung — Suchmaschinen nehmen nichts auf.
- Im Cookie `wpl_zutritt` steht ein Ablaufzeitpunkt (12 Stunden) mit HMAC-Signatur, nicht das
  Passwort. Schlüssel ist das Passwort selbst: Ein neues Passwort sperrt alle sofort wieder aus.
- Nur `/assets/fonts/*` liegt vor dem Schloss (Archivo für die Zutrittsseite, frei lizenziert).
- Ein kurzes oder naheliegendes Passwort (`wpl`, `lefevre`) reicht nicht — es gibt keine
  Sperre nach Fehlversuchen, nur eine Verzögerung von 400 ms.

**Pflegen:** Das Bautagebuch ist `BUILD_LOG` in `site-gate.ts`. Nach jeder Änderung:

```bash
npm run check:gate   # Schloss-Tests, axe in Desktop- und Handybreite
```

**Beim Livegang entfernen:** `netlify/edge-functions/site-gate.ts`, `public/assets/fonts/`,
`scripts/check-gate.mjs`, das Skript `check:gate` samt Schritt in
`.github/workflows/quality.yml`, den Abschnitt „Zutritt“ in `netlify.toml` und die Variable
`SITE_PASSWORD` in Netlify.
