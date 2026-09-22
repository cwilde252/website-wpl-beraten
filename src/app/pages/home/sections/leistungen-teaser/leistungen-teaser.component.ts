import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { ActionLinkComponent } from '../../../../shared/action-link/action-link.component';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { RegisterSheetComponent } from '../../../../shared/register-sheet/register-sheet.component';

@Component({
  selector: 'app-leistungen-teaser',
  imports: [RegisterSheetComponent, ActionLinkComponent, IconComponent],
  templateUrl: './leistungen-teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'leistungen' },
})
export class LeistungenTeaserComponent {
  readonly areas = inject(ContentService).getServiceAreas();

  /** Versetzte Reiter wie bei echten Trennblättern: links, Mitte, rechts. */
  readonly tabPositions = ['0px', 'calc((100% - 15rem) / 2)', 'calc(100% - 15rem)'];
}
