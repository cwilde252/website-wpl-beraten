import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { ActionLinkComponent } from '../../shared/action-link/action-link.component';
import { AuditCheckComponent } from '../../shared/audit-check/audit-check.component';
import { FaqAccordionComponent } from '../../shared/faq-accordion/faq-accordion.component';

/**
 * Alle drei Bereiche stehen offen untereinander — nichts ist hinter Tabs verborgen.
 * Sprungziele (#wirtschaftspruefung, #beratung, #steuern, #pruefungspflicht, #fragen)
 * übernimmt das Anchor-Scrolling des Routers.
 */
@Component({
  selector: 'app-leistungen',
  imports: [RouterLink, AuditCheckComponent, FaqAccordionComponent, ActionLinkComponent],
  templateUrl: './leistungen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .jump {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .jump-link {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      min-height: 3rem;
      padding: 0.5rem 1.1rem;
      border: 1.5px solid var(--quiet-border);
      border-radius: var(--radius-control);
      color: inherit;
      font-weight: 600;
      text-decoration: none;
      transition: background-color var(--dur-quick) var(--ease-out);
    }
    .jump-link:hover {
      background: color-mix(in oklab, var(--surface-ink) 10%, transparent);
    }
    /* Der orange Punkt verschwände auf Orange: ein dünner Ring hält alle vier sichtbar. */
    .jump-link .area-dot {
      outline: 1.5px solid var(--surface-ink);
      outline-offset: 1px;
    }
    /* Die Karte ist schmal: „Wirtschaftsprüfung" muss ungetrennt hineinpassen. */
    .area-title {
      font-family: var(--font-display);
      font-size: clamp(1.75rem, 1.1vw + 1.1rem, 2.25rem);
      font-weight: 600;
      line-height: 1.1;
      letter-spacing: -0.015em;
      hyphens: auto;
      overflow-wrap: break-word;
    }
    @media (min-width: 1024px) {
      .area-card {
        position: sticky;
        top: 7rem;
      }
    }
    .block + .block {
      margin-block-start: 2.5rem;
      padding-block-start: 2.5rem;
      border-block-start: 1px solid var(--color-hairline);
    }
    [data-surface='nebel'] .block + .block {
      border-block-start-color: #c9d4cc;
    }
  `,
})
export class LeistungenComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);

  readonly headline = this.content.getLeistungenHeadline();
  readonly lead = this.content.getLeistungenLead();
  readonly areas = this.content.getServiceAreas();
  readonly faq = this.content.getFaq();

  ngOnInit(): void {
    this.seo.setMeta(this.content.getSeoMeta('leistungen'));
  }
}
