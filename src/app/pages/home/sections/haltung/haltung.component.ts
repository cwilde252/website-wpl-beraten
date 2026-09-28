import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';

/** Haltung: ein echter Satz von Wiebke Lefevre, darunter die vier Grundsätze. */
@Component({
  selector: 'app-haltung',
  templateUrl: './haltung.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'haltung' },
  styles: `
    .quote {
      margin: 0;
      max-width: 62rem;
    }
    @media (min-width: 1024px) {
      .quote {
        margin-inline-start: calc(100% / 12);
      }
    }
    .quote blockquote {
      margin: 0;
    }
    /* Das tiefe deutsche Anführungszeichen sitzt auf der Grundlinie: Der Kasten
       wird nach oben gezogen, damit das Zeichen über dem Zitat steht, nicht darin. */
    .quote-mark {
      display: block;
      height: 0.95em;
      margin-block: -0.55em 0.1em;
      font-family: var(--font-display);
      font-size: clamp(6rem, 10vw, 10rem);
      font-weight: 600;
      line-height: 1;
      color: var(--color-logo-orange);
    }
    .quote-text {
      font-family: var(--font-display);
      font-size: clamp(1.75rem, 2.6vw + 1rem, 3.25rem);
      font-weight: 500;
      line-height: 1.34;
      letter-spacing: -0.012em;
      text-wrap: balance;
    }
    .principles {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 2rem;
    }
    @media (min-width: 768px) {
      .principles {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (min-width: 1280px) {
      .principles {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
    .principles > li {
      padding-block-start: 1.25rem;
      border-block-start: 3px solid var(--color-pine);
    }
  `,
})
export class HaltungComponent {
  private readonly content = inject(ContentService);
  readonly quote = this.content.getQuote();
  readonly name = this.content.getContactInfo().personName;
  readonly positions = this.content.getPositions();
}
