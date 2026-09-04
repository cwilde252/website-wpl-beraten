import { Injectable } from '@angular/core';
import { CareerEntry } from '../models/career-entry.model';
import { ContactInfo } from '../models/contact-info.model';
import { DialogOption } from '../models/dialog-option.model';
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

  // ===== Startseite =======================================================

  getHomeHeadline(): DisplayHeadline {
    return { lines: ['Hallo, ich bin', 'Wiebke.'] };
  }

  getHomeLead(): string {
    return 'Ich prüfe Jahresabschlüsse und berate mittelständische Unternehmen in und um Rottweil. Seit 2026 mit eigener Praxis, davor zehn Jahre im Rottweiler Mittelstand.';
  }

  /** Die Frage, die den Einstiegsdialog öffnet. */
  getDialogPrompt(): string {
    return 'Was führt Sie her?';
  }

  /**
   * Die drei Wege in die Seite. Jede Antwort bleibt bei dem, was belegbar ist —
   * Werdegang, Schwellenwerte, Leistungsbeschreibung. Kein Versprechen, das
   * nirgends eingelöst wird.
   */
  getDialogOptions(): DialogOption[] {
    return [
      {
        id: 'pruefungspflicht',
        question: 'Wir wachsen gerade in die Prüfungspflicht hinein.',
        answer:
          'Dann klären wir das zuerst, ohne dass Sie mir dafür schreiben müssen. Der Check rechnet Ihre drei Zahlen gegen die Größenklassen der §§ 267, 267a HGB durch, inklusive der Regel zu zwei aufeinanderfolgenden Stichtagen.',
        accent: 'check',
        ctaLabel: 'Zum Prüfungspflicht-Check',
        ctaPath: '/leistungen',
        ctaFragment: 'pruefungspflicht',
      },
      {
        id: 'organisation',
        question: 'Bei uns läuft zu viel über meinen Schreibtisch.',
        answer:
          'Das höre ich oft, und meistens fehlt nicht die Arbeitskraft, sondern eine Struktur, in der auch Entscheidungen ohne Sie funktionieren. Wer nur Arbeit delegiert und nicht auch Entscheidungen, steht bald wieder am selben Punkt.',
        accent: 'beratung',
        ctaLabel: 'Was ich dafür mache',
        ctaPath: '/leistungen',
        ctaFragment: 'beratung',
      },
      {
        id: 'kennenlernen',
        question: 'Ich schaue erst mal, wer Sie eigentlich sind.',
        answer:
          'Völlig richtig so. Wirtschaftsprüfung ist eine Mehrjahresbeziehung. Da sollten Sie wissen, mit wem Sie es zu tun haben, bevor Sie irgendwas anfragen.',
        accent: 'pruefung',
        ctaLabel: 'Mein Werdegang',
        ctaPath: '/ueber-mich',
      },
    ];
  }

  getLeistungenHeadline(): DisplayHeadline {
    return { lines: ['Drei Blickwinkel', 'auf dasselbe', 'Unternehmen.'] };
  }

  getLeistungenLead(): string {
    return 'Prüfung, Beratung und Steuern hängen zusammen; sie schauen nur von verschiedenen Seiten auf dieselben Zahlen. Suchen Sie sich aus, was gerade ansteht.';
  }

  getUeberMichHeadline(): DisplayHeadline {
    return { lines: ['Wer hier', 'prüft.'] };
  }

  getKontaktHeadline(): DisplayHeadline {
    return { lines: ['Erzählen Sie mir', 'von Ihrem', 'Unternehmen.'] };
  }

  // ===== Haltung ==========================================================

  getPositionsIntro(): string {
    return 'Vier Dinge, die Sie vorher wissen sollten, damit Sie einschätzen können, ob das zu Ihnen passt.';
  }

  getPositions(): Position[] {
    return [
      {
        ref: '01',
        title: 'Sie bekommen mich',
        description:
          'Keine wechselnden Ansprechpartner, keine Weiterreichung an Berufseinsteiger, keine Nummer im System. Wenn Sie anrufen, bin ich dran, und im Zweifel weiß ich auswendig, worüber wir letztes Jahr gesprochen haben.',
      },
      {
        ref: '02',
        title: 'Kein Schema F',
        description:
          'Den Prüfungsansatz schneide ich auf Größe und Komplexität Ihres Unternehmens zu. Eine GmbH mit dreißig Leuten braucht keine Checkliste, die für einen Konzern geschrieben wurde.',
      },
      {
        ref: '03',
        title: 'Fragen sind erlaubt',
        description:
          'Die Prüfung ist der Anlass, das Gespräch ist der Nutzen. Wenn Ihnen an Ihren Zahlen etwas auffällt oder eine Entscheidung ansteht, reden Sie mit mir darüber. Genau dafür sitze ich ohnehin an Ihren Unterlagen.',
      },
      {
        ref: '04',
        title: 'Ich kenne die Gegend',
        description:
          'Zehn Jahre Prüfung und Beratung im regionalen Mittelstand. Ich weiß, wie hier gewirtschaftet wird, wie die Strukturen gewachsen sind, und wie wenig Zeit Sie tatsächlich haben.',
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
        claim: 'Ich prüfe Ihr Unternehmen, nicht meine Checkliste.',
        intro:
          'Ob gesetzliche Pflichtprüfung oder freiwillige Prüfung des Jahresabschlusses: Der Fokus liegt auf dem Wesentlichen, angepasst an die Besonderheiten und Umstände Ihres Hauses. Als kleine Praxis kann ich mir diesen Zuschnitt leisten; größere Häuser können das oft nicht.',
        blocks: [
          {
            title: 'Jahresabschlussprüfung',
            paragraphs: [
              'Sie bekommen einen unkomplizierten, pragmatischen Prüfungsansatz und eine Ansprechpartnerin, die Ihre Zahlen tatsächlich selbst gesehen hat.',
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
              'Ein unabhängiger Review der Prozesse rund um Buchhaltung und Abschlusserstellung gibt Ihnen Sicherheit. Ich schaue auf Funktionalität und Ausgestaltung Ihres internen Kontrollsystems und sage Ihnen konkret, wo etwas fehlt.',
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
              'Ich sitze ohnehin ein paar Tage in Ihren Unterlagen. Nutzen Sie das: über die betriebswirtschaftliche Entwicklung sprechen, eine anstehende Entscheidung durchdenken, eine zweite Meinung einholen.',
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
        claim: 'Ihre Buchhaltung weiß mehr, als sie Ihnen erzählt.',
        intro:
          'Eine Buchhaltung ist kein Zahlenfriedhof, sondern die vollständigste Informationsquelle, die Ihr Unternehmen besitzt. Machen wir sie nutzbar.',
        blocks: [
          {
            title: 'Controlling und Informationsmanagement',
            paragraphs: [
              'Wir arbeiten ein Konzept für Ihr internes Controlling aus, das zu Ihrem Haus passt und nicht zu einem Lehrbuch. Ziel ist, dass Sie die Information vor der Entscheidung haben und nicht danach.',
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
              'Gerade bei erfolgreich wachsenden Unternehmen wird der eigene Schreibtisch zum Nadelöhr: Die Stunden im Büro werden mehr, man wird zum begrenzenden Faktor der eigenen Unternehmung, und dazu kommt das Gefühl, den Überblick zu verlieren.',
              'Ich helfe Ihnen, belastbare Systeme aufzubauen — mit klaren Zuständigkeiten und Kontrollen an den Stellen, wo sie wirklich gebraucht werden.',
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
              'Sie haben ein eigenes Buchhaltungsteam, aber der Jahresabschluss wird noch vom Steuerberater erstellt? Spätestens an der Grenze zur Prüfungspflicht bedeutet das zusätzliche Kosten, Verzögerungen und lange Wege bei Rückfragen.',
              'Dabei wäre Ihr Team fachlich meist längst in der Lage, die Abschlussbuchungen selbst zu bearbeiten. Es fehlt nur jemand, der es einmal in Ruhe zeigt. Das mache ich.',
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
        claim: 'Was Sie zahlen, entscheidet sich lange vor dem Bescheid.',
        intro:
          'Unternehmenssteuerung heißt: Informationen gewinnen, Entscheidungen vorbereiten, planen und reflektieren. Die Steuerbelastung gehört in diese Steuerung hinein und nicht ans Ende des Jahres.',
        blocks: [
          {
            title: 'Steuern in der Unternehmenssteuerung',
            paragraphs: [
              'Ob Liquiditätsplanung, Investitionsentscheidung oder täglicher Geschäftsbetrieb: Wer die steuerliche Wirkung vorher kennt, entscheidet anders. Vorauszahlungen und Termine lassen sich so managen, dass der Bescheid nichts Neues mehr erzählt.',
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
        'Fachlich aufgewachsen bin ich in der Prozessprüfung und in der Begleitung mittelständischer Unternehmen. Was mich daran bis heute interessiert: Jedes Haus hat sich seine eigene Art ausgedacht, Dinge zu organisieren, und in dieser Logik steckt fast immer eine Geschichte.',
        'Deshalb kommt bei mir auch kein Standardprogramm zum Einsatz. Ich passe den Prüfungsansatz an die Besonderheiten, die Größe und die Umstände meiner Mandanten an. Das dauert am Anfang länger und spart hinten heraus Zeit.',
        'Wichtig sind mir der persönliche Kontakt und die Zusammenarbeit auf Augenhöhe. Ich sage Ihnen, was ich sehe, auch wenn es unbequem ist — und ich erwarte dasselbe zurück.',
      ],
      career: this.getCareer(),
      // Sobald das Foto vorliegt: nach public/ legen und beide Zeilen füllen.
      // Siehe PortraitComponent und FRAGEN-AN-WIEBKE.md, Punkt 13.
      portraitSrc: '',
      portraitAlt: '',
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
        question: 'Ab wann muss ich meinen Jahresabschluss prüfen lassen?',
        answer:
          'Prüfungspflichtig sind Kapitalgesellschaften, die nicht klein im Sinne des § 267 Abs. 1 HGB sind, also mittelgroße und große. Maßgeblich sind Bilanzsumme, Umsatzerlöse und Arbeitnehmerzahl, wobei jeweils mindestens zwei der drei Merkmale überschritten sein müssen — und das an zwei aufeinanderfolgenden Abschlussstichtagen. Der Check auf dieser Seite rechnet Ihnen das durch.',
      },
      {
        question: 'Was ist der Unterschied zwischen Pflichtprüfung und freiwilliger Prüfung?',
        answer:
          'Die Pflichtprüfung schreibt das Gesetz vor; ohne sie kann der Jahresabschluss nicht festgestellt werden (§ 316 Abs. 1 Satz 2 HGB). Eine freiwillige Prüfung beauftragen Sie selbst — meist weil Banken, Gesellschafter oder der Gesellschaftsvertrag es verlangen, oder weil Sie vor einem Wachstumsschritt Sicherheit über die Zahlen wollen. Inhaltlich arbeite ich in beiden Fällen gleich sorgfältig; nur den Umfang können wir bei einer freiwilligen Prüfung miteinander abstimmen.',
      },
      {
        question: 'Wir haben eine eigene Buchhaltung. Bekommen Sie die aufs Abschlussniveau?',
        answer:
          'Ja, das ist einer meiner Beratungsschwerpunkte. Viele Teams könnten Abstimmungen, Abschlussbuchungen, Rückstellungen und Vorratsbewertung längst selbst übernehmen, es hat ihnen nur nie jemand gezeigt. Ich arbeite Ihr Team ein, dokumentiere die Vorgehensweise und sorge dafür, dass die Arbeitspapiere später eine effiziente Prüfung ermöglichen.',
      },
    ];
  }

  // ===== Prüfungspflicht-Check ============================================

  getAuditCheckIntro(): string {
    return 'Ob Ihr Jahresabschluss geprüft werden muss, hängt an drei Zahlen. Tragen Sie sie ein, und Sie sehen, in welche Größenklasse Ihre Gesellschaft fällt und was daraus folgt. Ich bekomme davon nichts mit — die Rechnung läuft in Ihrem Browser.';
  }

  getAuditCheckDisclaimer(): string {
    return 'Dieser Check ist eine unverbindliche erste Orientierung und ersetzt keine rechtliche oder steuerliche Beratung. Maßgeblich sind §§ 267, 267a und 316 HGB in der jeweils geltenden Fassung sowie die Umstände des Einzelfalls. Nicht berücksichtigt sind unter anderem Konzernabschlüsse (§ 293 HGB), das Publizitätsgesetz, branchenspezifische Prüfungspflichten sowie gesellschaftsvertraglich oder von Kreditgebern verlangte freiwillige Prüfungen.';
  }

  // ===== Fristen-Zeitstrahl ===============================================

  getFristenIntro(): string {
    return 'Der Abschlussstichtag setzt eine Kette von Fristen in Gang. Wählen Sie Ihren Stichtag, und Sie sehen, wann was fällig ist — und warum es sich lohnt, früh mit einer Prüferin zu sprechen.';
  }

  getFristenDisclaimer(): string {
    return 'Angegeben sind ausschließlich die unmittelbar aus dem Gesetz folgenden Termine für Kapitalgesellschaften. Nicht abgebildet sind steuerliche Erklärungsfristen, Sonderregeln für Kleinstkapitalgesellschaften (§ 326 HGB) und kapitalmarktorientierte Gesellschaften sowie abweichende Regelungen in Gesellschaftsvertrag oder Satzung. Wie lange eine Prüfung im Einzelfall dauert, hängt vom Unternehmen ab — dazu sprechen wir besser persönlich.';
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
        heading: 'Prüfungspflicht-Check und Fristenrechner',
        paragraphs: [
          'Die beiden Rechner auf der Leistungsseite laufen vollständig in Ihrem Browser. Die von Ihnen eingegebenen Zahlen und Daten werden nicht übertragen, nicht gespeichert und nicht ausgewertet; sie verlassen Ihr Gerät nicht.',
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
          'Wirtschaftsprüfung, Beratung und Steuern aus einer Hand. Mit Prüfungspflicht-Check nach §§ 267, 267a HGB und Fristenrechner zum Jahresabschluss.',
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
