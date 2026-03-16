import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-section-intro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './section-intro.component.html'
})
export class SectionIntroComponent {
  readonly label = input<string>();
  readonly title = input.required<string>();
  readonly body = input<string>();
  readonly centered = input(false);
  readonly labelColor = input('text-primary');

  readonly containerClass = computed(() => {
    const base = 'mb-16';
    return this.centered()
      ? `${base} text-center max-w-3xl mx-auto`
      : `${base} max-w-2xl`;
  });
}
