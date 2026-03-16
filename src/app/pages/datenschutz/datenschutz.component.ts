import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { ContactInfo } from '../../core/models/content.model';

@Component({
  selector: 'app-datenschutz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datenschutz.component.html'
})
export class DatenschutzComponent {
  protected readonly contact: ContactInfo = inject(ContentService).getContactInfo();
}
