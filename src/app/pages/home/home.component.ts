import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { HeroComponent } from './sections/hero/hero.component';
import { KontaktSchlussComponent } from './sections/kontakt-schluss/kontakt-schluss.component';
import { LeistungenTeaserComponent } from './sections/leistungen-teaser/leistungen-teaser.component';
import { PositionenComponent } from './sections/positionen/positionen.component';
import { ProfilTeaserComponent } from './sections/profil-teaser/profil-teaser.component';
import { PruefungspflichtTeaserComponent } from './sections/pruefungspflicht-teaser/pruefungspflicht-teaser.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    PositionenComponent,
    LeistungenTeaserComponent,
    PruefungspflichtTeaserComponent,
    ProfilTeaserComponent,
    KontaktSchlussComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);

  ngOnInit(): void {
    this.seo.setMeta(this.content.getSeoMeta('home'));
  }
}
