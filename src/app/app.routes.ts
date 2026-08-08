import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';

/**
 * Die drei alten Leistungsrouten bleiben als Weiterleitung auf das jeweilige
 * Tab-Fragment erhalten — zusätzlich zum 301 in netlify.toml, der für externe
 * Links die maßgebliche Ebene ist.
 */
function redirectToArea(slug: string) {
  return () => inject(Router).createUrlTree(['/leistungen'], { fragment: slug });
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Wiebke Lefevre — Wirtschaftsprüfung, Beratung, Steuern in Rottweil',
  },
  {
    path: 'leistungen',
    loadComponent: () =>
      import('./pages/leistungen/leistungen.component').then((m) => m.LeistungenComponent),
    title: 'Leistungen — Wiebke Lefevre, Wirtschaftsprüferin',
  },
  {
    path: 'ueber-mich',
    loadComponent: () =>
      import('./pages/ueber-mich/ueber-mich.component').then((m) => m.UeberMichComponent),
    title: 'Über mich — Wiebke Lefevre, Wirtschaftsprüferin',
  },
  {
    path: 'kontakt',
    loadComponent: () =>
      import('./pages/kontakt/kontakt.component').then((m) => m.KontaktComponent),
    title: 'Kontakt — Wiebke Lefevre, Wirtschaftsprüferin',
  },
  {
    path: 'impressum',
    loadComponent: () =>
      import('./pages/impressum/impressum.component').then((m) => m.ImpressumComponent),
    title: 'Impressum',
  },
  {
    path: 'datenschutz',
    loadComponent: () =>
      import('./pages/datenschutz/datenschutz.component').then((m) => m.DatenschutzComponent),
    title: 'Datenschutz',
  },

  { path: 'wirtschaftspruefung', redirectTo: redirectToArea('wirtschaftspruefung') },
  { path: 'beratung', redirectTo: redirectToArea('beratung') },
  { path: 'steuern', redirectTo: redirectToArea('steuern') },

  { path: '**', redirectTo: '' },
];
