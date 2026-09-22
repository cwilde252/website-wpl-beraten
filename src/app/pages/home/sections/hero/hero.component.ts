import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../../core/services/content.service';
import { ActionLinkComponent } from '../../../../shared/action-link/action-link.component';
import { Tone } from '../../../../shared/register-sheet/register-sheet.component';

interface StackTab {
  label: string;
  fragment: string;
  tone: Tone;
}

@Component({
  selector: 'app-hero',
  imports: [ActionLinkComponent, RouterLink, NgOptimizedImage],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'start' },
})
export class HeroComponent {
  private readonly content = inject(ContentService);
  readonly headline = this.content.getHomeHeadline();
  readonly lead = this.content.getHomeLead();
  readonly contact = this.content.getContactInfo();
  readonly portrait = this.content.getProfile().portrait;

  /** Die drei Bereiche plus der Check — in der Reihenfolge, in der sie im Ordner liegen. */
  readonly tabs: StackTab[] = [
    ...this.content.getServiceAreas().map((area) => ({
      label: area.title,
      fragment: area.slug,
      tone: area.accent,
    })),
    { label: 'Prüfungspflicht-Check', fragment: 'pruefungspflicht', tone: 'check' },
  ];
}
