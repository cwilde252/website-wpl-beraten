import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { SectionRef } from '../../core/models/section-ref.model';

/**
 * Seitenindikator in der Randspalte. Die Einträge sind echte Anker — sie
 * funktionieren im vorgerenderten HTML auch ohne JavaScript. Der
 * IntersectionObserver hebt zusätzlich den aktuellen Abschnitt hervor.
 */
@Component({
  selector: 'app-section-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: contents;
      }

      .indicator-label {
        opacity: 0;
        transform: translateX(-4px);
        transition:
          opacity 240ms var(--ease-precise),
          transform 240ms var(--ease-precise);
      }

      .indicator-item:hover .indicator-label,
      .indicator-item:focus-visible .indicator-label {
        opacity: 1;
        transform: translateX(0);
      }

      .indicator-tick {
        transition:
          opacity 240ms var(--ease-precise),
          transform 240ms var(--ease-precise);
      }
    `,
  ],
  template: `
    <nav
      class="hidden lg:flex fixed left-3 xl:left-6 top-1/2 -translate-y-1/2 z-30 flex-col"
      [attr.aria-label]="ariaLabel()"
    >
      <ol class="list-none m-0 p-0 flex flex-col gap-1">
        @for (section of sections(); track section.id) {
          <li>
            <a
              [href]="'#' + section.id"
              class="indicator-item flex items-center gap-3 py-1.5 px-2 -mx-2 no-underline"
              [attr.aria-current]="activeId() === section.id ? 'location' : null"
            >
              <span
                class="indicator-tick block w-0.5 h-6 bg-muted shrink-0"
                [style.opacity]="activeId() === section.id ? '1' : '0.4'"
                [style.transform]="activeId() === section.id ? 'scaleY(1)' : 'scaleY(0.4)'"
                aria-hidden="true"
              ></span>
              <span
                class="indicator-label type-label whitespace-nowrap bg-linen-bright text-graphite px-2 py-1"
                >{{ section.label }}</span
              >
            </a>
          </li>
        }
      </ol>
    </nav>
  `,
})
export class SectionIndicatorComponent {
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly sections = input.required<SectionRef[]>();
  readonly ariaLabel = input('Abschnitte dieser Seite');

  readonly activeId = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      const view = this.doc.defaultView;
      if (!view || !('IntersectionObserver' in view)) return;

      const elements = this.sections()
        .map((section) => this.doc.getElementById(section.id))
        .filter((element): element is HTMLElement => element !== null);

      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.activeId.set(entry.target.id);
          }
        },
        // Aktiv ist der Abschnitt, der die Viewport-Mitte kreuzt.
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
      );

      elements.forEach((element) => observer.observe(element));
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
