import { ServiceBlock } from './service-block.model';

/** Der Bereich bestimmt Fläche und Punktfarbe; siehe DESIGN.md, Farbe besitzt Flächen. */
export type AreaAccent = 'pruefung' | 'beratung' | 'steuern';

export interface ServiceArea {
  ref: string;
  slug: string;
  accent: AreaAccent;
  title: string;
  /** Die Frage, mit der Mandanten typischerweise kommen — Überschrift der Anliegen-Karte. */
  question: string;
  /** Die kurze Antwort darauf, in Ich-Form. */
  answer: string;
  claim: string;
  intro: string;
  blocks: ServiceBlock[];
  mailSubject: string;
  ctaLabel: string;
}
