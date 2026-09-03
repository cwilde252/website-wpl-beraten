/**
 * Kontrastberechnung nach WCAG 2.1, SC 1.4.3 und 1.4.11.
 *
 * Existiert, damit die Farbregeln des Design-Systems nachgerechnet statt
 * behauptet werden. `design-system.spec.ts` liest die Tokens aus `styles.css`
 * und prüft jede dokumentierte Paarung gegen den jeweiligen Schwellenwert.
 */

/** Ein Kanalwert 0–255 in seinen linearisierten Anteil. */
function linearize(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Relative Leuchtdichte eines Hex-Farbwerts (`#rrggbb`). */
export function relativeLuminance(hex: string): number {
  const match = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) throw new TypeError(`Kein sechsstelliger Hex-Farbwert: ${hex}`);
  const value = parseInt(match[1], 16);
  return (
    0.2126 * linearize((value >> 16) & 0xff) +
    0.7152 * linearize((value >> 8) & 0xff) +
    0.0722 * linearize(value & 0xff)
  );
}

/** Kontrastverhältnis zweier Farben, immer ≥ 1. Die Reihenfolge ist egal. */
export function contrastRatio(a: string, b: string): number {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Mindestkontraste der WCAG-Stufe AA. */
export const AA_TEXT = 4.5;
export const AA_LARGE_TEXT = 3;
export const AA_NON_TEXT = 3;
