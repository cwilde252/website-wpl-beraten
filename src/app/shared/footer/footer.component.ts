import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { ContentService } from '../../core/services/content.service';
import { NavigationService } from '../../core/services/navigation.service';
import { ActionLinkComponent } from '../action-link/action-link.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, ActionLinkComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly navigation = inject(NavigationService);
  private readonly content = inject(ContentService);
  private readonly router = inject(Router);

  readonly contact = this.content.getContactInfo();
  readonly invitation = this.content.getInvitation();
  readonly serviceLinks = this.navigation.getServiceLinks();
  readonly legalLinks = this.navigation.getLegalLinks();
  readonly hasAddress = !!(this.contact.street && this.contact.postalCode);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** Auf der Kontaktseite wäre die Einladung zum Erstgespräch doppelt. */
  readonly showInvitation = computed(() => !this.url().startsWith('/kontakt'));
}
