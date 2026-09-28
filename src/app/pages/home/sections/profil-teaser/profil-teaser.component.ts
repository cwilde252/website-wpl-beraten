import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { ActionLinkComponent } from '../../../../shared/action-link/action-link.component';

@Component({
  selector: 'app-profil-teaser',
  imports: [ActionLinkComponent],
  templateUrl: './profil-teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'profil' },
})
export class ProfilTeaserComponent {
  private readonly content = inject(ContentService);
  readonly headline = this.content.getProfilTeaserHeadline();
  readonly profile = this.content.getProfile();
  /** Die prägenden Stationen ohne die Vorbereitungszeit — derselbe Datensatz wie auf „Über mich“. */
  readonly stations = this.profile.career.filter((entry) => entry.period !== '2024 – 2025');
}
