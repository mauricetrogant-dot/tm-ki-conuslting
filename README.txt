TM KI Consulting Website — Live-Paket (v3.8)

Neu in v3.6 — KI-Agenten mit eigenem Interface:
- Ein Klick auf eine Agenten-Kachel im Abschnitt "Unsere KI-Agenten" breitet die Kachel
  ueber die volle Rasterbreite aus und zeigt ein individuell gestaltetes Bedien-Interface
  fuer genau diesen Agenten (Trefferliste, Code-Pruefung, Regelwerk-Auskunft, Digest,
  Ampelbefund, Fundstellen).
- Es ist immer nur eine Kachel geoeffnet; die geoeffnete Kachel wird automatisch in den
  Sichtbereich gerueckt (nutzt Lenis, falls vorhanden, sonst nativen Smooth-Scroll).
- Rechts neben dem Interface stehen die Beschreibung und ein dreistufiger Ablauf
  ("So arbeitet der Agent").
- Die Interfaces sind statische Vorschauen mit Beispieldaten, kein Live-System. Jede
  Vorschau traegt dazu sichtbar die Kennzeichnung "Interface-Vorschau · Beispieldaten".
  Diese Kennzeichnung bitte NICHT entfernen — sonst entsteht der Eindruck eines
  produktiven Systems mit echten Kundendaten.
- Umgesetzt ausschliesslich mit HTML/CSS und einem kleinen Inline-Skript, ohne neue
  Abhaengigkeiten. Ohne JavaScript funktioniert das native <details>-Aufklappen weiter.
- Alle Aenderungen liegen in index.html (CSS-Block "KI-AGENTEN — AUSGEKLAPPTES
  EINZEL-INTERFACE", Markup im Abschnitt #ki-agenten, Skriptblock am Dateiende).

Hinweis GitHub Pages: nach dem Deployment einmal hart neu laden (Strg+Shift+R),
sonst wird die alte, gecachte Version ausgeliefert.


Behoben in v3.8 (Regression aus v3.7):
- Beim Austausch des Agenten-CSS in v3.7 wurden versehentlich die Regeln fuer
  .agent-arch-link (Kasten "Wie wir KI-Agenten bauen") und .agent-pricing / .agent-price
  (Preisblock unter den Agenten) mitgeloescht. Beide Bereiche erschienen dadurch ohne
  Rahmen, Hintergrund und Spaltenraster als fortlaufender Text.
  Die Regeln sind unveraendert aus v3.5 wiederhergestellt.
- Pruefung: Selektor-Abgleich gegen v3.5 zeigt keine fehlenden CSS-Klassen mehr,
  Klammerbilanz im <style>-Block ausgeglichen (607/607).

Neu in v3.7 — eigenes Farbklima je Agent:
- Jedes Agenten-Interface hat ein eigenes Farb- und Formklima und uebernimmt NICHT die
  Hausfarben der TM KI Consulting UG. Die Fenster sollen wie sechs verschiedene Produkte
  wirken, nicht wie sechs Ausschnitte dieser Website:
    01 Akquise      helles Vertriebswerkzeug, Pflaume (#8e2f63)
    02 Webdesign    dunkle Entwicklerumgebung, Violett (#a78bfa), Monospace-Labels
    03 Gefahrgut    heller Industrieton, Warnorange (#b0530a), Gefahrgutstreifen im Kopf
    04 News-Radar   dunkles Redaktionsgruen, Mint (#4fd1a5), Serifentitel
    05 Betrugsmaschen  helle Buergeroberflaeche, Blau (#1d4ed8), groessere Schrift, runde Ecken
    06 Wissen       dunkles Archivbraun, Gold (#d9a441), Serifenantwort
- Technisch ueber CSS-Variablen je data-agent geloest (--ui-bg, --ui-accent, --ui-ink,
  --ui-radius usw.). Ein neues Farbklima ergaenzt man, indem man einen Block
  .agent-card[data-agent="..."] .agent-ui { ... } anlegt — kein Eingriff in die Bausteine.
- Der Akzent des Agenten erscheint zusaetzlich auf der aufgeklappten Kachel: duenne
  Linie oben, Agentennummer und die Ziffern im Block "So arbeitet der Agent".
- Alle sechs Farbklimata wurden auf Kontrast geprueft: kleinster gemessener Wert 4,81:1,
  damit ueberall ueber der WCAG-2.1-AA-Schwelle von 4,5:1. Bei Farbaenderungen bitte
  erneut pruefen.

Behoben in v3.7:
- Im Block "So arbeitet der Agent" rutschte der Beschreibungstext in die 26 px schmale
  Ziffernspalte und brach nach jedem Wort um. Ursache: drei Rasterelemente (Ziffer, b, em)
  in einem zweispaltigen Raster. Jetzt sind Spalte und Zeile explizit zugewiesen.
- Die globalen Regeln .agent-body p / .agent-body a faerbten Hinweistexte innerhalb der
  hellen Interfaces hellgrau (Kontrast 1,8:1). Die Interface-Regeln sind jetzt als
  .agent-ui .aui-hint bzw. .agent-ui .aui-p geschrieben und setzen sich durch.

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
- Anbieter: TM KI Consulting UG (haftungsbeschränkt), Ernst-Tengelmann-Ring 22, 45259 Essen.
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
