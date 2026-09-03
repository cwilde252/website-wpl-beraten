import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Accent, areaClass, SurfaceTheme } from '../accent';

/**
 * Der strukturelle Container aller Sektionen. Setzt Fläche, Bereichsfarbe und
 * vertikalen Rhythmus; die Kontrastregeln erbt der Inhalt über `--area-*`.
 */
@Component({
  selector: 'app-section-wrapper',
  templateUrl: './section-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionWrapperComponent {
  readonly theme = input<SurfaceTheme>('cream');
  readonly padding = input<'normal' | 'large'>('normal');
  readonly accent = input<Accent>('neutral');

  readonly areaClass = computed(() => areaClass(this.accent()));
}
