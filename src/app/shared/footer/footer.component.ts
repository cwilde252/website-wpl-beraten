import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly navigation = inject(NavigationService);

  readonly contact = inject(ContentService).getContactInfo();
  readonly serviceLinks = this.navigation.getServiceLinks();
  readonly legalLinks = this.navigation.getLegalLinks();
  readonly hasAddress = !!(this.contact.street && this.contact.postalCode);
}
