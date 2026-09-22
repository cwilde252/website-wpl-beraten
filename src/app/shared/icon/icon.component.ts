import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName = 'arrow' | 'check' | 'plus' | 'menu' | 'close' | 'mail' | 'pin';

/**
 * Eigene Strich-Icons, 24er-Raster, 1,75 px — eine Familie für die ganze Seite.
 * Immer dekorativ: die Bedeutung trägt der Text daneben.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg
      [attr.class]="svgClass()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @switch (name()) {
        @case ('arrow') {
          <path d="M5 12h13" />
          <path d="m13 6 6 6-6 6" />
        }
        @case ('check') {
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        }
        @case ('plus') {
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        }
        @case ('menu') {
          <path d="M4 8h16" />
          <path d="M4 16h16" />
        }
        @case ('close') {
          <path d="m6 6 12 12" />
          <path d="M18 6 6 18" />
        }
        @case ('mail') {
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
          <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
        }
        @case ('pin') {
          <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
          <circle cx="12" cy="10" r="2.25" />
        }
      }
    </svg>
  `,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly svgClass = input('');
}
