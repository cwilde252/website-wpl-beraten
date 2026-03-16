import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-about-teaser',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './about-teaser.component.html'
})
export class AboutTeaserComponent {
  protected readonly teaser = inject(ContentService).getAboutTeaser();
}
