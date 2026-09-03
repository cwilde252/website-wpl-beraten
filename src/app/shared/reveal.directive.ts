import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  Directive,
  DestroyRef,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
} from '@angular/core';

/** Spätestens danach wird eingeblendet, egal was der Observer meldet. */
const SAFETY_TIMEOUT_MS = 3000;

/**
 * Lässt ein Element beim Hineinscrollen leicht aufsteigen.
 *
 * Drei Eigenschaften, ohne die diese Seite ihre eigenen Regeln bräche:
 *
 * 1. **Kein Aufblitzen.** Die Seite wird statisch vorgerendert, der Inhalt ist
 *    also schon gemalt, wenn dieses Skript läuft. Würde die Direktive pauschal
 *    `opacity: 0` setzen, verschwände sichtbarer Inhalt und käme wieder. Sie
 *    versteckt deshalb nur, was beim Start unterhalb des Viewports liegt.
 * 2. **Ohne JavaScript wirkungslos.** Der versteckte Ausgangszustand steht
 *    nicht im ausgelieferten HTML, sondern wird erst hier gesetzt.
 * 3. **Nie dauerhaft unsichtbar.** Ein Scroll-Reveal, der Inhalt versteckt und
 *    auf ein Ereignis wartet, ist eine Wette darauf, dass dieses Ereignis
 *    eintritt. Tut es das nicht — weil das Element nie in den Viewport kommt,
 *    weil der Observer in einem Hintergrund-Tab nicht feuert, weil die Seite
 *    gedruckt oder als Ganzes abfotografiert wird — bleibt Text für immer weg.
 *    Deshalb blendet ein Timeout nach {@link SAFETY_TIMEOUT_MS} in jedem Fall
 *    ein, und der Druck-Stylesheet hebt den Zustand ohnehin auf.
 *
 * `prefers-reduced-motion` neutralisiert zusätzlich global in `styles.css`.
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  /** Verzögerung in Millisekunden, für die Staffelung innerhalb einer Gruppe. */
  readonly appReveal = input<number | ''>('');

  constructor() {
    afterNextRender(() => {
      const view = this.doc.defaultView;
      if (!isPlatformBrowser(this.platformId) || !view || !('IntersectionObserver' in view)) return;
      if (view.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const element = this.host.nativeElement as HTMLElement;

      // Alles, was beim Laden schon zu sehen ist, bleibt unangetastet.
      if (element.getBoundingClientRect().top < view.innerHeight) return;

      const delay = this.appReveal();
      if (typeof delay === 'number' && delay > 0) {
        element.style.setProperty('--reveal-delay', `${delay}ms`);
      }
      element.classList.add('reveal-armed');

      let settled = false;

      /**
       * Nach der Einblendung werden beide Klassen wieder entfernt. Sonst bliebe
       * das Element dauerhaft ein `transform`-Element und damit in einer eigenen
       * Compositing-Ebene — das kostet Speicher, und manche Browser malen solche
       * Ebenen beim Größenwechsel oder beim Drucken nicht neu.
       */
      const cleanUp = () => {
        element.classList.remove('reveal-armed', 'reveal-in');
        element.style.removeProperty('--reveal-delay');
      };

      const reveal = () => {
        if (settled) return;
        settled = true;
        element.classList.add('reveal-in');
        observer.disconnect();
        view.clearTimeout(safety);

        element.addEventListener('transitionend', cleanUp, { once: true });
        // Falls kein transitionend kommt (Element ausgeblendet, Transition
        // unterbrochen), räumt dieser Timer nach der Dauer plus Verzögerung auf.
        const total = 560 + (typeof delay === 'number' ? delay : 0) + 120;
        view.setTimeout(cleanUp, total);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) reveal();
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0 },
      );

      const safety = view.setTimeout(reveal, SAFETY_TIMEOUT_MS);

      observer.observe(element);
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        view.clearTimeout(safety);
      });
    });
  }
}
