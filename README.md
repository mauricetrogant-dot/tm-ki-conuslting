# TM KI Consulting — Website (v4.1)

Statische Website der TM KI Consulting UG (haftungsbeschränkt), produktiv unter
**https://www.tm-ki-consulting.de**. Der eigene VPS zieht den freigegebenen Stand
aus diesem Repository und veröffentlicht ihn atomar über nginx.

---

## Produktivbetrieb auf dem eigenen VPS

Die Serverkonfiguration liegt im privaten Repository
`TM-KI-Consulting/Betrieb` unter `server/`. Verwendet werden dort insbesondere:

- `nginx-website.conf` für HTTPS, kanonische Domain und Sicherheitskopfzeilen,
- `website-aktualisieren.sh` für den atomaren Release-Wechsel,
- `website-aktualisieren.timer` für den automatischen Abgleich alle fünf Minuten,
- `INSTALLATION-GESAMTSYSTEM.md` für die vollständige Einrichtung.

`_backup/`, Git-Metadaten, lokale Startskripte, `README.md`, `AENDERUNGEN.md`,
`CNAME` und `.nojekyll` werden nicht in den nginx-Webroot kopiert. Die
Markdown-Spiegel und `llms*.txt` bleiben dagegen bewusst öffentlich erreichbar.

Der Navigationspunkt **Anmelden** führt auf das getrennte interne Cockpit unter
`https://cockpit.tm-ki-consulting.de/`. Das Cockpit ist nicht Teil dieses
statischen Webroots und wird durch Entra ID mit MFA geschützt.

## GitHub Pages (nur Übergang/Rückfallweg)

Bis VPS, TLS und Anmeldung vollständig abgenommen sind, kann GitHub Pages als
Rückfallweg aktiv bleiben. Danach Pages in den Repository-Einstellungen
deaktivieren; die Datei `CNAME` bleibt nur für diesen Übergang im Repository.

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

### Was nicht auf den Server gehört

`_backup/` und `AENDERUNGEN.md` sind Arbeitsmaterial. Auf GitHub Pages wären sie
öffentlich abrufbar — `AENDERUNGEN.md` beschreibt interne Abläufe, die `.bak`-Dateien
sind vollständige Altfassungen der Seiten.

Die mitgelieferte `.gitignore` hält beide aus dem Repository heraus; beim Arbeiten mit
`git push` musst du nichts weiter tun. Lädst du dagegen **manuell über die
GitHub-Weboberfläche** hoch, greift die `.gitignore` nicht — dann beide vorher aus dem
Upload weglassen. Ergänzend sind sie in `robots.txt` auf `Disallow` gesetzt; das ist
aber nur eine Bitte an Crawler, kein Zugriffsschutz.

Lokal können beide liegen bleiben, sie stören beim Testen nicht.

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
AENDERUNGEN.md                      Arbeitsdoku zu den Visual-Effekten — nicht deployen
_backup/                            Sicherungen vor den Visual-Änderungen — nicht deployen
assets/
  TM_KI_Logo.png/.webp              Logo
  julian-manske.*, maurice-trogant.*
  leistungskatalog-cover.*
  Leistungskatalog_TM-KI-Consulting_v.1.pdf
  fonts/                            Lokal gehostete Schriften (Inter, Playfair) + fonts.css
  js/hero-three.js                  Hero-Animation (Three.js-Agentenfeld)
  js/thinking-orbs/                 Orb-Bibliothek (MIT, lokal gehostet, kein npm-Aufruf)
    orb.js, thinking-orbs.mjs, LICENSE
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

## Änderungen in v4.0

Aufsetzend auf dem Visual-Stand vom 09.08.2026 (Orb-Anker, gezeichnete
Verbindungslinien, hochlaufende Zahlen, Aufdeck-Effekt — im Detail beschrieben in
`AENDERUNGEN.md`) wurden ergänzt:

- `.nojekyll` (Voraussetzung dafür, dass `.md`-Dateien roh ausgeliefert werden).
- Markdown-Spiegel für die sechs Inhaltsseiten, jeweils per
  `<link rel="alternate" type="text/markdown">` im `<head>` verlinkt.
- `llms-full.txt` (Volltext aller Inhaltsseiten).
- `llms.txt`: `agent-harness-artikel.html` ergänzt (fehlte), Hinweise auf die
  Markdown-Fassungen und `llms-full.txt` aufgenommen.
- `sitemap.xml`: `agent-harness-artikel.html` ergänzt (fehlte), `llms-full.txt`
  aufgenommen.
- `robots.txt`: Verweis auf `llms-full.txt` und die Markdown-Fassungen im
  Kopfkommentar; `_backup/` und `AENDERUNGEN.md` auf `Disallow`.
- `.gitignore` neu — hält `_backup/` und `AENDERUNGEN.md` aus dem Repository.
- `README.txt` → `README.md` (wird von GitHub im Repository gerendert).

`start.bat` und `local-server.js` sind unverändert übernommen.

Die Textinhalte der Seiten sind gegenüber v3.8 unverändert, mit einer Ausnahme: Im
Abschnitt „Unsere KI-Agenten" ist eine Unterzeile hinzugekommen („Sechs Agenten, ein
Bauprinzip …"). Sie ist in `index.md` und `llms-full.txt` nachgezogen.

## Änderungen in v4.1

- Navigationspunkt **Anmelden** ergänzt; Ziel ist ausschließlich die geschützte
  Cockpit-Subdomain.
- Dokumentation vom GitHub-Pages-Dauerbetrieb auf den eigenen VPS mit nginx
  umgestellt.
