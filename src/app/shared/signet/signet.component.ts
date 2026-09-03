import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Die Wortbildmarke: eine Sprechblase mit vier Punkten in den Logofarben.
 *
 * Sie erfüllt drei Aufgaben gleichzeitig. Sie ist der einzige Ort, an dem sich
 * die vier Bereichsfarben treffen dürfen — überall sonst gehört genau eine Farbe
 * zu genau einem Bereich. Sie steht als Marke, solange keine Logodatei vorliegt
 * (siehe FRAGEN-AN-WIEBKE.md). Und sie ist die Herleitung der Formsignatur: die
 * Blase mit der einen scharfen Ecke, die im ganzen System wiederkehrt.
 *
 * Beim Zeigen federn die Punkte nacheinander an — der Tippindikator eines
 * Chatfensters. Das ist die einzige Animation der Seite, die reine Freude ist.
 */
@Component({
  selector: 'app-signet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: inline-flex;
      }

      .dot {
        transform-box: fill-box;
        transform-origin: center;
      }

      @media (prefers-reduced-motion: no-preference) {
        :host(:hover) .dot,
        :host(:focus-visible) .dot {
          animation: signet-bounce 900ms var(--ease-spring) infinite;
        }
        :host(:hover) .dot:nth-of-type(2) {
          animation-delay: 90ms;
        }
        :host(:hover) .dot:nth-of-type(3) {
          animation-delay: 180ms;
        }
        :host(:hover) .dot:nth-of-type(4) {
          animation-delay: 270ms;
        }
      }

      @keyframes signet-bounce {
        0%,
        60%,
        100% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-2.6px);
        }
      }
    `,
  ],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 40 40"
      fill="none"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label() || null"
      [attr.aria-hidden]="label() ? null : 'true'"
      [attr.focusable]="false"
    >
      <!-- Die Blase: drei weiche Ecken, unten links die scharfe. -->
      <path
        d="M11 3.5h18A7.5 7.5 0 0 1 36.5 11v11A7.5 7.5 0 0 1 29 29.5H11.8L3.5 36.5V11A7.5 7.5 0 0 1 11 3.5Z"
        [attr.stroke]="outline()"
        stroke-width="2.5"
        stroke-linejoin="round"
      />
      <circle class="dot" cx="11" cy="16.5" r="2.6" fill="#D4780A" />
      <circle class="dot" cx="17.7" cy="16.5" r="2.6" fill="#2E7DB8" />
      <circle class="dot" cx="24.4" cy="16.5" r="2.6" fill="#2D8B57" />
      <circle class="dot" cx="31.1" cy="16.5" r="2.6" fill="#D4A917" />
    </svg>
  `,
})
export class SignetComponent {
  readonly size = input(40);
  /**
   * Standardmäßig dekorativ. An jeder Stelle, an der das Signet steht, steht
   * der Name schon als Text daneben — ein zweiter, gleichlautender Bildname
   * wäre für Screenreader nur Rauschen. Ein Name gehört nur dorthin, wo das
   * Signet die Information allein trägt.
   */
  readonly label = input('');
  /** Farbe der Blasenkontur — auf dunklem Grund Creme, sonst Tinte. */
  readonly outline = input('currentColor');
}
