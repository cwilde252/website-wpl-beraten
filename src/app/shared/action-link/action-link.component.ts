import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

export type ActionVariant = 'primary' | 'quiet' | 'link';

/**
 * Handlungsaufforderung als Link: primär (gefüllter Button), ruhig (Rahmen) oder
 * Textlink. Interne Ziele laufen über den Router, mailto: und externe Ziele nicht.
 */
@Component({
  selector: 'app-action-link',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @if (external()) {
      <a [href]="href()" [class]="classes()" [attr.aria-label]="ariaLabel() || null">
        <span>{{ label() }}</span>
        <app-icon [name]="icon()" svgClass="arrow" />
      </a>
    } @else {
      <a
        [routerLink]="href()"
        [fragment]="fragment()"
        [class]="classes()"
        [attr.aria-label]="ariaLabel() || null"
      >
        <span>{{ label() }}</span>
        <app-icon [name]="icon()" svgClass="arrow" />
      </a>
    }
  `,
})
export class ActionLinkComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();
  readonly fragment = input<string | undefined>(undefined);
  readonly external = input(false);
  readonly ariaLabel = input('');
  readonly variant = input<ActionVariant>('primary');
  readonly small = input(false);
  readonly icon = input<'arrow' | 'mail'>('arrow');

  readonly classes = computed(() => {
    const variant = this.variant();
    if (variant === 'link') return 'link';
    return ['btn', variant === 'quiet' ? 'btn--quiet' : '', this.small() ? 'btn--small' : '']
      .filter(Boolean)
      .join(' ');
  });
}
