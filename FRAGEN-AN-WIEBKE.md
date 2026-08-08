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

13. **Porträtfoto.** Das Design kommt ohne aus — das ist so entworfen, kein Notbehelf. Falls doch
    eines kommen soll, ist die Stelle vorgesehen: `/ueber-mich`, Randspaltenlayout, Graustufen.

14. **Vorschaubild für geteilte Links** (Open Graph, 1200 × 630). Fehlt. Kann aus Wortmarke und
    Doppelstrich erzeugt werden, sobald das Logo vorliegt.

## Technisch, ohne Rückfrage entscheidbar — nur zur Kenntnis

15. **Passwortschutz.** Die Netlify-Edge-Function `netlify/edge-functions/auth.ts` sperrt die Seite
    hinter ein Passwort. Sie fällt auf den fest eingebauten Wert `"fallback"` zurück, wenn die
    Umgebungsvariable `SITE_PASSWORD` nicht gesetzt ist, und das gesetzte Cookie ist ein statischer,
    ungeschützter Wert — der Schutz ist praktisch wirkungslos. Vor dem Livegang sollte der Block
    entweder entfernt oder ordentlich abgesichert werden.
