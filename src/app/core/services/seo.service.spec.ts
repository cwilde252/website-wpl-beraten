import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    service.setMeta({ title: 'Testtitel', description: 'Testbeschreibung' });
  });

  it('setzt den Dokumenttitel', () => {
    expect(TestBed.inject(Title).getTitle()).toBe('Testtitel');
  });

  it('setzt die Meta-Description', () => {
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBe('Testbeschreibung');
  });

  it('setzt die Open-Graph-Tags', () => {
    const meta = TestBed.inject(Meta);
    expect(meta.getTag('property="og:title"')?.content).toBe('Testtitel');
    expect(meta.getTag('property="og:description"')?.content).toBe('Testbeschreibung');
  });
});
