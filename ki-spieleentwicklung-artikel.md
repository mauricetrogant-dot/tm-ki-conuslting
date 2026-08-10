# Wie Top-KI-Modelle heute Software bauen

> Fable 5.0 entwickelt in Roblox Studio ein sogenanntes „Tycoon"-Spiel: vom leeren Projektordner zum spielbaren Stand in rund vier Stunden, mit Human in the Loop. Das Projekt ist dokumentiert, die Zahlen sind gemessen: Zeitleiste, Codezeilen, Testläufe, Tokenverbrauch. Am Ende steht eine ehrliche Einordnung, was davon auf den Unternehmensalltag übertragbar ist.

TM KI Consulting UG (haftungsbeschränkt) · Praxisbericht · KI-Agenten in der Entwicklung · Stand: 17. Juli 2026 · Lesezeit: ca. 8 Minuten · Quelle: https://www.tm-ki-consulting.de/ki-spieleentwicklung-artikel.html

---

**≈ 45 min** — vom leeren Ordner zum lauffähigen Spielgerüst

**≈ 5.400** — Codezeilen in der 3-Stunden-Kernsession

**94 / 95** — bestandene Selbsttests in der echten Spiel-Engine

**3 + 1** — KI-Subagenten + Mensch im Feedback-Loop

## Das Experiment

Wie weit tragen die aktuellen Top-KI-Modelle, wenn man ihnen ein komplettes Softwareprojekt übergibt: Architektur, Gameplay, Physik, Benutzeroberfläche und Tests statt einer einzelnen Funktion? Um das zu prüfen, haben wir ein privates Spielprojekt vollständig KI-gestützt entwickelt und dabei mitgemessen.

Die Aufgabe: ein Mehrspieler-„Tycoon"-Spiel für die Plattform Roblox. Zwei Fraktionen, ausbaubare Basen, eroberbare Flaggen, Fahrzeuge mit eigenem Flugmodell, serverseitig validierte Waffen, eine prozedural erzeugte Wüstenkarte. Das ist bewusst kein Spielzeugbeispiel: Roblox-Spiele sind verteilte Client-Server-Systeme mit Physik-Engine, Replikation und echten Sicherheitsanforderungen (der Server darf dem Client nicht vertrauen).

> Das Setup
>
> Entwickelt wurde „code-first": Der gesamte Spielcode (Sprache: Luau) liegt als Dateien in einem Git-Repository und wird über das Open-Source-Werkzeug Rojo live mit Roblox Studio synchronisiert. Das KI-Modell **Fable 5.0** (Anthropic) arbeitete über Claude Code direkt auf diesen Dateien: Es plante, schrieb, testete und committete selbst. Der Mensch saß daneben in Roblox Studio, spielte jeden Stand probe und gab Design-Entscheidungen vor.

## Vier Stunden im Zeitraffer

Die Zeitleiste stammt aus dem Git-Verlauf des Projekts; jeder Eintrag ist ein realer Commit mit Zeitstempel:

- +45 Minuten
  **Das komplette Spielgerüst steht:** 16 Dateien, 1.999 Zeilen Code. Basen mit Reaktor-Ausbau, Tresor-Raub-Mechanik, drei eroberbare Flaggen, Event-System, Fahrzeuge, Waffen, Jetpack und die prozedurale Wüstenkarte — lauffähig.
- +1,5 Stunden
  **Erste Playtest-Runde mit dem Menschen:** Korrekturen aus dem Live-Test, dazu Fraktions-System, Seltenheitsstufen und Karten-Ausbau (+718 Zeilen in 40 Minuten).
- +2 Stunden
  **Die KI baut sich eine eigene Test-Infrastruktur** und findet damit sofort einen kritischen Fehler: Eine Physik-Eigenschaft (*LinearVelocity.MaxForce*) steht in der Engine standardmäßig auf null. Folge: Kein einziges Fahrzeug wäre je gefahren. Im reinen Code-Review ist das praktisch unsichtbar; im automatisierten Engine-Test fiel es sofort auf.
- +3 Stunden
  **Gunplay-Überholung** (Trefferfeedback, Schadenszahlen, Rückstoß, Zielfernrohr), Kauf-Stationen, Verdopplung der Kartengröße: 1.195 neue Zeilen in einer Stunde, inklusive Recherche.
- +3,5–4 Stunden
  **Flugmodell, Bordkanonen, Bomben, Magazine, Kill-Streaks, Bestenliste** sowie ein Autopilot, mit dem die KI ihre Fahrzeuge selbst probefährt und -fliegt.
- danach
  **Übergabe an günstigere KI-Agenten:** Weitere gut abgegrenzte Aufgabenpakete (u. a. Waffensysteme, Fahrzeug-Umbauten, Recherchen) erledigten kleinere Modelle im Hintergrund; dazu unten mehr.

Nach der dreistündigen Kernsession standen rund **5.400 Zeilen lauffähiger Code** im Repository; mit den anschließenden Subagenten-Paketen wuchs das Projekt auf knapp 8.000 Zeilen. Zur Einordnung: gemessen wurde mit dem Git-Statistikwerkzeug, gezählt werden Code-, Konfigurations- und Dokumentationszeilen.

## Die KI prüft ihre eigene Arbeit

Die auffälligste Beobachtung des Experiments betrifft weniger das Tempo beim Schreiben als den Umgang mit Qualität. Unaufgefordert baute das Modell eine Selbsttest-Umgebung: Das Spiel wird in der echten Roblox-Engine gestartet, ein Testskript fährt alle Fahrzeuge, feuert alle Waffen, misst Geschwindigkeiten, Schaden, Nachladezeiten und Trefferzonen und meldet die Ergebnisse zurück. Zwei vollautomatische Läufe ergaben **85 von 86** beziehungsweise **94 von 95 bestandenen Prüfungen**.

Dieselbe Systematik zahlte sich am zweiten Tag erneut aus: Ein Bombentreffer richtete trotz korrekter Zündung keinerlei Schaden an. Der beauftragte Subagent fand die Ursache in einer undokumentiert wirkenden Voreinstellung der Engine: Die Umgebungsabfrage der Explosion bricht standardmäßig nach 20 gefundenen Objekten ab, und ein einziger Fahrzeugrumpf besteht bereits aus mehr Teilen. Solche Fehler haben mit schlechtem Programmieren nichts zu tun; sie stecken in den Eigenheiten der Plattform. Dass die KI sie über eigene Messläufe findet statt durch Raten, ist der qualitative Unterschied zu früheren Modellgenerationen.

> Entscheidend ist nicht, wie schnell die KI Code schreibt, sondern dass sie prüfbar arbeitet: Sie baut, misst und belegt, bevor sie weitermacht.

## Human in the Loop: Was der Mensch beitrug

„KI entwickelt ein Spiel in vier Stunden" wäre nur die halbe Wahrheit. Der Mensch war durchgehend Teil des Systems, und zwar dort, wo Urteilsvermögen gefragt ist:

- **Spielgefühl:** Jeder Stand wurde live in Roblox Studio getestet. „Das Fahrzeug fühlt sich schwammig an", „die Nacht ist zu dunkel" — solche Rückmeldungen kann keine Testautomatik liefern.
- **Design-Entscheidungen:** Fraktions-Ästhetik, Fahrzeug-Looks, Materialwahl. Die KI baute Entscheidungsvorlagen, etwa einen begehbaren „Teststand" mit Material-Mustern im Spiel; der Mensch wählte aus.
- **Priorisierung und Freigaben:** Welche Features als Nächstes, wann committed wird, wann Schluss ist: Diese Entscheidungen blieben beim Menschen.

Nach demselben Arbeitsprinzip setzen wir Fachagenten in Unternehmen auf: Die KI übernimmt Recherche, Umsetzung und Selbstprüfung, der Mensch behält die Entscheidungen, an denen Verantwortung hängt.

## Arbeitsteilung und Tokenkosten: das teure Modell plant, günstige Modelle arbeiten zu

Top-Modelle rechnen pro verarbeitetem Token deutlich teurer ab als kleinere. Deshalb wurde im Projekt bewusst delegiert: Fable 5.0 plante, zerlegte die Arbeit in geprüfte Auftragspakete und verteilte sie an kleinere Modelle (Anthropic Sonnet und Haiku), die parallel im Hintergrund arbeiteten. Vier dieser Subagenten-Läufe wurden vollständig protokolliert:

| Aufgabenpaket | Modell | Tokens | Dauer |
| --- | --- | --- | --- |
| **Engine-Testlauf** — Selbsttests ausführen und auswerten | Sonnet | **118.337** | **≈ 7 min** |
| **Recherche Textur-Workflows** — Vorgehensweisen inkl. Quellen | Haiku | **51.984** | **≈ 3 min** |
| **Drei Waffensysteme** — Cluster-Bomben, zielsuchende Raketen mit Aufschaltlogik, Täuschkörper-Abwehr, inkl. HUD und Bugfix | Sonnet | **351.466** | **≈ 42 min** |
| **Fahrzeug-Redesign** — Kampfflugzeug nach Design-Vorgabe prozedural umgebaut | Sonnet | **103.786** | **≈ 4 min** |

Bemerkenswert ist weniger die absolute Zahl als das Muster: Ein komplettes, dreiteiliges Waffensystem inklusive Fehlersuche kostete gut 350.000 Tokens Rechenaufwand eines Mittelklasse-Modells; beim aktuellen Preisniveau entspricht das einem Betrag im niedrigen einstelligen Euro-Bereich.

Der Tokenverbrauch von Fable 5.0 selbst wurde in dieser Session nicht separat protokolliert. Nach Erinnerung des Projektverantwortlichen, als Schätzwert und nicht auf dem Genauigkeitsniveau der Tabelle oben: rund 109.341 Tokens in der rund dreistündigen Kernsession.

## Einordnung: „Schneller als ein Senior-Entwickler"?

Man könnte die 5.400 Zeilen in drei Stunden nun gegen die Tagesleistung menschlicher Entwickler stellen. In der Software-Literatur kursieren als grobe Richtwerte für nachhaltige Produktivität einige Dutzend bis wenige Hundert Netto-Codezeilen pro Tag und Person in Produktionsqualität. Die Quellenlage dazu ist allerdings heterogen, und Codezeilen sind als Produktivitätsmaß zu Recht umstritten, weil sie Ausstoß messen und nicht Wert.

Wir lesen die Zahlen deshalb anders. Zwischen „Idee ausgesprochen" und „im Spiel testbar" lagen in diesem Projekt regelmäßig Minuten, nicht Tage. Dieselbe Session deckte außerdem ein Spektrum ab, das sonst mehrere Rollen füllt: Architektur, Gameplay-Code, Physik-Debugging, UI, Testautomatisierung und Projektorganisation. Am wichtigsten aber: Der Engpass verschiebt sich. Das Tempo begrenzte am Ende nicht das Schreiben von Code, sondern die menschliche Kapazität, Stände zu testen und Entscheidungen zu treffen. Der Mensch im Loop bremst diesen Prozess also nicht, er taktet ihn.

Zur ehrlichen Bilanz gehört auch: Das Projekt ist ein Prototyp mit Testcharakter, kein auslieferungsfertiges Produkt. Teile des von Subagenten erzeugten Codes waren zum Sessionende noch ungeprüft, Feintuning und Abnahmetests standen aus. Der Weg vom starken Prototyp zum betriebenen Produkt bleibt Arbeit; er ist nur sehr viel kürzer geworden.

## Was das für Unternehmen bedeutet

### 1. Prototypen sind keine Wochenprojekte mehr

Was hier für ein Spiel gezeigt wurde, gilt genauso für Fachanwendungen: Ein belastbarer, anfassbarer Prototyp mit echten Daten, Oberfläche und Regeln entsteht heute in Stunden bis Tagen. Das verändert den Start von Digitalisierungsvorhaben: Man kann eine Lösung erst erleben und dann entscheiden, statt monatelang Konzepte zu schreiben.

### 2. Verifikation gehört in die KI-Arbeit eingebaut

Die wertvollsten Momente des Experiments waren die, in denen die KI ihre eigene Arbeit maschinell prüfte und dabei Fehler fand, die ein Mensch kaum entdeckt hätte. Wer KI produktiv einsetzt, sollte das auch einfordern: Agenten, die ihre Ergebnisse messen und belegen, statt sie nur zu behaupten.

### 3. Der Modell-Mix entscheidet über die Wirtschaftlichkeit

Nicht jede Aufgabe braucht das teuerste Modell. Das Muster „Top-Modell plant und prüft, kleinere Modelle arbeiten zu" hat sich im Experiment ebenso bewährt wie in unseren Kundenprojekten. Es senkt die laufenden Kosten deutlich, ohne die Qualität der Gesamtsteuerung aufzugeben.

> Zur Vertiefung
>
> Wie verlässlich der Zugang zu diesen Top-Modellen ist und warum Unternehmen eine souveräne Rückfallebene brauchen: [18 Tage ohne die KI-Spitze: Was die Fable-5-Sperre lehrt](https://www.tm-ki-consulting.de/fable5-sperre-artikel.html). Und zur Frage, wie weit die heutige KI-Spitze wirklich ist: [Ab wann ist ein KI-System AGI?](https://www.tm-ki-consulting.de/agi-artikel.html)

## Quellen und Messgrundlage

1. Eigene Messungen aus dem beschriebenen Projekt (16./17. Juli 2026): Git-Commit-Verlauf mit Zeitstempeln und Zeilenstatistik (git log --stat), protokollierte Subagenten-Läufe (Tokens, Werkzeugaufrufe, Laufzeit), Ergebnisprotokolle der Engine-Selbsttests.
2. Roblox Creator Documentation (Engine, Luau, Physik): [create.roblox.com/docs](https://create.roblox.com/docs)
3. Rojo — Open-Source-Werkzeug für code-first Roblox-Entwicklung: [rojo.space](https://rojo.space)
4. Anthropic, Claude Code (Agenten-Entwicklungsumgebung): [anthropic.com/claude-code](https://www.anthropic.com/claude-code)
5. Zur Einordnung von Codezeilen als Produktivitätsmaß: Steve McConnell, „Code Complete" (2. Aufl., Microsoft Press 2004); Barry Boehm et al., „Software Cost Estimation with COCOMO II" (Prentice Hall 2000).
