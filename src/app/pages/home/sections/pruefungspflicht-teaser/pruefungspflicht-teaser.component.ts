import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HGB_THRESHOLDS } from '../../../../core/domain/hgb-thresholds';
import { CtaLinkComponent } from '../../../../shared/cta-link/cta-link.component';
import { SectionWrapperComponent } from '../../../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-pruefungspflicht-teaser',
  imports: [SectionWrapperComponent, CtaLinkComponent],
  templateUrl: './pruefungspflicht-teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'pruefungspflicht' },
})
export class PruefungspflichtTeaserComponent {
  readonly small = HGB_THRESHOLDS.small;

  /** Die drei Schwellen als Kacheln — die Zahl ist das Argument. */
  readonly tiles = [
    { label: 'Bilanzsumme', value: this.format(HGB_THRESHOLDS.small.balanceSheetTotal), unit: '€' },
    { label: 'Umsatzerlöse', value: this.format(HGB_THRESHOLDS.small.revenue), unit: '€' },
    { label: 'Arbeitnehmer', value: String(HGB_THRESHOLDS.small.employees), unit: '' },
  ];

  format(value: number): string {
    return new Intl.NumberFormat('de-DE').format(value);
  }
}
