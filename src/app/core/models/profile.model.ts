import { CareerEntry } from './career-entry.model';

export interface Profile {
  name: string;
  role: string;
  statement: string[];
  career: CareerEntry[];
  /**
   * Pfad zum Porträt, etwa `/wiebke-lefevre.jpg`. Leer, solange kein Foto
   * vorliegt — die PortraitComponent zeigt dann eine ruhige Fläche mit dem
   * Hinweis „Porträt folgt." statt eines Platzhalterbildes
   * (PRODUCT.md, Voice-Regel 5).
   */
  portraitSrc: string;
  portraitAlt: string;
}
