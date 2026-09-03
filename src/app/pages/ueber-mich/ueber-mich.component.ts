import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { CtaLinkComponent } from '../../shared/cta-link/cta-link.component';
import { DisplayHeadlineComponent } from '../../shared/display-headline/display-headline.component';
import { PortraitComponent } from '../../shared/portrait/portrait.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-ueber-mich',
  imports: [
    SectionWrapperComponent,
    DisplayHeadlineComponent,
    CtaLinkComponent,
    PortraitComponent,
    RevealDirective,
  ],
  templateUrl: './ueber-mich.component.html',
  styleUrl: './ueber-mich.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UeberMichComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);

  readonly headline = this.content.getUeberMichHeadline();
  readonly profile = this.content.getProfile();

  ngOnInit(): void {
    this.seo.setMeta(this.content.getSeoMeta('ueber-mich'));
  }
}
