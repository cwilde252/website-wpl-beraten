import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Der Handlungslink des Systems.
 *
 * Ersetzt den unterstrichenen Versal-Textlink des Vorgängersystems. Der war
 * konsequent, aber unfreundlich: Man musste raten, ob etwas anklickbar ist.
 * Eine Pille mit Pfeil beantwortet die Frage, bevor sie entsteht.
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
        [class.btn-ghost]="variant() === 'ghost'"
        [attr.aria-label]="ariaLabel() || null"
      >
        <span>{{ label() }}</span>
        <svg
          class="btn-arrow"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" />
        </svg>
      </a>
    } @else {
      <a
        [routerLink]="href()"
        [fragment]="fragment()"
        class="btn"
        [class.btn-primary]="variant() === 'primary'"
        [class.btn-ghost]="variant() === 'ghost'"
        [attr.aria-label]="ariaLabel() || null"
      >
        <span>{{ label() }}</span>
        <svg
          class="btn-arrow"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" />
        </svg>
      </a>
    }
  `,
})
export class CtaLinkComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();
  readonly fragment = input<string | undefined>(undefined);
  readonly variant = input<'primary' | 'ghost'>('primary');
  readonly ariaLabel = input('');

  readonly isExternal = computed(() => /^(mailto:|tel:|https?:)/.test(this.href()));
}
