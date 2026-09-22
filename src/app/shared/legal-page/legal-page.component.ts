import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LegalSection } from '../../core/models/legal-section.model';

/** Rechtstexte sind datengetrieben — Impressum und Datenschutz teilen dieses Layout. */
@Component({
  selector: 'app-legal-page',
  templateUrl: './legal-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .legal-section {
      padding-block: 1.75rem;
      border-block-start: 1px solid var(--color-hairline);
    }
    .legal-list {
      margin: 0;
      padding-inline-start: 1.25rem;
      list-style: disc;
    }
    .legal-list > li::marker {
      color: var(--color-ink-soft);
    }
  `,
})
export class LegalPageComponent {
  readonly heading = input.required<string>();
  readonly sections = input.required<LegalSection[]>();
}
