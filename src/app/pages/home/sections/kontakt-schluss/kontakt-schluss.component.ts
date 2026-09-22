import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionLinkComponent } from '../../../../shared/action-link/action-link.component';
import { RegisterSheetComponent } from '../../../../shared/register-sheet/register-sheet.component';

@Component({
  selector: 'app-kontakt-schluss',
  imports: [RegisterSheetComponent, ActionLinkComponent],
  templateUrl: './kontakt-schluss.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'kontakt' },
})
export class KontaktSchlussComponent {}
