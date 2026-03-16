import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  private readonly navService = inject(NavigationService);
  private readonly contentService = inject(ContentService);

  readonly links = this.navService.getFooterLinks();
  readonly contact = this.contentService.getContactInfo();
  readonly currentYear = new Date().getFullYear();
}
