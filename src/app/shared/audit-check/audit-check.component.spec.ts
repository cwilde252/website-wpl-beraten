import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuditCheckComponent } from './audit-check.component';

describe('AuditCheckComponent', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<AuditCheckComponent>>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [AuditCheckComponent] });
    fixture = TestBed.createComponent(AuditCheckComponent);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  function fill(values: Record<string, string | boolean>): void {
    fixture.componentInstance.form.patchValue(values);
    fixture.detectChanges();
  }

  function submit(): void {
    fixture.componentInstance.submit();
    fixture.detectChanges();
  }

  it('zeigt die Schwellenwerttabelle auch ohne Eingabe', () => {
    const caption = el.querySelector('table caption');
    expect(caption?.textContent).toContain('Schwellenwerte');
    expect(el.textContent).toContain('7.500.000');
  });

  it('liefert ohne gültige Eingabe kein Ergebnis', () => {
    submit();
    expect(fixture.componentInstance.result()).toBeNull();
    expect(el.querySelector('[role="status"]')?.textContent?.trim()).toBe('');
  });

  it('markiert leere Pflichtfelder als ungültig', () => {
    submit();
    expect(el.querySelector('#current-balance')?.getAttribute('aria-invalid')).toBe('true');
    expect(el.querySelectorAll('[role="alert"]').length).toBeGreaterThan(0);
  });

  it('bejaht die Prüfungspflicht bei zwei mittelgroßen Stichtagen', () => {
    fill({
      currentBalanceSheetTotal: '9.000.000',
      currentRevenue: '16.000.000',
      currentEmployees: '20',
      previousBalanceSheetTotal: '9.000.000',
      previousRevenue: '16.000.000',
      previousEmployees: '20',
    });
    submit();

    const status = el.querySelector('[role="status"]');
    expect(status?.getAttribute('aria-live')).toBe('polite');
    expect(status?.textContent).toContain('besteht eine gesetzliche Prüfungspflicht');
    expect(status?.textContent).toContain('§ 316 Abs. 1 Satz 1 HGB');
    expect(status?.textContent).toContain('überschritten');
  });

  it('behandelt Werte genau auf der Schwelle als nicht überschritten', () => {
    fill({
      currentBalanceSheetTotal: '7.500.000',
      currentRevenue: '15.000.000',
      currentEmployees: '50',
      previousBalanceSheetTotal: '7.500.000',
      previousRevenue: '15.000.000',
      previousEmployees: '50',
    });
    submit();
    expect(el.querySelector('[role="status"]')?.textContent).toContain(
      'besteht keine gesetzliche Prüfungspflicht',
    );
  });

  it('verwirft das Ergebnis, sobald sich eine Eingabe ändert', () => {
    fill({
      currentBalanceSheetTotal: '9.000.000',
      currentRevenue: '16.000.000',
      currentEmployees: '20',
      previousBalanceSheetTotal: '9.000.000',
      previousRevenue: '16.000.000',
      previousEmployees: '20',
    });
    submit();
    expect(fixture.componentInstance.result()).not.toBeNull();

    fill({ currentEmployees: '21' });
    expect(fixture.componentInstance.result()).toBeNull();
  });

  it('verlangt die Vorjahreszahlen vollständig oder gar nicht', () => {
    fill({
      currentBalanceSheetTotal: '1',
      currentRevenue: '1',
      currentEmployees: '1',
      previousBalanceSheetTotal: '1',
    });
    submit();
    expect(fixture.componentInstance.form.hasError('previousYearIncomplete')).toBe(true);
    expect(fixture.componentInstance.result()).toBeNull();
  });

  it('zeigt den Haftungshinweis von Anfang an', () => {
    const disclaimer = el.querySelector('#audit-check-disclaimer');
    expect(disclaimer?.textContent).toContain('unverbindliche erste Orientierung');
    expect(disclaimer?.textContent).toContain('Stand der Schwellenwerte');
  });
});
