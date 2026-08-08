import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SectionRef } from '../../core/models/section-ref.model';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { SectionIndicatorComponent } from '../../shared/section-indicator/section-indicator.component';
import { HeroComponent } from './sections/hero/hero.component';
import { KontaktSchlussComponent } from './sections/kontakt-schluss/kontakt-schluss.component';
import { LeistungenTeaserComponent } from './sections/leistungen-teaser/leistungen-teaser.component';
import { PositionenComponent } from './sections/positionen/positionen.component';
import { ProfilTeaserComponent } from './sections/profil-teaser/profil-teaser.component';
import { PruefungspflichtTeaserComponent } from './sections/pruefungspflicht-teaser/pruefungspflicht-teaser.component';

const HOME_SECTIONS: SectionRef[] = [
  { id: 'start', label: 'Start' },
  { id: 'haltung', label: 'Zusammenarbeit' },
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'pruefungspflicht', label: 'Prüfungspflicht' },
  { id: 'profil', label: 'Über mich' },
  { id: 'kontakt', label: 'Kontakt' },
];

@Component({
  selector: 'app-home',
  imports: [
    SectionIndicatorComponent,
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

  readonly sections = HOME_SECTIONS;

  ngOnInit(): void {
    this.seo.setMeta(this.content.getSeoMeta('home'));
  }
}
