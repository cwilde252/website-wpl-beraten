import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { DisplayHeadlineComponent } from '../../../../shared/display-headline/display-headline.component';
import { RuleLinkComponent } from '../../../../shared/rule-link/rule-link.component';

@Component({
  selector: 'app-hero',
  imports: [DisplayHeadlineComponent, RuleLinkComponent],
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'start' },
})
export class HeroComponent {
  private readonly content = inject(ContentService);
  readonly headline = this.content.getHomeHeadline();
  readonly lead = this.content.getHomeLead();
  readonly contact = this.content.getContactInfo();
}
