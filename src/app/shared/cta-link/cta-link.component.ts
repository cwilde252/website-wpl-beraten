import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Der Handlungslink des Systems, in zwei Stufen.
 *
 * `primary` ist eine schlichte Fläche in Tinte, `quiet` ein Textlink mit
 * Unterlinie in der Bereichsfarbe. Die zweite Stufe ist bewusst kein umrandeter
 * Knopf: Zwei gerahmte Flächen nebeneinander sehen aus wie ein Dialogfeld.
 *
 * Interne Ziele laufen über `routerLink`, `mailto:` und externe Adressen über
 * ein einfaches `<a href>`.
 */
@Component({
  selector: 'app-cta-link',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isExternal()) {
      <a
        [href]="href()"
        class="btn"
        [class.btn-primary]="variant() === 'primary'"
        [class.btn-quiet]="variant() === 'quiet'"
        [attr.aria-label]="ariaLabel() || null"
      >
        <span>{{ label() }}</span>
      </a>
    } @else {
      <a
        [routerLink]="href()"
        [fragment]="fragment()"
        class="btn"
        [class.btn-primary]="variant() === 'primary'"
        [class.btn-quiet]="variant() === 'quiet'"
        [attr.aria-label]="ariaLabel() || null"
      >
        <span>{{ label() }}</span>
      </a>
    }
  `,
})
export class CtaLinkComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();
  readonly fragment = input<string | undefined>(undefined);
  readonly variant = input<'primary' | 'quiet'>('primary');
  readonly ariaLabel = input('');

  readonly isExternal = computed(() => /^(mailto:|tel:|https?:)/.test(this.href()));
}
