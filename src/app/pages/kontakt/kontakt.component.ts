import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { DisplayHeadlineComponent } from '../../shared/display-headline/display-headline.component';
import { RuleLinkComponent } from '../../shared/rule-link/rule-link.component';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-kontakt',
  imports: [SectionWrapperComponent, DisplayHeadlineComponent, RuleLinkComponent],
  templateUrl: './kontakt.component.html',
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

  ngOnInit(): void {
    this.seo.setMeta(this.content.getSeoMeta('kontakt'));
  }
}
