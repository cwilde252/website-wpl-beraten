import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { ActionLinkComponent } from '../../../../shared/action-link/action-link.component';
import { RegisterSheetComponent } from '../../../../shared/register-sheet/register-sheet.component';

@Component({
  selector: 'app-profil-teaser',
  imports: [ActionLinkComponent, RegisterSheetComponent, NgOptimizedImage],
  templateUrl: './profil-teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'profil' },
  styles: `
    .stations {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .stations > li + li {
      margin-block-start: 1rem;
      padding-block-start: 1rem;
      border-block-start: 1px solid var(--color-hairline);
    }
  `,
})
export class ProfilTeaserComponent {
  readonly profile = inject(ContentService).getProfile();
  /** Drei prägende Stationen — derselbe Datensatz wie auf der Über-mich-Seite. */
  readonly stations = this.profile.career.filter((_, index) => [0, 2, 3].includes(index));
}
