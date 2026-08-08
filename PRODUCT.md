# Product

## Register

brand

## Users

**Primär:** Inhaberinnen und Inhaber sowie kaufmännische Leitungen mittelständischer Unternehmen in
der Region Rottweil / Schwarzwald-Baar, typischerweise 15–250 Beschäftigte. Sie wachsen in die
Prüfungspflicht hinein oder sind bereits drin, kennen ihr Geschäft genau und haben wenig Geduld für
Berater, die es nicht verstehen. Sie kommen über Empfehlung, prüfen die Seite in wenigen Minuten und
entscheiden dabei vor allem eines: Wirkt diese Person kompetent und erreichbar?

**Sekundär:** Steuerberatende und Rechtsanwälte, die eine Wirtschaftsprüferin für einen Mandanten
suchen. Sie lesen fachlich und erkennen sofort, ob etwas nur behauptet oder wirklich verstanden ist.

**Kontext:** Der erste Besuch ist eine Eignungsprüfung in umgekehrter Richtung. Die Nutzer entscheiden,
ob sie ihre Zahlen in diese Hände geben. Sie brauchen fachliche Substanz, nicht Zuspruch.

## Product Purpose

Website von Wiebke Lefevre, Wirtschaftsprüferin in Rottweil, selbständig seit 2026. Drei
Leistungsbereiche: Wirtschaftsprüfung (gesetzliche und freiwillige Jahresabschlussprüfung, Prozess-
und IKS-Review), Beratung (Controlling und Informationsmanagement, Organisationsoptimierung, Coaching
der eigenen Buchhaltung auf Abschlussniveau) und Steuern (Steuerbelastung in Planung und
Entscheidungen).

Primäre Konversion: ein Erstgespräch per E-Mail. Es gibt bewusst kein Kontaktformular — solange kein
Backend existiert, wäre es eine Attrappe.

Der Prüfungspflicht-Check ist das inhaltliche Angebot der Seite: Er beantwortet die Frage, mit der
die meisten Besucher überhaupt erst hier landen, und beantwortet sie fachlich sauber, ohne etwas zu
verkaufen.

Erfolg heißt: Jemand liest die Seite und denkt „Die versteht mein Unternehmen, und ich weiß nach
zwei Minuten mehr als vorher."

## Brand Personality

Ruhige Fachlichkeit. Prüfung als Handwerk, nicht als Apparat. Präzise, direkt, ohne Auftritt — wie
ein sauber geführtes Arbeitspapier: nichts Überflüssiges, alles nachvollziehbar.

Drei Worte: **persönlich, pragmatisch, auf Augenhöhe.**

Die Stimme ist erwachsen und knapp. Keine Superlative, keine Beratersprache, keine
Transformationsversprechen. Wiebke erklärt, was sie tut und warum, und traut den Lesenden die
Entscheidung zu.

## Voice Rules (Anti-Slop)

Harte Regeln für alle Texte. Sie existieren, weil generischer Marketingtext genau das Versprechen
untergräbt, um das es hier geht.

1. **Eine Stimme.** Wiebke spricht durchgehend in der Ich-Form („ich passe den Prüfungsansatz an").
   Kein Wechsel in die dritte Person, kein „wir" für eine Einzelkanzlei. Ausnahmen: Rechtstexte.
2. **Ein Anspruch, ein Ort.** Jede Kernaussage steht an genau einer Stelle. Teaser fassen zusammen,
   sie wiederholen nicht. „Kein Schema F" steht einmal — nicht auf Startseite, Leistungsseite und
   im Footer.
3. **Höchstens eine Pointe pro Seite.** Antithesen („Nicht X. Sondern Y.") sind ein Gewürz, kein
   Satzmuster. Enden zwei Absätze einer Seite so, wird einer umgeschrieben.
4. **Konkret schlägt klug.** Prüfbare Fakten (Schwellenwerte, Verfahrensschritte, Stationen, Region,
   Jahreszahlen) statt Aphorismen. **Niemals Fakten, Zahlen, Fristen, Honorare oder Referenzen
   erfinden.** Fehlt etwas, kommt eine Frage in `FRAGEN-AN-WIEBKE.md` — nicht ein plausibler Satz.
5. **Keine Platzhalter im gerenderten Output.** Fehlende Daten (Telefon, Anschrift, USt-IdNr.) werden
   über `@if`-Guards ausgeblendet, nie als `[PLATZHALTER]` ausgeliefert. Ein Spec erzwingt das.
6. **Fachlich korrekt oder gar nicht.** Normzitate werden mit Absatz und Satz angegeben und gegen den
   Primärtext geprüft. Der Prüfungspflicht-Check trägt einen Haftungshinweis und den Stand der Werte.
7. **Keine Referenzen ohne echte Freigabe.** Kein Zitat, kein Logo, kein „über 100 Mandanten" ohne
   nachweisbare Grundlage und Einwilligung.
8. **Deutsche Sprache durchgängig**, auch in ARIA-Labels und Alt-Texten. Alt-Texte beschreiben das
   Bild, sie tragen keine SEO-Anhängsel.

## Anti-references

- **Große-Kanzlei-Auftritt** (Dunkelblau, Gold, Säulen, Waage, Handschlag-Stockfotos): signalisiert
  Größe, die hier nicht da ist — und genau das Anonyme, von dem sich diese Kanzlei abgrenzt.
- **SaaS-Landingpage** (Hero-Kennzahlen, Verlaufskarten, Badge-Wand, „Jetzt starten"): Prüfung ist
  kein Produkt mit Testphase.
- **Magazin-Editorial** (zentrierte Display-Headlines, Kursiv-Emphase, großzügige Bedeutungsleere):
  eine Wirtschaftsprüferin verkauft keine Stimmung.
- **AI-Slop-Templates** (Scroll-Reveal auf jeder Sektion, Blur-Blobs, dekorative Icon-Kreise, überall
  dasselbe Label-Linie-Grid-Rezept): Bewegung ist hier auf Interaktionsfeedback beschränkt, alles
  andere steht still.
- **Der bisherige Auftritt dieser Seite**: vollflächig oranger Hero, vier konkurrierende
  Akzentfarben, runde Karten mit Schatten, Pill-Buttons.

## Design Principles

1. **Fachlichkeit zeigen, nicht behaupten.** Die Schwellenwerttabelle und der Prüfungspflicht-Check
   sind das visuelle Zentrum der Leistungsseite. Wer sie liest, hat einen Nutzen — auch ohne Anfrage.
2. **Farbe ist Markierung, nicht Fläche.** Die vier Logofarben bleiben, aber sie kennzeichnen
   Bereiche als Linie, Label und Marke. Keine einzige Fläche über 4 px trägt eine Logofarbe.
3. **Struktur statt Bild.** Es gibt keine Fotografie. Linienraster, Randspalte, Typografie-Skala und
   Flächenwechsel tragen die Seite. Das ist der Entwurf, nicht ein Notbehelf.
4. **Zahlen sind Belege.** Alles Prüfbare steht in Mono mit Tabellenziffern — Beträge, Jahreszahlen,
   Normzitate. Typografie macht sichtbar, was Beleg ist und was Text.
5. **Erreichbarkeit vor Konversion.** Ein Weg zum Erstgespräch pro Sektion, keine Pop-ups, keine
   Dringlichkeitsmuster. Wirtschaftsprüfung ist eine Mehrjahresbeziehung.
6. **Ohne JavaScript nutzbar.** Die Seite wird statisch vorgerendert. Schwellenwerte, FAQ,
   Navigation und alle Inhalte funktionieren auch dann, wenn nichts geladen wird.

## Pages

| Route | Titel | Zweck |
|---|---|---|
| `/` | Start | Einstieg: Hero, Haltung, die drei Bereiche, Prüfungspflicht-Teaser, Profil-Teaser, Erstgespräch. |
| `/leistungen` | Leistungen | Die drei Bereiche als Tabs, Schwellenwerttabelle, Prüfungspflicht-Check, FAQ. |
| `/ueber-mich` | Über mich | Werdegang und Haltung. |
| `/kontakt` | Kontakt | E-Mail-first, Kontaktdaten. |
| `/impressum` | Impressum | Rechtstext. |
| `/datenschutz` | Datenschutz | Rechtstext. |

`/wirtschaftspruefung`, `/beratung` und `/steuern` bleiben als 301-Weiterleitungen auf das jeweilige
Tab-Fragment bestehen.

## Accessibility & Inclusion

WCAG AA. Deutschsprachig, auch in ARIA. Tastaturbedienung vollständig, inklusive Pfeiltasten-
Navigation im Tab-Strip und sichtbarem Fokus auf jedem interaktiven Element. `prefers-reduced-motion`
wird überall respektiert. Kontrastverhältnisse sind für jede Farbkombination nachgerechnet und in
`DESIGN.md` dokumentiert; Farbe ist nie alleiniger Bedeutungsträger.
