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
 * Seitenindikator am linken Rand. Die Einträge sind echte Anker — sie
 * funktionieren im vorgerenderten HTML auch ohne JavaScript. Der
 * IntersectionObserver hebt zusätzlich den aktuellen Abschnitt hervor.
 *
 * Neu gegenüber dem Vorgänger: Der aktive Punkt wächst und färbt sich, und die
 * Beschriftung fährt beim Zeigen als kleine Blase heraus, statt nur die Deckkraft
 * zu wechseln.
 */
@Component({
  selector: 'app-section-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: contents;
      }

      .indicator-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.375rem 0.5rem;
        margin-inline: -0.5rem;
        text-decoration: none;
      }

      .indicator-dot {
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: var(--color-edge-strong);
        flex: none;
        transition:
          background-color 280ms var(--ease-soft),
          transform 280ms var(--ease-quick);
      }

      .indicator-item[aria-current] .indicator-dot {
        background: var(--color-ink);
        transform: scale(1.6);
      }

      .indicator-label {
        font-size: var(--text-xs);
        font-weight: 500;
        white-space: nowrap;
        color: var(--color-ink);
        background: var(--color-paper);
        border: 1px solid var(--color-edge);
        border-radius: var(--radius-pill);
        padding: 0.3125rem 0.75rem;
        opacity: 0;
        transform: translateX(-6px);
        transition:
          opacity 240ms var(--ease-soft),
          transform 240ms var(--ease-quick);
      }

      /* Das Label erscheint nur beim Zeigen. Dauerhaft eingeblendet — auch für
         den aktiven Abschnitt — liefe es in schmaleren Viewports in die
         Headline hinein. */
      .indicator-item:hover .indicator-label,
      .indicator-item:focus-visible .indicator-label {
        opacity: 1;
        transform: translateX(0);
      }
    `,
  ],
  template: `
    <nav
      class="hidden xl:flex fixed left-4 2xl:left-8 top-1/2 -translate-y-1/2 z-30 flex-col"
      [attr.aria-label]="ariaLabel()"
    >
      <ol class="list-none m-0 p-0 flex flex-col gap-1.5">
        @for (section of sections(); track section.id) {
          <li>
            <a
              [href]="'#' + section.id"
              class="indicator-item"
              [attr.aria-current]="activeId() === section.id ? 'location' : null"
            >
              <span class="indicator-dot" aria-hidden="true"></span>
              <span class="indicator-label">{{ section.label }}</span>
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
