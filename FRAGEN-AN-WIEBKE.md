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

8. **Hosting-Anbieter.** Für die Datenschutzerklärung: Anbieter, Serverstandort und ob ein
   Auftragsverarbeitungsvertrag vorliegt. (Aktuell deutet die Konfiguration auf Netlify hin — bitte
   bestätigen.)

9. **Freigabe der beiden Rechner.** Ein Rechner auf der Seite einer Wirtschaftsprüferin wird als
   fachliche Aussage gelesen. Bitte prüfen und freigeben:
   - **Prüfungspflicht-Check:** die Formulierung der drei Ergebnissätze und den Haftungshinweis,
   - **Fristen-Zeitstrahl** (neu): die vier Termine und ihre Herleitung. Verwendet werden
     § 264 Abs. 1 Satz 3 HGB (Aufstellung, drei Monate), § 264 Abs. 1 Satz 4 HGB (kleine
     Gesellschaften, sechs Monate), § 42a Abs. 2 Satz 1 GmbHG (Feststellung, acht beziehungsweise
     elf Monate) und § 325 Abs. 1a Satz 1 HGB (Offenlegung, ein Jahr). Alle vier wurden am
     03.09.2026 gegen den Primärtext auf gesetze-im-internet.de geprüft. Der Zeitstrahl weist den
     Feststellungsbeschluss ausdrücklich als GmbH-Regel aus und nennt im Hinweis, was er nicht
     abbildet (§ 326 HGB, kapitalmarktorientierte Gesellschaften, steuerliche Erklärungsfristen,
     abweichende Satzungsregelungen).
   - ob beide Rechner berufsrechtlich unbedenklich sind (§ 52 WPO, § 33 BS WP/vBP).

   **Bewusst nicht enthalten:** wie lange eine Prüfung dauert und wann man dich ansprechen sollte.
   Beides wären erfundene Zahlen. Wenn du belastbare Angaben dazu machen kannst, kommen sie gerne
   in den Zeitstrahl — das wäre die stärkste Stelle der ganzen Seite.

10. **Logo.** Im Repository liegt keine Logodatei; `public/favicon.ico` ist noch das
    Angular-Standard-Icon. Bitte das Logo als SVG liefern — es kommt dann in Kopf- und Fußzeile und
    wird zum Favicon. Bitte außerdem bestätigen, dass die vier Farben stimmen:
    Orange `#D4780A`, Blau `#2E7DB8`, Gelb `#D4A917`, Grün `#2D8B57`.

## Inhaltlich

11. **Leistungsbereich „Steuern" ist deutlich dünner** als die beiden anderen — ein Abschnitt gegen
    je drei. Gibt es zwei oder drei konkrete Punkte zum Ergänzen? Wenn nicht, bleibt der Bereich
    bewusst knapp; erfunden wird nichts.

12. **Häufige Fragen.** Belegbar sind derzeit drei Fragen. Diese vier brauchen deine eigene Antwort
    — die erste ist inhaltlich die wichtigste der ganzen Seite:
    - Können Sie prüfen und gleichzeitig beraten? (Unabhängigkeit, § 319 HGB) — die inhaltlich wichtigste.
    - Was kostet eine Jahresabschlussprüfung, und wonach richtet sich das Honorar?
    - Wie lange dauert eine Prüfung, und wann sollte man Sie ansprechen?
    - In welchem Umkreis arbeiten Sie?

13. **Porträtfoto — jetzt der wichtigste offene Punkt.** Die Gestaltung ist bewusst sehr
    zurückhaltend geworden: fast keine Farbe, keine Kacheln, keine Effekte. Damit ruht alles, was
    die Seite persönlich machen soll, auf zwei Dingen — deinen Sätzen und deinem Gesicht. Ohne
    Foto fehlt die Hälfte davon.

    Es gibt zwei Plätze dafür: prominent im Einstieg der Startseite und groß auf `/ueber-mich`.
    Solange nichts vorliegt, steht dort eine ruhige Fläche mit dem Satz „Porträt folgt." — kein
    Platzhalterbild und keine graue Silhouette.

    **Gebraucht wird:** Hochformat im Verhältnis 4:5, mindestens 900 × 1125 px, als JPG.
    Kein Studio-Businessporträt vor grauem Hintergrund nötig — im Gegenteil: ein ruhiges Bild an
    einem echten Ort passt besser zu dieser Seite.

    **Einbau, sobald es da ist:** Datei nach `public/wiebke-lefevre.jpg`, dann in
    `src/app/core/services/content.service.ts` unter `getProfile()` zwei Zeilen füllen:

    ```ts
    portraitSrc: '/wiebke-lefevre.jpg',
    portraitAlt: 'Wiebke Lefevre, Wirtschaftsprüferin in Rottweil',
    ```

    Rahmen, Zuschnitt und Bildunterschrift stehen bereits.


14. **Vorschaubild für geteilte Links** (Open Graph, 1200 × 630). Fehlt. Kann aus Wortmarke und
    Signet erzeugt werden, sobald das Logo vorliegt.

15. **Reihenfolge der Leistungsbereiche.** Die Reiter stehen als Wirtschaftsprüfung, Beratung,
    Steuern. Falls die Beratung geschäftlich wichtiger ist als die Prüfung, sollte sie vorn stehen
    — das ist eine Zeile im ContentService.

## Neu mit dem Redesign

16. **Tonalität.** Die Texte sind deutlich persönlicher geworden und sprechen konsequent in der
    Ich-Form, beim „Sie" für die Lesenden. Beispiele, die eine Freigabe brauchen, weil sie eine
    Haltung behaupten: „Ich sage Ihnen, was ich sehe, auch wenn es unbequem ist — und ich erwarte
    dasselbe zurück." (Über mich), „Wenn ich für Ihr Anliegen die Falsche bin, sage ich Ihnen das —
    und meistens weiß ich, wer die Richtige wäre." (Kontakt), „Ich antworte auch auf Fragen, aus
    denen kein Auftrag wird." (Leistungen). Alles davon ist streichbar, aber es trägt einen
    großen Teil der Wärme.

17. **Einstiegsdialog auf der Startseite.** Statt einer Überschrift mit Button beginnt die Seite
    mit „Was führt Sie her?" und drei Antworten in der Stimme der Lesenden. Die dritte lautet „Ich
    schaue erst mal, wer Sie eigentlich sind." — bitte prüfen, ob dir das zu direkt ist.

18. **Firmierung im Signet.** Die Marke ist derzeit eine Sprechblase mit vier Punkten in deinen
    Logofarben. Sie ist ein Platzhalter für dein echtes Logo, aber ein gestalteter: Sie taucht in
    Kopf, Fuß, Hero und auf der Kontaktseite auf und liefert die Formsprache der ganzen Seite. Wenn
    dein Logo kommt, ersetzt es sie — dann sollten wir kurz schauen, ob die Sprechblasenform
    weiterhin trägt.

## Technisch, ohne Rückfrage entscheidbar — nur zur Kenntnis

19. **Passwortschutz.** Die Netlify-Edge-Function `netlify/edge-functions/auth.ts` sperrt die Seite
    hinter ein Passwort. Sie fällt auf den fest eingebauten Wert `"fallback"` zurück, wenn die
    Umgebungsvariable `SITE_PASSWORD` nicht gesetzt ist, und das gesetzte Cookie ist ein statischer,
    ungeschützter Wert — der Schutz ist praktisch wirkungslos. Vor dem Livegang sollte der Block
    entweder entfernt oder ordentlich abgesichert werden.
