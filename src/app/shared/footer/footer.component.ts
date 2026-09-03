import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { NavigationService } from '../../core/services/navigation.service';
import { SignetComponent } from '../signet/signet.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, SignetComponent],
  templateUrl: './footer.component.html',
  styles: [
    `
      .footer-heading {
        font-weight: 500;
        margin-block-end: 1rem;
        color: var(--color-cream);
      }

      .footer-link {
        color: var(--color-cream-soft);
        transition: color 200ms var(--ease-soft);
      }
      .footer-link:hover {
        color: var(--color-cream);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly navigation = inject(NavigationService);

  readonly contact = inject(ContentService).getContactInfo();
  readonly serviceLinks = this.navigation.getServiceLinks();
  readonly legalLinks = this.navigation.getLegalLinks();
  readonly hasAddress = !!(this.contact.street && this.contact.postalCode);
}
