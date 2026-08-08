import { AreaAccent } from '../core/models/service-area.model';

export type Accent = AreaAccent | 'check' | 'neutral';
export type SurfaceTheme = 'paper' | 'shade' | 'graphite';

/**
 * Löst die Bereichsfarbe für eine Fläche auf — die Kontrast-Regel aus DESIGN.md
 * ist damit an genau einer Stelle kodiert.
 *
 * Keine der vier Logofarben erreicht auf hellem Grund die 4,5:1 für Fließtext,
 * deshalb gilt dort ausnahmslos die -on-paper-Variante. Auf Graphit tragen Orange
 * und Gelb selbst; Blau und Grün brauchen die aufgehellte Variante.
 */
export function accentVariable(accent: Accent, theme: SurfaceTheme): string {
  if (accent === 'neutral') {
    return theme === 'graphite' ? 'var(--color-linen)' : 'var(--color-graphite)';
  }
  if (theme === 'graphite') {
    return accent === 'beratung' || accent === 'steuern'
      ? `var(--color-${accent}-on-graphite)`
      : `var(--color-${accent})`;
  }
  return `var(--color-${accent}-on-paper)`;
}
