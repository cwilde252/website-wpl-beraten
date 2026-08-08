import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { ServiceArea } from '../../core/models/service-area.model';
import { ServiceTabsComponent } from './service-tabs.component';

const AREAS: ServiceArea[] = [
  {
    ref: '01',
    slug: 'eins',
    accent: 'pruefung',
    title: 'Erster Bereich',
    claim: 'Claim eins',
    intro: 'Intro eins',
    blocks: [{ title: 'Block', paragraphs: ['Text'], points: ['Punkt'] }],
    mailSubject: 'Eins',
    ctaLabel: 'CTA eins',
  },
  {
    ref: '02',
    slug: 'zwei',
    accent: 'beratung',
    title: 'Zweiter Bereich',
    claim: 'Claim zwei',
    intro: 'Intro zwei',
    blocks: [],
    mailSubject: 'Zwei',
    ctaLabel: 'CTA zwei',
  },
  {
    ref: '03',
    slug: 'drei',
    accent: 'steuern',
    title: 'Dritter Bereich',
    claim: 'Claim drei',
    intro: 'Intro drei',
    blocks: [],
    mailSubject: 'Drei',
    ctaLabel: 'CTA drei',
  },
];

describe('ServiceTabsComponent', () => {
  function setup(initialSlug: string | null = null) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ServiceTabsComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(ServiceTabsComponent);
    fixture.componentRef.setInput('areas', AREAS);
    fixture.componentRef.setInput('initialSlug', initialSlug);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const tabs = () => Array.from(el.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    return { fixture, el, tabs };
  }

  let harness: ReturnType<typeof setup>;

  beforeEach(() => {
    harness = setup();
  });

  it('rendert einen Tab je Bereich', () => {
    expect(harness.tabs().length).toBe(3);
  });

  it('wählt ohne Fragment den ersten Bereich', () => {
    expect(harness.tabs()[0].getAttribute('aria-selected')).toBe('true');
  });

  it('fällt bei unbekanntem Fragment auf den ersten Bereich zurück', () => {
    const { tabs } = setup('gibt-es-nicht');
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
  });

  it('übernimmt ein bekanntes Fragment', () => {
    const { tabs } = setup('drei');
    expect(tabs()[2].getAttribute('aria-selected')).toBe('true');
  });

  it('markiert immer genau einen Tab als ausgewählt', () => {
    harness.tabs()[1].click();
    harness.fixture.detectChanges();
    const selected = harness.tabs().filter((tab) => tab.getAttribute('aria-selected') === 'true');
    expect(selected.length).toBe(1);
    expect(selected[0].id).toBe('tab-zwei');
  });

  it('führt nur den aktiven Tab in der Tab-Reihenfolge', () => {
    const tabindexes = harness.tabs().map((tab) => tab.getAttribute('tabindex'));
    expect(tabindexes).toEqual(['0', '-1', '-1']);
  });

  it('wechselt mit den Pfeiltasten zyklisch', () => {
    harness.tabs()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    harness.fixture.detectChanges();
    expect(harness.tabs()[2].getAttribute('aria-selected')).toBe('true');

    harness.tabs()[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    harness.fixture.detectChanges();
    expect(harness.tabs()[0].getAttribute('aria-selected')).toBe('true');
  });

  it('springt mit Home und End an den Anfang und ans Ende', () => {
    harness.tabs()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    harness.fixture.detectChanges();
    expect(harness.tabs()[2].getAttribute('aria-selected')).toBe('true');

    harness.tabs()[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    harness.fixture.detectChanges();
    expect(harness.tabs()[0].getAttribute('aria-selected')).toBe('true');
  });

  it('meldet den gewählten Bereich nach außen', () => {
    const emitted: string[] = [];
    harness.fixture.componentInstance.activated.subscribe((slug) => emitted.push(slug));
    harness.tabs()[1].click();
    expect(emitted).toEqual(['zwei']);
  });

  it('verbindet Tab und Panel über aria-controls und aria-labelledby', () => {
    const panel = harness.el.querySelector('[role="tabpanel"]');
    expect(panel?.id).toBe('panel-eins');
    expect(panel?.getAttribute('aria-labelledby')).toBe('tab-eins');
    expect(harness.tabs()[0].getAttribute('aria-controls')).toBe('panel-eins');
  });
});
