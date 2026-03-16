import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';
import { NavItem } from '../../core/models/navigation.model';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private readonly navService = inject(NavigationService);

  readonly navItems: NavItem[] = this.navService.getMainNavigation();
  readonly mobileMenuOpen = signal(false);
  readonly dropdownOpen = signal(false);
  readonly scrolled = signal(false);

  readonly headerClass = computed(() =>
    `fixed top-0 left-0 right-0 z-50 bg-secondary transition-all duration-300 ${this.scrolled() ? 'shadow-lg' : ''}`
  );

  private readonly onScroll = () => {
    this.scrolled.set(window.scrollY > 20);
  };

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', this.onScroll));
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
    if (!this.mobileMenuOpen()) {
      this.dropdownOpen.set(false);
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.dropdownOpen.set(false);
  }
}
