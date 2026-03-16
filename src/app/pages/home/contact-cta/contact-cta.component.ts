import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CtaBannerComponent } from '../../../shared/cta-banner/cta-banner.component';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-contact-cta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CtaBannerComponent],
  template: `<app-cta-banner [content]="cta" />`
})
export class ContactCtaComponent {
  protected readonly cta = inject(ContentService).getContactCta();
}
