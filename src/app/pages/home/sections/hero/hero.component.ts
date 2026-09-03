import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogOption } from '../../../../core/models/dialog-option.model';
import { ContentService } from '../../../../core/services/content.service';
import { CtaLinkComponent } from '../../../../shared/cta-link/cta-link.component';
import { DisplayHeadlineComponent } from '../../../../shared/display-headline/display-headline.component';
import { SignetComponent } from '../../../../shared/signet/signet.component';

/**
 * Der Einstieg als Gespräch statt als Plakat.
 *
 * Statt einer Behauptung und eines Buttons steht hier eine Frage mit drei
 * Antworten, die in der Stimme der Besucherin oder des Besuchers formuliert
 * sind. Wer eine wählt, bekommt Wiebkes Antwort und genau einen nächsten
 * Schritt — statt einer Navigationsleiste, unter der er raten muss.
 *
 * Der Zustand liegt bewusst nicht in einem Signal, sondern beim Browser:
 * gleichnamige `<details>` öffnen exklusiv, liefern `aria-expanded` selbst und
 * funktionieren im vorgerenderten HTML, bevor Angular geladen hat. Eine
 * Signal-Nachbildung wäre hier mehr Code mit weniger Barrierefreiheit.
 */
@Component({
  selector: 'app-hero',
  imports: [DisplayHeadlineComponent, CtaLinkComponent, SignetComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'start' },
})
export class HeroComponent {
  private readonly content = inject(ContentService);

  readonly headline = this.content.getHomeHeadline();
  readonly lead = this.content.getHomeLead();
  readonly prompt = this.content.getDialogPrompt();
  readonly options = this.content.getDialogOptions();

  areaClass(option: DialogOption): string {
    return `area-${option.accent}`;
  }
}
