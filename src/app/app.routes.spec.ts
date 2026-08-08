import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { routes } from './app.routes';

describe('routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it.each([
    ['/wirtschaftspruefung', '/leistungen#wirtschaftspruefung'],
    ['/beratung', '/leistungen#beratung'],
    ['/steuern', '/leistungen#steuern'],
  ])('leitet %s auf %s weiter', async (from, to) => {
    await router.navigateByUrl(from);
    expect(location.path(true)).toBe(to);
  });

  it('leitet unbekannte Pfade auf die Startseite', async () => {
    await router.navigateByUrl('/gibt-es-nicht');
    expect(location.path()).toBe('');
  });
});
