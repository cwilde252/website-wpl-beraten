import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-ueber-mich',
  imports: [NgOptimizedImage],
  templateUrl: './ueber-mich.component.html',
  styles: `
    .portrait {
      width: 100%;
      height: auto;
      border-radius: 999px 999px 0 0;
    }
  `,
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
