import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Der einzige CTA-Typ des Systems: Textlink mit Unterlinie, kein Button. */
@Component({
  selector: 'app-rule-link',
  imports: [RouterLink],
  templateUrl: './rule-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleLinkComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();
  readonly fragment = input<string | undefined>(undefined);
  /** Externe Ziele und mailto: werden als <a href> gerendert, nicht als routerLink. */
  readonly external = input(false);
  readonly ariaLabel = input('');
}
