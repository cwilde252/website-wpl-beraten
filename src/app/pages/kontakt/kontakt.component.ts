import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { CtaLinkComponent } from '../../shared/cta-link/cta-link.component';
import { DisplayHeadlineComponent } from '../../shared/display-headline/display-headline.component';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-kontakt',
  imports: [SectionWrapperComponent, DisplayHeadlineComponent, CtaLinkComponent],
  templateUrl: './kontakt.component.html',
  styles: [
    '.hint-marker { flex: none; margin-block-start: 0.5625rem; width: 0.4375rem; height: 0.4375rem; border-radius: 50%; background: var(--area-deep); }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KontaktComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);

  readonly headline = this.content.getKontaktHeadline();
  readonly contact = this.content.getContactInfo();
  readonly hasAddress = !!(this.contact.street && this.contact.postalCode);
  readonly mailtoHref = this.contact.email
    ? `mailto:${this.contact.email}?subject=${encodeURIComponent('Anfrage Erstgespräch')}`
    : '';

  /**
   * Was in eine erste Mail gehört. Steht hier, weil die häufigste Hürde vor
   * einer Anfrage nicht die Adresse ist, sondern die Frage „was schreibe ich
   * denn jetzt?".
   */
  readonly hints = [
    'In welcher Branche Sie unterwegs sind und wie groß das Unternehmen ungefähr ist',
    'Was gerade ansteht — Pflichtprüfung, freiwillige Prüfung, Beratung oder eine einzelne Frage',
    'Bis wann es eilt, falls es eilt',
  ];

  ngOnInit(): void {
    this.seo.setMeta(this.content.getSeoMeta('kontakt'));
  }
}
