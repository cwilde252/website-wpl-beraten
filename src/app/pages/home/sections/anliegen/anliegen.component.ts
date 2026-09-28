import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { ActionLinkComponent } from '../../../../shared/action-link/action-link.component';

/** Die drei Bereiche als Fragen der Mandanten — je eine volle Fläche in der Bereichsfarbe. */
@Component({
  selector: 'app-anliegen',
  imports: [ActionLinkComponent],
  templateUrl: './anliegen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'anliegen' },
  styles: `
    .cards {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 1.25rem;
    }
    @media (min-width: 1024px) {
      .cards {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.5rem;
      }
    }
    .card {
      display: flex;
      flex-direction: column;
    }
    .card-action {
      margin-block-start: auto;
      padding-block-start: 1.5rem;
    }
  `,
})
export class AnliegenComponent {
  private readonly content = inject(ContentService);
  readonly intro = this.content.getAnliegenIntro();
  readonly areas = this.content.getServiceAreas();
}
