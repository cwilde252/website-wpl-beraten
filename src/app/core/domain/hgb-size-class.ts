import {
  AuditRequirementInput,
  AuditRequirementResult,
  CriterionKey,
  CriterionResult,
  SizeClass,
  SizeClassResult,
  YearFigures,
} from '../models/hgb-size-class.model';
import { CRITERION_LABELS, HGB_THRESHOLDS } from './hgb-thresholds';

const CRITERIA: readonly CriterionKey[] = ['balanceSheetTotal', 'revenue', 'employees'];

type ThresholdSet = { readonly [K in CriterionKey]: number };

function assertUsable(figures: YearFigures, context: string): void {
  for (const key of CRITERIA) {
    const value = figures[key];
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError(`${context}: ${CRITERION_LABELS[key]} muss eine Zahl ≥ 0 sein.`);
    }
  }
}

/** Gleichheit ist kein Überschreiten — § 267 spricht von „nicht überschreiten". */
function evaluate(figures: YearFigures, thresholds: ThresholdSet): CriterionResult[] {
  return CRITERIA.map((key) => ({
    key,
    label: CRITERION_LABELS[key],
    value: figures[key],
    threshold: thresholds[key],
    exceeded: figures[key] > thresholds[key],
  }));
}

function exceededCount(results: CriterionResult[]): number {
  return results.filter((r) => r.exceeded).length;
}

/**
 * Ordnet einen Abschlussstichtag einer Größenklasse zu.
 *
 * Zwei-von-drei-Kriterium: Eine Gesellschaft gehört zu einer Klasse, wenn sie
 * mindestens zwei der drei Merkmale nicht überschreitet — also höchstens eines
 * überschreitet.
 */
export function classifySizeClass(figures: YearFigures): SizeClassResult {
  assertUsable(figures, 'Ungültige Angaben');

  const microCriteria = evaluate(figures, HGB_THRESHOLDS.micro);
  const smallCriteria = evaluate(figures, HGB_THRESHOLDS.small);
  const mediumCriteria = evaluate(figures, HGB_THRESHOLDS.medium);

  let sizeClass: SizeClass;
  if (exceededCount(microCriteria) <= 1) {
    sizeClass = 'kleinst';
  } else if (exceededCount(smallCriteria) <= 1) {
    sizeClass = 'klein';
  } else if (exceededCount(mediumCriteria) <= 1) {
    sizeClass = 'mittelgross';
  } else {
    sizeClass = 'gross';
  }

  return { sizeClass, microCriteria, smallCriteria, mediumCriteria };
}

const CLASS_LABELS: Record<SizeClass, string> = {
  kleinst: 'Kleinstkapitalgesellschaft',
  klein: 'kleine Kapitalgesellschaft',
  mittelgross: 'mittelgroße Kapitalgesellschaft',
  gross: 'große Kapitalgesellschaft',
};

const CLASS_NORMS: Record<SizeClass, string> = {
  kleinst: '§ 267a Abs. 1 HGB',
  klein: '§ 267 Abs. 1 HGB',
  mittelgross: '§ 267 Abs. 2 HGB',
  gross: '§ 267 Abs. 3 Satz 1 HGB',
};

export function sizeClassLabel(sizeClass: SizeClass): string {
  return CLASS_LABELS[sizeClass];
}

/**
 * Bestimmt die Prüfungspflicht nach § 316 Abs. 1 Satz 1 HGB.
 *
 * Prüfungspflichtig sind Kapitalgesellschaften, die nicht klein im Sinne des
 * § 267 Abs. 1 HGB sind — also mittelgroße und große. Kleinstkapitalgesellschaften
 * sind eine Teilmenge der kleinen und damit nicht prüfungspflichtig.
 *
 * Die Rechtsfolge tritt nach § 267 Abs. 4 Satz 1 HGB erst ein, wenn die Merkmale
 * an den Abschlussstichtagen zweier aufeinanderfolgender Geschäftsjahre über-
 * oder unterschritten werden. Wechselt die Klasse zwischen den beiden Stichtagen,
 * liefert diese Funktion daher kein Ergebnis, sondern `indeterminate`.
 */
export function determineAuditRequirement(input: AuditRequirementInput): AuditRequirementResult {
  const current = classifySizeClass(input.currentYear);
  const previous = input.previousYear ? classifySizeClass(input.previousYear) : null;

  if (input.capitalMarketOriented) {
    return {
      current,
      previous,
      effectiveSizeClass: 'gross',
      auditRequired: true,
      indeterminate: false,
      reasons: [
        'Eine kapitalmarktorientierte Kapitalgesellschaft im Sinne des § 264d HGB gilt ' +
          'stets als große Kapitalgesellschaft (§ 267 Abs. 3 Satz 2 HGB), unabhängig von ' +
          'Bilanzsumme, Umsatzerlösen und Arbeitnehmerzahl.',
        'Der Jahresabschluss ist damit durch einen Abschlussprüfer zu prüfen ' +
          '(§ 316 Abs. 1 Satz 1 HGB).',
      ],
    };
  }

  const currentLabel = CLASS_LABELS[current.sizeClass];
  const currentNorm = CLASS_NORMS[current.sizeClass];

  if (input.newlyFormed) {
    const auditRequired = current.sizeClass === 'mittelgross' || current.sizeClass === 'gross';
    return {
      current,
      previous,
      effectiveSizeClass: current.sizeClass,
      auditRequired,
      indeterminate: false,
      reasons: [
        `Nach den Angaben zum laufenden Geschäftsjahr liegt eine ${currentLabel} vor (${currentNorm}).`,
        'Bei Neugründung oder Umwandlung treten die Rechtsfolgen bereits ein, wenn die ' +
          'Voraussetzungen am ersten Abschlussstichtag danach vorliegen (§ 267 Abs. 4 Satz 2 HGB).',
        auditRequired
          ? 'Der Jahresabschluss ist durch einen Abschlussprüfer zu prüfen (§ 316 Abs. 1 Satz 1 HGB).'
          : 'Kleine Kapitalgesellschaften sind nicht prüfungspflichtig (§ 316 Abs. 1 Satz 1 HGB).',
      ],
    };
  }

  if (!previous) {
    return {
      current,
      previous: null,
      effectiveSizeClass: null,
      auditRequired: null,
      indeterminate: true,
      reasons: [
        `Nach den Angaben zum laufenden Geschäftsjahr liegt eine ${currentLabel} vor (${currentNorm}).`,
        'Für eine belastbare Aussage fehlen die Zahlen des vorangegangenen Geschäftsjahres: ' +
          'Die Rechtsfolgen treten erst ein, wenn die Merkmale an den Abschlussstichtagen ' +
          'zweier aufeinanderfolgender Geschäftsjahre über- oder unterschritten werden ' +
          '(§ 267 Abs. 4 Satz 1 HGB).',
      ],
    };
  }

  if (previous.sizeClass !== current.sizeClass) {
    return {
      current,
      previous,
      effectiveSizeClass: null,
      auditRequired: null,
      indeterminate: true,
      reasons: [
        `Im laufenden Geschäftsjahr liegt eine ${currentLabel} vor, im Vorjahr eine ` +
          `${CLASS_LABELS[previous.sizeClass]}.`,
        'Die Merkmale wurden damit nur an einem der beiden Abschlussstichtage über- ' +
          'beziehungsweise unterschritten. Die Rechtsfolge tritt erst ein, wenn dies an zwei ' +
          'aufeinanderfolgenden Abschlussstichtagen der Fall ist (§ 267 Abs. 4 Satz 1 HGB). ' +
          'Für eine belastbare Einordnung sind zusätzlich die Zahlen des Vorvorjahres nötig.',
      ],
    };
  }

  const auditRequired = current.sizeClass === 'mittelgross' || current.sizeClass === 'gross';

  return {
    current,
    previous,
    effectiveSizeClass: current.sizeClass,
    auditRequired,
    indeterminate: false,
    reasons: [
      `An beiden Abschlussstichtagen liegt eine ${currentLabel} vor (${currentNorm}); ` +
        'die Rechtsfolge tritt damit ein (§ 267 Abs. 4 Satz 1 HGB).',
      auditRequired
        ? 'Jahresabschluss und Lagebericht sind durch einen Abschlussprüfer zu prüfen ' +
          '(§ 316 Abs. 1 Satz 1 HGB).'
        : 'Kapitalgesellschaften, die klein im Sinne des § 267 Abs. 1 HGB sind, unterliegen ' +
          'keiner gesetzlichen Prüfungspflicht (§ 316 Abs. 1 Satz 1 HGB).',
    ],
  };
}
