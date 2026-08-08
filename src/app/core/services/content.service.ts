import { Injectable } from '@angular/core';
import { CareerEntry } from '../models/career-entry.model';
import { ContactInfo } from '../models/contact-info.model';
import { DisplayHeadline } from '../models/display-headline.model';
import { FaqItem } from '../models/faq-item.model';
import { LegalSection } from '../models/legal-section.model';
import { Position } from '../models/position.model';
import { Profile } from '../models/profile.model';
import { PageKey, SeoMeta } from '../models/seo-meta.model';
import { ServiceArea } from '../models/service-area.model';

/**
 * Einzige Textquelle der Anwendung. Templates enthalten nur strukturelle Strings.
 * Fehlende Angaben sind leere Strings und werden per `@if` ausgeblendet — nie als
 * Platzhalter ausgeliefert (siehe PRODUCT.md, Voice-Regel 5).
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  // ===== Kontakt ==========================================================

  getContactInfo(): ContactInfo {
    return {
      legalName: 'Wiebke Lefevre — Wirtschaftsprüferin',
      personName: 'Wiebke Lefevre',
      role: 'Wirtschaftsprüferin',
      // Anschrift, Telefon, E-Mail und USt-IdNr. stehen noch aus — siehe
      // FRAGEN-AN-WIEBKE.md. Bis dahin blenden alle Templates die Blöcke aus.
      street: '',
      postalCode: '',
      city: 'Rottweil',
      phone: '',
      phoneDisplay: '',
      email: '',
      vatId: '',
    };
  }

  // ===== Headlines ========================================================

  getHomeHeadline(): DisplayHeadline {
    return { lines: ['Prüfen.', 'Beraten.', 'Steuern.'] };
  }

  getHomeLead(): string {
    return 'Wirtschaftsprüfung und Beratung für den Mittelstand — persönlich, pragmatisch und auf Augenhöhe.';
  }

  getLeistungenHeadline(): DisplayHeadline {
    return { lines: ['Drei Perspektiven', 'auf dasselbe', 'Unternehmen.'] };
  }

  getUeberMichHeadline(): DisplayHeadline {
    return { lines: ['Wiebke Lefevre,', 'Wirtschaftsprüferin', 'in Rottweil.'] };
  }

  getKontaktHeadline(): DisplayHeadline {
    return { lines: ['Reden wir', 'über Ihr Unternehmen.'] };
  }

  // ===== Haltung ==========================================================

  getPositions(): Position[] {
    return [
      {
        ref: '01',
        title: 'Persönlich',
        description:
          'Sie arbeiten direkt mit mir — nicht mit wechselnden Ansprechpartnern und nicht mit einem Team, das Sie nie zu Gesicht bekommen.',
      },
      {
        ref: '02',
        title: 'Pragmatisch',
        description:
          'Den Prüfungsansatz schneide ich auf Größe und Komplexität Ihres Unternehmens zu. Kein Schema F, sondern echtes Hineindenken.',
      },
      {
        ref: '03',
        title: 'Auf Augenhöhe',
        description:
          'Ich bin Sparringspartnerin für betriebswirtschaftliche Entwicklung und strategische Entscheidungen, nicht nur Prüferin.',
      },
      {
        ref: '04',
        title: 'Im Mittelstand zu Hause',
        description:
          'Ich kenne die Strukturen, Herausforderungen und Chancen mittelständischer Unternehmen in der Region.',
      },
    ];
  }

  // ===== Leistungsbereiche ================================================

  getServiceAreas(): ServiceArea[] {
    return [
      {
        ref: '01',
        slug: 'wirtschaftspruefung',
        accent: 'pruefung',
        title: 'Wirtschaftsprüfung',
        claim: 'Prüfen mit Verstand — nicht nach Schema F.',
        intro:
          'Ob gesetzliche Pflichtprüfung oder freiwillige Prüfung des Jahresabschlusses: Mein Prüfungsansatz ist auf die Größe und Komplexität Ihres Unternehmens zugeschnitten. Keine überdimensionierten Checklisten, sondern echtes Reindenken in Ihr Unternehmen.',
        blocks: [
          {
            title: 'Jahresabschlussprüfung',
            paragraphs: [
              'Als kleine Kanzlei biete ich Ihnen einen unkomplizierten, pragmatischen Prüfungsansatz. Der Fokus liegt auf dem Wesentlichen, angepasst an die Besonderheiten und Umstände Ihres Unternehmens.',
            ],
            points: [
              'Gesetzliche Pflichtprüfung und freiwillige Prüfung',
              'Prüfungsansatz individuell auf Ihr Unternehmen zugeschnitten',
              'Direkte Zusammenarbeit mit Ihrer Wirtschaftsprüferin',
            ],
          },
          {
            title: 'Prozesse und Kontrollen',
            paragraphs: [
              'Ein unabhängiger Review der Prozesse rund um Ihre Buchhaltung und Jahresabschlusserstellung gibt Ihnen Sicherheit. Ich schaue auf Funktionalität und Ausgestaltung Ihres internen Kontrollsystems und zeige Ihnen, wo Verbesserungspotenzial liegt.',
            ],
            points: [
              'Review der Buchhaltungsprozesse',
              'Bewertung des internen Kontrollsystems',
              'Konkrete Empfehlungen zur Optimierung',
            ],
          },
          {
            title: 'Sparringspartnerin auf Augenhöhe',
            paragraphs: [
              'Die Jahresabschlussprüfung ist mehr als Pflichterfüllung. Nutzen Sie den Dialog mit Ihrer Prüferin, um über die betriebswirtschaftliche Entwicklung und anstehende Entscheidungen zu sprechen.',
            ],
          },
        ],
        mailSubject: 'Anfrage Wirtschaftsprüfung',
        ctaLabel: 'Über Ihre Prüfung sprechen',
      },
      {
        ref: '02',
        slug: 'beratung',
        accent: 'beratung',
        title: 'Beratung',
        claim: 'Gute Entscheidungen sind kein Zufall — sie sind gut vorbereitet.',
        intro:
          'Eine Buchhaltung ist kein Zahlenfriedhof, sondern eine wertvolle Informationsquelle. Machen wir sie gemeinsam nutzbar.',
        blocks: [
          {
            title: 'Controlling und Informationsmanagement',
            paragraphs: [
              'Ich arbeite mit Ihnen ein Konzept für Ihr internes Controlling und Ihr Informationsmanagement aus. Das Ziel: Sie bekommen immer die Informationen, die Sie für Ihre Entscheidungen brauchen — aufbereitet, aktuell, auf den Punkt.',
            ],
            points: [
              'Individuelle Controlling-Konzepte',
              'Chefreporting auf den Punkt gebracht',
              'Informationsmanagement, das zu Ihrem Unternehmen passt',
            ],
          },
          {
            title: 'Organisationsoptimierung',
            paragraphs: [
              'Läuft bei Ihnen noch alles über den Schreibtisch des Chefs? Gerade bei erfolgreich wachsenden Unternehmen wird das schnell zur Belastung: Die Stunden im Büro werden mehr, man wird zum begrenzenden Faktor der eigenen Unternehmung, und dazu kommt das Gefühl, den Überblick zu verlieren.',
              'Wer nur Arbeit delegiert und nicht auch Entscheidungen, steht bald wieder am selben Punkt. Ich helfe Ihnen, belastbare Systeme aufzubauen, die Sie wirklich voranbringen.',
            ],
            points: [
              'Digitale Workflows und Kompetenzstrukturen',
              'Automatisierte und manuelle Kontrollen an den richtigen Stellen',
              'Klare Aufgabenverteilung und klar kommunizierte Erwartungen',
              'Eigenverantwortliches Arbeiten als Motivation und Entlastung zugleich',
            ],
          },
          {
            title: 'Coaching für die Buchhaltung',
            paragraphs: [
              'Sie haben ein eigenes Buchhaltungsteam, aber der Jahresabschluss wird noch vom Steuerberater erstellt? Spätestens wenn die Gesellschaft die Grenzen zur Prüfungspflicht erreicht, bedeutet das zusätzliche Kosten, Verzögerungen und längere Wege bei Rückfragen.',
              'Dabei wäre Ihr Team technisch und fachlich in der Lage, die Abschlussbuchungen selbst zu bearbeiten. Ich coache Ihre Buchhaltung auf Abschlussniveau.',
            ],
            points: [
              'Abstimmungen und Abschlussbuchungen',
              'Rückstellungsberechnung und Vorratsbewertung',
              'Optimale Vorbereitung der Abschlussprüfung',
              'Unterjährige Auswertungen durch Abgrenzungen verbessern',
              'Arbeitspapiere und Nachweise für eine effiziente Prüfung',
              'Wissenstransfer und Dokumentation',
            ],
          },
        ],
        mailSubject: 'Anfrage Beratung',
        ctaLabel: 'Über Ihren Beratungsbedarf sprechen',
      },
      {
        ref: '03',
        slug: 'steuern',
        accent: 'steuern',
        title: 'Steuern',
        claim: 'Steuern mitdenken — nicht nur zahlen.',
        intro:
          'Unternehmenssteuerung heißt: Informationen gewinnen und aufbereiten, Entscheidungen vorbereiten, planen und reflektieren. Steuern sind Teil des Unternehmens und gehören in diese Steuerung hinein.',
        blocks: [
          {
            title: 'Steuern in der Unternehmenssteuerung',
            paragraphs: [
              'Ob Liquiditätsplanung, Investitionsentscheidung oder täglicher Geschäftsbetrieb — die Steuerbelastung gehört in Planungen und Entscheidungen einbezogen. Vorauszahlungen und Termine lassen sich so managen, dass der Steuerbescheid keine bösen Überraschungen bereithält.',
            ],
            points: [
              'Steuerbelastungen in Planungen und Entscheidungen einbeziehen',
              'Liquiditätsplanung unter Berücksichtigung steuerlicher Effekte',
              'Vorausschauendes Management von Vorauszahlungen und Fristen',
            ],
          },
        ],
        mailSubject: 'Anfrage Steuern',
        ctaLabel: 'Über Ihre Steuerplanung sprechen',
      },
    ];
  }

  // ===== Profil ===========================================================

  getProfile(): Profile {
    return {
      name: 'Wiebke Lefevre',
      role: 'Wirtschaftsprüferin',
      statement: [
        'Aufgewachsen bin ich fachlich in der Prozessprüfung und in der Begleitung mittelständischer Unternehmen. Meine Leidenschaft liegt darin, unterschiedliche Geschäfts- und Organisationsmodelle im regionalen Mittelstand zu verstehen.',
        'Wichtig sind mir der persönliche Kontakt und die Zusammenarbeit auf Augenhöhe. Genau deshalb passe ich den Prüfungsansatz an die Besonderheiten, die Größe und die jeweiligen Umstände meiner Mandanten an.',
      ],
      career: this.getCareer(),
    };
  }

  private getCareer(): CareerEntry[] {
    return [
      {
        period: 'Seit 2026',
        title: 'Selbständige Wirtschaftsprüferin',
        description: 'Eigene Praxis in Rottweil',
      },
      { period: '2024 – 2025', title: 'Vorbereitung der Selbständigkeit' },
      { period: 'Herbst 2023', title: 'Bestellung zur Wirtschaftsprüferin' },
      {
        period: '2014 – 2024',
        title: 'WSS Aktiv Beraten / Euregio Südwest GmbH, Rottweil',
        description: 'Prüfung und Beratung im Mittelstand für den Mittelstand',
      },
      { period: 'Davor', title: 'Interne Revision, Volksbank Donau-Neckar' },
      {
        period: 'Studium',
        title: 'Betriebswirtschaftslehre, DHBW Villingen-Schwenningen',
        description: 'Fachrichtung Banken und Bausparkassen',
      },
    ];
  }

  // ===== Häufige Fragen ===================================================

  /**
   * Nur belegbare Fragen. Weitere (Honorar, Dauer, Einzugsgebiet, Unabhängigkeit
   * nach § 319 HGB) stehen in FRAGEN-AN-WIEBKE.md und werden erst aufgenommen,
   * wenn die Antworten vorliegen.
   */
  getFaq(): FaqItem[] {
    return [
      {
        question: 'Ab wann ist mein Jahresabschluss prüfungspflichtig?',
        answer:
          'Prüfungspflichtig sind Kapitalgesellschaften, die nicht klein im Sinne des § 267 Abs. 1 HGB sind, also mittelgroße und große. Maßgeblich sind Bilanzsumme, Umsatzerlöse und Arbeitnehmerzahl, wobei jeweils mindestens zwei der drei Merkmale überschritten sein müssen, und zwar an zwei aufeinanderfolgenden Abschlussstichtagen. Der Check auf dieser Seite rechnet das für Sie durch.',
      },
      {
        question: 'Was ist der Unterschied zwischen Pflichtprüfung und freiwilliger Prüfung?',
        answer:
          'Die Pflichtprüfung schreibt das Gesetz vor; ohne sie kann der Jahresabschluss nicht festgestellt werden (§ 316 Abs. 1 Satz 2 HGB). Eine freiwillige Prüfung beauftragen Unternehmen dagegen selbst, häufig weil Banken, Gesellschafter oder ein Gesellschaftsvertrag es verlangen, oder weil vor einem Wachstumsschritt Sicherheit über die Zahlen gewünscht ist. Inhaltlich arbeite ich in beiden Fällen gleich sorgfältig; der Umfang lässt sich bei einer freiwilligen Prüfung abstimmen.',
      },
      {
        question: 'Wir haben eine eigene Buchhaltung. Können Sie die aufs Abschlussniveau bringen?',
        answer:
          'Ja, das ist einer meiner Beratungsschwerpunkte. Viele Teams könnten Abstimmungen, Abschlussbuchungen, Rückstellungen und Vorratsbewertung selbst übernehmen, es fehlt nur die Anleitung. Ich arbeite Ihr Team ein, dokumentiere die Vorgehensweise und sorge dafür, dass die Arbeitspapiere später eine effiziente Prüfung ermöglichen.',
      },
    ];
  }

  // ===== Prüfungspflicht-Check ============================================

  getAuditCheckIntro(): string {
    return 'Ob Ihr Jahresabschluss geprüft werden muss, hängt an drei Zahlen. Tragen Sie sie ein, und Sie sehen, in welche Größenklasse Ihre Gesellschaft fällt und was daraus folgt.';
  }

  getAuditCheckDisclaimer(): string {
    return 'Dieser Check ist eine unverbindliche erste Orientierung und ersetzt keine rechtliche oder steuerliche Beratung. Maßgeblich sind §§ 267, 267a und 316 HGB in der jeweils geltenden Fassung sowie die Umstände des Einzelfalls. Nicht berücksichtigt sind unter anderem Konzernabschlüsse (§ 293 HGB), das Publizitätsgesetz, branchenspezifische Prüfungspflichten sowie gesellschaftsvertraglich oder von Kreditgebern verlangte freiwillige Prüfungen.';
  }

  // ===== Rechtstexte ======================================================

  getImpressumSections(): LegalSection[] {
    return [
      {
        heading: 'Angaben gemäß § 5 DDG',
        paragraphs: [this.getContactInfo().legalName],
      },
      {
        heading: 'Berufsbezeichnung',
        paragraphs: [
          'Wirtschaftsprüferin. Die Berufsbezeichnung wurde in der Bundesrepublik Deutschland verliehen.',
        ],
      },
      {
        heading: 'Zuständige Berufskammer',
        paragraphs: [
          'Wirtschaftsprüferkammer, Körperschaft des öffentlichen Rechts, Rauchstraße 26, 10787 Berlin.',
        ],
        links: [{ label: 'wpk.de', href: 'https://www.wpk.de' }],
      },
      {
        heading: 'Berufsrechtliche Regelungen',
        bullets: [
          'Wirtschaftsprüferordnung (WPO)',
          'Berufssatzung für Wirtschaftsprüfer und vereidigte Buchprüfer (BS WP/vBP)',
          'Wirtschaftsprüfer-Prüfungsverordnung (WiPrPrüfV)',
        ],
        paragraphs: ['Die Regelungen sind über die Website der Wirtschaftsprüferkammer einsehbar.'],
      },
      {
        heading: 'Haftung für Inhalte',
        paragraphs: [
          'Als Diensteanbieterin bin ich für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Ich bin jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben davon unberührt.',
        ],
      },
      {
        heading: 'Haftung für Links',
        paragraphs: [
          'Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte kann ich keine Gewähr übernehmen. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Bei Bekanntwerden von Rechtsverletzungen entferne ich derartige Links umgehend.',
        ],
      },
      {
        heading: 'Urheberrecht',
        paragraphs: [
          'Die auf diesen Seiten erstellten Inhalte unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung.',
        ],
      },
    ];
  }

  getDatenschutzSections(): LegalSection[] {
    return [
      {
        heading: 'Verantwortliche Stelle',
        paragraphs: [
          'Verantwortlich für die Datenverarbeitung auf dieser Website ist die im Impressum genannte Stelle.',
        ],
      },
      {
        heading: 'Keine externen Dienste',
        paragraphs: [
          'Diese Website bindet keine externen Schriftarten, Karten, Analyse- oder Social-Media-Dienste ein. Alle Schriften werden vom eigenen Server ausgeliefert. Es werden keine Cookies zu Analyse- oder Marketingzwecken gesetzt.',
        ],
      },
      {
        heading: 'Server-Logfiles',
        paragraphs: [
          'Der Hosting-Anbieter erhebt und speichert automatisch Informationen in sogenannten Server-Logfiles, die Ihr Browser automatisch übermittelt: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.',
          'Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Es besteht ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Sicherheit der Website. Eine Zusammenführung dieser Daten mit anderen Datenquellen findet nicht statt.',
        ],
      },
      {
        heading: 'Kontaktaufnahme per E-Mail',
        paragraphs: [
          'Wenn Sie mir eine E-Mail schreiben, verarbeite ich Ihre Angaben ausschließlich zur Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen Maßnahmen, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Ihre Daten gebe ich ohne Ihre Einwilligung nicht weiter und lösche sie, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Ergänzend gilt die berufsrechtliche Verschwiegenheitspflicht nach § 43 WPO.',
        ],
      },
      {
        heading: 'Ihre Rechte',
        paragraphs: [
          'Sie haben jederzeit das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten sowie auf Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO). Wenden Sie sich dazu an die im Impressum genannte Stelle.',
          'Ihnen steht außerdem ein Beschwerderecht bei einer Aufsichtsbehörde zu, in Baden-Württemberg beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit.',
        ],
        links: [
          {
            label: 'Landesbeauftragter für den Datenschutz Baden-Württemberg',
            href: 'https://www.baden-wuerttemberg.datenschutz.de',
          },
        ],
      },
      {
        heading: 'Verschlüsselung',
        paragraphs: [
          'Diese Website nutzt aus Sicherheitsgründen eine SSL- beziehungsweise TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers mit „https://" beginnt.',
        ],
      },
    ];
  }

  // ===== SEO ==============================================================

  getSeoMeta(page: PageKey): SeoMeta {
    const meta: Record<PageKey, SeoMeta> = {
      home: {
        title: 'Wiebke Lefevre — Wirtschaftsprüfung, Beratung, Steuern in Rottweil',
        description:
          'Wirtschaftsprüferin in Rottweil. Jahresabschlussprüfung, Controlling und Steuerplanung für den regionalen Mittelstand — persönlich und pragmatisch.',
      },
      leistungen: {
        title: 'Leistungen — Wiebke Lefevre, Wirtschaftsprüferin',
        description:
          'Wirtschaftsprüfung, Beratung und Steuern aus einer Hand. Mit Prüfungspflicht-Check nach den Größenklassen der §§ 267, 267a HGB.',
      },
      'ueber-mich': {
        title: 'Über mich — Wiebke Lefevre, Wirtschaftsprüferin',
        description:
          'Werdegang und Arbeitsweise von Wiebke Lefevre, Wirtschaftsprüferin in Rottweil.',
      },
      kontakt: {
        title: 'Kontakt — Wiebke Lefevre, Wirtschaftsprüferin',
        description:
          'Erstgespräch vereinbaren mit Wiebke Lefevre, Wirtschaftsprüferin in Rottweil.',
      },
      impressum: { title: 'Impressum', description: 'Impressum und Angaben gemäß § 5 DDG.' },
      datenschutz: {
        title: 'Datenschutz',
        description: 'Datenschutzerklärung nach der Datenschutz-Grundverordnung.',
      },
    };
    return meta[page];
  }
}
