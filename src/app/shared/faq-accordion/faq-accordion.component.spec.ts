import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { FaqItem } from '../../core/models/faq-item.model';
import { FaqAccordionComponent } from './faq-accordion.component';

const ITEMS: FaqItem[] = [
  { question: 'Frage eins?', answer: 'Antwort eins.' },
  { question: 'Frage zwei?', answer: 'Antwort zwei.' },
];

function setup(exclusiveGroup?: string) {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [FaqAccordionComponent] });
  const fixture = TestBed.createComponent(FaqAccordionComponent);
  fixture.componentRef.setInput('items', ITEMS);
  if (exclusiveGroup) fixture.componentRef.setInput('exclusiveGroup', exclusiveGroup);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('FaqAccordionComponent', () => {
  it('rendert ein details-Element je Frage', () => {
    expect(setup().querySelectorAll('details').length).toBe(2);
  });

  it('setzt die Frage als Überschrift in das summary', () => {
    const heading = setup().querySelector('summary h3');
    expect(heading?.textContent?.trim()).toBe('Frage eins?');
  });

  it('setzt keine ARIA-Attribute von Hand — die liefert das native Element', () => {
    const el = setup();
    for (const details of Array.from(el.querySelectorAll('details'))) {
      expect(details.hasAttribute('role')).toBe(false);
      expect(details.hasAttribute('aria-expanded')).toBe(false);
    }
    for (const summary of Array.from(el.querySelectorAll('summary'))) {
      expect(summary.hasAttribute('role')).toBe(false);
      expect(summary.hasAttribute('aria-expanded')).toBe(false);
    }
  });

  it('setzt das name-Attribut nur bei exklusiver Gruppe', () => {
    expect(setup().querySelector('details')?.hasAttribute('name')).toBe(false);
    expect(setup('gruppe').querySelector('details')?.getAttribute('name')).toBe('gruppe');
  });

  it('blendet die Auf-Zu-Marke vor Screenreadern aus', () => {
    // Eine Marke je Frage, und sie trägt keine eigene Bedeutung — der Zustand
    // kommt aus dem nativen <details>.
    const markers = setup().querySelectorAll('summary span[aria-hidden="true"]');
    expect(markers.length).toBe(2);
    for (const marker of Array.from(markers)) {
      expect(marker.textContent?.trim()).toBe('');
    }
  });
});
