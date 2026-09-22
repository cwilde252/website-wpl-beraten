import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type Tone = 'plain' | 'neutral' | 'pruefung' | 'beratung' | 'steuern' | 'check';

/**
 * Das Registerblatt: getönte Fläche mit optionalem Reiter, der oben herausragt.
 * Der Reiter-Inhalt kommt über `[sheetTab]` — so kann er eine echte Überschrift
 * sein statt eines Etiketts über der Überschrift.
 */
@Component({
  selector: 'app-register-sheet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'sheet',
    '[attr.data-tone]': 'tone()',
    '[class.sheet--tabbed]': 'tabbed()',
    '[class.tab-shifted]': 'tabbed() && tabAt() !== "0px"',
    '[class.tab-rise]': 'tabbed()',
    '[style.--tab-at]': 'tabAt()',
  },
  template: `
    @if (tabbed()) {
      <div class="tab"><ng-content select="[sheetTab]" /></div>
    }
    <ng-content />
  `,
})
export class RegisterSheetComponent {
  readonly tone = input<Tone>('neutral');
  readonly tabbed = input(false);
  /** Horizontale Lage des Reiters, z. B. `clamp(0px, 20%, 16rem)`. */
  readonly tabAt = input('0px');
}
