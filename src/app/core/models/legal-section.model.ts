export interface LegalLink {
  label: string;
  href: string;
}

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: LegalLink[];
}
