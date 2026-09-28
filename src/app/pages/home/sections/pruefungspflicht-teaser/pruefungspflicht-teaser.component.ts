import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HGB_THRESHOLDS } from '../../../../core/domain/hgb-thresholds';
import { ContentService } from '../../../../core/services/content.service';
import { QUICK_CHECK_KEYS } from '../../../../shared/audit-check/audit-check.component';
import { IconComponent } from '../../../../shared/icon/icon.component';

@Component({
  selector: 'app-pruefungspflicht-teaser',
  imports: [IconComponent],
  templateUrl: './pruefungspflicht-teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'pruefungspflicht' },
  styles: `
    .thresholds {
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem 3rem;
    }
    .thresholds dt {
      font-size: 1rem;
    }
    .thresholds dd {
      margin: 0.2rem 0 0;
      font-family: var(--font-display);
      font-size: clamp(1.75rem, 1.5vw + 1rem, 2.5rem);
      font-weight: 600;
      line-height: 1.1;
    }
  `,
})
export class PruefungspflichtTeaserComponent {
  private readonly router = inject(Router);
  readonly teaser = inject(ContentService).getAuditCheckTeaser();
  readonly small = HGB_THRESHOLDS.small;

  /** 7.500.000 → „7,5 Mio. €“ — die Kurzform für den Überblick; der Check zeigt die vollen Beträge. */
  million(value: number): string {
    return `${new Intl.NumberFormat('de-DE').format(value / 1_000_000)} Mio. €`;
  }

  /** Mit JavaScript bleibt der Wechsel im Router, statt die Seite neu zu laden. */
  openCheck(event: SubmitEvent): void {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const queryParams: Record<string, string> = {};
    for (const key of Object.keys(QUICK_CHECK_KEYS)) {
      const value = (data.get(key) ?? '').toString().trim();
      if (value) queryParams[key] = value;
    }
    void this.router.navigate(['/leistungen'], { queryParams, fragment: 'pruefungspflicht' });
  }
}
