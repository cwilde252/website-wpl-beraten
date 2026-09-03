import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { NOW } from '../../core/tokens/now.token';
import { FristenTimelineComponent } from './fristen-timeline.component';

/** Fester Zeitpunkt, damit die Jahresauswahl deterministisch ist. */
const HEUTE = new Date(Date.UTC(2027, 4, 12));

function setup() {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [FristenTimelineComponent],
    providers: [{ provide: NOW, useValue: HEUTE }],
  });
  const fixture = TestBed.createComponent(FristenTimelineComponent);
  fixture.detectChanges();
  return { fixture, el: fixture.nativeElement as HTMLElement };
}

describe('FristenTimelineComponent', () => {
  let harness: ReturnType<typeof setup>;

  beforeEach(() => {
    harness = setup();
  });

  /** Geschützte Leerzeichen im Template sind Satz, nicht Inhalt — hier normalisiert. */
  function text(): string {
    return (harness.el.textContent ?? '').replace(/\s+/g, ' ');
  }

  it('startet beim Vorjahr — das ist der Abschluss, der ansteht', () => {
    expect(harness.fixture.componentInstance.selectedYear()).toBe(2026);
  });

  it('bietet fünf Geschäftsjahre um das laufende herum an', () => {
    expect(harness.fixture.componentInstance.years).toEqual([2026, 2027, 2028, 2029, 2030]);
  });

  it('rechnet für eine nicht kleine Gesellschaft die Fristen des HGB durch', () => {
    expect(text()).toContain('31.12.2026');
    expect(text()).toContain('31.03.2027');
    expect(text()).toContain('31.08.2027');
    expect(text()).toContain('31.12.2027');
  });

  it('nennt zu jeder Frist die Norm mit Absatz und Satz', () => {
    expect(text()).toContain('§ 264 Abs. 1 Satz 3 HGB');
    expect(text()).toContain('§ 42a Abs. 2 Satz 1 GmbHG');
    expect(text()).toContain('§ 325 Abs. 1a Satz 1 HGB');
  });

  it('zeigt das Prüfungsfenster mit seiner Herleitung aus § 316 HGB', () => {
    expect(harness.el.querySelector('.timeline-window')).not.toBeNull();
    expect(text()).toContain('§ 316 Abs. 1 Satz 2 HGB');
  });

  it('blendet das Prüfungsfenster für kleine Gesellschaften aus', () => {
    harness.fixture.componentInstance.setGroessenlage('klein');
    harness.fixture.detectChanges();
    expect(harness.el.querySelector('.timeline-window')).toBeNull();
    expect(text()).toContain('keiner gesetzlichen Prüfungspflicht');
  });

  it('verlängert für kleine Gesellschaften Aufstellung und Feststellung', () => {
    harness.fixture.componentInstance.setGroessenlage('klein');
    harness.fixture.detectChanges();
    expect(text()).toContain('30.06.2027');
    expect(text()).toContain('30.11.2027');
    expect(text()).toContain('§ 264 Abs. 1 Satz 4 HGB');
  });

  it('rechnet ein abweichendes Geschäftsjahr korrekt durch', () => {
    harness.fixture.componentInstance.selectedOptionId.set('jun');
    harness.fixture.detectChanges();
    expect(text()).toContain('30.06.2026');
    expect(text()).toContain('30.09.2026');
  });

  it('markiert den Feststellungsbeschluss als GmbH-Regel', () => {
    const tags = Array.from(harness.el.querySelectorAll('.scope-tag')).map((tag) =>
      tag.textContent?.trim(),
    );
    expect(tags).toEqual(['nur GmbH']);
  });

  it('meldet die geänderten Termine über eine Live-Region', () => {
    const live = harness.el.querySelector('[aria-live="polite"]');
    expect(live).not.toBeNull();
    expect(live?.getAttribute('aria-atomic')).toBe('true');
  });

  it('beschriftet jede Umschaltfläche mit ihrem Druckzustand', () => {
    const toggles = Array.from(harness.el.querySelectorAll<HTMLButtonElement>('.toggle'));
    expect(toggles.map((toggle) => toggle.getAttribute('aria-pressed'))).toEqual(['true', 'false']);
  });

  it('trägt einen Hinweis, was der Rechner nicht abbildet', () => {
    expect(text()).toContain('Nicht abgebildet sind');
  });
});
