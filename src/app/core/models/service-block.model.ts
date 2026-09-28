export interface ServiceBlock {
  /** Der Katalogbegriff, als Einstieg in den ersten Absatz gesetzt. */
  title: string;
  /** Die Überschrift des Blocks: das Anliegen, nicht der Katalogbegriff. */
  question: string;
  paragraphs: string[];
  points?: string[];
}
