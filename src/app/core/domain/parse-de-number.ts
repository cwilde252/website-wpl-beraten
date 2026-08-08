/**
 * Liest eine deutsche Zahleneingabe.
 *
 * Akzeptiert Tausenderpunkte, Leerzeichen als Trenner und ein Dezimalkomma:
 * `"7.500.000"`, `"7 500 000"`, `"7500000,50"`. Gibt `null` zurück, wenn die
 * Eingabe leer, negativ oder keine Zahl ist — die Validierung entscheidet dann,
 * nicht diese Funktion.
 */
export function parseDeNumber(raw: string | null | undefined): number | null {
  if (raw === null || raw === undefined) return null;

  const trimmed = raw.trim();
  if (trimmed === '') return null;

  // Nur Ziffern, Punkt, Komma und Leerzeichen sind zulässig — kein Vorzeichen,
  // kein Währungssymbol, keine Exponentialschreibweise.
  if (!/^[\d.,\s]+$/.test(trimmed)) return null;

  const withoutGrouping = trimmed.replace(/[.\s]/g, '');
  const normalised = withoutGrouping.replace(',', '.');

  // Ein zweites Komma hätte hier einen zweiten Punkt erzeugt.
  if ((normalised.match(/\./g) ?? []).length > 1) return null;
  if (normalised === '' || normalised === '.') return null;

  const value = Number(normalised);
  if (!Number.isFinite(value) || value < 0) return null;

  return value;
}
