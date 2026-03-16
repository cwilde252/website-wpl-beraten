import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { CtaBannerComponent } from '../../shared/cta-banner/cta-banner.component';
import { CtaBanner, ServicePageContent } from '../../core/models/content.model';

@Component({
  selector: 'app-wirtschaftspruefung',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CtaBannerComponent],
  templateUrl: './wirtschaftspruefung.component.html'
})
export class WirtschaftspruefungComponent {
  protected readonly page: ServicePageContent = inject(ContentService).getWirtschaftspruefung();
  protected readonly cta: CtaBanner = {
    headline: 'Sprechen wir über Ihre Prüfung.',
    text: 'Ob Pflichtprüfung oder freiwillige Prüfung — ich freue mich auf Ihre Anfrage.',
    ctaText: this.page.ctaText,
    ctaLink: '/kontakt',
    variant: 'dark'
  };
}
