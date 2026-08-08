import { describe, expect, it } from 'vitest';
import { parseDeNumber } from './parse-de-number';

describe('parseDeNumber', () => {
  it('liest Tausenderpunkte', () => {
    expect(parseDeNumber('7.500.000')).toBe(7_500_000);
  });

  it('liest ein Dezimalkomma', () => {
    expect(parseDeNumber('7.500.000,50')).toBe(7_500_000.5);
  });

  it('liest eine Zahl ohne Trennzeichen', () => {
    expect(parseDeNumber('7500000')).toBe(7_500_000);
  });

  it('liest Leerzeichen als Tausendertrenner', () => {
    expect(parseDeNumber('7 500 000')).toBe(7_500_000);
  });

  it('gibt null für leere Eingaben zurück', () => {
    expect(parseDeNumber('')).toBeNull();
    expect(parseDeNumber('   ')).toBeNull();
    expect(parseDeNumber(null)).toBeNull();
    expect(parseDeNumber(undefined)).toBeNull();
  });

  it('gibt null für Buchstaben und Währungszeichen zurück', () => {
    expect(parseDeNumber('abc')).toBeNull();
    expect(parseDeNumber('7500 €')).toBeNull();
  });

  it('gibt null für negative Eingaben zurück', () => {
    expect(parseDeNumber('-5')).toBeNull();
  });
});
