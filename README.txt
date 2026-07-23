TM KI Consulting Website - geordnete Struktur

index.html
TM-KI-Consulting.v.0.2.html
assets/
  TM_KI_Logo.png
  leistungskatalog-cover.png
  julian-manske.png
  maurice-trogant.jpg
  Leistungskatalog_TM-KI-Consulting_v.1.pdf

Wichtig: index.html bzw. die HTML-Datei und der Ordner assets muessen gemeinsam auf den Webserver geladen werden.
Die relativen Pfade sind bereits korrekt gesetzt: assets/dateiname.
Das Impressum oeffnet sich als Popup/Modal.
Der Stadt-Essen-Eintrag wurde rechtlich vorsichtiger formuliert: Es wird nur noch genannt, dass ein mögliches Projektvorhaben mit Bezug zur Stadt Essen vorbereitet beziehungsweise vorgestellt werden soll.

Aktualisierung: Anbieterangabe auf TM KI Consulting GbR mit ladungsfähiger Anschrift Ernst-Tengelmann-Ring 22, 45259 Essen geändert. Das Impressum ist als Popup und zusätzlich als impressum.html-Fallback vorhanden.

Update v0.4 Hero Three.js:
- Im Hero wurde ein dezentes Three.js-Agentenfeld ergänzt.
- Script: assets/js/hero-three.js
- Hinweis: Three.js wird aktuell per CDN geladen (cdn.jsdelivr.net/npm/three@0.184.0). Für produktiven Betrieb kann die three.module.js lokal unter assets/vendor/ abgelegt und der Import im Script angepasst werden.
- Bei reduzierter Bewegung oder fehlender WebGL-Unterstützung greift ein statischer CSS-Fallback.

Lokaler Start unter Windows:
1. ZIP entpacken.
2. In den entpackten Ordner wechseln.
3. start.bat doppelklicken.
4. Das schwarze Fenster offen lassen, solange die Website genutzt wird.

Die Website wird dann ueber http://localhost:8000/index.html gestartet.
Falls Python nicht installiert ist, bitte VS Code mit Live Server verwenden.
