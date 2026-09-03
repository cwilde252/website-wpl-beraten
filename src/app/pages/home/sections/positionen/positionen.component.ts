import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { SectionMarkComponent } from '../../../../shared/section-mark/section-mark.component';
import { SectionWrapperComponent } from '../../../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-positionen',
  imports: [SectionWrapperComponent, SectionMarkComponent, RevealDirective],
  templateUrl: './positionen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'haltung' },
})
export class PositionenComponent {
  private readonly content = inject(ContentService);

  readonly intro = this.content.getPositionsIntro();
  readonly positions = this.content.getPositions();

  /**
   * Die vier Haltungen bekommen reihum die vier Bereichsfarben. Das ist die
   * einzige Stelle, an der eine Bereichsfarbe nicht für ihren Leistungsbereich
   * steht — hier ist sie reiner Rhythmus, und sie erscheint nur als Ziffer und
   * Hover-Kante, nie als Fläche.
   */
  readonly accentClasses = ['area-pruefung', 'area-beratung', 'area-steuern', 'area-check'];
}
