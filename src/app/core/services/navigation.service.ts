import { Injectable } from '@angular/core';
import { NavItem } from '../models/nav-item.model';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  getMainNavigation(): NavItem[] {
    return [
      { label: 'Leistungen', path: '/leistungen' },
      { label: 'Über mich', path: '/ueber-mich' },
      { label: 'Kontakt', path: '/kontakt' },
    ];
  }

  getServiceLinks(): NavItem[] {
    return [
      { label: 'Wirtschaftsprüfung', path: '/leistungen', fragment: 'wirtschaftspruefung' },
      { label: 'Beratung', path: '/leistungen', fragment: 'beratung' },
      { label: 'Steuern', path: '/leistungen', fragment: 'steuern' },
      { label: 'Prüfungspflicht-Check', path: '/leistungen', fragment: 'pruefungspflicht' },
    ];
  }

  getLegalLinks(): NavItem[] {
    return [
      { label: 'Impressum', path: '/impressum' },
      { label: 'Datenschutz', path: '/datenschutz' },
    ];
  }
}
