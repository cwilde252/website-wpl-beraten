import { Injectable } from '@angular/core';
import { NavItem } from '../models/navigation.model';

@Injectable({ providedIn: 'root' })
export class NavigationService {

  getMainNavigation(): NavItem[] {
    return [
      {
        label: 'Leistungen',
        path: '/wirtschaftspruefung',
        children: [
          { label: 'Wirtschaftsprüfung', path: '/wirtschaftspruefung' },
          { label: 'Beratung', path: '/beratung' },
          { label: 'Steuern', path: '/steuern' }
        ]
      },
      { label: 'Über mich', path: '/ueber-mich' },
      { label: 'Kontakt', path: '/kontakt' }
    ];
  }

  getFooterLinks(): { leistungen: NavItem[]; weiteres: NavItem[] } {
    return {
      leistungen: [
        { label: 'Wirtschaftsprüfung', path: '/wirtschaftspruefung' },
        { label: 'Beratung', path: '/beratung' },
        { label: 'Steuern', path: '/steuern' }
      ],
      weiteres: [
        { label: 'Über mich', path: '/ueber-mich' },
        { label: 'Kontakt', path: '/kontakt' },
        { label: 'Impressum', path: '/impressum' },
        { label: 'Datenschutz', path: '/datenschutz' }
      ]
    };
  }
}
