import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { ValuePropositionComponent } from './value-proposition/value-proposition.component';
import { CoreAreasComponent } from './core-areas/core-areas.component';
import { AboutTeaserComponent } from './about-teaser/about-teaser.component';
import { ContactCtaComponent } from './contact-cta/contact-cta.component';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeroComponent, ValuePropositionComponent, CoreAreasComponent, AboutTeaserComponent, ContactCtaComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
