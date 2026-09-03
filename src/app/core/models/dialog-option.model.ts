import { AreaAccent } from './service-area.model';

/**
 * Eine Antwortmöglichkeit im Einstiegsdialog der Startseite.
 *
 * `question` steht in der Stimme der Besucherin oder des Besuchers, `answer`
 * in Wiebkes. Das ist der ganze Trick des Dialogs: Man wählt seinen eigenen
 * Satz und bekommt eine Antwort, statt eine Navigation zu lesen.
 */
export interface DialogOption {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly accent: AreaAccent | 'check';
  readonly ctaLabel: string;
  readonly ctaPath: string;
  readonly ctaFragment?: string;
}
