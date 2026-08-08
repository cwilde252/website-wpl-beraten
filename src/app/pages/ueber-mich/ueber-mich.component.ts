import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { DisplayHeadlineComponent } from '../../shared/display-headline/display-headline.component';
import { RuleLinkComponent } from '../../shared/rule-link/rule-link.component';
import { SectionMarkComponent } from '../../shared/section-mark/section-mark.component';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-ueber-mich',
  imports: [
    SectionWrapperComponent,
    SectionMarkComponent,
    DisplayHeadlineComponent,
    RuleLinkComponent,
  ],
  templateUrl: './ueber-mich.component.html',
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
