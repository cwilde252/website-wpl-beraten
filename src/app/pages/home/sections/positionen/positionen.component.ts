import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import {
  DefinitionItem,
  DefinitionListComponent,
} from '../../../../shared/definition-list/definition-list.component';

@Component({
  selector: 'app-positionen',
  imports: [DefinitionListComponent],
  templateUrl: './positionen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'haltung' },
})
export class PositionenComponent {
  private readonly positions = inject(ContentService).getPositions();

  readonly items = computed<DefinitionItem[]>(() =>
    this.positions.map((position) => ({
      term: position.title,
      description: position.description,
    })),
  );
}
