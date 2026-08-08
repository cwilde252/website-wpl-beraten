import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { ContentService } from '../../core/services/content.service';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);

  readonly navItems = inject(NavigationService).getMainNavigation();
  readonly contact = inject(ContentService).getContactInfo();

  readonly mobileMenuOpen = signal(false);
  readonly scrolled = signal(false);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  readonly onDarkPage = computed(() => this.currentUrl() === '/');

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
