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
        border-radius: var(--radius-bubble) var(--radius-bubble) var(--radius-bubble)
          var(--radius-corner);
      }

      .frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* Die Ersatzfläche war zuerst ein weicher Farbnebel aus drei
         Radialverläufen — genau die Reflexdekoration, die eine Fläche
         beschäftigt aussehen lässt, ohne etwas zu sagen. Jetzt trägt sie eine
         ruhige Fläche und die vier Bereichsfarben als klare Bänder: dieselben
         vier Punkte wie im Signet, nur ausgezogen. */
      .placeholder {
        position: relative;
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
        background: var(--color-stone);
      }

      .bands {
        position: absolute;
        inset-inline: 0;
        inset-block-end: 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        height: 0.5rem;
      }
    `,
  ],
  template: `
    <div class="frame">
      @if (src()) {
        <!-- impeccable-disable-next-line broken-image -- steht hinter @if (src()); ohne Quelle rendert stattdessen die Ersatzfläche -->
        <img [ngSrc]="src()" [alt]="alt()" [width]="width()" [height]="height()" priority />
      } @else {
        <div class="placeholder" role="presentation">
          <app-signet [size]="88" class="text-ink" />
          <span class="bands" aria-hidden="true">
            <span style="background: #d4780a"></span>
            <span style="background: #2e7db8"></span>
            <span style="background: #2d8b57"></span>
            <span style="background: #d4a917"></span>
          </span>
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
