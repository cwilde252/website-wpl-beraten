import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionIntroComponent } from '../../../shared/section-intro/section-intro.component';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-core-areas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SectionIntroComponent],
  templateUrl: './core-areas.component.html'
})
export class CoreAreasComponent {
  protected readonly areas = inject(ContentService).getCoreAreas();
}
