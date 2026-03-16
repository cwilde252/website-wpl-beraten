import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ContentService } from '../../core/services/content.service';
import { CtaBannerComponent } from '../../shared/cta-banner/cta-banner.component';
import { CtaBanner, PersonProfile } from '../../core/models/content.model';

@Component({
  selector: 'app-ueber-mich',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CtaBannerComponent, NgOptimizedImage],
  templateUrl: './ueber-mich.component.html'
})
export class UeberMichComponent {
  protected readonly profile: PersonProfile = inject(ContentService).getProfile();
  protected readonly cta: CtaBanner = {
    headline: 'Lassen Sie uns ins Gespräch kommen.',
    text: 'Persönliche Beratung auf Augenhöhe — ich freue mich auf Ihre Nachricht.',
    ctaText: 'Kontakt aufnehmen',
    ctaLink: '/kontakt',
    variant: 'dark'
  };
}
