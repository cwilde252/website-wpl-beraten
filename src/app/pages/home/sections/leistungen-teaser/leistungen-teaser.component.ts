import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceArea } from '../../../../core/models/service-area.model';
import { ContentService } from '../../../../core/services/content.service';
import { CtaLinkComponent } from '../../../../shared/cta-link/cta-link.component';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { SectionMarkComponent } from '../../../../shared/section-mark/section-mark.component';
import { SectionWrapperComponent } from '../../../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-leistungen-teaser',
  imports: [
    SectionWrapperComponent,
    SectionMarkComponent,
    CtaLinkComponent,
    RevealDirective,
    RouterLink,
  ],
  templateUrl: './leistungen-teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'leistungen' },
})
export class LeistungenTeaserComponent {
  readonly areas = inject(ContentService).getServiceAreas();

  areaClass(area: ServiceArea): string {
    return `area-${area.accent}`;
  }
}
