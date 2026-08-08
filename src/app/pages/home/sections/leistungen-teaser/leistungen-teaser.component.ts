import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../../core/services/content.service';
import { accentVariable } from '../../../../shared/accent';
import { RuleLinkComponent } from '../../../../shared/rule-link/rule-link.component';
import { SectionMarkComponent } from '../../../../shared/section-mark/section-mark.component';
import { SectionWrapperComponent } from '../../../../shared/section-wrapper/section-wrapper.component';
import { ServiceArea } from '../../../../core/models/service-area.model';

@Component({
  selector: 'app-leistungen-teaser',
  imports: [SectionWrapperComponent, SectionMarkComponent, RuleLinkComponent, RouterLink],
  templateUrl: './leistungen-teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'leistungen' },
})
export class LeistungenTeaserComponent {
  readonly areas = inject(ContentService).getServiceAreas();

  accentFor(area: ServiceArea): string {
    return accentVariable(area.accent, 'shade');
  }
}
