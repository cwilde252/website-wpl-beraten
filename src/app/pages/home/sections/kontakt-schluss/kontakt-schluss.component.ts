import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { CtaLinkComponent } from '../../../../shared/cta-link/cta-link.component';
import { SectionWrapperComponent } from '../../../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-kontakt-schluss',
  imports: [SectionWrapperComponent, CtaLinkComponent],
  templateUrl: './kontakt-schluss.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'kontakt' },
})
export class KontaktSchlussComponent {
  readonly contact = inject(ContentService).getContactInfo();
}
