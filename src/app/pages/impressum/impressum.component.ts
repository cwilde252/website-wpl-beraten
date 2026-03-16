import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { ContactInfo } from '../../core/models/content.model';

@Component({
  selector: 'app-impressum',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './impressum.component.html'
})
export class ImpressumComponent {
  protected readonly contact: ContactInfo = inject(ContentService).getContactInfo();
}
