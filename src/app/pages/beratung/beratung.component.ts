import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { CtaBannerComponent } from '../../shared/cta-banner/cta-banner.component';
import { CtaBanner, ServicePageContent } from '../../core/models/content.model';

@Component({
  selector: 'app-beratung',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CtaBannerComponent],
  templateUrl: './beratung.component.html'
})
export class BeratungComponent {
  protected readonly page: ServicePageContent = inject(ContentService).getBeratung();
  protected readonly cta: CtaBanner = {
    headline: 'Sprechen wir über Ihren Beratungsbedarf.',
    text: 'Controlling, Organisationsoptimierung oder Coaching für Ihre Buchhaltung — ich freue mich auf Ihre Anfrage.',
    ctaText: this.page.ctaText,
    ctaLink: '/kontakt',
    variant: 'dark'
  };
}
