import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Das Sektions-Opening: Doppelstrich, optionale Mono-Referenz, Mono-Label.
 * Genau einmal pro Sektion (Doppelstrich-Regel, DESIGN.md).
 */
@Component({
  selector: 'app-section-mark',
  templateUrl: './section-mark.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionMarkComponent {
  readonly label = input.required<string>();
  readonly reference = input('');
}
