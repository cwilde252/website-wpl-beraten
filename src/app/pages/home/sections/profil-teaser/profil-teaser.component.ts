import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { ActionLinkComponent } from '../../../../shared/action-link/action-link.component';

@Component({
  selector: 'app-profil-teaser',
  imports: [ActionLinkComponent, NgOptimizedImage],
  templateUrl: './profil-teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'profil' },
})
export class ProfilTeaserComponent {
  readonly profile = inject(ContentService).getProfile();
}
