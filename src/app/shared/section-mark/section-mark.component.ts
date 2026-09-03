import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Das Sektions-Opening: eine Pille in der Bereichsfarbe, optional mit
 * Normreferenz daneben.
 *
 * Der Doppelstrich des Vorgängersystems ist ersatzlos entfallen. Er war das
 * korrekte Zitat (der Abschlussstrich unter der geprüften Endsumme) und
 * gleichzeitig das kälteste Element der Seite — ein Strich lädt niemanden ein.
 */
@Component({
  selector: 'app-section-mark',
  templateUrl: './section-mark.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionMarkComponent {
  readonly label = input.required<string>();
  /** Normzitat oder Jahreszahl, erscheint gedämpft neben der Pille. */
  readonly reference = input('');
}
