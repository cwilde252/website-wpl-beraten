import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-value-proposition',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './value-proposition.component.html'
})
export class ValuePropositionComponent {
  protected readonly items = inject(ContentService).getValuePropositions();
}
