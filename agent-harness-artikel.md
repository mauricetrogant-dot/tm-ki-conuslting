# Dasselbe Modell, dreifache Leistung

> Auf ARC-AGI-3, einem Test, den man nicht auswendig lernen kann, hat OpenAI die Punktzahl von GPT-5.6 Sol von 13,3 auf 38,3 Prozent gehoben. Verändert wurden zwei Einstellungen in der Software um das Modell herum. Kurz darauf erreichte Prime Intellect mit einer frei verfügbaren Agenten-Umgebung 95,5 Prozent und lag damit über der menschlichen Expertenmarke. Auch dort blieb das Modell unangetastet.

TM KI Consulting UG (haftungsbeschränkt) · Analyse · Architektur von KI-Agenten · Stand: 6. August 2026 · Lesezeit: ca. 9 Minuten · Quelle: https://www.tm-ki-consulting.de/agent-harness-artikel.html

---

**13,3 → 38,3 %** — GPT-5.6 Sol auf ARC-AGI-3, nach zwei geänderten Einstellungen

**6×** — weniger Ausgabe-Token nach derselben Umstellung

**95,5 %** — Prime Agent mit Opus 5, über der Expertenmarke von 95,4 %

**0** — zusätzliche Trainingsläufe an den Modellen

## Ein Test, den man nicht auswendig lernen kann

ARC-AGI-3 ist der dritte Anlauf der ARC Prize Foundation, Intelligenz messbar zu machen, ohne Wissen abzufragen. Die ersten beiden Versionen zeigten Rätselgitter: Aus wenigen Beispielen soll das System die Regel erschließen und auf einen neuen Fall anwenden. Version 3 verlässt dieses Format. Das System bekommt kleine Computerspiele vorgesetzt, die es noch nie gesehen hat. Es gibt keine Anleitung in Textform, kein genanntes Ziel, keine Erklärung der Steuerung. Der Agent muss durch Ausprobieren herausfinden, worauf es ankommt, sich ein Bild der Welt bauen und seine Strategie im Laufe des Spiels korrigieren. (Quelle 1)

Gemessen wird, wie schnell ein System dabei dazulernt. Die Foundation nennt das Lerneffizienz und begründet den Ansatz so: Solange eine Lücke zwischen maschinellem und menschlichem Lernen besteht, gibt es keine AGI. Alle Umgebungen sind von Menschen lösbar. Ein Wert von 100 Prozent hieße, dass das System so effizient lernt wie ein Mensch. (Quelle 1)

## Der bewusst karge Prüfstand

Zwischen dem Modell und dem Spiel sitzt eine Softwareschicht. Sie reicht Beobachtungen weiter, nimmt Aktionen entgegen und verwaltet den Gesprächsverlauf. Im englischen Sprachgebrauch heißt sie Harness, also Geschirr. Die ARC Prize Foundation hält diese Schicht absichtlich schlicht. Je weniger Hilfestellung, desto sichtbarer werden die Schwächen des Modells und desto fairer fällt der Vergleich zwischen Anbietern aus. (Quelle 2)

In der Praxis arbeitet niemand so. Wer ein Produkt baut, schneidet die Umgebung auf das Modell zu, das er einsetzt. Die Rangliste misst deshalb etwas anderes als den Alltag. Wie groß dieser Abstand ist, hat sich in den vergangenen Wochen zweimal beziffern lassen.

> Was eine Harness tut
>
> Sie entscheidet, was das Modell überhaupt sieht und tun kann: welche Werkzeuge zur Verfügung stehen, wie der Verlauf gekürzt wird, wenn der Kontext voll läuft, ob eigene Zwischenüberlegungen zwischen zwei Schritten erhalten bleiben, wie Teilaufgaben an weitere Instanzen abgegeben werden und was geschieht, wenn etwas schiefgeht. Das Modell liefert die Sprachfähigkeit. Die Harness bestimmt, was daraus im Betrieb wird.

## Zwei Einstellungen, dreifache Punktzahl

Ende Juli veröffentlichte OpenAI eine Notiz zum eigenen Abschneiden auf ARC-AGI-3. Der öffentliche Wert für GPT-5.6 Sol lag bei 13,3 Prozent. Nach dem Aktivieren zweier Einstellungen stieg er auf 38,3 Prozent, bei einem Sechstel der Ausgabe-Token. (Quellen 2, 3)

Die erste Einstellung heißt *retained reasoning*. Sie sorgt dafür, dass die internen Überlegungen des Modells zwischen zwei Zügen erhalten bleiben. Zuvor wurde die Gedankenkette nach jeder Aktion verworfen. Das Modell sah zwar noch das Protokoll seiner bisherigen Züge samt kurzer Notizen, aber nicht mehr die Überlegung, aus der diese Züge hervorgegangen waren. Es musste das Spiel bei jedem Schritt neu begreifen. Die zweite Einstellung, *compaction*, fasst ältere Teile des Verlaufs zusammen, statt sie beim Überlauf abzuschneiden. (Quelle 3)

Beides sind Entscheidungen über Kontextführung. Am Modell wurde nichts geändert.

## Prime Agent behandelt die Harness als veränderliches Objekt

Kurz darauf stellte Prime Intellect eine eigene Agenten-Umgebung vor, ein Unternehmen, das bislang vor allem für verteiltes Modelltraining bekannt war. Prime Agent erreichte mit Claude Opus 5 auf ARC-AGI-3 einen Wert von 95,5 Prozent im ersten Versuch und lag damit knapp über der berichteten menschlichen Expertenmarke von 95,4 Prozent. Über drei Läufe hinweg blieben die Werte stabil bei 95,0, 95,2 und 95,5 Prozent. Mit drei Versuchen je Umgebung stieg das Ergebnis auf 99,97 Prozent. Der Tokenverbrauch lag unter dem der herstellereigenen Umgebungen. Trainiert wurde für diesen Zweck nichts. (Quellen 4, 5)

Zwei Bauentscheidungen tragen das Ergebnis. Die erste nennt Prime Intellect *Recursive Language Model*. Der Kontext wird darin als Variable behandelt, auf die das Modell programmatisch zugreift. Anstelle einer festen Liste von Werkzeugen bekommt es einen dauerhaft laufenden Python-Kernel, gegen den es programmieren kann. Untergeordnete Agenten werden als Funktionsaufrufe gestartet, laufen als eigenständige Sitzungen weiter, sprechen direkt miteinander und überstehen einen Verbindungsabbruch, weil ein Hintergrunddienst sie hält. (Quelle 4)

Die zweite Entscheidung betrifft die Harness selbst. Prompts, Notizen, Fähigkeiten und die Beschreibung der Unteragenten liegen als Zustand vor, den der Agent während der laufenden Arbeit anlegen, lesen, ändern und löschen kann. Ein Befehl namens `/refine` nimmt kleine, belegte Korrekturen daran vor, etwa an einer Prompt-Notiz oder an einer hinterlegten Fähigkeit, ohne das ganze Gerüst neu zu schreiben. Fehlgeschlagene Änderungen lassen sich zurücknehmen. Die Umgebung steht unter MIT-Lizenz öffentlich zur Verfügung. (Quellen 4, 6)

## Der Effekt hängt nicht am Benchmark

Ein einzelner Bestwert ließe sich mit Überanpassung an den Test erklären. Prime Intellect berichtet Verbesserungen aber auch dort, wo ARC-AGI-3 keine Rolle spielt: bei Aufgaben mit sehr langem Kontext, beim Schreiben von GPU-Rechenkernen und in einer Labyrinth-Umgebung, in der die Modelle bei vergleichbarem Tokenbudget deutlich mehr Räume erkundeten. In einem weiteren Test sollten aus einer Spezifikation heraus Emulatoren für SEGA Genesis und Game Boy Color in Rust entstehen. Mit der herstellereigenen Umgebung scheiterte das Modell daran, mit Prime Agent gelang die Aufgabe. Auch mit offenen Gewichten wie GLM-5.2 lag die Umgebung nach eigenen Angaben vor Claude Code und Codex. (Quelle 4)

## Was daraus für Unternehmen folgt

Die Wahl des Modells ist die kleinere der beiden Entscheidungen. Zwischen 13,3 und 38,3 Prozent liegt bei ARC-AGI-3 kein Modellwechsel, sondern eine Konfiguration. Zwischen einer brauchbaren und einer unbrauchbaren Fachanwendung liegt nach unserer Erfahrung dasselbe: die Frage, was das System sieht, welche Quellen es lesen darf, was mit dem Verlauf geschieht, wenn er zu lang wird, und was passiert, wenn die Antwort unsicher ist.

Bei unserem Gefahrgut-Agenten für die Gefahrgutberatung Manske steckt der überwiegende Teil der Arbeit in dieser Schicht. Das Sprachmodell ist austauschbar. Die Wissensbasis aus ADR und GbV, die Prüfung, ob eine Antwort durch eine Quelle gedeckt ist, die Eskalation an den Gefahrgutbeauftragten bei sicherheitskritischen Fällen und die Protokollierung jedes Schritts sind es nicht. Ein Modellwechsel bedeutet dort einen Testlauf, kein neues Projekt.

Für die Beschaffung heißt das: Die Frage „Welches Modell setzen Sie ein?" trifft den Kern nur halb. Aussagekräftiger ist, wie der Kontext verwaltet wird, wie Werkzeuge angebunden sind, an welcher Stelle ein Mensch eingreift und wie sich das alles im Nachhinein nachvollziehen lässt.

## Was man dazusagen muss

Alle genannten Zahlen stammen von den beteiligten Anbietern und sind nicht unabhängig geprüft. OpenAIs Werte kamen über API-Einstellungen zustande, die nicht dem Standard entsprechen, was die Vergleichbarkeit mit anderen Einträgen der Rangliste beeinträchtigt. Aus diesem Grund gibt die ARC Prize Foundation überhaupt eine karge Umgebung vor. (Quelle 7)

Ein Rekord auf einem Benchmark belegt außerdem keine Betriebstauglichkeit. ARC-AGI-3 misst, wie schnell ein System in einem unbekannten Spiel dazulernt. Im Unternehmen zählt anderes: ob eine Auskunft durch eine Quelle gedeckt ist und wer im Zweifel übernimmt. Ein Agent, der schnell lernt, ist noch keiner, dem man eine Gefahrgutauskunft anvertraut.

An der Richtung des Befunds ändert das nichts. Wer die Leistung eines KI-Systems verbessern will, hat mit dem Gerüst um das Modell herum einen Hebel, der eine ganze Modellgeneration aufwiegen kann. Und dieser Hebel liegt, anders als das Modell selbst, im eigenen Zugriff.

## Quellen

1. ARC Prize Foundation: *ARC-AGI-3, Interactive Reasoning Benchmark*. [arcprize.org/arc-agi/3](https://arcprize.org/arc-agi/3) (abgerufen 06.08.2026)
2. OpenAI: *How enabling two settings tripled our scores on the ARC-AGI-3 benchmark*. [openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores](https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores/)
3. GIGAZINE: *OpenAI has successfully tripled its ARC-AGI-3 score by improving the GPT-5.6 harness*, 31.07.2026. [gigazine.net](https://gigazine.net/gsc_news/en/20260731-how-enabling-two-settings-tripled-arc-agi-3-benchmark/)
4. Prime Intellect: *Prime Agent*. [primeintellect.ai/blog/prime-agent](https://www.primeintellect.ai/blog/prime-agent)
5. AlphaSignal: *Prime Intellect's Prime Agent Beats Human Experts on ARC-AGI-3 by Rewriting Itself*. [alphasignal.ai](https://alphasignal.ai/news/prime-intellect-s-prime-agent-beats-human-experts-on-arc-agi-3-by-rewriting)
6. Quellcode unter MIT-Lizenz: [github.com/PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent)
7. MLQ News: *OpenAI Claims GPT-5.6 Sol Beats Opus 5 on ARC-AGI-3, but Only With Non-Standard API Settings*. [mlq.ai](https://mlq.ai/news/openai-claims-gpt-56-sol-beats-opus-5-on-arc-agi-3but-only-with-non-standard-api-settings/)

> Die Leistungswerte von OpenAI und Prime Intellect sind Herstellerangaben und zum Redaktionsschluss nicht unabhängig verifiziert. Die Originalseite von OpenAI (Quelle 2) war bei der Recherche nicht direkt abrufbar; die dort genannten Zahlen entnehmen wir der Berichterstattung (Quellen 3 und 7).
