# Offene Fragen

Gesammelt beim Redesign. Solange eine Antwort fehlt, wird der betreffende Inhalt **ausgeblendet** —
nicht mit einem Platzhalter gefüllt (siehe `PRODUCT.md`, Voice-Regel 5).

## Blockiert die Veröffentlichung

1. **Firmierung.** Im Projekt kursieren drei Bezeichnungen: „Wirtschaftsprüfungsgesellschaft
   Lefevre", „WPL Lefevre" und „WPL Beraten" (Repository und Domain). „Wirtschaftsprüfungsgesellschaft"
   ist nach §§ 27 ff. WPO anerkennungspflichtig — liegt die Anerkennung der WPK vor? Bis zur Klärung
   firmiert die Seite als **„Wiebke Lefevre — Wirtschaftsprüferin"**, „WPL" nur als Kurzform.

2. **Schreibweise des Namens.** „Lefevre" oder „Lefèvre"? Der bisherige Code enthält beides.
   Aktuell durchgängig **Lefevre**; ein Unit-Test erzwingt die Einheitlichkeit.

3. **Anschrift.** Straße, Hausnummer und PLZ fehlen. Ohne ladungsfähige Anschrift ist die Seite nach
   § 5 DDG nicht veröffentlichungsfähig.

4. **E-Mail-Adresse.** Fehlt. Sie ist die einzige Konversion der Seite — ohne sie hat die
   Kontaktseite keinen Inhalt.

5. **Berufshaftpflichtversicherung.** § 2 DL-InfoV verlangt im Impressum Name und Anschrift des
   Versicherers sowie den räumlichen Geltungsbereich.

## Sollte vor der Veröffentlichung geklärt sein

6. **Telefonnummer.** Optional — solange sie fehlt, blenden Footer, Kontaktseite und Impressum den
   Telefonblock aus.

7. **Umsatzsteuer-Identifikationsnummer.** Falls vorhanden, gehört sie ins Impressum.

8. **Hosting bei Netlify.** Die Seite liegt bei Netlify, Inc. (USA, zertifiziert nach dem EU-US
   Data Privacy Framework), im Konto von christoph wilde consulting; die Datenschutzerklärung nennt
   Netlify. Verantwortlich für die Daten der Besucher bist du. Deshalb brauchen wir vor dem Livegang
   einen **Auftragsverarbeitungsvertrag nach Art. 28 DSGVO zwischen dir und christoph wilde
   consulting**, mit Netlify als Unterauftragsverarbeiter. Christoph schickt dir den Entwurf; bitte
   prüfen und unterschreiben.

9. **Freigabe des Prüfungspflicht-Checks.** Ein Rechner auf der Seite einer Wirtschaftsprüferin wird
   als fachliche Aussage gelesen. Bitte prüfen und freigeben:
   - die Formulierung der drei Ergebnissätze,
   - den Haftungshinweis,
   - ob der Check berufsrechtlich unbedenklich ist (§ 52 WPO, § 33 BS WP/vBP).

10. **Logo.** Im Repository liegt keine Logodatei; `public/favicon.ico` ist noch das
    Angular-Standard-Icon. Bitte das Logo als SVG liefern — es kommt dann in Kopf- und Fußzeile und
    wird zum Favicon. Bitte außerdem bestätigen, dass die vier Farben stimmen:
    Orange `#D4780A`, Blau `#2E7DB8`, Gelb `#D4A917`, Grün `#2D8B57`.

## Inhaltlich

11. **Leistungsbereich „Steuern" ist deutlich dünner** als die beiden anderen — ein Abschnitt gegen
    je drei. Gibt es zwei oder drei konkrete Punkte zum Ergänzen? Wenn nicht, bleibt der Bereich
    bewusst knapp; erfunden wird nichts.

12. **Häufige Fragen.** Belegbar sind derzeit drei Fragen. Diese vier brauchen deine eigene Antwort:
    - Können Sie prüfen und gleichzeitig beraten? (Unabhängigkeit, § 319 HGB) — die inhaltlich wichtigste.
    - Was kostet eine Jahresabschlussprüfung, und wonach richtet sich das Honorar?
    - Wie lange dauert eine Prüfung, und wann sollte man Sie ansprechen?
    - In welchem Umkreis arbeiten Sie?

13. **Porträtfoto.** Wichtigster offener Punkt für die Wärme der Seite. Der Bogen im
    Startseiten-Kopf ist vorbereitet und bleibt bis dahin eine reine Tannenfläche; auf
    `/ueber-mich` erscheint das Porträt in derselben Bogenform. Gewünscht: ein freundliches, helles
    Porträt im Hochformat (mind. 1200 px breit, Seitenverhältnis etwa 4:5), am besten mit ruhigem
    Hintergrund, der sich freistellen lässt — es steht vor Tannengrün auf Orange. Einbau:
    Datei nach `public/` legen und in `ContentService.getProfile()` das Feld `portrait` setzen
    (Pfad, Alt-Text, Breite, Höhe).

14. **Vorschaubild für geteilte Links** (Open Graph, 1200 × 630). Fehlt. Kann aus Wortmarke und
    Doppelstrich erzeugt werden, sobald das Logo vorliegt.

15a. **Farbwelt und Texte des Redesigns „Offene Tür“.** Kopf und Einstieg tragen jetzt das
    Logo-Orange `#E0892A` mit dunkler Schrift — bewusst nah an dem orangen Auftritt, den du früher
    verworfen hast, aber ohne weiße Schrift und Pill-Buttons. Passt das für dich? Dazu Tinte
    `#17231D` als Schrift, Schiefergrau `#3A403D` für Check und Fuß, Tannengrün `#1E4636` im Porträt-Bogen;
    Orange, Blau und Grün sind für weißen Text abgedunkelt (`#A64F00`, `#1F5F92`, `#2D7550`).
    Neu formuliert sind die Überschriften als Mandantenfragen (z. B. „Müssen wir unseren
    Abschluss prüfen lassen?“), der Einstieg „Erst verstehen, dann prüfen.“ und die Zeile
    „Zehn Jahre Mittelstand, jetzt in eigener Praxis.“ (2014–2024 bei WSS Aktiv Beraten).
    Bitte prüfen, ob du dich darin wiederfindest.

## Technisch, ohne Rückfrage entscheidbar — nur zur Kenntnis

15. **Passwortschutz — erledigt.** Das frühere Schloss (`auth.ts`) fiel ohne `SITE_PASSWORD` auf
    das Passwort `"fallback"` zurück und akzeptierte ein von Hand gesetztes Cookie `auth=ok`.
    Ersetzt durch `netlify/edge-functions/site-gate.ts` (wie in `website-bbs`): bleibt ohne
    Passwort zu, signiertes Cookie mit Ablauf, geprüft mit `npm run check:gate`. Vor dem Livegang
    wird die Funktion entfernt — siehe README.md, „Zutritt“.
