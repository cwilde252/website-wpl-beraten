import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SignetComponent } from '../signet/signet.component';

/**
 * Der Platz für Wiebkes Porträt.
 *
 * Solange kein Foto vorliegt (siehe FRAGEN-AN-WIEBKE.md), steht hier keine
 * graue Silhouette und kein „Bild folgt", sondern eine gestaltete Fläche aus
 * Signet und Farbverlauf. Das ist die Regel aus PRODUCT.md — fehlende Inhalte
 * werden ausgeblendet, nicht mit Platzhaltern gefüllt —, ohne dass an der
 * Stelle ein Loch entsteht.
 *
 * Kommt das Foto, wird `portraitSrc` im ContentService gesetzt und es
 * erscheint ohne weitere Änderung im selben Rahmen.
 */
@Component({
  selector: 'app-portrait',
  imports: [NgOptimizedImage, SignetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
      }

      .frame {
        position: relative;
        aspect-ratio: 4 / 5;
        overflow: hidden;
        border-radius: var(--radius-bubble) var(--radius-bubble) var(--radius-bubble) 0.25rem;
      }

      .frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* Die Ersatzfläche zitiert die Farbwäsche des Heros — dieselbe Handschrift,
         nur hell. */
      .placeholder {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
        background:
          radial-gradient(20rem 16rem at 18% 16%, rgba(212, 120, 10, 0.22), transparent 64%),
          radial-gradient(18rem 15rem at 84% 26%, rgba(46, 125, 184, 0.2), transparent 64%),
          radial-gradient(16rem 14rem at 74% 88%, rgba(45, 139, 87, 0.18), transparent 66%),
          var(--color-sand);
      }
    `,
  ],
  template: `
    <div class="frame">
      @if (src()) {
        <img [ngSrc]="src()" [alt]="alt()" [width]="width()" [height]="height()" priority />
      } @else {
        <div class="placeholder" role="presentation">
          <app-signet [size]="88" class="text-ink opacity-70" />
        </div>
      }
    </div>
  `,
})
export class PortraitComponent {
  readonly src = input('');
  readonly alt = input('');
  readonly width = input(720);
  readonly height = input(900);
}
