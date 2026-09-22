import { CareerEntry } from './career-entry.model';

/** Ein lokales Porträt unter `public/`, z. B. `/wiebke-lefevre.jpg`. */
export interface Portrait {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Profile {
  name: string;
  role: string;
  statement: string[];
  /** `null`, solange kein freigegebenes Foto vorliegt — der Bildplatz bleibt dann leer. */
  portrait: Portrait | null;
  career: CareerEntry[];
}
