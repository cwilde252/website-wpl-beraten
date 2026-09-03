import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DisplayHeadline } from '../../core/models/display-headline.model';

/**
 * Headlines sind Daten, kein Markup: Zeilenumbrüche in einer großen Headline sind
 * Gestaltung und stehen deshalb im ContentService.
 */
@Component({
  selector: 'app-display-headline',
  templateUrl: './display-headline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayHeadlineComponent {
  readonly content = input.required<DisplayHeadline>();
  readonly level = input<1 | 2>(1);
  readonly size = input<'display' | 'display-sub' | 'headline'>('display');
}
