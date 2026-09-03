import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { CtaLinkComponent } from '../../../../shared/cta-link/cta-link.component';
import { PortraitComponent } from '../../../../shared/portrait/portrait.component';
import { SectionWrapperComponent } from '../../../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-profil-teaser',
  imports: [SectionWrapperComponent, CtaLinkComponent, PortraitComponent],
  templateUrl: './profil-teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'profil' },
})
export class ProfilTeaserComponent {
  readonly profile = inject(ContentService).getProfile();
}
