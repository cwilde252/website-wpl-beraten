import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface DefinitionItem {
  term: string;
  description?: string;
  /** Mono-Referenz links, etwa eine Nummer oder Jahreszahl. */
  reference?: string;
}

/** Zeilenraster statt Karten: rendert ein echtes <dl> auf 1-px-Regeln. */
@Component({
  selector: 'app-definition-list',
  templateUrl: './definition-list.component.html',
  styleUrl: './definition-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefinitionListComponent {
  readonly items = input.required<DefinitionItem[]>();
  readonly columns = input<1 | 2>(1);
  readonly ariaLabel = input('');
}
