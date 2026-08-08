import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import {
  DefinitionItem,
  DefinitionListComponent,
} from '../../../../shared/definition-list/definition-list.component';
import { SectionMarkComponent } from '../../../../shared/section-mark/section-mark.component';
import { SectionWrapperComponent } from '../../../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-positionen',
  imports: [SectionWrapperComponent, SectionMarkComponent, DefinitionListComponent],
  templateUrl: './positionen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'haltung' },
})
export class PositionenComponent {
  private readonly positions = inject(ContentService).getPositions();

  readonly items = computed<DefinitionItem[]>(() =>
    this.positions.map((position) => ({
      reference: position.ref,
      term: position.title,
      description: position.description,
    })),
  );
}
