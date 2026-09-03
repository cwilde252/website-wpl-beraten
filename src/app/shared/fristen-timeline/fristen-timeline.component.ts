import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  berechneFristen,
  formatDeDate,
  Frist,
  Groessenlage,
} from '../../core/domain/abschluss-fristen';
import { ContentService } from '../../core/services/content.service';
import { NOW } from '../../core/tokens/now.token';

interface StichtagOption {
  readonly id: string;
  readonly label: string;
  /** Monat 1–12 und Tag des Abschlussstichtags. */
  readonly month: number;
  readonly day: number;
}

/**
 * Der Fristen-Zeitstrahl: zweites Werkzeug der Leistungsseite.
 *
 * Er beantwortet die Frage, die nach dem Prüfungspflicht-Check kommt — „und
 * bis wann?" — und macht dabei nebenbei das Argument der Seite: Weil der
 * Jahresabschluss ohne Prüfung nicht festgestellt werden kann (§ 316 Abs. 1
 * Satz 2 HGB), muss die Prüfung zwischen Aufstellung und Feststellungsbeschluss
 * liegen. Das ist ein knappes Fenster, und es steht im Gesetz — niemand muss
 * es behaupten.
 *
 * Alle Termine folgen unmittelbar aus dem Gesetz. Prüfungsdauern oder
 * Empfehlungen, wann man anrufen sollte, stehen bewusst nicht hier: die wären
 * erfunden (PRODUCT.md, Voice-Regel 4).
 */
@Component({
  selector: 'app-fristen-timeline',
  templateUrl: './fristen-timeline.component.html',
  styleUrl: './fristen-timeline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FristenTimelineComponent {
  private readonly content = inject(ContentService);
  private readonly now = inject(NOW);

  readonly intro = this.content.getFristenIntro();
  readonly disclaimer = this.content.getFristenDisclaimer();

  readonly stichtagOptions: StichtagOption[] = [
    { id: 'dez', label: '31. Dezember', month: 12, day: 31 },
    { id: 'jun', label: '30. Juni', month: 6, day: 30 },
    { id: 'sep', label: '30. September', month: 9, day: 30 },
    { id: 'mar', label: '31. März', month: 3, day: 31 },
  ];

  /** Fünf Jahre um das laufende herum — mehr braucht niemand. */
  readonly years = Array.from({ length: 5 }, (_, index) => this.now.getUTCFullYear() - 1 + index);

  readonly selectedOptionId = signal(this.stichtagOptions[0].id);
  readonly selectedYear = signal(this.now.getUTCFullYear() - 1);
  readonly groessenlage = signal<Groessenlage>('nicht-klein');

  private readonly selectedOption = computed(
    () =>
      this.stichtagOptions.find((option) => option.id === this.selectedOptionId()) ??
      this.stichtagOptions[0],
  );

  readonly stichtag = computed(() => {
    const option = this.selectedOption();
    return new Date(Date.UTC(this.selectedYear(), option.month - 1, option.day));
  });

  readonly plan = computed(() => berechneFristen(this.stichtag(), this.groessenlage()));

  onStichtagChange(event: Event): void {
    this.selectedOptionId.set((event.target as HTMLSelectElement).value);
  }

  onYearChange(event: Event): void {
    this.selectedYear.set(Number((event.target as HTMLSelectElement).value));
  }

  setGroessenlage(value: Groessenlage): void {
    this.groessenlage.set(value);
  }

  formatDate(date: Date): string {
    return formatDeDate(date);
  }

  /** „nach 3 Monaten" — trägt die Aussage auch, wenn das Datum ignoriert wird. */
  offsetLabel(frist: Frist): string {
    if (frist.monthsAfter === 0) return 'Stichtag';
    return `+ ${frist.monthsAfter} Monate`;
  }
}
