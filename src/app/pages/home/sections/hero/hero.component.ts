import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogOption } from '../../../../core/models/dialog-option.model';
import { ContentService } from '../../../../core/services/content.service';
import { CtaLinkComponent } from '../../../../shared/cta-link/cta-link.component';
import { DisplayHeadlineComponent } from '../../../../shared/display-headline/display-headline.component';
import { PortraitComponent } from '../../../../shared/portrait/portrait.component';

/**
 * Der Einstieg: eine Person, ein Satz, ein Bild.
 *
 * Die Vorfassung öffnete mit einer dunklen Bühne, farbigem Leuchten und drei
 * aufklappbaren Chat-Blasen. Das war der Auftritt einer Anwendung. Jetzt steht
 * hier, was auf der ersten Seite eines Dokuments steht: wer schreibt, worum es
 * geht, und ein Gesicht dazu.
 *
 * Die drei Wege in die Seite sind geblieben — als schlichte Liste mit
 * aufklappbaren Antworten, nicht als Gespräch mit Sprechblasen. Der Zustand
 * liegt weiterhin beim Browser: gleichnamige `<details>` öffnen exklusiv,
 * liefern `aria-expanded` selbst und funktionieren im vorgerenderten HTML.
 */
@Component({
  selector: 'app-hero',
  imports: [DisplayHeadlineComponent, CtaLinkComponent, PortraitComponent],
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
  readonly profile = this.content.getProfile();

  areaClass(option: DialogOption): string {
    return `area-${option.accent}`;
  }
}
