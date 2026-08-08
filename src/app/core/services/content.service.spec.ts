import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { PageKey } from '../models/seo-meta.model';
import { ContentService } from './content.service';

const PAGES: PageKey[] = [
  'home',
  'leistungen',
  'ueber-mich',
  'kontakt',
  'impressum',
  'datenschutz',
];

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentService);
  });

  /** Sammelt jeden String im gesamten Textgraphen des Services. */
  function allStrings(): string[] {
    const roots: unknown[] = [
      service.getContactInfo(),
      service.getHomeHeadline(),
      service.getHomeLead(),
      service.getLeistungenHeadline(),
      service.getUeberMichHeadline(),
      service.getKontaktHeadline(),
      service.getPositions(),
      service.getServiceAreas(),
      service.getProfile(),
      service.getFaq(),
      service.getAuditCheckIntro(),
      service.getAuditCheckDisclaimer(),
      service.getImpressumSections(),
      service.getDatenschutzSections(),
      ...PAGES.map((page) => service.getSeoMeta(page)),
    ];

    const found: string[] = [];
    const walk = (value: unknown): void => {
      if (typeof value === 'string') found.push(value);
      else if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === 'object') Object.values(value).forEach(walk);
    };
    roots.forEach(walk);
    return found;
  }

  it('liefert keinen Text in eckigen Klammern (Platzhalter-Verbot)', () => {
    const offenders = allStrings().filter((text) => /\[[^\]]{2,}\]/.test(text));
    expect(offenders).toEqual([]);
  });

  it('verweist auf keine externen Bild-Platzhalter', () => {
    const offenders = allStrings().filter((text) => text.includes('placehold.co'));
    expect(offenders).toEqual([]);
  });

  it('schreibt den Namen durchgehend ohne Accent', () => {
    const offenders = allStrings().filter((text) => text.includes('Lefèvre'));
    expect(offenders).toEqual([]);
  });

  it('vergibt eindeutige Slugs für die Leistungsbereiche', () => {
    const slugs = service.getServiceAreas().map((area) => area.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('hält jede SEO-Beschreibung unter 161 Zeichen', () => {
    for (const page of PAGES) {
      expect(service.getSeoMeta(page).description.length).toBeLessThanOrEqual(160);
    }
  });
});
