/**
 * Gesetzliche Fristen rund um den Jahresabschluss einer Kapitalgesellschaft.
 *
 * Nur unmittelbar aus dem Gesetz ableitbare Termine. Wie lange eine Prüfung
 * dauert oder wann man eine Prüferin ansprechen sollte, steht hier bewusst
 * nicht — das wären erfundene Zahlen (siehe PRODUCT.md, Voice-Regel 4).
 *
 * QUELLEN, GEGEN DEN PRIMÄRTEXT GEPRÜFT AM 03.09.2026:
 *   § 264 Abs. 1 Satz 3 HGB  — Aufstellung in den ersten drei Monaten des
 *                              Geschäftsjahrs für das vergangene Geschäftsjahr
 *   § 264 Abs. 1 Satz 4 HGB  — kleine Kapitalgesellschaften dürfen später
 *                              aufstellen, wenn das einem ordnungsgemäßen
 *                              Geschäftsgang entspricht, jedoch innerhalb der
 *                              ersten sechs Monate
 *   § 42a Abs. 2 Satz 1 GmbHG — Feststellungsbeschluss bis zum Ablauf der
 *                              ersten acht, bei kleinen elf Monate
 *   § 325 Abs. 1a Satz 1 HGB — Offenlegung spätestens ein Jahr nach dem
 *                              Abschlussstichtag
 *   § 316 Abs. 1 Satz 2 HGB  — ohne Prüfung keine Feststellung
 *     https://www.gesetze-im-internet.de/hgb/__264.html
 *     https://www.gesetze-im-internet.de/hgb/__316.html
 *     https://www.gesetze-im-internet.de/hgb/__325.html
 *     https://www.gesetze-im-internet.de/gmbhg/__42a.html
 */

/** Ob die Gesellschaft klein im Sinne des § 267 Abs. 1 HGB ist. */
export type Groessenlage = 'klein' | 'nicht-klein';

export type FristKind = 'stichtag' | 'aufstellung' | 'feststellung' | 'offenlegung';

export interface Frist {
  readonly kind: FristKind;
  readonly title: string;
  /** Der konkrete Termin. */
  readonly date: Date;
  /** Abstand zum Abschlussstichtag in Monaten — trägt die Aussage auch ohne Datum. */
  readonly monthsAfter: number;
  readonly norm: string;
  readonly explanation: string;
  /** Nur bei der GmbH einschlägig; im Template als Einschränkung ausgewiesen. */
  readonly gmbhOnly: boolean;
}

export interface FristenPlan {
  readonly stichtag: Date;
  readonly groessenlage: Groessenlage;
  readonly pruefungspflichtig: boolean;
  readonly fristen: readonly Frist[];
  /**
   * Wo die Prüfung im Ablauf liegt. Kein Termin, sondern die Rechtsfolge des
   * § 316 Abs. 1 Satz 2 HGB — sie ist der eigentliche Grund für den Zeitstrahl.
   */
  readonly pruefungsfenster: { readonly von: Date; readonly bis: Date } | null;
}

/** Der letzte Tag des Monats, der `months` Monate nach dem Stichtagsmonat liegt. */
function endOfMonthAfter(stichtag: Date, months: number): Date {
  // Tag 0 des Folgemonats ist der letzte Tag des Zielmonats.
  return new Date(Date.UTC(stichtag.getUTCFullYear(), stichtag.getUTCMonth() + months + 1, 0));
}

/** Derselbe Kalendertag ein Jahr später — § 325 spricht von „ein Jahr nach". */
function oneYearAfter(stichtag: Date): Date {
  return new Date(
    Date.UTC(stichtag.getUTCFullYear() + 1, stichtag.getUTCMonth(), stichtag.getUTCDate()),
  );
}

/**
 * Baut den Fristenplan zu einem Abschlussstichtag.
 *
 * Die Größenlage steuert zwei Fristen: Aufstellung (drei statt sechs Monate)
 * und Feststellung (acht statt elf Monate). Prüfungspflichtig sind nach
 * § 316 Abs. 1 Satz 1 HGB die Gesellschaften, die nicht klein sind.
 */
export function berechneFristen(stichtag: Date, groessenlage: Groessenlage): FristenPlan {
  if (Number.isNaN(stichtag.getTime())) {
    throw new RangeError('Der Abschlussstichtag ist kein gültiges Datum.');
  }

  const klein = groessenlage === 'klein';

  const aufstellungMonate = klein ? 6 : 3;
  const feststellungMonate = klein ? 11 : 8;

  const aufstellung = endOfMonthAfter(stichtag, aufstellungMonate);
  const feststellung = endOfMonthAfter(stichtag, feststellungMonate);
  const offenlegung = oneYearAfter(stichtag);

  const fristen: Frist[] = [
    {
      kind: 'stichtag',
      title: 'Abschlussstichtag',
      date: stichtag,
      monthsAfter: 0,
      norm: '§ 242 HGB',
      explanation: 'Das Geschäftsjahr endet. Ab hier laufen alle weiteren Fristen.',
      gmbhOnly: false,
    },
    {
      kind: 'aufstellung',
      title: 'Jahresabschluss aufgestellt',
      date: aufstellung,
      monthsAfter: aufstellungMonate,
      norm: klein ? '§ 264 Abs. 1 Satz 4 HGB' : '§ 264 Abs. 1 Satz 3 HGB',
      explanation: klein
        ? 'Kleine Kapitalgesellschaften dürfen den Jahresabschluss später aufstellen, wenn das einem ordnungsgemäßen Geschäftsgang entspricht — jedoch innerhalb der ersten sechs Monate des Geschäftsjahrs.'
        : 'Jahresabschluss und Lagebericht sind in den ersten drei Monaten des Geschäftsjahrs für das vergangene Geschäftsjahr aufzustellen.',
      gmbhOnly: false,
    },
    {
      kind: 'feststellung',
      title: 'Jahresabschluss festgestellt',
      date: feststellung,
      monthsAfter: feststellungMonate,
      norm: '§ 42a Abs. 2 Satz 1 GmbHG',
      explanation: klein
        ? 'Bei der GmbH beschließen die Gesellschafter bis zum Ablauf der ersten elf Monate des Geschäftsjahrs über Feststellung und Ergebnisverwendung. Der Gesellschaftsvertrag kann diese Frist nicht verlängern.'
        : 'Bei der GmbH beschließen die Gesellschafter bis zum Ablauf der ersten acht Monate des Geschäftsjahrs über Feststellung und Ergebnisverwendung. Der Gesellschaftsvertrag kann diese Frist nicht verlängern.',
      gmbhOnly: true,
    },
    {
      kind: 'offenlegung',
      title: 'Offenlegung',
      date: offenlegung,
      monthsAfter: 12,
      norm: '§ 325 Abs. 1a Satz 1 HGB',
      explanation:
        'Die Rechnungslegungsunterlagen sind spätestens ein Jahr nach dem Abschlussstichtag zu übermitteln.',
      gmbhOnly: false,
    },
  ];

  return {
    stichtag,
    groessenlage,
    pruefungspflichtig: !klein,
    fristen,
    // Ohne Prüfung kann der Jahresabschluss nicht festgestellt werden
    // (§ 316 Abs. 1 Satz 2 HGB) — die Prüfung liegt damit zwingend zwischen
    // Aufstellung und Feststellungsbeschluss.
    pruefungsfenster: klein ? null : { von: aufstellung, bis: feststellung },
  };
}

/** Ein Datum als `31.03.2027`. Ohne `toLocaleDateString`, damit SSR und Browser gleich rendern. */
export function formatDeDate(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${pad(date.getUTCDate())}.${pad(date.getUTCMonth() + 1)}.${date.getUTCFullYear()}`;
}
