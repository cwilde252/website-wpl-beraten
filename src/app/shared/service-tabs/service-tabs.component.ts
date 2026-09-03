import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  linkedSignal,
  output,
  viewChildren,
} from '@angular/core';
import { ServiceArea } from '../../core/models/service-area.model';
import { CtaLinkComponent } from '../cta-link/cta-link.component';

@Component({
  selector: 'app-service-tabs',
  imports: [CtaLinkComponent],
  templateUrl: './service-tabs.component.html',
  styleUrl: './service-tabs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceTabsComponent {
  readonly areas = input.required<ServiceArea[]>();
  /** Slug aus dem Route-Fragment; unbekannte Werte fallen auf den ersten Bereich zurück. */
  readonly initialSlug = input<string | null>(null);
  readonly activated = output<string>();

  private readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  /** linkedSignal: folgt dem Fragment, bleibt nach einem Klick aber beschreibbar. */
  readonly activeSlug = linkedSignal<string>(() => {
    const requested = this.initialSlug();
    const areas = this.areas();
    return requested && areas.some((area) => area.slug === requested)
      ? requested
      : (areas[0]?.slug ?? '');
  });

  readonly activeArea = computed<ServiceArea | undefined>(() =>
    this.areas().find((area) => area.slug === this.activeSlug()),
  );

  /**
   * Die Bereichsfarbe wird als Klasse gesetzt, nicht als Inline-Variable. Damit
   * liegt die Kontrastentscheidung in `styles.css` unter `.area-*` und wird von
   * `design-system.spec.ts` nachgerechnet.
   */
  readonly activeAreaClass = computed(() => {
    const area = this.activeArea();
    return area ? `area-${area.accent}` : '';
  });

  select(slug: string): void {
    this.activeSlug.set(slug);
    this.activated.emit(slug);
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    const areas = this.areas();
    const count = areas.length;
    if (count === 0) return;

    let target: number | null = null;
    switch (event.key) {
      case 'ArrowRight':
        target = (index + 1) % count;
        break;
      case 'ArrowLeft':
        target = (index - 1 + count) % count;
        break;
      case 'Home':
        target = 0;
        break;
      case 'End':
        target = count - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.select(areas[target].slug);
    this.tabButtons()[target]?.nativeElement.focus();
  }

  areaClass(area: ServiceArea): string {
    return `area-${area.accent}`;
  }
}
