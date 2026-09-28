import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  Injector,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IsActiveMatchOptions,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { ContentService } from '../../core/services/content.service';
import { NavigationService } from '../../core/services/navigation.service';
import { ActionLinkComponent } from '../action-link/action-link.component';
import { IconComponent } from '../icon/icon.component';

/** Ab dieser Breite steht die volle Navigation im Kopf (Tailwind `lg`). */
const DESKTOP_QUERY = '(min-width: 1024px)';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ActionLinkComponent, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closeMobileMenu(true)' },
})
export class HeaderComponent {
  private readonly doc = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  readonly navItems = inject(NavigationService).getMainNavigation();
  readonly contact = inject(ContentService).getContactInfo();

  /** Seiten ohne Fragment sind aktiv, egal zu welchem Abschnitt gesprungen wurde. */
  readonly exactPath: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };
  /** Sprungziele wie der Check sind nur aktiv, wenn genau ihr Fragment in der URL steht. */
  readonly exactWithFragment: IsActiveMatchOptions = { ...this.exactPath, fragment: 'exact' };

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

    // Das Menü deckt die ganze Seite ab: Dahinter scrollt nichts, und Inhalt und Fuß
    // sind inert, damit die Tabulatortaste nicht in Unsichtbares führt.
    effect(() => {
      const open = this.mobileMenuOpen();
      if (!this.isBrowser) return;
      this.doc.body.classList.toggle('menu-offen', open);
      for (const selector of ['main', 'app-footer']) {
        this.doc.querySelector(selector)?.toggleAttribute('inert', open);
      }
    });

    afterNextRender(() => {
      const view = this.doc.defaultView;
      if (!view) return;
      const onScroll = () => this.scrolled.set(view.scrollY > 8);
      onScroll();
      view.addEventListener('scroll', onScroll, { passive: true });

      // Wird das Fenster breit genug für die volle Navigation, hat das Menü keinen Platz mehr.
      const desktop = view.matchMedia(DESKTOP_QUERY);
      const onWiden = (event: MediaQueryListEvent) => {
        if (event.matches) this.closeMobileMenu();
      };
      desktop.addEventListener('change', onWiden);

      destroyRef.onDestroy(() => {
        view.removeEventListener('scroll', onScroll);
        desktop.removeEventListener('change', onWiden);
      });
    });
  }

  toggleMobileMenu(): void {
    const open = !this.mobileMenuOpen();
    this.mobileMenuOpen.set(open);
    if (open) {
      // Der Fokus geht auf den ersten Link, sobald das Menü gerendert ist.
      afterNextRender(() => this.doc.querySelector<HTMLAnchorElement>('#mobile-nav a')?.focus(), {
        injector: this.injector,
      });
    }
  }

  /** `returnFocus`: nach Escape zurück auf den Menü-Button, damit der Fokus nicht verloren geht. */
  closeMobileMenu(returnFocus = false): void {
    if (!this.mobileMenuOpen()) return;
    this.mobileMenuOpen.set(false);
    if (returnFocus) this.menuButton()?.nativeElement.focus();
  }
}
