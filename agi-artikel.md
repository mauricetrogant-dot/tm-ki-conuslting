# Ab wann ist ein KI-System AGI?

> Die KI-Spitze entwickelt sich rasend schnell. Und seit Juni 2026 ist belegt, dass der Zugang aus Deutschland jederzeit gekappt und ebenso unvermittelt wiederhergestellt werden kann: 18 Tage lang war die stärkste Modellgeneration per US-Direktive gesperrt, seit dem 1. Juli ist sie wieder da. Über beides hat hierzulande niemand mitentschieden. Was das bedeutet, und warum jetzt der Aufbau eigener, lokaler Modelle zählt.

TM KI Consulting UG (haftungsbeschränkt) · KI-Strategie · Datensouveränität · Stand: 2. Juli 2026 (aktualisiert) · Lesezeit: ca. 9 Minuten · Quelle: https://www.tm-ki-consulting.de/agi-artikel.html

---

## Worum es geht

Im Juni 2026 sind innerhalb weniger Tage zwei Dinge passiert. Anthropic stellte mit Fable 5 und Mythos 5 die bis dahin stärksten KI-Modelle vor. Und nur drei Tage später war der Zugang zu beiden, auch aus Deutschland, per US-Direktive gesperrt. Am 30. Juni wurde die Sperre aufgehoben, seit dem 1. Juli ist Fable 5 wieder verfügbar. Dieser vollständige Zyklus, gesperrt und wieder freigegeben binnen 18 Tagen, ist die eigentliche Geschichte dieses Beitrags.

Daraus folgt eine unbequeme Erkenntnis, und sie zieht sich durch alles Weitere: Ob wir in Deutschland die jeweils beste KI-Technik nutzen können, entscheidet sich nicht hier. Der Zugang kann jederzeit wegfallen, für Tage, Monate oder länger. Nicht, weil die Technik nicht existiert, sondern weil der Zugang dazu nicht in unserer Hand liegt.

Um zu verstehen, was da auf dem Spiel steht, lohnt der nüchterne Blick auf die Frage, die gerade alle umtreibt: Wie nah ist diese Spitze eigentlich an dem, was man AGI nennt? Sie klingt einfach, zerfällt aber in drei härtere Fragen: Was ist überhaupt ein KI-System? Was würde „AGI" bedeuten? Und woran würde man es messen? Erst danach wird greifbar, warum der Zugang zu dieser Technik zu wichtig ist, um ihn aus der Hand zu geben.

## Was ist ein KI-System?

Ein KI-System wie Claude ist kein Wesen und kein digitales Gehirn. Es ist ein sehr großes statistisches Modell, das aus enormen Textmengen gelernt hat, welcher Gedanke, welches Wort, welcher Lösungsschritt am wahrscheinlichsten als Nächstes folgt. Im Kern sagt es immer wieder das nächste Stück Text voraus.

Bemerkenswert ist, was aus diesem einfachen Prinzip entsteht, sobald man es millionenfach verschaltet und mit genug Daten trainiert. Es wächst Verhalten, das im Einzelteil nirgends angelegt ist: Das System schreibt funktionierenden Code, führt mathematische Beweise, plant mehrstufige Arbeitsschritte. Diese Fähigkeiten sehen nach mehr aus als nach bloßer Statistik, und genau deshalb ist die Frage nach AGI überhaupt sinnvoll. Sie zwingt uns zu der Entscheidung, ab wann aus einem nützlichen Werkzeug etwas wird, das man dem menschlichen Verstand ebenbürtig nennen müsste.

## Was würde „AGI" überhaupt bedeuten?

AGI steht für *Artificial General Intelligence*, also ein System, das nicht nur eine Aufgabe beherrscht, sondern über ein breites Spektrum hinweg auf menschlichem Niveau oder darüber arbeitet. Es gibt jedoch keine einzige verbindliche Definition. Drei Bezugspunkte haben sich durchgesetzt:

### Google DeepMind, „Levels of AGI" (Morris et al., 2023)

Der wohl sauberste Rahmen. Er misst auf zwei Achsen: Leistungstiefe und Breite der Aufgaben. Daraus ergeben sich fünf Stufen: Emerging, Competent, Expert, Virtuoso, Superhuman. Aktuelle Chatbots ordnen die Autoren ausdrücklich nur als *Emerging AGI* ein, also die unterste Stufe allgemeiner Intelligenz. [(Quelle 11)](https://arxiv.org/abs/2311.02462)

### OpenAIs fünf Stufen (2024)

Chatbots, dann Reasoner, dann Agenten, dann Innovatoren, schließlich ganze Organisationen. Eine eingängige Leiter, allerdings nur über Berichterstattung bekannt, nicht als offizielles Dokument. [(Quelle 13)](https://theaiinsider.tech/2024/07/12/what-are-openais-five-levels-of-ai-and-where-are-we-now/)

### Der Turing-Test, und warum er ausgedient hat

Lange galt: Wer einen Menschen im Gespräch nicht mehr von der Maschine unterscheiden kann, hat den Test bestanden. 2025 hielten Probanden GPT-4.5 mit passender Rollenanweisung in 73 Prozent der Fälle für den Menschen. Formal bestanden. Doch ohne diese Anweisung fiel die Quote auf 36 Prozent. Der Test misst überzeugende Kommunikation und Täuschung, nicht Intelligenz. Als AGI-Maßstab ist er überholt. [(Quelle 14)](https://arxiv.org/pdf/2503.23674)

Festhalten lässt sich: Selbst die Fachwelt hat keine scharfe Grenze. „AGI" ist heute eher eine Richtung als ein klar markierter Punkt.

## Woran man es messen würde: die harten Benchmarks

Wenn es keine saubere Definition gibt, behilft man sich mit Tests, die so konstruiert sind, dass reines Auswendiglernen nicht ausreicht. Ein wichtiger Vorbehalt vorab: Viele Bestwerte auf den Ranglisten sind **vom Hersteller selbst gemeldet und nicht unabhängig geprüft**. Wir kennzeichnen das hier.

### ARC-AGI (François Chollet)

Der wohl bekannteste AGI-nahe Test. Er prüft nicht Wissen, sondern die Fähigkeit, aus wenigen Beispielen eine neue Regel zu erschließen. Menschen lösen rund 85 Prozent. Ende 2024 überschritt OpenAIs Modell o3 mit 76 bis 88 Prozent erstmals diese Schwelle, im Hochleistungsmodus jedoch zu geschätzten 3.460 US-Dollar pro Aufgabe. Damit gilt die erste Version als weitgehend gelöst. Der Nachfolger **ARC-AGI-2** ist deutlich härter: Laut ARC-Prize-Report vom Dezember 2025 lag das beste *verifizierte* kommerzielle Modell, Claude Opus 4.5, bei nur 37,6 Prozent, zu 2,20 US-Dollar pro Aufgabe. Was für Menschen leicht ist, bleibt für Maschinen teuer und schwer. [(Quellen 1, 2, 3)](https://arcprize.org/arc-agi/1)

### GPQA Diamond

Naturwissenschaftliche Fragen auf Promotionsniveau, „google-sicher" formuliert. Fachpromovierte erreichen rund 65 Prozent. Hier sind die Spitzenmodelle inzwischen über 90 Prozent, der Test gilt als nahezu ausgereizt. [(Quelle 4)](https://epoch.ai/benchmarks/gpqa-diamond)

### Humanity's Last Exam

2.500 Expertenfragen über viele Fächer, bewusst als Härtetest gebaut. Bei Veröffentlichung Anfang 2025 erreichten Spitzenmodelle nur einstellige Werte (GPT-4o 2,7 Prozent, o1 8,0 Prozent). Wie schnell sich das verschoben hat, zeigt der nächste Abschnitt. [(Quellen 5, 6)](https://agi.safe.ai/)

### SWE-bench

Echte Programmierfehler aus GitHub, die das Modell mit lauffähigem Code beheben muss. Wichtig: Die meisten Werte sind herstellergemeldet, nicht unabhängig verifiziert. [(Quellen 7, 8)](https://leaderboard.steel.dev/leaderboards/swe-bench-verified/)

### FrontierMath (Epoch AI)

Sehr schwere, neue Forschungsmathematik. Ende 2024 lag der Bestwert bei 25,2 Prozent. Bezeichnend für die Vorsicht, die hier nötig ist: Am 12. Juni 2026 musste Epoch eine überarbeitete Fassung veröffentlichen, nachdem ein Audit in 42 Prozent der ursprünglichen Aufgaben kleine, aber kritische Fehler gefunden hatte. Selbst die Messlatten sind in Bewegung. [(Quelle 9)](https://epoch.ai/frontiermath/the-benchmark)

**MMLU** schließlich, lange der Standardtest, gilt heute als gesättigt und taugt kaum noch als AGI-Maßstab.

## Wie weit ist die Spitze heute? Das Beispiel Fable 5

Anthropic stellte am 9. Juni 2026 zwei neue Modelle vor: Claude Fable 5 und Claude Mythos 5. Was sich seriös belegen lässt:

Intelligence Index

64,9 · Platz 1

Fable 5 führt den unabhängigen Index von Artificial Analysis an, mit dem höchsten Score auf 5 von 10 Benchmarks.

Drittquelle, verifiziert

Humanity's Last Exam

53 %

Anfang 2025 lagen Spitzenmodelle hier noch im einstelligen Bereich. Ein Sprung um mehr als das Sechsfache.

Drittquelle, verifiziert

SWE-bench Pro

80,3 %

Reale Programmieraufgaben in der strengeren Pro-Variante.

Herstellergemeldet

Humanity's Last Exam: der Sprung an der Spitze

Bestes öffentlich gelistetes Modell je Zeitpunkt, Anteil korrekt beantworteter Expertenfragen in Prozent. In rund anderthalb Jahren von einstellig auf über 50 Prozent.

Datenquelle: öffentliche HLE-Ranglisten, bester gelisteter Wert je Zeitpunkt ([Artificial Analysis](https://artificialanalysis.ai/evaluations/humanitys-last-exam), [pricepertoken.com](https://pricepertoken.com/leaderboards/benchmark/hle)). Die Spitze wird zu verschiedenen Zeitpunkten von verschiedenen Modellen gehalten. Stand: Juni 2026.

Aus Gründen der Redlichkeit: Einzelwerte von Fable 5 speziell für GPQA, ARC-AGI-2 oder FrontierMath ließen sich **nicht aus einer Primärquelle verifizieren**. Sie kursieren nur in widersprüchlichen Drittlisten. Wir nennen sie hier daher bewusst nicht. Was bleibt, ist trotzdem eindrucksvoll: Das Tempo der Fähigkeitszuwächse ist außergewöhnlich. [(Quellen 6, 8, 10)](https://artificialanalysis.ai/articles/claude-fable-5-mythos-intelligence-index)

## Der Spiegeltest, und warum Benchmarks die eigentliche Frage nicht beantworten

Hier kommt der unbequeme Teil. Keiner der genannten Tests misst Bewusstsein. Sie messen Leistung.

Oft wird der Spiegeltest ins Spiel gebracht. Er stammt aus der Tierkognition, 1970 von Gordon Gallup entwickelt, und prüft, ob ein Lebewesen sich selbst im Spiegel erkennt. Bestanden haben ihn unter anderem Menschenaffen, Delfine und Elefanten. Auf eine KI übertragen ist er jedoch nur eine Analogie, kein etablierter Test.

Der wissenschaftliche Befund ist eindeutig und sollte jeden ehrlichen Beitrag zum Thema prägen: **Es gibt keinen validierten Benchmark, der bei einem Sprachmodell Bewusstsein oder „echte" AGI beweist.** Ein Übersichtspapier von 2025 stellt ausdrücklich fest, dass ein einheitlicher Bewusstseins-Benchmark schlicht fehlt, schon weil es keinen Konsens über die richtige Bewusstseinstheorie gibt. [(Quellen 15, 16, 17)](https://www.nature.com/articles/s41599-025-05868-8)

Damit lässt sich die Titelfrage so ehrlich beantworten, wie sie es verdient:

> Ist Fable 5 AGI? Nach dem strengsten verfügbaren Rahmen, den DeepMind-Stufen, bewegen wir uns weiterhin im Bereich Emerging AGI, allerdings am oberen Rand, mit beeindruckendem Tempo. Ein Beweis für AGI im Vollsinn oder gar für Bewusstsein existiert nicht, weil es das Messinstrument dafür nicht gibt. Wer das Gegenteil behauptet, verkauft eine Gewissheit, die die Wissenschaft nicht hergibt.

Genau diese Nüchternheit ist der Punkt. Man muss AGI nicht ausrufen, um zu erkennen, wie groß der Sprung bereits ist. Und gerade *weil* der Sprung so groß ist, wird die nächste Frage geschäftskritisch: Wer hat überhaupt verlässlich Zugriff auf diese Spitze, und wie lange noch?

## Die Dringlichkeit: Warum das genau jetzt zählt

Bis vor Kurzem war der wichtigste Einwand gegen das Verlassen auf externe Spitzenmodelle ein Szenario. Seit dem 12. Juni 2026 ist es ein Fall.

> Belegte Realität, seit dem 12. Juni 2026
>
> **Der Zugang kann von heute auf morgen wegfallen.** An diesem Tag wies die US-Regierung Anthropic per Exportkontroll-Direktive an, Fable 5 und Mythos 5 weltweit für alle Nutzer zu sperren, ausdrücklich auch für „foreign nationals, whether inside or outside the United States". Anthropic hat das umgesetzt und widerspricht inhaltlich, doch der Zugang war weg. Die Kanzlei Greenberg Traurig ordnet den Vorgang als den „first known U.S. use of export control authorities to regulate a particular AI frontier model on a national security basis" ein.
>
> Für Unternehmen in Deutschland hieß das konkret: Über zweieinhalb Wochen war das beste verlässlich nutzbare Modell faktisch Opus 4.8. Wer seine Prozesse auf Fable 5 oder Mythos 5 aufgebaut hatte, stand über Nacht ohne da. [(Quellen 18, 19)](https://www.anthropic.com/news/fable-mythos-access)

> Update, 2. Juli 2026
>
> **Die Sperre ist aufgehoben, die Lehre bleibt.** Am 30. Juni hob das US-Handelsministerium die Exportkontrollen auf, seit dem 1. Juli ist Fable 5 wieder weltweit verfügbar; Mythos 5 zunächst für einzeln freigegebene Organisationen. Hintergrund der Sperre war laut Berichten eine von Amazon-Forschern gefundene Methode, die Schutzmechanismen des Modells zur Schwachstellensuche zu umgehen; Anthropic hat gemeinsam mit der Regierung einen verbesserten Sicherheitsfilter nachgerüstet. [(Quellen 27, 28)](https://www.anthropic.com/news/redeploying-fable-5)
>
> Damit ist der Fall abgeschlossen, und er ist als Ganzes lehrreicher als die Sperre allein: Der Zugang zur KI-Spitze wurde per Direktive gekappt und per Direktive wiederhergestellt, binnen 18 Tagen, ohne dass ein Unternehmen in Deutschland auf das eine oder das andere Einfluss hatte. **Verfügbarkeit ist zurück. Verlässlichkeit ist es nicht.**

Einordnung, weil Redlichkeit hier zählt: Dies war ein Einzelfall-Befehl, kein dauerhafter Lizenzrahmen. Die US-Regel, die so etwas hätte verstetigen können, die „AI Diffusion Rule", wurde im Mai 2025 zurückgenommen. Der EU AI Act wiederum reguliert den Einsatz, sperrt aber keine US-Modelle; seine Durchsetzung greift ab dem 2. August 2026. Eine dauerhafte, generelle Zugangssperre für Europa ist also weiterhin Szenario. Dass eine *einzelne* Anweisung den Zugang sofort kappen kann, ist dagegen seit dem 12. Juni belegte Realität. Und genau hier liegt der wunde Punkt dieses Beitrags: Für die Planung sollte man sich darauf einstellen, dass die jeweils beste Technik über einen längeren Zeitraum hinweg nicht verlässlich aus Deutschland nutzbar ist, auch wenn einzelne Modelle zwischendurch wieder freigeschaltet werden. [(Quellen 23, 24)](https://artificialintelligenceact.eu/implementation-timeline/)

> Einschätzung, keine gesicherte Prognose
>
> **Und die Kosten geraten unter Druck.** Parallel laufen OpenAI und Anthropic auf Börsengänge zu, bei angepeilten Bewertungen jenseits von 800 Milliarden US-Dollar. Berichten zufolge erwartet OpenAI für 2026 über 20 Milliarden Dollar Umsatz bei rund 14 Milliarden Dollar Verlust, mit Profitabilität erst gegen 2029. CNBC titelte am 20. Mai 2026 „Cheap AI could derail OpenAI and Anthropic's IPOs". Wir kennzeichnen das als Medien- und Analystenlage, nicht als gesicherte Prognose. [(Quellen 22, 25)](https://www.cnbc.com/2026/05/20/cheap-ai-could-derail-openai-and-anthropics-ipos.html) Die betriebswirtschaftliche Logik ist dennoch eindeutig: Wer vor einem Börsengang Gewinne zeigen muss, hat wenig Anreiz, Inferenz dauerhaft unter Selbstkosten anzubieten. Steigende oder volatile Token-Preise sind damit ein reales Geschäftsrisiko.

Ein struktureller Hinweis dazu, ohne unbelegte Zahl: Pauschal-Abos wie Claude Pro (rund 20 US-Dollar im Monat) oder Max (100 bis 200 US-Dollar) enthalten ein Nutzungskontingent zum Festpreis, während die API streng pro Token abrechnet (für die neuen Modelle 10 US-Dollar je Million Eingabe- und 50 US-Dollar je Million Ausgabe-Token). Wer produktiv und in Volumen arbeitet, zahlt über die API real oft deutlich mehr als über ein Abo. Eine seriöse, allgemeingültige „X-mal günstiger"-Zahl gibt es nicht, deshalb nennen wir keine. Die Richtung der Kosten aber ist klar: nach oben, und schwer kalkulierbar. [(Quellen 20, 21)](https://platform.claude.com/docs/en/about-claude/pricing)

Was ein Modell pro Million Token kostet (API)

Listenpreise der Claude-API. Die neuen Spitzenmodelle Fable 5 und Mythos 5 kosten pro Ausgabe-Token das Doppelte von Opus 4.8 und das Zehnfache von Haiku.

Eingabe (Input)
 Ausgabe (Output)

Datenquelle: [Anthropic, Listenpreise der Claude-API](https://platform.claude.com/docs/en/about-claude/pricing). Stand: Juni 2026. Günstigere Optionen wie Batch-Verarbeitung (50 Prozent Rabatt) oder Prompt-Caching sind hier nicht berücksichtigt.

## Was das für Unternehmen heißt

Aus beidem, dem plötzlich kappbaren Zugang und der Kostenseite, folgt kein „zurück zu schwächerer Technik". Es folgt eine zweite Ebene, die man jetzt aufbauen sollte, solange die Lage es zulässt.

Die ehrliche Botschaft lautet: Ein lokales Modell mit überschaubarer Parameterzahl auf eigener Hardware erreicht roh nicht das Niveau eines Spitzenmodells. Nutzbare, hochwertige Leistung entsteht nicht aus dem Modell allein, sondern aus der Architektur darum herum: angebundenes Fachwissen (RAG), Werkzeuge, saubere, kontextsparsame Anweisungen. Genau hier liegt unsere Überzeugung und unsere Praxis: Ein datensparsam und kosteneffizient betriebenes Low-Parameter-Modell liefert für klar umrissene Fachaufgaben bereits heute verlässlich gute Ergebnisse.

Der entscheidende Vorteil: Ein solches System läuft auf eigenen Servern, in Deutschland, unter Ihrer Kontrolle. Es lässt sich nicht per Direktive aus dem Ausland abschalten, und seine Kosten sind planbar statt von einem Börsengang getrieben. Es ersetzt das Spitzenmodell nicht im Alltag, aber es ist die Rückfallebene, die übernimmt, wenn der externe Zugang wegbricht oder unbezahlbar wird. Und je früher man sie aufbaut, desto weiter ist sie, wenn man sie braucht.

Die Frage „Ab wann ist ein KI-System AGI?" bleibt offen, und das ist wissenschaftlich ehrlich so. Die geschäftliche Frage dagegen ist längst entschieden. Wenn es gut möglich ist, dass die jeweils beste Technik über Jahre nicht verlässlich aus Deutschland nutzbar ist, dann braucht jeder, der auf KI baut, eine souveräne Ebene, die ihm gehört.

## Quellen

1. ARC Prize, ARC-AGI-1: [arcprize.org/arc-agi/1](https://arcprize.org/arc-agi/1)
2. ARC Prize, o3-Durchbruch: [arcprize.org/blog/oai-o3-pub-breakthrough](https://arcprize.org/blog/oai-o3-pub-breakthrough)
3. ARC Prize 2025, Ergebnisanalyse: [arcprize.org/blog/arc-prize-2025-results-analysis](https://arcprize.org/blog/arc-prize-2025-results-analysis)
4. Epoch AI / Artificial Analysis, GPQA Diamond: [epoch.ai/benchmarks/gpqa-diamond](https://epoch.ai/benchmarks/gpqa-diamond)
5. Humanity's Last Exam: [agi.safe.ai](https://agi.safe.ai/)
6. Artificial Analysis zu Fable 5 / Mythos 5: [artificialanalysis.ai](https://artificialanalysis.ai/articles/claude-fable-5-mythos-intelligence-index)
7. SWE-bench Verified Leaderboard: [leaderboard.steel.dev](https://leaderboard.steel.dev/leaderboards/swe-bench-verified/)
8. Anthropic, Fable 5 / Mythos 5: [anthropic.com/news/claude-fable-5-mythos-5](https://www.anthropic.com/news/claude-fable-5-mythos-5)
9. Epoch AI, FrontierMath: [epoch.ai/frontiermath/the-benchmark](https://epoch.ai/frontiermath/the-benchmark)
10. Anthropic, Ankündigung + System Card: [anthropic.com/news/claude-fable-5-mythos-5](https://www.anthropic.com/news/claude-fable-5-mythos-5)
11. Morris et al., „Levels of AGI": [arxiv.org/abs/2311.02462](https://arxiv.org/abs/2311.02462)
12. MIT Technology Review zu DeepMinds AGI-Stufen: [technologyreview.com](https://www.technologyreview.com/2023/11/16/1083498/)
13. OpenAIs fünf Stufen (Berichterstattung): [theaiinsider.tech](https://theaiinsider.tech/2024/07/12/what-are-openais-five-levels-of-ai-and-where-are-we-now/)
14. Turing-Test-Studie, UC San Diego: [arxiv.org/pdf/2503.23674](https://arxiv.org/pdf/2503.23674)
15. Spiegeltest (Gallup): [en.wikipedia.org/wiki/Mirror\_test](https://en.wikipedia.org/wiki/Mirror_test)
16. „Exploring Consciousness in LLMs": [arxiv.org/html/2505.19806v1](https://arxiv.org/html/2505.19806v1)
17. Nature, „There is no such thing as conscious artificial intelligence": [nature.com](https://www.nature.com/articles/s41599-025-05868-8)
18. Anthropic, Zugangs-Sperre Fable 5 / Mythos 5: [anthropic.com/news/fable-mythos-access](https://www.anthropic.com/news/fable-mythos-access)
19. Greenberg Traurig, Einordnung der Exportkontroll-Direktive: [gtlaw.com](https://www.gtlaw.com/en/insights/2026/6/ai-company-anthropic-suspends-access)
20. Anthropic API-Preise: [platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing)
21. Claude Abo-Preise: [claude.com/pricing](https://claude.com/pricing)
22. CNBC, „Cheap AI could derail OpenAI and Anthropic's IPOs" (20.05.2026): [cnbc.com](https://www.cnbc.com/2026/05/20/cheap-ai-could-derail-openai-and-anthropics-ipos.html)
23. EU AI Act, Zeitplan: [artificialintelligenceact.eu/implementation-timeline](https://artificialintelligenceact.eu/implementation-timeline/)
24. US AI Diffusion Rule (zurückgenommen): [federalregister.gov](https://www.federalregister.gov/documents/2025/01/15/2025-00636/)
25. Analyse zu Token-Preisen und IPO-Druck: [investing.com](https://www.investing.com/analysis/the-ai-token-pricing-crisis-behind-openai-and-anthropics-revenue-race-200680777)
26. HLE-Zeitverlauf (Grafik): [artificialanalysis.ai](https://artificialanalysis.ai/evaluations/humanitys-last-exam), [pricepertoken.com](https://pricepertoken.com/leaderboards/benchmark/hle)
27. Anthropic, „Redeploying Claude Fable 5" (Wiederfreischaltung): [anthropic.com/news/redeploying-fable-5](https://www.anthropic.com/news/redeploying-fable-5)
28. CNBC (30.06.2026) und Nextgov/FCW zur Aufhebung der Exportkontrollen: [cnbc.com](https://www.cnbc.com/amp/2026/06/30/anthropic-says-trump-admin-has-lifted-export-controls-on-claude-fable-5-and-mythos-5.html), [nextgov.com](https://www.nextgov.com/artificial-intelligence/2026/07/us-lift-export-controls-key-anthropic-models/414561/)
