import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBanner } from '../../core/models/content.model';

@Component({
  selector: 'app-cta-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './cta-banner.component.html'
})
export class CtaBannerComponent {
  readonly content = input.required<CtaBanner>();
  readonly isDark = computed(() => this.content().variant !== 'light');
}
