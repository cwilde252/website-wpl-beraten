import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { LegalPageComponent } from '../../shared/legal-page/legal-page.component';

@Component({
  selector: 'app-datenschutz',
  imports: [LegalPageComponent],
  template: `<app-legal-page heading="Datenschutz" [sections]="sections" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatenschutzComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);

  readonly sections = this.content.getDatenschutzSections();

  ngOnInit(): void {
    this.seo.setMeta(this.content.getSeoMeta('datenschutz'));
  }
}
