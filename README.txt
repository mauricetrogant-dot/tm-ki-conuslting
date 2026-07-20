TM KI Consulting Website — Live-Paket (v3.1, korrigiert)

Struktur:
index.html                          Startseite
agi-artikel.html                    Insight-Artikel
fable5-sperre-artikel.html          Insight-Artikel
ki-spieleentwicklung-artikel.html   Insight-Artikel
cockpit-demo.html                   Cockpit-Demo (Slider, laedt die beiden Cockpit-Seiten als iframes)
cockpit-prozesssteuerung.html
cockpit-anwendungsbereich-a.html
impressum.html                      Impressum (auch als Popup auf der Startseite)
datenschutz.html                    Datenschutzerklaerung
404.html                            Fehlerseite (wird von GitHub Pages automatisch genutzt)
robots.txt / sitemap.xml            Suchmaschinen-Steuerung
CNAME                               Domain fuer GitHub Pages (www.tm-ki-consulting.de)
assets/
  TM_KI_Logo.png/.webp
  julian-manske.png/.webp
  maurice-trogant.jpg/.webp
  leistungskatalog-cover.png/.webp
  Leistungskatalog_TM-KI-Consulting_v.1.pdf
  fonts/                            Lokal gehostete Schriften (Inter, Playfair Display) + fonts.css
  js/hero-three.js                  Hero-Animation (Three.js-Agentenfeld)
  js/vendor/lenis.min.js            Scroll-Bibliothek
  js/vendor/three.module.min.js     Three.js (lokal, kein CDN)
  js/vendor/three.core.min.js       Wird von three.module.min.js intern importiert — beide Dateien gehoeren zusammen!

Wichtig:
- Alle HTML-Dateien und der Ordner assets muessen gemeinsam auf den Webserver geladen werden.
- Saemtliche Ressourcen (Schriften, Three.js, Lenis) werden lokal ausgeliefert (Self-Hosting).
  Es werden KEINE Verbindungen zu Google Fonts oder CDNs aufgebaut — das entspricht der
  Aussage in der Datenschutzerklaerung und ist DSGVO-konform. Bitte kuenftig keine
  externen Font-/CDN-Einbindungen ergaenzen, ohne die Datenschutzerklaerung anzupassen.
- Anbieter: TM KI Consulting UG (i.G.), Ernst-Tengelmann-Ring 22, 45259 Essen.
  Nach Eintragung ins Handelsregister bitte Impressum (Registernummer) aktualisieren
  und die Rechtsform-Angaben auf allen Seiten pruefen.
- Das Impressum oeffnet sich als Popup/Modal und ist zusaetzlich als impressum.html vorhanden.
- Der Stadt-Essen-Eintrag ist rechtlich vorsichtig formuliert (nur "moegliches Projektvorhaben").
- Die Cockpit-Demo nutzt localStorage fuer Favoriten und Sprachausgabe-Einstellung;
  das ist in der Datenschutzerklaerung (Abschnitt 4) beschrieben.

Lokaler Start unter Windows:
1. ZIP entpacken.
2. In den entpackten Ordner wechseln.
3. start.bat doppelklicken.
4. Das schwarze Fenster offen lassen, solange die Website genutzt wird.

Die Website laeuft dann unter http://localhost:8000/index.html
Falls weder Python noch Node.js installiert ist, bitte VS Code mit Live Server verwenden.

Hinweis: Ein Start per Doppelklick auf index.html (file://) funktioniert fuer die
Hero-Animation nicht, da Browser dynamische Modul-Imports ueber file:// blockieren.
Immer ueber start.bat bzw. einen lokalen Server oeffnen.
