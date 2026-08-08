/** Größenklassen nach §§ 267, 267a HGB. */
export type SizeClass = 'kleinst' | 'klein' | 'mittelgross' | 'gross';

/** Die drei Merkmale des § 267 Abs. 1 HGB. */
export type CriterionKey = 'balanceSheetTotal' | 'revenue' | 'employees';

export interface YearFigures {
  /** Bilanzsumme in Euro — Posten A bis E des § 266 Abs. 2 HGB (§ 267 Abs. 4a HGB). */
  balanceSheetTotal: number;
  /** Umsatzerlöse der zwölf Monate vor dem Abschlussstichtag, in Euro. */
  revenue: number;
  /** Arbeitnehmer im Jahresdurchschnitt (§ 267 Abs. 5 HGB). */
  employees: number;
}

export interface CriterionResult {
  key: CriterionKey;
  label: string;
  value: number;
  threshold: number;
  /** Strikt größer als die Schwelle. Gleichheit ist KEIN Überschreiten. */
  exceeded: boolean;
}

export interface SizeClassResult {
  sizeClass: SizeClass;
  /** Prüfung gegen § 267a Abs. 1 HGB. */
  microCriteria: CriterionResult[];
  /** Prüfung gegen § 267 Abs. 1 HGB. */
  smallCriteria: CriterionResult[];
  /** Prüfung gegen § 267 Abs. 2 HGB. */
  mediumCriteria: CriterionResult[];
}

export interface AuditRequirementInput {
  currentYear: YearFigures;
  /** null, wenn keine Vorjahreszahlen vorliegen. */
  previousYear: YearFigures | null;
  /** Neugründung oder Umwandlung — § 267 Abs. 4 Satz 2 HGB, Zwei-Jahres-Regel entfällt. */
  newlyFormed: boolean;
  /** § 264d HGB — kapitalmarktorientiert gilt stets als groß (§ 267 Abs. 3 Satz 2 HGB). */
  capitalMarketOriented: boolean;
}

export interface AuditRequirementResult {
  current: SizeClassResult;
  previous: SizeClassResult | null;
  /** Größenklasse mit Rechtsfolge nach § 267 Abs. 4 HGB. null, wenn unbestimmbar. */
  effectiveSizeClass: SizeClass | null;
  /** null bedeutet: mit diesen Angaben ist keine belastbare Aussage möglich. */
  auditRequired: boolean | null;
  indeterminate: boolean;
  /** Fertige Begründungssätze in Ausgabereihenfolge, jeweils mit Normzitat. */
  reasons: string[];
}
