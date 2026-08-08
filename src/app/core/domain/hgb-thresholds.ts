import { CriterionKey } from '../models/hgb-size-class.model';

/**
 * Schwellenwerte der §§ 267, 267a HGB in der Fassung ab dem 17.04.2024.
 *
 * Verpflichtend anzuwenden auf Geschäftsjahre, die nach dem 31.12.2023 beginnen;
 * wahlweise bereits auf Geschäftsjahre, die nach dem 31.12.2022 beginnen.
 *
 * QUELLEN VOR JEDER ÄNDERUNG GEGEN DEN PRIMÄRTEXT PRÜFEN:
 *   https://www.gesetze-im-internet.de/hgb/__267.html
 *   https://www.gesetze-im-internet.de/hgb/__267a.html
 *   https://www.gesetze-im-internet.de/hgb/__316.html
 *
 * Zuletzt gegen den Primärtext geprüft am: — (bitte beim nächsten Durchgang eintragen;
 * die Werte wurden bislang nur gegen übereinstimmende Sekundärquellen verifiziert:
 * IHK München, Haufe, DRSC, Deloitte Legal.)
 */
export const HGB_THRESHOLDS = {
  /** § 267a Abs. 1 HGB */
  micro: { balanceSheetTotal: 450_000, revenue: 900_000, employees: 10 },
  /** § 267 Abs. 1 HGB */
  small: { balanceSheetTotal: 7_500_000, revenue: 15_000_000, employees: 50 },
  /** § 267 Abs. 2 HGB */
  medium: { balanceSheetTotal: 25_000_000, revenue: 50_000_000, employees: 250 },
} as const;

export const HGB_THRESHOLDS_VALID_FROM = 'Geschäftsjahre, die nach dem 31. Dezember 2023 beginnen';

export const CRITERION_LABELS: Record<CriterionKey, string> = {
  balanceSheetTotal: 'Bilanzsumme',
  revenue: 'Umsatzerlöse',
  employees: 'Arbeitnehmer im Jahresdurchschnitt',
};
