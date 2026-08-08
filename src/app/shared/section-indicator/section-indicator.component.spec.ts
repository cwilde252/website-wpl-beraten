import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SectionRef } from '../../core/models/section-ref.model';
import { SectionIndicatorComponent } from './section-indicator.component';

const SECTIONS: SectionRef[] = [
  { id: 'start', label: 'Start' },
  { id: 'kontakt', label: 'Kontakt' },
];

describe('SectionIndicatorComponent', () => {
  let el: HTMLElement;

  beforeEach(() => {
    // jsdom kennt keinen IntersectionObserver.
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe(): void {}
        disconnect(): void {}
        unobserve(): void {}
      },
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [SectionIndicatorComponent] });
    const fixture = TestBed.createComponent(SectionIndicatorComponent);
    fixture.componentRef.setInput('sections', SECTIONS);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  it('rendert echte Anker, die auch ohne JavaScript funktionieren', () => {
    const links = Array.from(el.querySelectorAll('a'));
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['#start', '#kontakt']);
  });

  it('benennt die Navigation auf Deutsch', () => {
    expect(el.querySelector('nav')?.getAttribute('aria-label')).toBe('Abschnitte dieser Seite');
  });

  it('setzt aria-current, solange kein Abschnitt aktiv ist, auf nichts', () => {
    for (const link of Array.from(el.querySelectorAll('a'))) {
      expect(link.hasAttribute('aria-current')).toBe(false);
    }
  });

  it('führt die Einträge als geordnete Liste', () => {
    expect(el.querySelectorAll('ol > li').length).toBe(2);
  });
});
