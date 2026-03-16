import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../core/services/content.service';
import { ContactFormField, ContactInfo } from '../../core/models/content.model';

@Component({
  selector: 'app-kontakt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './kontakt.component.html'
})
export class KontaktComponent {
  private readonly contentService = inject(ContentService);
  protected readonly contact: ContactInfo = this.contentService.getContactInfo();
  protected readonly fields: ContactFormField[] = this.contentService.getContactFormFields();
  protected formData: Record<string, string> = this.fields.reduce(
    (acc, f) => ({ ...acc, [f.name]: '' }),
    {} as Record<string, string>
  );
  protected readonly submitted = signal(false);

  protected onSubmit(): void {
    console.log('Form submitted:', this.formData);
    this.submitted.set(true);
  }
}
