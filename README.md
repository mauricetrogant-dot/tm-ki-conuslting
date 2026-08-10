# TM KI Consulting — Website (v3.9)

Statische Website der TM KI Consulting UG (haftungsbeschränkt), ausgeliefert über
GitHub Pages unter **https://www.tm-ki-consulting.de**.

---

## Deployment auf GitHub Pages

1. Repository anlegen (öffentlich oder privat mit Pages-Berechtigung).
2. **Den gesamten Inhalt dieses Ordners** in das Repository-Root laden — nicht den
   Ordner selbst, sondern seinen Inhalt. `index.html` muss direkt im Root liegen.
3. `Settings → Pages → Build and deployment`: Source auf **Deploy from a branch**,
   Branch `main`, Ordner `/ (root)`.
4. Unter `Settings → Pages → Custom domain` steht `www.tm-ki-consulting.de`.
   Die Datei `CNAME` im Root sorgt dafür, dass die Einstellung beim Deploy erhalten
   bleibt — **nicht löschen**.
5. `Enforce HTTPS` aktivieren, sobald das Zertifikat ausgestellt ist (dauert nach
   dem ersten Deploy einige Minuten).
6. Nach jedem Deploy einmal hart neu laden (Strg+Shift+R bzw. Cmd+Shift+R),
   sonst liefert der Browser-Cache die alte Fassung aus.

### Wichtig: `.nojekyll`

Die leere Datei `.nojekyll` im Root **muss mit hochgeladen werden**. Ohne sie
schiebt GitHub Pages jede Datei durch Jekyll — die `.md`-Dateien würden dann zu
HTML gerendert und wären nicht mehr im Rohformat abrufbar. Achtung: Manche
Datei-Uploads über die GitHub-Weboberfläche ignorieren Dateien, die mit einem
Punkt beginnen. Im Zweifel `.nojekyll` nach dem Upload einmal über
`Add file → Create new file` von Hand anlegen (leerer Inhalt genügt).

### Lokal ansehen

Ein Doppelklick auf `index.html` reicht **nicht** — Browser blockieren dynamische
Modul-Importe über `file://`, die Hero-Animation bleibt dann leer.

**Windows:** `start.bat` doppelklicken. Das schwarze Fenster offen lassen, solange
die Website genutzt wird; beenden mit Strg+C. Das Skript sucht sich selbst Python
oder Node.js und startet auf `http://localhost:8000/index.html`. Ist keines von
beiden installiert, greift der Fallback über VS Code mit Live Server. Bei Node.js
übernimmt `local-server.js` — beide Dateien gehören zusammen.

**macOS/Linux:** im Ordner `python3 -m http.server 8000` starten (oder `npx serve .`)
und `http://localhost:8000/` aufrufen.

`start.bat` und `local-server.js` sind reine Entwicklungshilfen. Sie stören auf
GitHub Pages nicht — statische Dateien, die niemand aufruft — und bleiben deshalb
im Repository.

---

## Auffindbarkeit für Suchmaschinen und KI-Systeme

| Datei | Zweck |
| --- | --- |
| `robots.txt` | Crawler-Steuerung. Muss `robots.txt` heißen (RFC 9309) — **nicht umbenennen**. KI-Crawler sind bewusst freigegeben, `datenschutz.html` ist in jeder Gruppe ausgeschlossen. |
| `sitemap.xml` | Liste aller indexierbaren HTML-Seiten. Die `.md`-Spiegel sind bewusst nicht gelistet (Duplikate). |
| `llms.txt` | Kurzübersicht nach der llms.txt-Konvention. Der Inhalt **ist** Markdown, die Endung `.txt` gehört zur Spezifikation — nicht in `.md` umbenennen, sonst findet sie kein System. |
| `llms-full.txt` | Volltext aller Inhaltsseiten in einer Datei, damit ein Modell nicht sechs URLs einzeln nachladen muss. |
| `*.md` | Markdown-Spiegel je Inhaltsseite (gleicher Pfad, `.html` → `.md`), verlinkt per `<link rel="alternate" type="text/markdown">` im `<head>`. |

### Pflegehinweis

Die `.md`-Dateien sind **generierte Spiegel**, keine Quelle. Wird eine HTML-Seite
inhaltlich geändert, müssen die zugehörige `.md` und `llms-full.txt` neu erzeugt
werden — sonst laufen HTML- und Markdown-Fassung auseinander und KI-Systeme
zitieren einen veralteten Stand.

Betroffene Seiten: `index`, `sicherheitsarchitektur`, `agi-artikel`,
`fable5-sperre-artikel`, `ki-spieleentwicklung-artikel`, `agent-harness-artikel`.

---

## Struktur

```
index.html                          Startseite
sicherheitsarchitektur.html         Zwei-Pfad-Architektur, tokenminimaler Bau
agi-artikel.html                    Insight-Artikel
fable5-sperre-artikel.html          Insight-Artikel
ki-spieleentwicklung-artikel.html   Insight-Artikel
agent-harness-artikel.html          Insight-Artikel
cockpit-demo.html                   Cockpit-Demo (lädt die beiden Cockpit-Seiten als iframes)
cockpit-prozesssteuerung.html
cockpit-anwendungsbereich-a.html
start.bat                           Lokale Vorschau unter Windows (nur Entwicklung)
local-server.js                     Wird von start.bat genutzt, wenn nur Node.js da ist
impressum.html                      Impressum (auch als Popup auf der Startseite)
datenschutz.html                    Datenschutzerklärung
404.html                            Fehlerseite (von GitHub Pages automatisch genutzt)
assets/
  TM_KI_Logo.png/.webp              Logo
  julian-manske.*, maurice-trogant.*
  leistungskatalog-cover.*
  Leistungskatalog_TM-KI-Consulting_v.1.pdf
  fonts/                            Lokal gehostete Schriften (Inter, Playfair) + fonts.css
  js/hero-three.js                  Hero-Animation (Three.js-Agentenfeld)
  js/webmcp.js                      Meldet Werkzeuge für KI-Agenten im Browser an
  js/vendor/lenis.min.js            Scroll-Bibliothek
  js/vendor/three.module.min.js     Three.js (lokal, kein CDN)
  js/vendor/three.core.min.js       Wird von three.module.min.js intern importiert —
                                    beide Dateien gehören zusammen!
```

---

## Beim Bearbeiten unbedingt beachten

- **Kein CDN, keine externen Schriften.** Sämtliche Ressourcen (Inter, Playfair
  Display, Three.js, Lenis) werden lokal ausgeliefert. Genau das sagt die
  Datenschutzerklärung zu. Wer eine externe Einbindung ergänzt, muss die
  Datenschutzerklärung anpassen — sonst entsteht ein DSGVO-Verstoß.
- **Die Kennzeichnung „Interface-Vorschau · Beispieldaten"** an den sechs
  Agenten-Interfaces nicht entfernen. Sonst entsteht der Eindruck eines produktiven
  Systems mit echten Kundendaten.
- **Nach jeder Änderung am `<style>`-Block** einen Selektor-Abgleich gegen die
  Vorversion fahren. In v3.7 waren `.agent-arch-link` und `.agent-pricing`
  versehentlich mitgelöscht worden (behoben in v3.8).
- **Firmierung** immer vollständig: „TM KI Consulting UG (haftungsbeschränkt)".
- **USt-IdNr.** ist im Impressum als auskommentierter Block hinterlegt und wird
  eingeblendet, sobald sie erteilt ist.
- Die Cockpit-Demo nutzt `localStorage` für Favoriten und Sprachausgabe-Einstellung;
  beschrieben in der Datenschutzerklärung, Abschnitt 4.

---

## Änderungen in v3.9

- `.nojekyll` ergänzt (Voraussetzung dafür, dass `.md`-Dateien roh ausgeliefert werden).
- Markdown-Spiegel für die sechs Inhaltsseiten erzeugt, jeweils per
  `<link rel="alternate" type="text/markdown">` im `<head>` verlinkt.
- `llms-full.txt` ergänzt (Volltext aller Inhaltsseiten).
- `llms.txt`: `agent-harness-artikel.html` ergänzt (fehlte), Hinweise auf die
  Markdown-Fassungen und `llms-full.txt` aufgenommen.
- `sitemap.xml`: `agent-harness-artikel.html` ergänzt (fehlte), `llms-full.txt`
  aufgenommen.
- `robots.txt`: Verweis auf `llms-full.txt` und die Markdown-Fassungen im Kopfkommentar.
- Entfernt: die verwaiste Kopie `hero-three.js` im Root — verwendet wird
  `assets/js/hero-three.js`. `start.bat` und `local-server.js` bleiben erhalten
  (lokale Vorschau unter Windows).
- `README.txt` → `README.md` (wird von GitHub im Repository gerendert).
