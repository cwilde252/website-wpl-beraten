# WPL-Beraten — Claude Code Implementierungsplan

## Projekteckdaten

| Feld | Wert |
|---|---|
| Projektname | wpl-beraten |
| Domain | wpl-beraten.de |
| Angular-Version | 21 (Standalone Components, Signals, `@if`/`@for`, `inject()`, zoneless) |
| CSS-Framework | Tailwind CSS 4 |
| Design-Charakter | Skandinavisch-warm, editorial: organische Formen, Serif/Sans-Serif-Mix, asymmetrische Layouts, gezielte Dark Sections, großzügiger Weißraum |
| Google Fonts | DM Sans (Headings, Navigation, CTAs) `wght@400;500;600;700` + Source Serif 4 (Fließtext) `opsz,wght@8..60,400;500;600` |
| Font-Import | `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;500;600&display=swap` |
| Sprache | Deutsch |
| Routing | Multi-Page mit separaten Routen |

## Design-Prinzipien

Diese Prinzipien gelten für alle Komponenten. Claude Code soll sie bei jeder Implementierungsentscheidung heranziehen:

1. **Typografie-Hierarchie statt Dekoration.** Große Headlines (bis `text-6xl` auf Desktop), moderate Body-Größe (`text-lg`), bewusster Wechsel zwischen Sans (Headlines, UI-Elemente) und Serif (Body, Zitate). Die Typografie trägt das Design.
2. **Asymmetrie vor Symmetrie.** Split-Layouts bevorzugt als 5/7 oder 7/5 (12-Spalten-Grid), nie 6/6. Section-Intros und Texte linksbündig — zentriert nur bei kurzen, alleinstehenden Zitaten.
3. **Vertikaler Rhythmus.** Großzügige Section-Abstände (`py-20 md:py-32`). Innerhalb von Sektionen moderate Abstände. Die Seite soll atmen.
4. **Organische Weichheit.** `rounded-2xl` bei Karten, `rounded-full` bei Buttons und kleinen Elementen. Weiche Schatten (`shadow-sm` default, `shadow-xl` auf Hover). Subtile Blob-Shapes als Hintergrund-Dekoration via absolut positionierte `div`s mit der Klasse `blob-decoration`.
5. **Dark Sections gezielt.** Hero auf Home, CTA-Banner, Footer. Verwenden `bg-secondary` (Navy). Text: `text-white` für Headlines, `text-white/70` für Body, `text-white/50` für Sekundärtext.
6. **Farbe als Akzent, nicht als Fläche.** Die Dreieck-Farben (Orange, Blau, Gelb, Grün) erscheinen als farbiger Top-Border auf Karten, Icon-Hintergrund, Label-Text-Farbe, Hover-State — nie als flächenfüllende Section-Hintergründe. Hintergrundflächen nutzen die `-light` Varianten (sanfte Tints).
7. **Übergänge und Mikro-Interaktion.** Alle interaktiven Elemente mit `transition-all duration-300`. Karten: `hover:-translate-y-1 hover:shadow-xl`. Links: animierter Underline via `::after`. Header: transparent → blur bei Scroll.

## Farbschema

Vollständiger `@theme`-Block für `src/styles.css`:

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;500;600&display=swap');

@theme {
  --color-primary: #D4780A;
  --color-primary-light: #FEF3E2;
  --color-primary-dark: #B5650A;
  --color-primary-muted: #E8A94F;

  --color-secondary: #1A2744;
  --color-secondary-light: #243556;

  --color-accent-blue: #2E7DB8;
  --color-accent-blue-light: #EBF3FA;
  --color-accent-yellow: #D4A917;
  --color-accent-yellow-light: #FDF6E3;
  --color-accent-green: #2D8B57;
  --color-accent-green-light: #EAF5EF;

  --color-text: #1A2744;
  --color-text-light: #4A5568;
  --color-text-muted: #8896A6;
  --color-background: #FFFFFF;
  --color-background-warm: #FAF8F5;
  --color-background-warm-dark: #F2EDE6;
  --color-border: #E8E4DE;
  --color-border-light: #F0ECE6;

  --font-sans: 'DM Sans', system-ui, sans-serif;
  --font-serif: 'Source Serif 4', Georgia, serif;
}
```

## Globale Utility-Klassen

Ebenfalls in `styles.css`, nach dem `@theme`-Block:

```css
/* Layout */
.section-padding { @apply py-20 md:py-32; }
.section-padding-sm { @apply py-12 md:py-20; }
.container-page { @apply max-w-7xl mx-auto px-5 sm:px-8 lg:px-12; }
.container-narrow { @apply max-w-4xl mx-auto px-5 sm:px-8 lg:px-12; }

/* Typografie */
.heading-display { @apply font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-[1.1] tracking-tight; }
.heading-1 { @apply font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-secondary leading-tight tracking-tight; }
.heading-2 { @apply font-sans text-2xl md:text-3xl font-bold text-secondary leading-tight; }
.heading-3 { @apply font-sans text-xl md:text-2xl font-semibold text-secondary; }
.body-text { @apply font-serif text-base md:text-lg text-text-light leading-relaxed; }
.body-text-sm { @apply font-serif text-sm md:text-base text-text-light leading-relaxed; }
.label-text { @apply font-sans text-xs md:text-sm font-semibold uppercase tracking-widest; }

/* Buttons */
.btn-primary { @apply inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-sans font-semibold rounded-full hover:bg-primary-dark hover:shadow-lg transition-all duration-300; }
.btn-secondary { @apply inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-sans font-semibold rounded-full hover:bg-primary-light transition-all duration-300; }
.btn-light { @apply inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-sans font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300; }

/* Karten */
.card { @apply bg-white rounded-2xl shadow-sm border border-border-light p-8 md:p-10 transition-all duration-300; }
.card-hover { @apply bg-white rounded-2xl shadow-sm border border-border-light p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl; }

/* Links — Claude Code: Implementiere ::after pseudo-element mit animierter Breite (0→100% bei hover), height 2px, bg-primary, transition 300ms */
.link-underline { @apply relative inline-block text-primary font-sans font-semibold; }

/* Dekorative Elemente */
.blob-decoration { @apply absolute rounded-full opacity-[0.04] blur-3xl pointer-events-none; }

html { scroll-behavior: smooth; }
body { font-family: var(--font-serif); color: var(--color-text); background-color: var(--color-background); }
```

## Ordnerstruktur

```
src/
├── index.html
├── main.ts
├── styles.css
├── app/
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── core/
│   │   ├── models/
│   │   │   ├── content.model.ts
│   │   │   └── navigation.model.ts
│   │   └── services/
│   │       ├── content.service.ts
│   │       └── navigation.service.ts
│   ├── shared/
│   │   ├── header/
│   │   │   ├── header.component.ts
│   │   │   └── header.component.html
│   │   ├── footer/
│   │   │   ├── footer.component.ts
│   │   │   └── footer.component.html
│   │   ├── section-intro/
│   │   │   ├── section-intro.component.ts
│   │   │   └── section-intro.component.html
│   │   └── cta-banner/
│   │       ├── cta-banner.component.ts
│   │       └── cta-banner.component.html
│   └── pages/
│       ├── home/
│       │   ├── home.component.ts / .html
│       │   ├── hero/
│       │   ├── core-areas/
│       │   ├── value-proposition/
│       │   ├── about-teaser/
│       │   └── contact-cta/
│       ├── wirtschaftspruefung/
│       ├── beratung/
│       ├── steuern/
│       ├── ueber-mich/
│       ├── kontakt/
│       ├── impressum/
│       └── datenschutz/
```

Jede Komponente: `name.component.ts` + `name.component.html`. Keine separaten `.scss`-Dateien — alles über Tailwind-Klassen.

## Routing

| Pfad | Komponente | Title |
|---|---|---|
| `/` | HomeComponent | Wirtschaftsprüfungsgesellschaft Lefevre — Prüfen · Beraten · Steuern |
| `/wirtschaftspruefung` | WirtschaftspruefungComponent | Wirtschaftsprüfung — WPL Lefevre |
| `/beratung` | BeratungComponent | Beratung — WPL Lefevre |
| `/steuern` | SteuernComponent | Steuern — WPL Lefevre |
| `/ueber-mich` | UeberMichComponent | Über mich — WPL Lefevre |
| `/kontakt` | KontaktComponent | Kontakt — WPL Lefevre |
| `/impressum` | ImpressumComponent | Impressum — WPL Lefevre |
| `/datenschutz` | DatenschutzComponent | Datenschutz — WPL Lefevre |
| `**` | Redirect → `/` | — |

---

## Phase A — Projektgerüst

### TASK
```
Implementiere alle Dateien aus Phase A.
Beachte die Design-Prinzipien am Anfang des Dokuments — sie gelten für ALLE Komponenten.
Reihenfolge:
1. .postcssrc.json
2. src/styles.css (vollständiges Theme + alle Utility-Klassen, inklusive link-underline ::after Effekt)
3. src/index.html
4. src/main.ts
5. src/app/core/models/content.model.ts
6. src/app/core/models/navigation.model.ts
7. src/app/core/services/navigation.service.ts
8. src/app/core/services/content.service.ts
9. src/app/app.config.ts
10. src/app/app.routes.ts
11. src/app/app.component.ts + app.component.html
Warte nach jeder Dateigruppe auf Bestätigung.
```

### `.postcssrc.json`

Projektroot. Erforderlich für Tailwind 4 mit Angular.

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

### `src/styles.css`

Kopiere den vollständigen Inhalt aus den Abschnitten "Farbschema" und "Globale Utility-Klassen" oben. Beides gehört in diese eine Datei.

### `src/index.html`

```html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>Wirtschaftsprüfungsgesellschaft Lefevre — Prüfen · Beraten · Steuern</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Wirtschaftsprüfungsgesellschaft Lefevre — Wirtschaftsprüfung, Beratung und Steuerplanung für den Mittelstand in Rottweil. Persönlich, pragmatisch, auf Augenhöhe.">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<body class="antialiased">
  <app-root></app-root>
</body>
</html>
```

### `src/main.ts`

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

### `src/app/core/models/content.model.ts`

```typescript
export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface HeroContent {
  headline: string;
  subline: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export interface ValueProposition {
  icon: string;
  title: string;
  description: string;
}

export interface CoreArea {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  link: string;
  icon: string;
}

export interface ServicePageContent {
  heroTitle: string;
  heroSubtitle: string;
  accentColor: string;
  intro: string;
  sections: ServiceSection[];
  ctaText: string;
}

export interface ServiceSection {
  title: string;
  content: string;
  bulletPoints?: string[];
  highlighted?: boolean;
}

export interface TimelineEntry {
  period: string;
  title: string;
  description?: string;
}

export interface PersonProfile {
  name: string;
  title: string;
  image: ImageAsset;
  statement: string;
  timeline: TimelineEntry[];
}

export interface ContactInfo {
  companyName: string;
  owner: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  email: string;
}

export interface ContactFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface AboutTeaser {
  headline: string;
  text: string;
  ctaText: string;
  ctaLink: string;
  image: ImageAsset;
}

export interface CtaBanner {
  headline: string;
  text: string;
  ctaText: string;
  ctaLink: string;
  variant?: 'dark' | 'light';
}
```

### `src/app/core/models/navigation.model.ts`

```typescript
export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}
```

### `src/app/core/services/navigation.service.ts`

```typescript
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
```

### `src/app/core/services/content.service.ts`

```typescript
import { Injectable } from '@angular/core';
import {
  HeroContent, ValueProposition, CoreArea, ServicePageContent,
  PersonProfile, ContactInfo, ContactFormField, AboutTeaser,
  CtaBanner
} from '../models/content.model';

@Injectable({ providedIn: 'root' })
export class ContentService {

  // === HOME ===

  getHero(): HeroContent {
    return {
      headline: 'Prüfen.\nBeraten.\nSteuern.',
      subline: 'Wirtschaftsprüfung und Beratung für den Mittelstand — persönlich, pragmatisch und auf Augenhöhe.',
      ctaText: 'Gespräch vereinbaren',
      ctaLink: '/kontakt',
      secondaryCtaText: 'Leistungen entdecken',
      secondaryCtaLink: '/wirtschaftspruefung'
    };
  }

  getValuePropositions(): ValueProposition[] {
    return [
      {
        icon: 'handshake',
        title: 'Persönlich',
        description: 'Direkte Zusammenarbeit mit Ihrer Wirtschaftsprüferin — keine wechselnden Ansprechpartner, keine anonymen Teams.'
      },
      {
        icon: 'target',
        title: 'Pragmatisch',
        description: 'Prüfungsansatz angepasst auf Größe und Komplexität Ihres Unternehmens. Kein Schema F, sondern echtes Hineindenken.'
      },
      {
        icon: 'eye',
        title: 'Auf Augenhöhe',
        description: 'Sparringspartnerin für betriebswirtschaftliche Entwicklung und strategische Entscheidungen — nicht nur Prüferin.'
      },
      {
        icon: 'building',
        title: 'Mittelstandsfokus',
        description: 'Spezialisiert auf die Strukturen, Herausforderungen und Chancen mittelständischer Unternehmen in der Region.'
      }
    ];
  }

  getCoreAreas(): CoreArea[] {
    return [
      {
        id: 'wirtschaftspruefung',
        title: 'Wirtschaftsprüfung',
        subtitle: 'Prüfen',
        description: 'Gesetzliche und freiwillige Jahresabschlussprüfung mit einem Ansatz, der zu Ihrem Unternehmen passt. Echtes Reindenken statt überdimensionierter Checklisten.',
        accentColor: 'primary',
        link: '/wirtschaftspruefung',
        icon: 'search'
      },
      {
        id: 'beratung',
        title: 'Beratung',
        subtitle: 'Beraten',
        description: 'Controlling, Organisationsoptimierung und Coaching für Ihre Buchhaltung. Damit gute Entscheidungen kein Zufall sind, sondern gut vorbereitet.',
        accentColor: 'accent-blue',
        link: '/beratung',
        icon: 'lightbulb'
      },
      {
        id: 'steuern',
        title: 'Steuern',
        subtitle: 'Steuern',
        description: 'Steuerbelastungen in Planungen und Entscheidungen mitdenken — von der Liquiditätsplanung bis zum täglichen Geschäftsbetrieb.',
        accentColor: 'accent-green',
        link: '/steuern',
        icon: 'compass'
      }
    ];
  }

  getAboutTeaser(): AboutTeaser {
    return {
      headline: 'Wiebke Lefevre',
      text: 'Aufgewachsen in der Prozessprüfung und der Begleitung mittelständischer Unternehmen. Meine Leidenschaft liegt im Verstehen unterschiedlicher Geschäfts- und Organisationsmodelle im regionalen Mittelstand.',
      ctaText: 'Mehr erfahren',
      ctaLink: '/ueber-mich',
      image: {
        src: 'https://placehold.co/480x600/FAF8F5/1A2744?text=Wiebke+Lefevre',
        alt: 'Wiebke Lefevre — Wirtschaftsprüferin',
        width: 480,
        height: 600
      }
    };
  }

  getContactCta(): CtaBanner {
    return {
      headline: 'Lassen Sie uns ins Gespräch kommen.',
      text: 'Ob Pflichtprüfung, Beratungsbedarf oder eine Frage zur Steuerplanung — ich freue mich auf Ihre Nachricht.',
      ctaText: 'Kontakt aufnehmen',
      ctaLink: '/kontakt',
      variant: 'dark'
    };
  }

  // === WIRTSCHAFTSPRÜFUNG ===

  getWirtschaftspruefung(): ServicePageContent {
    return {
      heroTitle: 'Wirtschaftsprüfung',
      heroSubtitle: 'Prüfen mit Verstand — nicht nach Schema F.',
      accentColor: 'primary',
      intro: 'Ob gesetzliche Pflichtprüfung oder freiwillige Prüfung des Jahresabschlusses: Mein Prüfungsansatz ist auf die Größe und Komplexität Ihres Unternehmens zugeschnitten. Keine überdimensionierten Checklisten, sondern echtes Reindenken in Ihr Unternehmen.',
      sections: [
        {
          title: 'Jahresabschlussprüfung',
          content: 'Als kleine Kanzlei biete ich Ihnen einen unkomplizierten, pragmatischen Prüfungsansatz. Der Fokus liegt auf dem Wesentlichen — angepasst an die Besonderheiten und Umstände Ihres Unternehmens.',
          bulletPoints: [
            'Gesetzliche Pflichtprüfung und freiwillige Prüfung',
            'Prüfungsansatz individuell auf Ihr Unternehmen zugeschnitten',
            'Direkte Zusammenarbeit mit Ihrer Wirtschaftsprüferin'
          ]
        },
        {
          title: 'Prozesse und Kontrollen',
          content: 'Ein unabhängiger Review der Prozesse rund um Ihre Buchhaltung und Jahresabschlusserstellung gibt Ihnen Sicherheit. Ich schaue auf die Funktionalität und Ausgestaltung Ihres Internen Kontrollsystems und identifiziere Verbesserungspotenziale.',
          bulletPoints: [
            'Review der Buchhaltungsprozesse',
            'Bewertung des Internen Kontrollsystems',
            'Konkrete Empfehlungen zur Optimierung'
          ]
        },
        {
          title: 'Sparringspartner auf Augenhöhe',
          content: 'Die Jahresabschlussprüfung ist mehr als Pflichterfüllung. Nutzen Sie den Dialog mit Ihrer Prüferin zur Diskussion der betriebswirtschaftlichen Entwicklung und strategischen Entscheidungen.',
          highlighted: true
        }
      ],
      ctaText: 'Sprechen wir über Ihre Prüfung'
    };
  }

  // === BERATUNG ===

  getBeratung(): ServicePageContent {
    return {
      heroTitle: 'Beratung',
      heroSubtitle: 'Gute Entscheidungen sind kein Zufall — sie sind gut vorbereitet.',
      accentColor: 'accent-blue',
      intro: 'Eine Buchhaltung ist kein Zahlenfriedhof, sondern eine wertvolle Informationsquelle. Machen wir diese gemeinsam nutzbar.',
      sections: [
        {
          title: 'Controlling & Informationsmanagement',
          content: 'Ausarbeitung individueller Konzepte für Ihr internes Controlling und Informationsmanagement. Das Ziel: Immer die Informationen bekommen, die Sie für Ihre Entscheidungen brauchen — aufbereitet, aktuell, auf den Punkt.',
          bulletPoints: [
            'Individuelle Controlling-Konzepte',
            'Chefreporting auf den Punkt gebracht',
            'Informationsmanagement, das zu Ihrem Unternehmen passt'
          ]
        },
        {
          title: 'Organisationsoptimierung',
          content: 'Läuft bei Ihnen noch alles über den Schreibtisch des Chefs? Gerade bei erfolgreich wachsenden Unternehmen kann das schnell zur Belastung werden — die Stunden im Büro werden immer mehr, man wird zum begrenzenden Faktor der eigenen Unternehmung. Dazu kommt das Gefühl, den Überblick zu verlieren.\n\nWer nur Arbeit delegiert, nicht auch Entscheidungen, steht schnell wieder am selben Punkt. Ich helfe Ihnen, belastbare Systeme aufzubauen, die wirklich voranbringen.',
          bulletPoints: [
            'Digitale Workflows und Kompetenzstrukturen',
            'Automatisierte und manuelle Kontrollen an den richtigen Stellen',
            'Klare Aufgabenverteilung und Kommunikation der Erwartungen',
            'Eigenverantwortliches Arbeiten als Motivation und Entlastung zugleich'
          ],
          highlighted: true
        },
        {
          title: 'Coaching für die Buchhaltung',
          content: 'Sie haben ein Team für die eigene Buchhaltung im Haus und der Jahresabschluss wird noch vom Steuerberater erstellt? Spätestens wenn die Gesellschaft die Grenzen zur Prüfungspflicht erreicht, bedeutet das zusätzliche Kosten, Verzögerungen und verlängerte Wege bei Rückfragen.\n\nDabei wäre Ihr Team technisch und fachlich in der Lage, die Abschlussbuchungen selbst zu bearbeiten. Ich coache Ihre Buchhaltung auf Abschlussniveau.',
          bulletPoints: [
            'Abstimmungen und Abschlussbuchungen',
            'Rückstellungsberechnung und Vorratsbewertung',
            'Optimale Vorbereitung der Abschlussprüfung',
            'Unterjährige Auswertungen durch Abgrenzungen verbessern',
            'Arbeitspapiere und Nachweise für eine effiziente Prüfung',
            'Know-How Transfer und Dokumentation'
          ]
        }
      ],
      ctaText: 'Sprechen wir über Ihren Beratungsbedarf'
    };
  }

  // === STEUERN ===

  getSteuern(): ServicePageContent {
    return {
      heroTitle: 'Steuern',
      heroSubtitle: 'Steuern mitdenken — nicht nur zahlen.',
      accentColor: 'accent-green',
      intro: 'Unternehmenssteuerung bedeutet: Informationsgewinnung und Aufarbeitung, Entscheidungen vorbereiten, Planen und Reflektieren. Die Steuern sind Teil des Unternehmens und müssen bei der Steuerung mitgedacht werden.',
      sections: [
        {
          title: 'Steuern in der Unternehmenssteuerung',
          content: 'Sei es bei Liquiditätsplanung, Investitionsentscheidungen oder im täglichen Geschäftsbetrieb — Steuerbelastungen gehören in Planungen und Entscheidungen einbezogen. Vorauszahlungen und Termine so managen, dass der Steuerbescheid keine bösen Überraschungen bereithält.',
          bulletPoints: [
            'Steuerbelastungen in Planungen und Entscheidungen einbeziehen',
            'Liquiditätsplanung unter Berücksichtigung steuerlicher Effekte',
            'Vorausschauendes Management von Vorauszahlungen und Fristen'
          ]
        }
      ],
      ctaText: 'Sprechen wir über Ihre Steuerplanung'
    };
  }

  // === ÜBER MICH ===

  getProfile(): PersonProfile {
    return {
      name: 'Wiebke Lefevre',
      title: 'Wirtschaftsprüferin',
      image: {
        src: 'https://placehold.co/480x600/FAF8F5/1A2744?text=Wiebke+Lefevre',
        alt: 'Wiebke Lefevre — Wirtschaftsprüferin',
        width: 480,
        height: 600
      },
      statement: 'Aufgewachsen in der Prozessprüfung und der Begleitung von mittelständischen Unternehmen, liegt meine Leidenschaft im Verstehen unterschiedlicher Geschäfts- und Organisationsmodelle im regionalen Mittelstand. Wichtig sind mir der persönliche Kontakt und das Zusammentreffen auf Augenhöhe mit den Mandanten. Aufgrund dieses Verständnisses ist es mir besonders wichtig, den Prüfungsansatz auf die Besonderheiten, die Größe und die jeweiligen Umstände der Mandanten anzupassen.',
      timeline: [
        { period: 'Seit 2026', title: 'WPL — Wirtschaftsprüfung Lefevre', description: 'Selbständige Wirtschaftsprüferin in Rottweil' },
        { period: '2024 – 2025', title: 'Vorbereitung der Selbständigkeit' },
        { period: 'Herbst 2023', title: 'Bestellung zur Wirtschaftsprüferin' },
        { period: '2014 – 2024', title: 'WSS Aktiv Beraten / Euregio Südwest GmbH, Rottweil', description: 'Prüfung und Beratung im Mittelstand für den Mittelstand' },
        { period: 'Davor', title: 'Interne Revision, Volksbank Donau Neckar' },
        { period: 'Studium', title: 'BWL an der DHBW Villingen-Schwenningen', description: 'Fachrichtung Banken und Bausparkassen' }
      ]
    };
  }

  // === KONTAKT ===

  getContactInfo(): ContactInfo {
    return {
      companyName: 'Wirtschaftsprüfungsgesellschaft Lefevre',
      owner: 'Wiebke Lefevre',
      street: '[Straße + Hausnr.]',
      zip: '[PLZ]',
      city: 'Rottweil',
      phone: '[Telefonnummer]',
      email: '[E-Mail-Adresse]'
    };
  }

  getContactFormFields(): ContactFormField[] {
    return [
      { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Ihr vollständiger Name' },
      { name: 'company', label: 'Unternehmen', type: 'text', required: false, placeholder: 'Ihr Unternehmen (optional)' },
      { name: 'email', label: 'E-Mail', type: 'email', required: true, placeholder: 'ihre@email.de' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: false, placeholder: 'Für Rückfragen (optional)' },
      { name: 'subject', label: 'Anliegen', type: 'select', required: true, options: ['Wirtschaftsprüfung', 'Beratung', 'Steuern', 'Sonstiges'] },
      { name: 'message', label: 'Nachricht', type: 'textarea', required: true, placeholder: 'Wie kann ich Ihnen helfen?' }
    ];
  }
}
```

### `src/app/app.config.ts`

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' }))
  ]
};
```

### `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Wirtschaftsprüfungsgesellschaft Lefevre — Prüfen · Beraten · Steuern' },
  { path: 'wirtschaftspruefung', loadComponent: () => import('./pages/wirtschaftspruefung/wirtschaftspruefung.component').then(m => m.WirtschaftspruefungComponent), title: 'Wirtschaftsprüfung — WPL Lefevre' },
  { path: 'beratung', loadComponent: () => import('./pages/beratung/beratung.component').then(m => m.BeratungComponent), title: 'Beratung — WPL Lefevre' },
  { path: 'steuern', loadComponent: () => import('./pages/steuern/steuern.component').then(m => m.SteuernComponent), title: 'Steuern — WPL Lefevre' },
  { path: 'ueber-mich', loadComponent: () => import('./pages/ueber-mich/ueber-mich.component').then(m => m.UeberMichComponent), title: 'Über mich — WPL Lefevre' },
  { path: 'kontakt', loadComponent: () => import('./pages/kontakt/kontakt.component').then(m => m.KontaktComponent), title: 'Kontakt — WPL Lefevre' },
  { path: 'impressum', loadComponent: () => import('./pages/impressum/impressum.component').then(m => m.ImpressumComponent), title: 'Impressum — WPL Lefevre' },
  { path: 'datenschutz', loadComponent: () => import('./pages/datenschutz/datenschutz.component').then(m => m.DatenschutzComponent), title: 'Datenschutz — WPL Lefevre' },
  { path: '**', redirectTo: '' }
];
```

### `src/app/app.component.ts`

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
```

### `src/app/app.component.html`

```html
<app-header />
<main>
  <router-outlet />
</main>
<app-footer />
```

---

## Phase B — Shared Components

### TASK
```
Implementiere alle Shared Components. Beachte die Design-Prinzipien:
- Font-Mix: DM Sans (font-sans) für Headings/UI, Source Serif 4 (font-serif) für Body
- Organische Rundungen: rounded-2xl bei Karten, rounded-full bei Buttons
- Header: fixed, transparent → bg-white/95 backdrop-blur-md bei Scroll (via scrolled signal)
- Footer: Dark Section (bg-secondary)
- Alle Hover-Transitions: duration-300

Reihenfolge:
1. header.component.ts → header.component.html
2. footer.component.ts → footer.component.html
3. section-intro.component.ts → section-intro.component.html
4. cta-banner.component.ts → cta-banner.component.html
```

### HeaderComponent

**`header.component.ts`:** Standalone, imports RouterLink + RouterLinkActive. Injiziert NavigationService. Signals: `mobileMenuOpen`, `dropdownOpen`, `scrolled`. `@HostListener('window:scroll')` setzt `scrolled` auf `window.scrollY > 20`. Methoden: `toggleMobileMenu()`, `toggleDropdown()`, `closeMobileMenu()`.

**`header.component.html`:** `<header>` mit `fixed top-0 left-0 right-0 z-50 transition-all duration-300`. Dynamische Klasse: `scrolled() ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'`.

Innen `container-page`, flex zwischen Logo und Nav, Höhe `h-20 md:h-24`.

**Logo:** `<a routerLink="/">` mit zwei `<span>`-Zeilen: "Wirtschaftsprüfungsgesellschaft" und "Lefevre", jeweils `font-sans font-bold text-secondary text-base md:text-lg tracking-tight`. Auf Mobile (`sm:hidden`): "WPL" statt des vollen Namens.

**Desktop-Nav** (`hidden lg:flex items-center gap-10`): Items aus navItems. Bei `item.children`: Button mit Chevron, Dropdown-Panel als `absolute top-full left-1/2 -translate-x-1/2 mt-4 w-60 bg-white rounded-2xl shadow-xl border border-border-light py-3 px-2`. Links im Dropdown: `rounded-xl`, Hover `bg-background-warm`. Ohne Children: einfacher RouterLink. Am Ende: `<a routerLink="/kontakt" class="btn-primary text-sm !py-3 !px-6">Kontakt</a>`.

**Mobile Hamburger** (`lg:hidden`): SVG-Icon, X bei offen, Striche bei geschlossen.

**Mobile Menu** (`@if mobileMenuOpen()`): Unter dem Header, mit `border-t border-border-light`. Items als Blocks mit `rounded-xl`, Leistungen aufklappbar. Am Ende volle Breite `btn-primary`.

**Spacer:** Nach `</header>` ein `<div class="h-20 md:h-24"></div>` um den fixed Header auszugleichen.

### FooterComponent

**`footer.component.ts`:** Injiziert NavigationService + ContentService. `links` = `getFooterLinks()` (gibt `{ leistungen, weiteres }` zurück). `contact` = `getContactInfo()`. `currentYear`.

**`footer.component.html`:** `<footer class="bg-secondary text-white">`, `container-page py-16 md:py-24`.

12-Spalten-Grid: Spalte 1 (5 cols): Schriftzug "Wirtschaftsprüfungsgesellschaft Lefevre" als weiße `font-sans font-bold text-lg`, darunter "Prüfen · Beraten · Steuern" in `text-white/50 font-serif text-sm`, dann Adresse als `<address>` in `text-white/50`. Spalte 2 (3 cols, start 7): "Leistungen" als Überschrift in `font-sans text-xs uppercase tracking-widest text-white/30`, darunter Links. Spalte 3 (3 cols): "Weiteres", gleicher Stil.

Copyright-Zeile: `mt-16 pt-8 border-t border-white/10`, flex mit Copyright links und Impressum/Datenschutz rechts, alles in `text-white/30 text-xs`.

### SectionIntroComponent

**`section-intro.component.ts`:** Standalone. Inputs: `label` (optional string), `title` (required string), `body` (optional string), `centered` (boolean, default false), `labelColor` (string, default 'text-primary').

**`section-intro.component.html`:** Container-div mit `mb-16`. Wenn `centered()`: `text-center max-w-3xl mx-auto`, sonst `max-w-2xl`. Optional Label als `<p class="label-text mb-3" [class]="labelColor()">`. Title als `<h2 class="heading-1 mb-4">`. Optional Body als `<p class="body-text text-lg">`.

### CtaBannerComponent

**`cta-banner.component.ts`:** Standalone, imports RouterLink. Input: `content` (required CtaBanner).

**`cta-banner.component.html`:** `<section class="relative overflow-hidden">` mit dynamischer Klasse für `dark` (bg-secondary) oder `light` (bg-background-warm).

Dekorativer Blob im Hintergrund: `<div class="blob-decoration w-96 h-96 -top-48 -right-48">` mit `bg-white` (dark) oder `bg-primary` (light).

Layout: `container-page section-padding relative z-10`. Flex-Row auf Desktop (items-center justify-between), Column auf Mobile. Links: max-w-xl mit Headline (`font-sans text-2xl md:text-3xl lg:text-4xl font-bold`, weiß oder secondary) und Body (`font-serif text-lg`, white/70 oder text-light). Rechts: `btn-light` (dark) oder `btn-primary` (light).

---

## Phase C — Home

### TASK
```
Implementiere HomeComponent und alle Sub-Komponenten.
Design-Schwerpunkte:
- Hero als DARK SECTION (bg-secondary) mit oversized Typografie (font-sans text-7xl)
- Headline mit whitespace-pre-line für Zeilenumbrüche
- Asymmetrisches 7/5 Grid im Hero
- Dekorative Blob-SVGs im Hintergrund
- Karten mit card-hover und farbigem border-t-4
- Value Propositions: offen und luftig, keine Karten
- About-Teaser: 5/7 Grid, Bild links

Reihenfolge:
1. home.component.ts → home.component.html
2. hero.component.ts → hero.component.html
3. value-proposition.component.ts → value-proposition.component.html
4. core-areas.component.ts → core-areas.component.html
5. about-teaser.component.ts → about-teaser.component.html
6. contact-cta.component.ts → contact-cta.component.html
```

### HomeComponent

**`home.component.ts`:** Importiert alle Sub-Komponenten. **`home.component.html`:**

```html
<app-hero />
<app-value-proposition />
<app-core-areas />
<app-about-teaser />
<app-contact-cta />
```

### HeroComponent

**`hero.component.ts`:** Injiziert ContentService, `hero: HeroContent`.

**`hero.component.html`:** DARK SECTION. `<section class="relative bg-secondary overflow-hidden">`.

Zwei dekorative Blobs: `<div class="blob-decoration w-[600px] h-[600px] bg-primary -top-64 -left-64">` und `<div class="blob-decoration w-[400px] h-[400px] bg-accent-blue -bottom-32 right-0">`.

`container-page py-24 md:py-36 lg:py-44 relative z-10`. Grid: `grid-cols-1 lg:grid-cols-12 gap-12 items-center`.

**Text (7 cols / `lg:col-span-7`):** `<h1 class="font-sans text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight whitespace-pre-line mb-6">`. Subline: `font-serif text-lg md:text-xl text-white/70 leading-relaxed max-w-lg mb-10`. Zwei CTAs: `btn-primary` + `btn-light`.

**Dreieck-Motiv (5 cols / `lg:col-span-5`, `hidden lg:flex`):** SVG viewBox="0 0 400 400", Klasse `w-72 xl:w-80`. Vier Polygone:
- Orange: `points="30,30 210,30 210,210"` fill=var(--color-primary) opacity=0.85
- Blau: `points="230,60 370,60 370,200"` fill=var(--color-accent-blue) opacity=0.7
- Gelb: `points="60,240 180,370 60,370"` fill=var(--color-accent-yellow) opacity=0.65
- Grün: `points="220,230 360,230 360,370"` fill=var(--color-accent-green) opacity=0.7

### ValuePropositionComponent

**`value-proposition.component.ts`:** Injiziert ContentService, `items: ValueProposition[]`.

**`value-proposition.component.html`:** `section-padding bg-white`. `container-page`. Grid: 1 col → sm:2 → lg:4, `gap-12 lg:gap-8`.

Pro Item: Icon-Kreis (`w-14 h-14 rounded-full bg-primary-light`, SVG `w-6 h-6 text-primary`), Titel (`font-sans text-lg font-semibold text-secondary mb-2`), Beschreibung (`font-serif text-sm text-text-light leading-relaxed`). Kein Karten-Look.

> **Hinweis an Claude Code:** Ersetze SVG-Paths je nach `item.icon`: handshake → Handschlag, target → Zielscheibe, eye → Auge, building → Gebäude. Heroicons outline 24x24.

### CoreAreasComponent

**`core-areas.component.ts`:** Importiert RouterLink + SectionIntroComponent. Injiziert ContentService, `areas: CoreArea[]`.

**`core-areas.component.html`:** `section-padding bg-background-warm`. `container-page`.

`<app-section-intro label="Was wir tun" title="Drei Perspektiven. Ein Ziel." body="Wirtschaftsprüfung, Beratung und Steuerplanung — individuell auf Ihr Unternehmen zugeschnitten." />`

Grid: `grid-cols-1 md:grid-cols-3 gap-6 md:gap-8`. Pro Karte: `card-hover border-t-4` mit `[style.border-top-color]="'var(--color-' + area.accentColor + ')'"`. Label-Text in Akzentfarbe, heading-3, font-serif Beschreibung, Link mit Pfeil-SVG.

### AboutTeaserComponent

**`about-teaser.component.ts`:** Importiert RouterLink. Injiziert ContentService.

**`about-teaser.component.html`:** `section-padding bg-white`. Asymmetrisches 12-Spalten-Grid. Bild links (5 cols): `rounded-2xl shadow-lg w-full`. Text rechts (7 cols): Label "Über mich" in `label-text text-primary`, heading-1, body-text, link-underline mit Pfeil.

### ContactCtaComponent

Wrapper um `<app-cta-banner [content]="cta" />`. CTA-Daten aus `contentService.getContactCta()`.

---

## Phase D — Pages

### TASK
```
Implementiere alle Page-Komponenten.
Design-Schwerpunkte:
- Service-Pages: Hero mit sanftem Farbton-Hintergrund (accent-*-light), Label + heading-display + Subtitle
- Dekorativer Blob im Hero-Hintergrund
- Intro-Text als font-serif text-xl md:text-2xl, zentriert
- Sektionen alternierend bg-white / bg-background-warm
- Highlighted Sections: border-l-4 in Akzentfarbe + pl-8 md:pl-12
- Bullet-Listen: Häkchen-SVG in Akzentfarbe
- Über mich: 5/7 Grid, Timeline mit vertikaler Linie und alternierenden Einträgen
- Kontakt: 8/4 Grid, Formular in card, Inputs mit rounded-xl + focus:ring-2 ring-primary/20
- Legal Pages: Schlicht, container-narrow, space-y-10

Reihenfolge:
1. Beratung (umfangreichste Seite)
2. Wirtschaftsprüfung
3. Steuern
4. Über mich
5. Kontakt
6. Impressum
7. Datenschutz
Pro Seite: .ts → .html
```

### Service-Page Pattern (gilt für WP, Beratung, Steuern)

Alle drei Service-Pages folgen demselben Layout-Pattern:

**Hero:** `section-padding` + `bg-[accent-*-light]` + `relative overflow-hidden`. Blob-Decoration im Hintergrund. `container-page relative z-10`. Linksbündig: Label (`label-text` in Akzentfarbe), `heading-display`, Subtitle (`font-serif text-xl md:text-2xl text-text-light`).

**Intro:** `section-padding bg-white`. `container-narrow`. Zentrierter Text: `font-serif text-xl md:text-2xl text-text-light leading-relaxed text-center`.

**Sektionen:** `@for`-Loop über `page.sections`. Alternierender Hintergrund (`odd ? 'bg-background-warm' : 'bg-white'`). `container-page`, Inhalt in `max-w-3xl`. Highlighted: `border-l-4` in Akzentfarbe + `pl-8 md:pl-12`. Titel als `heading-2 mb-6`. Content-Paragraphen via `section.content.split('\\n\\n')`. Bullet-Points als Liste mit Häkchen-SVG in Akzentfarbe.

**CTA:** `<app-cta-banner>` mit variant 'dark'.

Farbzuordnung: Wirtschaftsprüfung = `primary`/`primary-light`, Beratung = `accent-blue`/`accent-blue-light`, Steuern = `accent-green`/`accent-green-light`.

### BeratungComponent

**`.ts`:** Injiziert ContentService, `page = getBeratung()`. CTA-Objekt mit `variant: 'dark'`. Importiert CtaBannerComponent.

**`.html`:** Folgt Service-Page Pattern mit `accent-blue`. Label "Beraten". Blob: `bg-accent-blue`. Highlighted Section (Organisationsoptimierung): `border-l-4 border-accent-blue`.

### WirtschaftspruefungComponent

**`.ts/.html`:** Wie Beratung, aber mit `primary`. Label "Prüfen". Blob: `bg-primary`.

### SteuernComponent

**`.ts/.html`:** Wie Beratung, aber mit `accent-green`. Label "Steuern". Blob: `bg-accent-green`.

### UeberMichComponent

**`.ts`:** Injiziert ContentService, `profile = getProfile()`. CTA-Objekt. Importiert CtaBannerComponent.

**`.html`:**

**Profil-Sektion:** `section-padding bg-background-warm relative overflow-hidden`. Blob. 12-Spalten-Grid: Bild (5 cols, `rounded-2xl shadow-lg`), Text (7 cols) mit Label "Über mich", `heading-display` Name, `font-sans text-lg font-semibold text-primary` Titel, `font-serif text-lg text-text-light` Statement.

**Werdegang:** `section-padding bg-white`. `container-narrow`. `heading-1 text-center mb-16` "Werdegang".

Timeline: `relative`-Container. Vertikale Linie: `absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2`.

`@for` über `profile.timeline` mit `let even = $even`. Pro Eintrag: `relative flex items-start mb-12 last:mb-0`. Punkt: `absolute left-5 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-1 z-10 ring-4 ring-white`. Content-Div: `ml-14 md:ml-0 md:w-1/2`, alternierend `md:pr-16 md:text-right` (even) oder `md:pl-16 md:ml-auto` (odd). Period als `label-text text-primary`, Title als `font-sans text-lg font-semibold text-secondary mt-1`, optional Description.

Am Ende: CTA-Banner.

### KontaktComponent

**`.ts`:** Injiziert ContentService. `contact`, `fields`. FormsModule importiert. `formData: Record<string, string>`. `submitted = signal(false)`. `onSubmit()` loggt und setzt submitted.

**`.html`:** `section-padding bg-background-warm`. Linksbündiger Header: Label "Kontakt", `heading-display` "Schreiben Sie mir.", body-text.

12-Spalten-Grid: Formular (8 cols) in `card`. Wenn `submitted()`: Erfolgsmeldung mit grünem Häkchen, heading-2, body-text. Sonst: Grid 1→md:2, Felder per `@for`. Textarea und Select über volle Breite (`md:col-span-2`).

Input-Styling: `w-full px-5 py-3.5 border border-border rounded-xl font-serif text-text focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 placeholder:text-text-muted`. Select: `font-sans bg-white`. Button: `btn-primary w-full mt-8`.

Kontaktdaten (4 cols) in `card`: Firma, Name, Trennlinie (`w-12 h-px bg-border`), Adresse, Trennlinie, Telefon/Mail als `text-primary`.

### ImpressumComponent

**`.ts`:** Injiziert ContentService, `contact`.

**`.html`:** `section-padding bg-white`. `container-narrow`. `heading-1 mb-12`. `space-y-10` mit Abschnitten: Angaben gem. § 5 DDG, Kontakt, Berufsbezeichnung (Wirtschaftsprüferin, verliehen in BRD), Zuständige Aufsichtsbehörde (WPK Berlin, Link), Berufsrechtliche Regelungen (WPO, BS WP/vBP), USt-IdNr. [Platzhalter], Haftungsausschluss. Alle Texte als `body-text`. Links als `text-primary hover:text-primary-dark`.

### DatenschutzComponent

**`.ts`:** Injiziert ContentService, `contact`.

**`.html`:** `section-padding bg-white`. `container-narrow`. `heading-1 mb-12`. `space-y-10`. Abschnitte: 1. Verantwortliche Stelle, 2. Erhebung personenbezogener Daten (Server-Logfiles), 3. Kontaktformular (Art. 6 Abs. 1 lit. b DSGVO), 4. Hosting [Platzhalter für Provider, Vercel-Text vorformuliert], 5. Ihre Rechte, 6. SSL/TLS, 7. Analyse-Tools [Platzhalter].

---

## Content-Anhang

### Bildplatzhalter

| Kontext | URL | Dimensionen | Alt-Text |
|---|---|---|---|
| Porträt Wiebke Lefevre | `https://placehold.co/480x600/FAF8F5/1A2744?text=Wiebke+Lefevre` | 480x600 | Wiebke Lefevre — Wirtschaftsprüferin |

### Logo

Kein Bild-Logo im Header. Stattdessen Textschriftzug "Wirtschaftsprüfungsgesellschaft Lefevre" in DM Sans Bold. Mobile: "WPL Lefevre".

---

## Handoff

```
Implementierung mit Claude Code:
1. Modell auf Sonnet umstellen
2. ng new wpl-beraten --standalone --routing --style=css
3. Tailwind CSS 4 installieren:
   npm install tailwindcss @tailwindcss/postcss postcss
4. .postcssrc.json anlegen (siehe Phase A)
5. Claude Code mit Phase A briefen — eine Phase pro Gespräch
6. Icons: Claude Code soll passende Heroicons (outline, 24x24) basierend auf icon-Feldern einsetzen
7. link-underline: CSS ::after Pseudo-Element mit animierter Breite implementieren
```
