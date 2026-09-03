import { CareerEntry } from './career-entry.model';

export interface Profile {
  name: string;
  role: string;
  statement: string[];
  career: CareerEntry[];
  /**
   * Pfad zum Porträt. Leer, solange kein Foto vorliegt — die Templates blenden
   * den Bildbereich dann aus und zeigen stattdessen das Signet
   * (PRODUCT.md, Voice-Regel 5: keine Platzhalter im Output).
   */
  portraitSrc: string;
  portraitAlt: string;
}
