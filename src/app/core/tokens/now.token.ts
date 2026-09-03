import { InjectionToken } from '@angular/core';

/**
 * Der aktuelle Zeitpunkt als injizierbarer Wert.
 *
 * Templates dürfen `new Date()` nicht aufrufen, und Komponenten sollten es
 * nicht: Ein direkter Zugriff macht jede Zeitlogik untestbar und lässt
 * Server- und Browser-Rendering auseinanderlaufen. Specs überschreiben das
 * Token mit einem festen Datum.
 */
export const NOW = new InjectionToken<Date>('Aktueller Zeitpunkt', {
  providedIn: 'root',
  factory: () => new Date(),
});
