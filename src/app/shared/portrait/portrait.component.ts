import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Wiebkes Porträt — der menschliche Kern dieser Seite.
 *
 * Das Foto ist hier kein Schmuck, sondern der Hauptträger der Wärme: Die
 * Gestaltung selbst ist absichtlich zurückhaltend, fast farblos. Was übrig
 * bleibt, um „freundlich" zu tragen, sind die Sprache und dieses Bild.
 *
 * **So kommt das Foto hinein.** Datei nach `public/wiebke-lefevre.jpg` legen
 * (Hochformat 4:5, mindestens 900 × 1125 px), dann im `ContentService` unter
 * `getProfile()` setzen:
 *
 * ```ts
 * portraitSrc: '/wiebke-lefevre.jpg',
 * portraitAlt: 'Wiebke Lefevre, Wirtschaftsprüferin in Rottweil',
 * ```
 *
 * Mehr ist nicht nötig — Rahmen, Zuschnitt und Bildunterschrift stehen.
 * Solange nichts vorliegt, zeigt die Komponente eine ruhige Fläche mit einem
 * ehrlichen Hinweis statt einer grauen Silhouette.
 */
@Component({
  selector: 'app-portrait',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
      }

      figure {
        margin: 0;
      }

      .frame {
        position: relative;
        aspect-ratio: 4 / 5;
        overflow: hidden;
        background: var(--color-mist);
        border: 1px solid var(--color-edge);
      }

      .frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* Kein Platzhalterbild und keine Silhouette: eine Fläche, die aussieht,
         als gehöre sie zum Satzspiegel, und ein Satz, der sagt, was fehlt. */
      .pending {
        display: grid;
        align-content: end;
        height: 100%;
        padding: 1.5rem;
      }

      figcaption {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        line-height: 1.5;
        color: var(--color-ink-soft);
        margin-block-start: 0.75rem;
      }
    `,
  ],
  template: `
    <figure>
      <div class="frame">
        @if (src()) {
          <!-- impeccable-disable-next-line broken-image -- steht hinter @if (src()); ohne Quelle rendert die Ersatzfläche -->
          <img [ngSrc]="src()" [alt]="alt()" [width]="width()" [height]="height()" priority />
        } @else {
          <div class="pending">
            <p class="type-norm">{{ pendingNote() }}</p>
          </div>
        }
      </div>
      @if (src() && caption()) {
        <figcaption>{{ caption() }}</figcaption>
      }
    </figure>
  `,
})
export class PortraitComponent {
  readonly src = input('');
  readonly alt = input('');
  readonly caption = input('');
  readonly width = input(900);
  readonly height = input(1125);
  readonly pendingNote = input('Porträt folgt.');
}
