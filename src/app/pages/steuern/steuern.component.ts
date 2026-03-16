import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { CtaBannerComponent } from '../../shared/cta-banner/cta-banner.component';
import { CtaBanner, ServicePageContent } from '../../core/models/content.model';

@Component({
  selector: 'app-steuern',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CtaBannerComponent],
  templateUrl: './steuern.component.html'
})
export class SteuernComponent {
  protected readonly page: ServicePageContent = inject(ContentService).getSteuern();
  protected readonly cta: CtaBanner = {
    headline: 'Sprechen wir über Ihre Steuerplanung.',
    text: 'Steuern als Teil der Unternehmenssteuerung mitdenken — ich freue mich auf Ihre Anfrage.',
    ctaText: this.page.ctaText,
    ctaLink: '/kontakt',
    variant: 'dark'
  };
}
