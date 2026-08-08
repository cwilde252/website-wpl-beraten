import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { determineAuditRequirement, sizeClassLabel } from '../../core/domain/hgb-size-class';
import {
  CRITERION_LABELS,
  HGB_THRESHOLDS,
  HGB_THRESHOLDS_VALID_FROM,
} from '../../core/domain/hgb-thresholds';
import { parseDeNumber } from '../../core/domain/parse-de-number';
import {
  AuditRequirementResult,
  CriterionResult,
  YearFigures,
} from '../../core/models/hgb-size-class.model';
import { ContentService } from '../../core/services/content.service';

/** Eine Zahleneingabe im deutschen Format, Pflichtfeld. */
function deNumber(control: AbstractControl): ValidationErrors | null {
  const raw = control.value as string;
  if (raw === null || raw === undefined || raw.trim() === '') return null;
  return parseDeNumber(raw) === null ? { deNumber: true } : null;
}

/** Vorjahreszahlen sind optional, aber nur vollständig oder gar nicht. */
function previousYearComplete(group: AbstractControl): ValidationErrors | null {
  const keys = ['previousBalanceSheetTotal', 'previousRevenue', 'previousEmployees'];
  const filled = keys.filter((key) => (group.get(key)?.value ?? '').toString().trim() !== '');
  return filled.length === 0 || filled.length === keys.length
    ? null
    : { previousYearIncomplete: true };
}

interface ThresholdRow {
  sizeClass: string;
  norm: string;
  balanceSheetTotal: number;
  revenue: number;
  employees: number;
}

@Component({
  selector: 'app-audit-check',
  imports: [ReactiveFormsModule],
  templateUrl: './audit-check.component.html',
  styleUrl: './audit-check.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditCheckComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly content = inject(ContentService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly headingId = input('pruefungspflicht-check');

  readonly validFrom = HGB_THRESHOLDS_VALID_FROM;
  readonly disclaimer = this.content.getAuditCheckDisclaimer();
  readonly intro = this.content.getAuditCheckIntro();
  readonly criterionLabels = CRITERION_LABELS;

  readonly thresholdRows: ThresholdRow[] = [
    { sizeClass: 'Kleinstkapitalgesellschaft', norm: '§ 267a Abs. 1 HGB', ...HGB_THRESHOLDS.micro },
    { sizeClass: 'klein', norm: '§ 267 Abs. 1 HGB', ...HGB_THRESHOLDS.small },
    { sizeClass: 'mittelgroß', norm: '§ 267 Abs. 2 HGB', ...HGB_THRESHOLDS.medium },
  ];

  readonly form = this.fb.group(
    {
      currentBalanceSheetTotal: this.fb.control('', [Validators.required, deNumber]),
      currentRevenue: this.fb.control('', [Validators.required, deNumber]),
      currentEmployees: this.fb.control('', [Validators.required, deNumber]),
      previousBalanceSheetTotal: this.fb.control('', [deNumber]),
      previousRevenue: this.fb.control('', [deNumber]),
      previousEmployees: this.fb.control('', [deNumber]),
      newlyFormed: this.fb.control(false),
      capitalMarketOriented: this.fb.control(false),
    },
    { validators: previousYearComplete },
  );

  readonly result = signal<AuditRequirementResult | null>(null);
  readonly submitAttempted = signal(false);

  private readonly resultHeading = viewChild<ElementRef<HTMLElement>>('resultHeading');

  constructor() {
    // Jede Änderung verwirft das Ergebnis — sonst stünde eine Aussage zu Zahlen da,
    // die so nicht mehr im Formular stehen.
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.result() !== null) this.result.set(null);
    });

    effect(() => {
      if (!this.result()) return;
      const heading = this.resultHeading()?.nativeElement;
      if (heading && isPlatformBrowser(this.platformId)) heading.focus();
    });
  }

  submit(): void {
    this.submitAttempted.set(true);
    if (this.form.invalid) {
      this.result.set(null);
      return;
    }

    const value = this.form.getRawValue();
    const currentYear = this.readYear(
      value.currentBalanceSheetTotal,
      value.currentRevenue,
      value.currentEmployees,
    );
    if (!currentYear) return;

    const previousYear = this.readYear(
      value.previousBalanceSheetTotal,
      value.previousRevenue,
      value.previousEmployees,
    );

    this.result.set(
      determineAuditRequirement({
        currentYear,
        previousYear,
        newlyFormed: value.newlyFormed,
        capitalMarketOriented: value.capitalMarketOriented,
      }),
    );
  }

  private readYear(balance: string, revenue: string, employees: string): YearFigures | null {
    const balanceSheetTotal = parseDeNumber(balance);
    const revenueValue = parseDeNumber(revenue);
    const employeeCount = parseDeNumber(employees);
    if (balanceSheetTotal === null || revenueValue === null || employeeCount === null) return null;
    return { balanceSheetTotal, revenue: revenueValue, employees: employeeCount };
  }

  showError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return this.submitAttempted() && !!control && control.invalid;
  }

  /** Die Merkmale, die für das Verdikt maßgeblich waren. */
  decisiveCriteria(result: AuditRequirementResult): CriterionResult[] {
    switch (result.current.sizeClass) {
      case 'kleinst':
        return result.current.microCriteria;
      case 'klein':
        return result.current.smallCriteria;
      default:
        return result.current.mediumCriteria;
    }
  }

  decisiveNorm(result: AuditRequirementResult): string {
    switch (result.current.sizeClass) {
      case 'kleinst':
        return '§ 267a Abs. 1 HGB';
      case 'klein':
        return '§ 267 Abs. 1 HGB';
      default:
        return '§ 267 Abs. 2 HGB';
    }
  }

  verdict(result: AuditRequirementResult): string {
    if (result.auditRequired === null) {
      return 'Mit diesen Angaben ist keine belastbare Aussage möglich.';
    }
    return result.auditRequired
      ? 'Nach diesen Angaben besteht eine gesetzliche Prüfungspflicht.'
      : 'Nach diesen Angaben besteht keine gesetzliche Prüfungspflicht.';
  }

  sizeClassName(result: AuditRequirementResult): string {
    return sizeClassLabel(result.current.sizeClass);
  }

  formatEuro(value: number): string {
    return new Intl.NumberFormat('de-DE').format(value);
  }
}
