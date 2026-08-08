import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Accent, accentVariable, SurfaceTheme } from '../accent';

@Component({
  selector: 'app-section-wrapper',
  templateUrl: './section-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionWrapperComponent {
  readonly theme = input<SurfaceTheme>('paper');
  readonly padding = input<'normal' | 'large'>('normal');
  readonly accent = input<Accent>('neutral');

  readonly accentColor = computed(() => accentVariable(this.accent(), this.theme()));
}
