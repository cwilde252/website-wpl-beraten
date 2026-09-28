import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { ActionLinkComponent } from '../../../../shared/action-link/action-link.component';

@Component({
  selector: 'app-hero',
  imports: [ActionLinkComponent, NgOptimizedImage],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'start' },
})
export class HeroComponent {
  private readonly content = inject(ContentService);
  readonly headline = this.content.getHomeHeadline();
  readonly lead = this.content.getHomeLead();
  readonly note = this.content.getHeroNote();
  readonly portrait = this.content.getProfile().portrait;
}
