# Sichere Agenten, sparsam gebaut.

> Unsere KI-Agenten folgen zwei Grundsätzen, die wir in jedem Projekt anwenden: eine Sicherheitsarchitektur, die sensible Daten strukturell von der KI trennt, und ein effizienter Bau auf schlanken Modellen, der mit wenig Rechenleistung und planbaren Kosten auskommt.

TM KI Consulting UG (haftungsbeschränkt) · Wie wir KI-Agenten bauen · Quelle: https://www.tm-ki-consulting.de/sicherheitsarchitektur.html

---

**01 · Sicherheit**

## Die Zwei-Pfad-Sicherheitsarchitektur

Jeder Agent ist strukturell in zwei getrennte Pfade aufgeteilt. So gelangt
kein sensibler Rohinhalt in die KI-Verarbeitung, und die Verantwortung über
schützenswerte Daten bleibt beim Menschen.

**Die Zwei-Pfad-Architektur im Überblick**

Sensible Rohdaten und KI-Verarbeitung sind strukturell getrennt. Die KI arbeitet ausschließlich auf abstrahierten Daten (Pfad A). Originalinhalte bleiben im geschützten Kanal (Pfad B) und erreichen nur befugte Menschen nach Freigabe. Beide Wege münden in eine Entscheidung, die beim Menschen liegt.

**Pfad A · KI-Pfad**

### Datensparsame Verarbeitung

Der KI-Pfad arbeitet ausschließlich auf abstrahierten, auf das Nötige
reduzierten Daten und beantwortet Anfragen nur aus verifizierten Quellen.

- verarbeitet nur strukturierte Merkmals- und Sachdaten
- kein Zugriff auf sensible Roh- oder Originalinhalte
- Antworten **ausschließlich** aus geprüften Quellen (RAG)
- läuft lokal auf eigener, kontrollierter Hardware

**Pfad B · Geschützter Kanal**

### Nur menschlich, nur auf Freigabe

Sensible Rohinhalte laufen über einen getrennten, kontrollierten Kanal,
den ausschließlich befugte Personen einsehen, und auch das nur nach
ausdrücklicher Freigabe.

- reiner Durchleitungskanal für schützenswerte Originaldaten
- aktiv erst nach ausdrücklicher Freigabe durch befugtes Personal
- wird von der KI **nicht** verarbeitet, ausgewertet oder gespeichert
- dient allein der menschlichen Sichtung und Entscheidung

> **Wirkung der Trennung:** Was die KI „sieht", ist abstrahiert und
> datensparsam (Pfad A). Was ein Mensch bei Bedarf im Original sieht, bleibt strikt
> getrennt und ohne KI-seitige Verarbeitung (Pfad B). Sensible Daten verlassen so
> das geschützte System nicht, und jede kritische Entscheidung bleibt nachvollziehbar
> in menschlicher Hand.

**02 · Effizienz**

## Schlanke Modelle, tokenminimal gebaut

Wir bauen unsere Agenten so effizient, dass leistungsfähige Low-Parameter-Modelle
lokal auf eigener Hardware in Deutschland laufen. Das senkt die nötige
Rechenleistung, macht Kosten planbar und hält die Daten im Haus.

**Methode**

### Wissen in Quellen, nicht im Prompt

Fachwissen lebt in pflegbaren RAG-Quellen und Werkzeugen, nicht in
überladenen Anweisungen. Der System-Prompt bleibt schlank und stabil,
die Quellen wachsen mit.

**Wirkung**

### Jedes Token kostet Rechenzeit

Knappe, klare Anweisungen belegen weniger Speicher und sparen Rechenzeit
bei jeder Anfrage. Das erhöht den Durchsatz und die Zahl paralleler Nutzer
auch bei begrenzter Hardware.

**Nutzen**

### Souverän und planbar

Eigene Hardware bedeutet planbare Fixkosten statt offener API-Kosten,
Unabhängigkeit von US- oder China-Clouds und einen Betrieb, der dem
EU AI Act und der DSGVO standhält.
