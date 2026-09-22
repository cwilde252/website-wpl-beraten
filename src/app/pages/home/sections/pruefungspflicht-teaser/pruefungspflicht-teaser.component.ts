import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HGB_THRESHOLDS } from '../../../../core/domain/hgb-thresholds';
import { ActionLinkComponent } from '../../../../shared/action-link/action-link.component';
import { RegisterSheetComponent } from '../../../../shared/register-sheet/register-sheet.component';

@Component({
  selector: 'app-pruefungspflicht-teaser',
  imports: [RegisterSheetComponent, ActionLinkComponent],
  templateUrl: './pruefungspflicht-teaser.component.html',
  styleUrl: './pruefungspflicht-teaser.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'pruefungspflicht' },
})
export class PruefungspflichtTeaserComponent {
  readonly small = HGB_THRESHOLDS.small;

  format(value: number): string {
    return new Intl.NumberFormat('de-DE').format(value);
  }
}
