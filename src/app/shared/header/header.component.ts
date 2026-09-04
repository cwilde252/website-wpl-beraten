import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { NavigationService } from '../../core/services/navigation.service';

/**
 * Der Kopf ist eine Zeile, keine Leiste.
 *
 * Die Vorfassung trug ein durchgehend orangefarbenes Band. Eine gesättigte
 * Vollfläche am oberen Rand ist aber die Signatur einer Anwendung, nicht eines
 * Dokuments — sie war der stärkste Grund, warum die Seite nach Software aussah.
 * Geblieben ist das Orange als feine Linie unter der Zeile: dieselbe Farbe,
 * derselbe Ort, ohne den Auftritt.
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly doc = inject(DOCUMENT);

  readonly navItems = inject(NavigationService).getMainNavigation();
  readonly contact = inject(ContentService).getContactInfo();

  readonly mobileMenuOpen = signal(false);
  readonly scrolled = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const view = this.doc.defaultView;
      if (!view) return;
      const onScroll = () => this.scrolled.set(view.scrollY > 24);
      onScroll();
      view.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => view.removeEventListener('scroll', onScroll));
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
