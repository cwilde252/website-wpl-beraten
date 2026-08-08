import { describe, expect, it } from 'vitest';
import { classifySizeClass, determineAuditRequirement } from './hgb-size-class';
import { AuditRequirementInput, YearFigures } from '../models/hgb-size-class.model';

function figures(balanceSheetTotal: number, revenue: number, employees: number): YearFigures {
  return { balanceSheetTotal, revenue, employees };
}

function input(
  overrides: Partial<AuditRequirementInput> & { currentYear: YearFigures },
): AuditRequirementInput {
  return {
    previousYear: null,
    newlyFormed: false,
    capitalMarketOriented: false,
    ...overrides,
  };
}

describe('classifySizeClass', () => {
  it('ordnet eine kleine Gesellschaft zu, wenn kein Merkmal überschritten wird', () => {
    expect(classifySizeClass(figures(3_000_000, 8_000_000, 20)).sizeClass).toBe('klein');
  });

  it('bleibt klein, wenn genau ein Merkmal überschritten wird', () => {
    expect(classifySizeClass(figures(9_000_000, 8_000_000, 20)).sizeClass).toBe('klein');
  });

  it('bleibt klein, wenn nur die Arbeitnehmerzahl überschritten wird', () => {
    expect(classifySizeClass(figures(3_000_000, 8_000_000, 80)).sizeClass).toBe('klein');
  });

  it('behandelt die Klein-Schwellen exakt auf dem Wert als nicht überschritten', () => {
    const result = classifySizeClass(figures(7_500_000, 15_000_000, 50));
    expect(result.sizeClass).toBe('klein');
    expect(result.smallCriteria.every((c) => !c.exceeded)).toBe(true);
  });

  it('wird mittelgroß, sobald zwei Klein-Schwellen überschritten werden', () => {
    expect(classifySizeClass(figures(9_000_000, 16_000_000, 20)).sizeClass).toBe('mittelgross');
  });

  it('behandelt die Mittelgroß-Schwellen exakt auf dem Wert als nicht überschritten', () => {
    const result = classifySizeClass(figures(25_000_000, 50_000_000, 250));
    expect(result.sizeClass).toBe('mittelgross');
    expect(result.mediumCriteria.every((c) => !c.exceeded)).toBe(true);
  });

  it('wird groß, sobald zwei Mittelgroß-Schwellen überschritten werden', () => {
    expect(classifySizeClass(figures(30_000_000, 60_000_000, 100)).sizeClass).toBe('gross');
  });

  it('wird groß auch dann, wenn die Arbeitnehmerzahl klein bleibt', () => {
    expect(classifySizeClass(figures(30_000_000, 60_000_000, 40)).sizeClass).toBe('gross');
  });

  it('erkennt eine Kleinstkapitalgesellschaft', () => {
    expect(classifySizeClass(figures(400_000, 800_000, 8)).sizeClass).toBe('kleinst');
  });

  it('behandelt die Kleinst-Schwellen exakt auf dem Wert als nicht überschritten', () => {
    expect(classifySizeClass(figures(450_000, 900_000, 10)).sizeClass).toBe('kleinst');
  });

  it('weist ungültige Angaben zurück', () => {
    expect(() => classifySizeClass(figures(Number.NaN, 1, 1))).toThrow(RangeError);
    expect(() => classifySizeClass(figures(-1, 1, 1))).toThrow(RangeError);
    expect(() => classifySizeClass(figures(Number.POSITIVE_INFINITY, 1, 1))).toThrow(RangeError);
  });
});

describe('determineAuditRequirement', () => {
  it('bejaht die Prüfungspflicht bei zwei mittelgroßen Stichtagen', () => {
    const year = figures(9_000_000, 16_000_000, 20);
    const result = determineAuditRequirement(input({ currentYear: year, previousYear: year }));
    expect(result.effectiveSizeClass).toBe('mittelgross');
    expect(result.auditRequired).toBe(true);
    expect(result.indeterminate).toBe(false);
  });

  it('verneint die Prüfungspflicht bei zwei kleinen Stichtagen', () => {
    const year = figures(7_500_000, 15_000_000, 50);
    const result = determineAuditRequirement(input({ currentYear: year, previousYear: year }));
    expect(result.effectiveSizeClass).toBe('klein');
    expect(result.auditRequired).toBe(false);
  });

  it('liefert kein Ergebnis, wenn die Klasse zwischen den Stichtagen wechselt', () => {
    const result = determineAuditRequirement(
      input({
        currentYear: figures(9_000_000, 16_000_000, 20),
        previousYear: figures(3_000_000, 8_000_000, 20),
      }),
    );
    expect(result.indeterminate).toBe(true);
    expect(result.auditRequired).toBeNull();
    expect(result.effectiveSizeClass).toBeNull();
    expect(result.reasons.join(' ')).toContain('§ 267 Abs. 4 Satz 1 HGB');
  });

  it('liefert kein Ergebnis, wenn Vorjahreszahlen fehlen', () => {
    const result = determineAuditRequirement(
      input({ currentYear: figures(9_000_000, 16_000_000, 20) }),
    );
    expect(result.indeterminate).toBe(true);
    expect(result.auditRequired).toBeNull();
  });

  it('wendet bei Neugründung bereits den ersten Stichtag an', () => {
    const result = determineAuditRequirement(
      input({ currentYear: figures(9_000_000, 16_000_000, 20), newlyFormed: true }),
    );
    expect(result.indeterminate).toBe(false);
    expect(result.auditRequired).toBe(true);
    expect(result.reasons.join(' ')).toContain('§ 267 Abs. 4 Satz 2 HGB');
  });

  it('behandelt kapitalmarktorientierte Gesellschaften unabhängig von den Zahlen als groß', () => {
    const result = determineAuditRequirement(
      input({ currentYear: figures(100_000, 200_000, 2), capitalMarketOriented: true }),
    );
    expect(result.effectiveSizeClass).toBe('gross');
    expect(result.auditRequired).toBe(true);
    expect(result.reasons.join(' ')).toContain('§ 267 Abs. 3 Satz 2 HGB');
  });

  it('begründet jedes Ergebnis mit mindestens einem Normzitat', () => {
    const year = figures(3_000_000, 8_000_000, 20);
    const result = determineAuditRequirement(input({ currentYear: year, previousYear: year }));
    expect(result.reasons.length).toBeGreaterThan(0);
    for (const reason of result.reasons) {
      expect(reason).toMatch(/§ \d+[a]? Abs\./);
    }
  });
});
