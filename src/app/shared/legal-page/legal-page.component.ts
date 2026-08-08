import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LegalSection } from '../../core/models/legal-section.model';
import { SectionWrapperComponent } from '../section-wrapper/section-wrapper.component';

/** Rechtstexte sind datengetrieben — Impressum und Datenschutz teilen dieses Layout. */
@Component({
  selector: 'app-legal-page',
  imports: [SectionWrapperComponent],
  templateUrl: './legal-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalPageComponent {
  readonly heading = input.required<string>();
  readonly sections = input.required<LegalSection[]>();
}
