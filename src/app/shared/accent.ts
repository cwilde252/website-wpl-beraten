import { AreaAccent } from '../core/models/service-area.model';

/** Die vier Bereichsfarben plus den neutralen Zustand. */
export type Accent = AreaAccent | 'check' | 'neutral';

/** Die drei Grundflächen des Systems. */
export type SurfaceTheme = 'cream' | 'sand' | 'ink';

/**
 * Liefert die CSS-Klasse, über die eine Sektion ihre Bereichsfarbe setzt.
 *
 * Die eigentliche Kontrastentscheidung — welcher Text auf welcher Fläche
 * steht — liegt in `styles.css` unter `.area-*` und `.on-ink`. Damit ist sie
 * an genau einer Stelle kodiert und wird von `design-system.spec.ts`
 * nachgerechnet, statt in jedem Template wiederholt zu werden.
 */
export function areaClass(accent: Accent): string {
  return accent === 'neutral' ? '' : `area-${accent}`;
}
