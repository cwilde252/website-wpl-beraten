import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface DefinitionItem {
  term: string;
  description?: string;
  /** Optionale Referenz über dem Begriff, etwa eine Jahreszahl. */
  reference?: string;
}

/** Rendert ein echtes <dl>: Begriff und Erklärung, ohne Karten. */
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
