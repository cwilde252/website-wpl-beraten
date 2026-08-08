import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FaqItem } from '../../core/models/faq-item.model';

/**
 * Natives <details>/<summary>. Der Zustand liegt beim Browser — deshalb kein
 * Signal, kein Klick-Handler und keine manuellen role- oder aria-expanded-
 * Attribute (die liefert das Element selbst). Funktioniert ohne JavaScript.
 */
@Component({
  selector: 'app-faq-accordion',
  templateUrl: './faq-accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqAccordionComponent {
  readonly items = input.required<FaqItem[]>();
  /** Setzt das name-Attribut; gleichnamige <details> öffnen exklusiv. */
  readonly exclusiveGroup = input<string | undefined>(undefined);
}
