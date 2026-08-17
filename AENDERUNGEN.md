# Änderungen in v3_9 gegenüber v3_8

Stand: 09.08.2026
Arbeitsordner: `websites/tm-ki/_site_work/Website_TM_KI_v3_9/tm-ki-conuslting-main/`
Vergleichsstand: `websites/tm-ki/_site_work/Website_TM_KI_v3_8.zip` (unberührt)

Dieses Dokument ist für jemanden geschrieben, der die Sitzung nicht kannte.
Es beschreibt Datei für Datei, was geändert wurde, warum, und wie man zurückkommt.

> **Hinweis:** Es gibt kein Git-Repository in `Manske_AI`. Rückwege laufen
> ausschließlich über die Sicherungen im Ordner `_backup/` und über das
> unveränderte v3_8-ZIP.

---

## 1. Überblick — was gegenüber v3_8 anders ist

| Datei / Ordner | Art der Änderung |
|---|---|
| `assets/js/thinking-orbs/` | **neu** — selbst gehostete Orb-Bibliothek (aus vorheriger Sitzung) |
| `index.html` | Orb-Anker (vorherige Sitzung) + zwei neue visuelle Elemente (B und C) |
| `sicherheitsarchitektur.html` | neues visuelles Element A (gezeichnete Verbindungslinien) |
| `hero-three.js` (Stammverzeichnis) | **entfernt** — verwaiste Altdatei, nach `_backup/` verschoben |
| `_backup/` | **neu** — Sicherungen vor jeder Änderung |
| `AENDERUNGEN.md` | **neu** — dieses Dokument |

Inhaltlich (Texte, Preise, Leistungen, Artikel, Rechtliches) wurde **nichts**
geändert. `llms.txt`, `robots.txt` und `sitemap.xml` bleiben deshalb unverändert
gegenüber v3_8 — es gibt keine neue Aussage, die dort nachzuziehen wäre.

---

## 2. `assets/js/thinking-orbs/` — Orb-Bibliothek (aus der vorherigen Sitzung)

Neu hinzugekommen: `orb.js`, `thinking-orbs.mjs`, `LICENSE`.
Herkunft, Prüfung und Aktualisierungsweg sind in
`websites/_shared/thinking-orbs/HERKUNFT.md` dokumentiert (MIT-Lizenz,
Tarball aus der Registry, sha512 gegen die Registry abgeglichen, kein
`npm install`). Alles wird lokal ausgeliefert, kein externer Aufruf.

In `index.html` hängt daran genau **eine** Stelle: der Orb-Anker
`.agent-anchor` im Kopf der Sektion „Unsere KI-Agenten" (Zustand `breathing`,
64 px), plus der Modul-Lader am Dateiende. Diese Stelle wurde in dieser Sitzung
**nicht angefasst** — über ihren Verbleib entscheidet Julian.

---

## 3. `sicherheitsarchitektur.html` — Element A: gezeichnete Verbindungslinien

**Was:** Die Verbindungslinien der Zwei-Pfad-Architektur zeichnen sich beim
Hineinscrollen nacheinander: erst der gemeinsame Eingang, dann Pfad A (oben),
dann Pfad B (unten), zuletzt die Zusammenführung „Mensch entscheidet".
Gesamtdauer rund 3,7 Sekunden. Die Kästen bleiben statisch. Jede Pfeilspitze
erscheint erst, wenn ihre Linie angekommen ist.

**Wo:**

* Zeilen **382–396** — die sieben `<path>`-Elemente im vorhandenen
  `<svg viewBox="0 0 820 380">` haben die Klasse `ad-line` und ein Attribut
  `data-ad-step` bekommen, das nur die Reihenfolge festlegt.
  Zusätzlich wurde **eine** Linie ergänzt: `d="M160,190 L185,190"` (Stufe 1).
  Sie liegt deckungsgleich über dem gemeinsamen Anfangsstück der beiden
  Abzweigungen und ändert das fertige Bild nicht — sie existiert nur, damit
  sich der gemeinsame Eingang zuerst zeichnen kann, ohne dass die
  Pfaddaten der bestehenden Linien angetastet werden mussten.
* Zeilen **598–698** — neuer Skriptabschnitt am Ende des vorhandenen
  `<script>`-Blocks.

**Warum so gebaut:**

* **Grundzustand ist das fertige Diagramm.** Die Verkürzung
  (`stroke-dasharray` / `stroke-dashoffset`) wird erst im Moment des Abspielens
  per Inline-Stil gesetzt und danach vollständig wieder entfernt. Ohne
  JavaScript, ohne `IntersectionObserver` oder bei
  `prefers-reduced-motion: reduce` steht das Diagramm also von der ersten
  Sekunde an vollständig da. Die Animation ist rein additiv.
* **Nur einmal.** Der Beobachter meldet sich nach dem ersten Auslösen ab
  (`unobserve`), erneutes Scrollen spielt nichts noch einmal ab.
* **Auslöseschwelle:** `threshold: 0.35` mit `rootMargin: '0px 0px -120px 0px'`.
  Das Diagramm ist auf dem Desktop rund 690 px hoch und ragt schon beim Laden
  mit dem oberen Rand ins Bild; ohne diese Schwelle wäre die Animation
  abgelaufen, während man nur den obersten Streifen sieht.
* **Barrierefreiheit:** Das `aria-label` des `<svg>` ist unverändert. Die
  Animation betrifft ausschließlich Kindelemente ohne eigene Bedeutung; für
  Screenreader ändert sich nichts.
* **Aufräumen mit Sicherheitsnetz:** 600 ms nach der letzten Stufe werden alle
  Inline-Stile entfernt. Damit ist der Endzustand garantiert identisch mit dem
  Markup, auch wenn ein Übergang nicht sauber endet.

---

## 4. `index.html` — Element B: hochlaufende Zahlen

**Was:** Zahlen, die bereits im HTML stehen, zählen beim Sichtbarwerden von 0
auf ihren Endwert. Betroffen sind die Bewertungen `.aui-num` (92 · 78 · 61) im
Akquise-Agenten und die Kennzahlen `.aui-kpi strong` in den Agenten-Kacheln
(z. B. `7,4:1`, `1,1 s`, `54`). Dauer 1,1 Sekunden.

**Wo:**

* Zeilen **1961–1966** — CSS: `font-variant-numeric: tabular-nums` und
  `min-height` für `.aui-kpi strong`, damit beim Zählen nichts wackelt.
  (`.aui-num` hatte `tabular-nums` und `min-width` bereits.)
* Zeilen **4198–4306** — neuer Skriptabschnitt `initZahlenHochlauf()` im
  vorhandenen `<script>`-Block, direkt vor dem Data-Scan-Hover.

**Regeln, die dabei eingehalten sind:**

* **Keine erfundenen Zahlen, keine geänderten Werte.** Der Endwert wird aus dem
  Text ausgelesen (`Vorsatz · Zahl · Nachsatz`) und am Ende **wortgleich**
  wieder eingesetzt. Komma als Dezimaltrennzeichen, Nachsätze wie `:1` oder
  ` s` bleiben erhalten.
* **Eine `0` wird nicht animiert** — es gibt nichts hochzuzählen, und ein
  Hochlauf von 0 auf 0 wäre nur Unruhe.
* **Ohne JavaScript** bleibt die Zahl schlicht stehen; sie steht als Text im
  Markup.
* **`prefers-reduced-motion: reduce`** → gar kein Hochlauf, sofort der Endwert.
* **Start nur, wenn die Kachel aufgeklappt *und* die Zahl im Bild ist.**
  Zugeklappt sind die Zahlen nicht im Layout, deshalb zusätzlich ein
  `toggle`-Horcher auf den `<details>`-Kacheln, der die Sichtbarkeit vor dem
  Start noch einmal misst.
* **Screenreader:** Während des Laufs trägt die Zahl `aria-hidden="true"`
  (Zwischenwerte haben keine Aussage), unmittelbar danach steht der korrekte
  Endwert wieder im Baum. Ein Zeitgeber (`Dauer + 900 ms`) stellt den Endwert
  auch dann her, wenn keine Frames mehr geliefert werden.

---

## 5. `index.html` — Element C: Aufdeck-Effekt für Abschnittsköpfe

**Was:** Statt eines bloßen Ein-Fadens wandert ein weicher Maskenverlauf über
Eyebrow, Überschrift und Absatz eines Abschnittskopfes, gestaffelt um je gut
100 ms (Eyebrow → h2 → p), Dauer 1,05 s. Kein Farbwechsel, kein Versatz über
große Strecken.

**Wo:**

* Zeilen **1898–1958** — CSS, direkt hinter der vorhandenen
  `.reveal`-Definition.
* Zeilen **4163–4196** — die vorhandene Reveal-Mechanik wurde erweitert:
  aus `entry.target.classList.add('is-visible')` wurde ein Aufruf von
  `sichtbarMachen(el)`. Beobachter und Sicherheitsnetz rufen dieselbe Funktion.

**Warum so gebaut:**

* **Ein Beobachter, nicht zwei.** Der Effekt hängt an der Klasse `.is-visible`,
  die der vorhandene `revealObserver` setzt. Es kommt kein zweiter
  `IntersectionObserver` dazu.
* **Das 2-Sekunden-Sicherheitsnetz bleibt wirksam.** Es setzt weiterhin alle
  noch nicht sichtbaren `.reveal`-Elemente auf sichtbar — jetzt über dieselbe
  Funktion, sodass auch dort der Aufdeck-Effekt und dessen Aufräumen greifen.
* **Kein Markup-Eingriff.** Die Regeln greifen über den Selektor
  `.section-head.reveal`; in den fünf Abschnittsköpfen musste keine Zeile
  geändert werden.
* **Der Orb-Anker ist ausgenommen.** Maskiert werden nur `.section-eyebrow`,
  `h2` und `p` — nicht `.agent-anchor`. Die Orb-Zeichnung bleibt unberührt.
* **Maske wird wieder entfernt.** 1500 ms nach dem Start setzt
  `sichtbarMachen()` die Klasse `head-done`, die `mask-image: none` schaltet.
  Danach rendert der Text ohne Zwischenebene — das vermeidet dauerhaft
  veränderte Kantenglättung.
* **Ausfallverhalten:** Die Regeln stehen in einem `@supports`-Block für
  `mask-image`. Kann der Browser keine Masken, greift keine der Regeln und der
  Kopf verhält sich exakt wie in v3_8. Bei `prefers-reduced-motion: reduce`
  wird die Maske ebenfalls abgeschaltet und `head-done` sofort gesetzt.
* Für `.section-head.reveal` entfällt der bisherige 40-px-Versatz
  (`transform: translateY(40px)`); die Bewegung übernimmt der Maskenverlauf.
  Andere `.reveal`-Elemente (Karten, Artikel, Team) verhalten sich unverändert.

---

## 6. `hero-three.js` im Stammverzeichnis — entfernt

Im Stammverzeichnis lag eine zweite, **verwaiste** `hero-three.js` mit
falschem Importpfad (`./assets/js/vendor/three.module.min.js`, von dort aus
nicht auflösbar). Eingebunden wird ausschließlich `assets/js/hero-three.js`,
und die lädt `./vendor/three.module.min.js` dynamisch und lokal. Ein Aufruf an
ein CDN findet auf der gesamten Seite nicht statt (nachgemessen: 22 Requests
auf `index.html`, 8 auf `sicherheitsarchitektur.html`, davon **null** fremd).

Die Datei wurde nach `_backup/hero-three.js.STAMMVERZEICHNIS-verwaist.2026-08-09.bak`
verschoben, damit sie nicht mit ausgerollt wird. Zu beachten: `README.txt`
nennt in Zeile 81 weiterhin `js/hero-three.js` — das meint die richtige Datei
unter `assets/js/` und ist damit weiterhin korrekt.

---

## 7. Weg zurück

Alle Sicherungen liegen in
`websites/tm-ki/_site_work/Website_TM_KI_v3_9/tm-ki-conuslting-main/_backup/`:

| Sicherung | Inhalt |
|---|---|
| `index.html.2026-08-09_vor-visuals.bak` | `index.html` **vor** Element B und C (also mit Orbs, ohne die neuen Effekte) |
| `sicherheitsarchitektur.html.2026-08-09_vor-visuals.bak` | `sicherheitsarchitektur.html` **vor** Element A — identisch mit v3_8 |
| `hero-three.js.STAMMVERZEICHNIS-verwaist.2026-08-09.bak` | die entfernte verwaiste Altdatei |

* **Nur die neuen Effekte zurücknehmen:** die beiden `.bak`-Dateien über die
  jeweiligen Originale kopieren (Endung `.bak` und Datumsteil entfernen).
* **Auf den Stand v3_8 zurück:** `Website_TM_KI_v3_8.zip` neu entpacken. Das
  ZIP ist unberührt und enthält weder die Orbs noch die neuen Effekte.
* Der Ordner `_backup/` gehört **nicht** auf den Server. Vor dem Ausrollen
  entfernen (ebenso `AENDERUNGEN.md`, falls die Datei nicht öffentlich sein soll).

---

## 8. Vorschauseite

`websites/_shared/visuals-vorschau.html` zeigt alle drei Effekte isoliert
nebeneinander, jeder mit einer Schaltfläche zum erneuten Abspielen. Die Seite
ist eigenständig: keine Fremdbibliothek, keine externen Aufrufe, Schriften aus
`websites/_shared/fonts/` (Kopie der lokal gehosteten Inter- und
Playfair-Dateien der Website). Sie braucht einen lokalen Server, zum Beispiel
`python -m http.server 8084` im Ordner `websites/_shared/`.

Die Seite trägt `noindex, nofollow` und ist reines Arbeitsmaterial — sie gehört
nicht in ein Deployment.

---

## 9. Prüfung

Geprüft mit Chrome 151 im Headless-Betrieb über das DevTools-Protokoll,
Fenster 1440 × 1000, Auslieferung über einen lokalen Dateiserver.

| Prüfung | Ergebnis |
|---|---|
| Element A, Ablauf | Stufen laufen in der vorgesehenen Reihenfolge und Zeit (Eingang bis ~460 ms, Pfad A bis ~1660 ms, Pfad B bis ~2860 ms, Zusammenführung bis ~3760 ms) |
| Element A, Endzustand | alle Inline-Stile entfernt, Bild pixelgleich mit dem Zustand ohne JavaScript |
| Element A, ohne JS / reduzierte Bewegung | Diagramm sofort vollständig, Aufnahmen identisch zum Endzustand |
| Element B, Ablauf | 92/78/61 laufen hoch, `7,4:1` und `1,1 s` behalten Komma und Nachsatz, `0` läuft nicht |
| Element B, Endwerte | exakt die Werte aus dem Markup, kein `aria-hidden` übrig |
| Element B, ohne JS | Kachel klappt nativ auf, Zahlen stehen statisch bei 92/78/61 |
| Element B, reduzierte Bewegung | Endwerte von Anfang an, kein `aria-hidden` gesetzt |
| Element C, Ablauf | Maskenposition wandert 100 % → 0 %, h2 versetzt hinter der Eyebrow, `head-done` nach ~1,8 s, Maske danach entfernt |
| Element C, ohne JS / reduzierte Bewegung | Kopf sofort vollständig sichtbar |
| Konsole | keine Fehler und keine Ausgaben auf beiden Seiten |
| Fremde Netzaufrufe | keine — weder auf `index.html`, `sicherheitsarchitektur.html` noch auf der Vorschauseite |

## 10. Offene Punkte

1. Ob die Orbs auf der Website bleiben, entscheidet Julian — die Stelle wurde
   bewusst nicht verändert.
2. Das 2-Sekunden-Sicherheitsnetz der Reveal-Mechanik ist unverändert
   übernommen. Es bewirkt (schon in v3_8), dass alle Abschnitte zwei Sekunden
   nach dem Laden als sichtbar gelten. Der Aufdeck-Effekt spielt deshalb nur
   für die Köpfe sichtbar ab, die in den ersten zwei Sekunden erreicht werden.
   Das ließe sich ändern, ist aber eine eigene Entscheidung.
3. Nicht ausgerollt: alles hier ist Arbeitskopie. Vor dem Deploy `_backup/`
   entfernen und danach prüfen, dass `https://www.tm-ki-consulting.de/llms.txt`
   mit HTTP 200 antwortet — Stand 09.08.2026 liefert die Live-Seite dort 404.
