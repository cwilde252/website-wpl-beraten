import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { DefinitionItem, DefinitionListComponent } from './definition-list.component';

const ITEMS: DefinitionItem[] = [
  { reference: '01', term: 'Persönlich', description: 'Direkt mit mir.' },
  { term: 'Ohne Beschreibung' },
];

function setup(items = ITEMS, ariaLabel = 'Grundsätze') {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [DefinitionListComponent] });
  const fixture = TestBed.createComponent(DefinitionListComponent);
  fixture.componentRef.setInput('items', items);
  fixture.componentRef.setInput('ariaLabel', ariaLabel);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('DefinitionListComponent', () => {
  it('rendert eine echte Definitionsliste', () => {
    const el = setup();
    expect(el.querySelector('dl')).not.toBeNull();
    expect(el.querySelectorAll('dt').length).toBe(2);
  });

  it('rendert die Beschreibung nur, wenn es eine gibt', () => {
    expect(setup().querySelectorAll('dd').length).toBe(1);
  });

  it('blendet die Mono-Referenz vor Screenreadern aus', () => {
    expect(setup().querySelector('span[aria-hidden="true"]')?.textContent?.trim()).toBe('01');
  });

  it('setzt kein leeres aria-label', () => {
    expect(setup(ITEMS, '').querySelector('dl')?.hasAttribute('aria-label')).toBe(false);
  });
});
