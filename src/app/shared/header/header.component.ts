import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { ContentService } from '../../core/services/content.service';
import { NavigationService } from '../../core/services/navigation.service';
import { ActionLinkComponent } from '../action-link/action-link.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ActionLinkComponent, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closeMobileMenu()' },
})
export class HeaderComponent {
  private readonly doc = inject(DOCUMENT);

  readonly navItems = inject(NavigationService).getMainNavigation();
  readonly contact = inject(ContentService).getContactInfo();

  readonly mobileMenuOpen = signal(false);
  readonly scrolled = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Jede abgeschlossene Navigation schließt das Mobilmenü — auch über den Button darin.
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMobileMenu());

    afterNextRender(() => {
      const view = this.doc.defaultView;
      if (!view) return;
      const onScroll = () => this.scrolled.set(view.scrollY > 8);
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
