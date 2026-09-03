import { describe, expect, it } from 'vitest';
import { berechneFristen, formatDeDate, Frist } from './abschluss-fristen';

/** Der Stichtag 31.12. eines Jahres, als UTC-Datum. */
function silvester(year: number): Date {
  return new Date(Date.UTC(year, 11, 31));
}

function frist(plan: ReturnType<typeof berechneFristen>, kind: Frist['kind']): Frist {
  const found = plan.fristen.find((entry) => entry.kind === kind);
  if (!found) throw new Error(`Frist ${kind} fehlt im Plan`);
  return found;
}

describe('berechneFristen', () => {
  describe('nicht kleine Kapitalgesellschaft, Stichtag 31.12.2026', () => {
    const plan = berechneFristen(silvester(2026), 'nicht-klein');

    it('stellt in den ersten drei Monaten auf (§ 264 Abs. 1 Satz 3 HGB)', () => {
      expect(formatDeDate(frist(plan, 'aufstellung').date)).toBe('31.03.2027');
      expect(frist(plan, 'aufstellung').norm).toBe('§ 264 Abs. 1 Satz 3 HGB');
    });

    it('stellt bis zum Ablauf der ersten acht Monate fest (§ 42a Abs. 2 Satz 1 GmbHG)', () => {
      expect(formatDeDate(frist(plan, 'feststellung').date)).toBe('31.08.2027');
    });

    it('legt ein Jahr nach dem Stichtag offen (§ 325 Abs. 1a Satz 1 HGB)', () => {
      expect(formatDeDate(frist(plan, 'offenlegung').date)).toBe('31.12.2027');
    });

    it('ist prüfungspflichtig und hat ein Prüfungsfenster zwischen Aufstellung und Feststellung', () => {
      expect(plan.pruefungspflichtig).toBe(true);
      expect(plan.pruefungsfenster).not.toBeNull();
      expect(formatDeDate(plan.pruefungsfenster!.von)).toBe('31.03.2027');
      expect(formatDeDate(plan.pruefungsfenster!.bis)).toBe('31.08.2027');
    });
  });

  describe('kleine Kapitalgesellschaft, Stichtag 31.12.2026', () => {
    const plan = berechneFristen(silvester(2026), 'klein');

    it('darf innerhalb von sechs Monaten aufstellen (§ 264 Abs. 1 Satz 4 HGB)', () => {
      expect(formatDeDate(frist(plan, 'aufstellung').date)).toBe('30.06.2027');
      expect(frist(plan, 'aufstellung').norm).toBe('§ 264 Abs. 1 Satz 4 HGB');
    });

    it('stellt bis zum Ablauf der ersten elf Monate fest', () => {
      expect(formatDeDate(frist(plan, 'feststellung').date)).toBe('30.11.2027');
    });

    it('legt trotzdem ein Jahr nach dem Stichtag offen', () => {
      expect(formatDeDate(frist(plan, 'offenlegung').date)).toBe('31.12.2027');
    });

    it('ist nicht prüfungspflichtig und hat deshalb kein Prüfungsfenster', () => {
      expect(plan.pruefungspflichtig).toBe(false);
      expect(plan.pruefungsfenster).toBeNull();
    });
  });

  describe('abweichendes Geschäftsjahr', () => {
    it('rechnet ab dem 30.06. korrekt weiter', () => {
      const plan = berechneFristen(new Date(Date.UTC(2026, 5, 30)), 'nicht-klein');
      expect(formatDeDate(frist(plan, 'aufstellung').date)).toBe('30.09.2026');
      expect(formatDeDate(frist(plan, 'feststellung').date)).toBe('28.02.2027');
      expect(formatDeDate(frist(plan, 'offenlegung').date)).toBe('30.06.2027');
    });

    it('trifft im Schaltjahr den 29. Februar', () => {
      const plan = berechneFristen(new Date(Date.UTC(2027, 5, 30)), 'nicht-klein');
      expect(formatDeDate(frist(plan, 'feststellung').date)).toBe('29.02.2028');
    });
  });

  it('weist den Feststellungsbeschluss als GmbH-Regel aus', () => {
    const plan = berechneFristen(silvester(2026), 'nicht-klein');
    expect(frist(plan, 'feststellung').gmbhOnly).toBe(true);
    expect(frist(plan, 'aufstellung').gmbhOnly).toBe(false);
    expect(frist(plan, 'offenlegung').gmbhOnly).toBe(false);
  });

  it('nennt zu jeder Frist eine Norm mit Absatz und Satz', () => {
    const plan = berechneFristen(silvester(2026), 'nicht-klein');
    for (const entry of plan.fristen) {
      expect(entry.norm, entry.title).toMatch(/^§ \d+/);
    }
  });

  it('weist ein ungültiges Datum zurück', () => {
    expect(() => berechneFristen(new Date('kein Datum'), 'klein')).toThrow(RangeError);
  });
});

describe('formatDeDate', () => {
  it('füllt Tag und Monat zweistellig auf', () => {
    expect(formatDeDate(new Date(Date.UTC(2027, 0, 5)))).toBe('05.01.2027');
  });
});
