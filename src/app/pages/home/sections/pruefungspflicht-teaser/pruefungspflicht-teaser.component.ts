import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HGB_THRESHOLDS } from '../../../../core/domain/hgb-thresholds';
import { RuleLinkComponent } from '../../../../shared/rule-link/rule-link.component';
import { SectionMarkComponent } from '../../../../shared/section-mark/section-mark.component';
import { SectionWrapperComponent } from '../../../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-pruefungspflicht-teaser',
  imports: [SectionWrapperComponent, SectionMarkComponent, RuleLinkComponent],
  templateUrl: './pruefungspflicht-teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'pruefungspflicht' },
})
export class PruefungspflichtTeaserComponent {
  readonly small = HGB_THRESHOLDS.small;

  format(value: number): string {
    return new Intl.NumberFormat('de-DE').format(value);
  }
}
