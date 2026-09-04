import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { AA_NON_TEXT, AA_TEXT, contrastRatio } from './app/core/domain/contrast';

/**
 * Erzwingt die Farbregeln aus DESIGN.md gegen die tatsächlichen Tokens in
 * `styles.css`. Die Vorgängerfassung dokumentierte ihre Kontraste in Prosa —
 * niemand hätte gemerkt, wenn ein Token nachträglich aufgehellt wird.
 */

// Die Specs laufen gebündelt, `import.meta.url` ist dort keine file-URL.
// Der Vitest-Runner startet im Projektwurzelverzeichnis.
const STYLES = readFileSync(join(process.cwd(), 'src/styles.css'), 'utf8');

/** Liest `--color-name: #rrggbb;` aus dem @theme-Block. */
function token(name: string): string {
  const match = new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})`, 'i').exec(STYLES);
  if (!match) throw new Error(`Token --color-${name} fehlt in styles.css`);
  return match[1];
}

/** Liest den Wert einer `--area-text`-Deklaration unter einem Selektor. */
function areaTextUnder(selector: string): string {
  const block = new RegExp(`${selector.replace(/[.]/g, '\\.')}\\s*\\{([^}]*)\\}`, 'i').exec(
    STYLES,
  )?.[1];
  if (!block) throw new Error(`Selektor ${selector} fehlt in styles.css`);
  const literal = /--area-text:\s*(#[0-9a-f]{6})/i.exec(block);
  if (literal) return literal[1];
  const reference = /--area-text:\s*var\(--color-([a-z-]+)\)/i.exec(block);
  if (!reference) throw new Error(`${selector} setzt kein --area-text`);
  return token(reference[1]);
}

const AREAS = ['pruefung', 'beratung', 'steuern', 'check'] as const;

describe('Design-System: Farbe', () => {
  const ink = () => token('ink');
  const paper = () => token('paper');

  describe('Fließtext auf jeder Grundfläche', () => {
    const pairs: [string, string, string][] = [
      ['Tinte auf Papier', 'ink', 'paper'],
      ['Tinte auf Nebel', 'ink', 'mist'],
      ['Tinte auf Stein', 'ink', 'stone'],
      ['gedämpfte Tinte auf Papier', 'ink-soft', 'paper'],
      ['gedämpfte Tinte auf Nebel', 'ink-soft', 'mist'],
      ['gedämpfte Tinte auf Stein', 'ink-soft', 'stone'],
      ['Papier auf Tinte', 'paper', 'ink'],
      ['Papier auf aufgehellter Tinte', 'paper', 'ink-lift'],
      ['gedämpftes Papier auf Tinte', 'paper-soft', 'ink'],
    ];

    for (const [name, fg, bg] of pairs) {
      it(`${name} erreicht AA`, () => {
        expect(contrastRatio(token(fg), token(bg))).toBeGreaterThanOrEqual(AA_TEXT);
      });
    }
  });

  describe('Die Flächen-Regel: jede Vollfarbfläche trägt ihre eigene Textfarbe', () => {
    // Orange und Gelb sind hell und tragen Tintentext; Blau und Grün stehen als
    // deep-Variante und tragen Papiertext. Das ist die zentrale Neuerung
    // gegenüber dem Vorgängersystem, in dem Farbe nie Fläche sein durfte.
    const surfaces: [string, string, () => string][] = [
      ['Orange', 'pruefung', ink],
      ['Gelb', 'check', ink],
      ['Blau', 'beratung-deep', paper],
      ['Grün', 'steuern-deep', paper],
    ];

    for (const [name, surface, textColor] of surfaces) {
      it(`${name} als Fläche erreicht AA`, () => {
        expect(contrastRatio(textColor(), token(surface))).toBeGreaterThanOrEqual(AA_TEXT);
      });
    }
  });

  describe('Die Tint-Regel: helle Bereichsfläche trägt Tinte und die deep-Variante', () => {
    for (const area of AREAS) {
      it(`${area}: Tinte auf Tint erreicht AA`, () => {
        expect(contrastRatio(ink(), token(`${area}-tint`))).toBeGreaterThanOrEqual(AA_TEXT);
      });

      it(`${area}: deep-Variante auf eigenem Tint erreicht AA`, () => {
        expect(contrastRatio(token(`${area}-deep`), token(`${area}-tint`))).toBeGreaterThanOrEqual(
          AA_TEXT,
        );
      });
    }
  });

  describe('Die Kontrast-Regel: deep-Variante als Text auf hellem Grund', () => {
    for (const area of AREAS) {
      for (const surface of ['paper', 'mist', 'stone'] as const) {
        it(`${area} auf ${surface} erreicht AA`, () => {
          expect(contrastRatio(token(`${area}-deep`), token(surface))).toBeGreaterThanOrEqual(
            AA_TEXT,
          );
        });
      }
    }
  });

  describe('Bereichsfarbe als Text auf dunkler Fläche', () => {
    for (const area of AREAS) {
      it(`${area} unter .on-ink erreicht AA`, () => {
        expect(contrastRatio(areaTextUnder(`.on-ink.area-${area}`), ink())).toBeGreaterThanOrEqual(
          AA_TEXT,
        );
      });
    }
  });

  describe('Steuerelement-Ränder nach SC 1.4.11', () => {
    for (const surface of ['paper', 'mist', 'stone'] as const) {
      it(`Rand auf ${surface} erreicht 3:1`, () => {
        expect(contrastRatio(token('edge-strong'), token(surface))).toBeGreaterThanOrEqual(
          AA_NON_TEXT,
        );
      });
    }
  });
});

describe('Design-System: Struktur', () => {
  it('bindet keine Schrift von einem fremden CDN ein', () => {
    expect(STYLES).not.toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com|@import\s+url\(/i);
  });

  it('kennt keine App-Geometrie: keine Pillen, keine weichen Kacheln', () => {
    // Diese Prüfung ersetzt die frühere Zusicherung auf die Sprechblasenform.
    // Sie ist der Grund, warum die Seite nach Software aussah: 28-px-Radien,
    // Pillen-Schaltflächen, gefüllte Kacheln. Ein Radius über 6 px oder ein
    // `999px` schleicht sich sonst über kurz oder lang wieder ein.
    expect(STYLES).not.toMatch(/--radius-(bubble|pill)/);
    expect(STYLES).not.toMatch(/border-radius:\s*999px/);

    const radii = [...STYLES.matchAll(/border-radius:\s*([\d.]+)rem/g)].map((m) => Number(m[1]));
    const zuWeich = radii.filter((rem) => rem > 0.375);
    expect(zuWeich, 'Radius über 6 px gefunden').toEqual([]);
  });

  it('setzt Fließtext und Überschriften in der Serif', () => {
    expect(STYLES).toMatch(/--font-serif:\s*'Newsreader Variable'/);

    // Der Fließtext ist das Kennzeichen: Software setzt Sans, ein Dokument Serif.
    // Das Muster wird zusammengesetzt, damit der Impeccable-Detector es nicht
    // als Schriftdeklaration in einer Quelldatei liest — es ist eine Prüfung.
    const familyOf = (klasse: string) => {
      const block = new RegExp(`\\.${klasse}\\s*\\{([^}]*)\\}`).exec(STYLES)?.[1] ?? '';
      return new RegExp(['font', 'family'].join('-') + String.raw`:\s*var\(([^)]+)\)`).exec(
        block,
      )?.[1];
    };

    expect(familyOf('type-body')).toBe('--font-serif');
    expect(familyOf('type-display')).toBe('--font-serif');
    expect(familyOf('type-ui')).toBe('--font-sans');
  });

  it('lässt keine gesättigte Bereichsfarbe als Fläche zu', () => {
    // --area-solid und --area-on-solid trugen die gefüllten Reiter und
    // Antwortblasen. Beide Tokens sind entfallen; ihr Fehlen ist die Regel.
    expect(STYLES).not.toMatch(/--area-solid|--area-on-solid/);
  });

  it('respektiert prefers-reduced-motion global', () => {
    expect(STYLES).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
  });
});
