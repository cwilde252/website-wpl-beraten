import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Wirtschaftsprüfungsgesellschaft Lefevre — Prüfen · Beraten · Steuern' },
  { path: 'wirtschaftspruefung', loadComponent: () => import('./pages/wirtschaftspruefung/wirtschaftspruefung.component').then(m => m.WirtschaftspruefungComponent), title: 'Wirtschaftsprüfung — WPL Lefevre' },
  { path: 'beratung', loadComponent: () => import('./pages/beratung/beratung.component').then(m => m.BeratungComponent), title: 'Beratung — WPL Lefevre' },
  { path: 'steuern', loadComponent: () => import('./pages/steuern/steuern.component').then(m => m.SteuernComponent), title: 'Steuern — WPL Lefevre' },
  { path: 'ueber-mich', loadComponent: () => import('./pages/ueber-mich/ueber-mich.component').then(m => m.UeberMichComponent), title: 'Über mich — WPL Lefevre' },
  { path: 'kontakt', loadComponent: () => import('./pages/kontakt/kontakt.component').then(m => m.KontaktComponent), title: 'Kontakt — WPL Lefevre' },
  { path: 'impressum', loadComponent: () => import('./pages/impressum/impressum.component').then(m => m.ImpressumComponent), title: 'Impressum — WPL Lefevre' },
  { path: 'datenschutz', loadComponent: () => import('./pages/datenschutz/datenschutz.component').then(m => m.DatenschutzComponent), title: 'Datenschutz — WPL Lefevre' },
  { path: '**', redirectTo: '' }
];
