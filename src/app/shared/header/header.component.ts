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
import { CtaLinkComponent } from '../cta-link/cta-link.component';
import { SignetComponent } from '../signet/signet.component';

/**
 * Jede Seite öffnet auf der Tintenfläche. Der Kopf liegt darüber und ist oben
 * deshalb transparent mit hellem Text; sobald gescrollt wird, legt er sich als
 * helle Fläche darüber und dreht den Text auf Tinte.
 *
 * Weil diese Regel für alle Seiten gilt, braucht es keine Fallunterscheidung
 * nach Route mehr — der Vorgänger hatte dafür ein eigenes Signal.
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, SignetComponent, CtaLinkComponent],
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
      const onScroll = () => this.scrolled.set(view.scrollY > 40);
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
