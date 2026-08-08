import { ServiceBlock } from './service-block.model';

/** Die Bereichsfarbe steuert den Akzent; siehe DESIGN.md, Bereichsfarben-Regel. */
export type AreaAccent = 'pruefung' | 'beratung' | 'steuern';

export interface ServiceArea {
  ref: string;
  slug: string;
  accent: AreaAccent;
  title: string;
  claim: string;
  intro: string;
  blocks: ServiceBlock[];
  mailSubject: string;
  ctaLabel: string;
}
