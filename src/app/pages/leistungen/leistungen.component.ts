import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionRef } from '../../core/models/section-ref.model';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { AuditCheckComponent } from '../../shared/audit-check/audit-check.component';
import { DisplayHeadlineComponent } from '../../shared/display-headline/display-headline.component';
import { FaqAccordionComponent } from '../../shared/faq-accordion/faq-accordion.component';
import { CtaLinkComponent } from '../../shared/cta-link/cta-link.component';
import { FristenTimelineComponent } from '../../shared/fristen-timeline/fristen-timeline.component';
import { SectionIndicatorComponent } from '../../shared/section-indicator/section-indicator.component';
import { SectionMarkComponent } from '../../shared/section-mark/section-mark.component';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { ServiceTabsComponent } from '../../shared/service-tabs/service-tabs.component';

const LEISTUNGEN_SECTIONS: SectionRef[] = [
  { id: 'leistungen-start', label: 'Leistungen' },
  { id: 'bereiche', label: 'Bereiche' },
  { id: 'pruefungspflicht', label: 'Prüfungspflicht' },
  { id: 'fristen', label: 'Fristen' },
  { id: 'fragen', label: 'Fragen' },
];

@Component({
  selector: 'app-leistungen',
  imports: [
    SectionIndicatorComponent,
    SectionWrapperComponent,
    SectionMarkComponent,
    DisplayHeadlineComponent,
    ServiceTabsComponent,
    AuditCheckComponent,
    FaqAccordionComponent,
    CtaLinkComponent,
    FristenTimelineComponent,
  ],
  templateUrl: './leistungen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeistungenComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly doc = inject(DOCUMENT);

  readonly sections = LEISTUNGEN_SECTIONS;
  readonly headline = this.content.getLeistungenHeadline();
  readonly lead = this.content.getLeistungenLead();
  readonly areas = this.content.getServiceAreas();
  readonly faq = this.content.getFaq();

  readonly initialSlug = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      const fragment = this.route.snapshot.fragment;
      if (!fragment || !this.areas.some((area) => area.slug === fragment)) return;
      this.initialSlug.set(fragment);
      const view = this.doc.defaultView;
      const reduced = view?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false;
      this.doc
        .getElementById('bereiche')
        ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  ngOnInit(): void {
    this.seo.setMeta(this.content.getSeoMeta('leistungen'));
  }

  onAreaActivated(slug: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      fragment: slug,
      replaceUrl: true,
    });
  }
}
