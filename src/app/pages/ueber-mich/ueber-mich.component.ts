import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { ActionLinkComponent } from '../../shared/action-link/action-link.component';
import { RegisterSheetComponent } from '../../shared/register-sheet/register-sheet.component';

@Component({
  selector: 'app-ueber-mich',
  imports: [RegisterSheetComponent, ActionLinkComponent, NgOptimizedImage],
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
