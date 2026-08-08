/**
 * Fehlende Angaben sind leere Strings. Alle Templates blenden sie über `@if` aus,
 * statt Platzhalter auszuliefern (siehe PRODUCT.md, Voice-Regel 5).
 */
export interface ContactInfo {
  legalName: string;
  personName: string;
  role: string;
  street: string;
  postalCode: string;
  city: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  vatId: string;
}
