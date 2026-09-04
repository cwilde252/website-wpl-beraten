import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { SectionWrapperComponent } from '../../../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-positionen',
  imports: [SectionWrapperComponent],
  templateUrl: './positionen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'haltung' },
})
export class PositionenComponent {
  private readonly content = inject(ContentService);

  readonly intro = this.content.getPositionsIntro();
  readonly positions = this.content.getPositions();

  /**
   * Die vier Haltungen bekommen reihum die vier Bereichsfarben. Hier steht die
   * Farbe nicht für einen Leistungsbereich, sondern ist reiner Rhythmus — und
   * sie erscheint ausschließlich als Kante beim Zeigen, nie als Fläche.
   */
  readonly accentClasses = ['area-pruefung', 'area-beratung', 'area-steuern', 'area-check'];
}
