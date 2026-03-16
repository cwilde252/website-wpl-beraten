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
