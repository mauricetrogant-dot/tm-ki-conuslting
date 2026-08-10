/**
 * WebMCP-Tools der TM KI Consulting UG (haftungsbeschraenkt)
 * =========================================================
 *
 * Meldet der Seite drei Werkzeuge an, mit denen ein KI-Agent im Browser
 * strukturiert mit dieser Website arbeiten kann, statt HTML zu parsen.
 *
 * Stand der Schnittstelle (Chrome):
 *   - Origin Trial ab Chrome 149, lokal testbar ueber
 *     chrome://flags/#enable-webmcp-testing
 *   - Ab Chrome 150 ist `navigator.modelContext` veraltet, korrekt ist
 *     `document.modelContext.registerTool({ name, description, inputSchema, execute })`.
 *     Der Fallback auf navigator.modelContext bleibt nur fuer Chrome 149 stehen.
 *
 * Verbindliche Eigenschaften dieses Skripts:
 *   - Feature-Detection: Ohne WebMCP passiert nichts. Kein Fehler, keine
 *     DOM-Aenderung, keine Netzwerkanfrage.
 *   - Kein autonomes Versenden. `kontakt_aufnehmen` bereitet eine Nachricht
 *     vor, abgeschickt wird sie erst durch den Menschen im Mailprogramm.
 *   - Alle Inhalte stammen woertlich von dieser Website. Keine erfundenen
 *     Leistungen, keine erfundenen Preise.
 *
 * Einbindung: <script defer src="assets/js/webmcp.js"></script>
 */
(function () {
  'use strict';

  // --- Konstanten (keine Magic Numbers, keine verstreuten Strings) ---------

  var FIRMA = 'TM KI Consulting UG (haftungsbeschränkt)';
  var BASIS_URL = 'https://www.tm-ki-consulting.de/';
  var KONTAKT_EMAIL = 'info@tm-ki-consulting.de';
  var KONTAKT_TELEFON = '+49 157 37284004';

  /** Startpreis eines KI-Agenten in Euro, netto, einmalig. */
  var PREIS_AGENT_EINMALIG_EUR = 4999;
  /** Optionale Agenten-Betreuung in Euro, netto, pro Monat. */
  var PREIS_AGENT_MONATLICH_EUR = 249;
  /** Einrichtung eines KI-Cockpits in Euro, netto, einmalig, ab-Preis. */
  var PREIS_COCKPIT_EINMALIG_AB_EUR = 8999;
  /** Betrieb eines KI-Cockpits in Euro, netto, pro Monat, ab-Preis. */
  var PREIS_COCKPIT_MONATLICH_AB_EUR = 499;

  var PREIS_HINWEIS =
    'Alle Preise netto zzgl. gesetzlicher Umsatzsteuer. ' +
    'Fremdlizenzen und verbrauchsabhängige API-Kosten sind nicht enthalten.';

  /**
   * Leistungsuebersicht. Beschreibungen woertlich aus den Abschnitten
   * "Leistungen" und "KI-Cockpits" der Startseite.
   */
  var LEISTUNGEN = [
    {
      nummer: '01 · Entwickeln',
      name: 'Fachspezifische KI-Agenten',
      beschreibung:
        'Wir entwickeln KI-Agenten, die exakt auf Ihre Fachprozesse zugeschnitten sind — ' +
        'und integrieren sie nahtlos in Ihre Website oder bestehende Systeme.',
      schlagworte: ['Custom Agents', 'Web-Integration', 'Schnittstellen'],
      preise: {
        einmalig_eur: PREIS_AGENT_EINMALIG_EUR,
        monatlich_eur: PREIS_AGENT_MONATLICH_EUR,
        hinweis: 'Startpreis pro Agent mit vollständiger Übergabe; Betreuung optional. ' + PREIS_HINWEIS
      },
      abschnitt: BASIS_URL + '#leistungen'
    },
    {
      nummer: '02 · Beraten',
      name: 'Beratung zu KI-Agenten',
      beschreibung:
        'Wir beraten Sie strategisch zur Auswahl, Einführung und sicheren Nutzung von ' +
        'KI-Agenten — von der Use-Case-Bewertung bis zur produktiven Lösung.',
      schlagworte: ['Strategie', 'Use Cases', 'EU AI Act'],
      preise: null,
      abschnitt: BASIS_URL + '#leistungen'
    },
    {
      nummer: '03 · Verankern',
      name: 'Sicher einsetzen',
      beschreibung:
        'Wir begleiten Mitarbeitende bei der Nutzung, schaffen klare Regeln und sorgen dafür, ' +
        'dass die KI-Lösung verständlich, sicher und langfristig nutzbar bleibt.',
      schlagworte: ['Training', 'Support', 'Qualitätssicherung'],
      preise: null,
      abschnitt: BASIS_URL + '#leistungen'
    },
    {
      nummer: '04 · Zusammenführen',
      name: 'Maßgeschneiderte KI-Cockpits',
      beschreibung:
        'Wir bauen Schaltzentralen, die verstreute Unternehmensdaten an einem Ort zusammenziehen: ' +
        'mit Inhalten, die auf Ihre Bedürfnisse zugeschnitten sind, einer Sicherheitsfreigabe-Logik, ' +
        'die pro Rolle steuert, wer was sieht, und KI-Agenten, die daraus Insights machen.',
      schlagworte: ['Datenintegration', 'Freigabelogik', 'KI-Insights'],
      preise: {
        einmalig_ab_eur: PREIS_COCKPIT_EINMALIG_AB_EUR,
        monatlich_ab_eur: PREIS_COCKPIT_MONATLICH_AB_EUR,
        hinweis: 'Der Preis richtet sich nach der Menge der angebundenen Datenquellen. ' + PREIS_HINWEIS
      },
      abschnitt: BASIS_URL + '#ki-cockpits'
    }
  ];

  /** Sechs Agenten mit ihrem Claim von der Startseite. */
  var AGENTEN = [
    { name: 'Akquise-Agent', claim: 'Findet passende Kunden, bevor der Wettbewerb sie anspricht.' },
    { name: 'Webdesign-Agent', claim: 'Baut und pflegt Webauftritte nach Ihren Vorgaben statt nach Baukasten.' },
    { name: 'Gefahrgut-Berater-Agent', claim: 'Beantwortet Gefahrgutfragen aus dem Regelwerk — belegt, nicht geraten.' },
    { name: 'News-Radar-Agent', claim: 'Meldet, was in Ihrem Fachgebiet wirklich neu ist.' },
    { name: 'Betrugsmaschen-Agent', claim: 'Prüft verdächtige Nachrichten und Anrufe in Sekunden.' },
    { name: 'Wissens-Agent', claim: 'Macht das Wissen Ihres Hauses durchsuchbar — mit Fundstelle.' }
  ];

  /** Oeffentlich testbare Referenzen. */
  var DEMOS = {
    gefahrgut: {
      name: 'Gefahrgut-Agent für GBM',
      url: 'https://gefahrgutberatung-manske.de/#ki',
      beschreibung:
        'Ein öffentlich testbarer KI-Agent für die Gefahrgutberatung: Fachwissen, Regelwerke, ' +
        'Dokumentenprüfung und Eskalationslogik in einer nutzbaren Anwendung. ' +
        'Kein Konzeptpapier, sondern ein laufender Agent zum Anfassen.',
      funktionen: [
        'UN-Nummern-Suche',
        'Dokumenten-Check (Sicherheitsdatenblätter, Beförderungsdokumente)',
        'Vorschriften-Lotse für ADR, RID und IMDG-Code',
        'Experten-Eskalation bei Unsicherheiten'
      ]
    },
    cockpit: {
      name: 'Interaktive KI-Cockpit-Demo',
      url: BASIS_URL + 'cockpit-demo.html',
      beschreibung:
        'Modulares Demo-Cockpit mit neutralen Beispieldaten, frei im Browser bedienbar.',
      funktionen: [
        'Inhalte nach Maß',
        'Sicherheitsfreigabe-Logik pro Rolle',
        'Verstreute Daten vereint',
        'KI-Insights'
      ]
    }
  };

  // --- Hilfsfunktionen ----------------------------------------------------

  /**
   * Ergebnis im MCP-ueblichen Textformat.
   * Erwartet eine Laufzeitumgebung stattdessen einen reinen String,
   * genuegt hier ein `return text;`.
   */
  function textErgebnis(text) {
    return { content: [{ type: 'text', text: text }] };
  }

  /** Objekt als lesbaren JSON-Block ausgeben. */
  function alsJson(objekt) {
    return JSON.stringify(objekt, null, 2);
  }

  /**
   * Sucht die WebMCP-Schnittstelle.
   * Bevorzugt document.modelContext (ab Chrome 150 der einzig gueltige Weg),
   * faellt fuer den Origin Trial in Chrome 149 auf navigator.modelContext zurueck.
   * Gibt null zurueck, wenn WebMCP nicht verfuegbar ist.
   */
  function findeModelContext() {
    try {
      if (typeof document !== 'undefined' &&
          document.modelContext &&
          typeof document.modelContext.registerTool === 'function') {
        return document.modelContext;
      }
      if (typeof navigator !== 'undefined' &&
          navigator.modelContext &&
          typeof navigator.modelContext.registerTool === 'function') {
        return navigator.modelContext;
      }
    } catch (fehler) {
      // Zugriff kann in restriktiven Kontexten werfen — dann gilt: kein WebMCP.
      return null;
    }
    return null;
  }

  // --- Werkzeuge ----------------------------------------------------------

  var WERKZEUGE = [
    {
      name: 'leistungen_abrufen',
      description:
        'Gibt die Leistungen der ' + FIRMA + ' strukturiert zurück: ' +
        'Entwicklung fachspezifischer KI-Agenten, Beratung, Verankerung im Arbeitsalltag und ' +
        'maßgeschneiderte KI-Cockpits — jeweils mit Beschreibung und, wo öffentlich genannt, ' +
        'mit Preisangabe. Optional zusätzlich die Liste der sechs KI-Agenten.',
      inputSchema: {
        type: 'object',
        properties: {
          bereich: {
            type: 'string',
            enum: ['alle', 'ki-agenten', 'beratung', 'verankerung', 'ki-cockpits'],
            description: 'Auf welchen Leistungsbereich die Antwort eingegrenzt werden soll. Standard: alle.'
          },
          mit_agentenliste: {
            type: 'boolean',
            description: 'Wenn true, wird zusätzlich die Übersicht der sechs KI-Agenten mitgeliefert.'
          }
        },
        required: []
      },
      execute: function (argumente) {
        var eingabe = argumente || {};
        var bereich = eingabe.bereich || 'alle';

        var zuordnung = {
          'ki-agenten': 'Fachspezifische KI-Agenten',
          'beratung': 'Beratung zu KI-Agenten',
          'verankerung': 'Sicher einsetzen',
          'ki-cockpits': 'Maßgeschneiderte KI-Cockpits'
        };

        var auswahl = LEISTUNGEN;
        if (bereich !== 'alle' && zuordnung[bereich]) {
          auswahl = LEISTUNGEN.filter(function (leistung) {
            return leistung.name === zuordnung[bereich];
          });
        }

        var antwort = {
          anbieter: FIRMA,
          website: BASIS_URL,
          leistungen: auswahl,
          hinweis: PREIS_HINWEIS
        };

        if (eingabe.mit_agentenliste === true) {
          antwort.ki_agenten = AGENTEN;
        }

        return textErgebnis(
          'Leistungen der ' + FIRMA + ':\n\n' + alsJson(antwort)
        );
      }
    },

    {
      name: 'kontakt_aufnehmen',
      description:
        'Bereitet eine Kontaktanfrage an die ' + FIRMA + ' vor und liefert einen fertigen ' +
        'mailto-Entwurf sowie alle Kontaktwege zurück. Wichtig: Es wird nichts automatisch ' +
        'versendet. Die Website hat kein Kontaktformular; abgeschickt wird die Nachricht erst ' +
        'vom Menschen im eigenen E-Mail-Programm.',
      inputSchema: {
        type: 'object',
        properties: {
          anliegen: {
            type: 'string',
            description: 'Worum es geht, in eigenen Worten. Wird in den Text der E-Mail übernommen.'
          },
          name: {
            type: 'string',
            description: 'Name der anfragenden Person. Optional.'
          },
          organisation: {
            type: 'string',
            description: 'Unternehmen oder Einrichtung der anfragenden Person. Optional.'
          },
          rueckruf_erwuenscht: {
            type: 'boolean',
            description: 'Wenn true, wird im Entwurf um einen telefonischen Rückruf gebeten.'
          }
        },
        required: ['anliegen']
      },
      execute: function (argumente) {
        var eingabe = argumente || {};
        var anliegen = (eingabe.anliegen || '').trim();

        if (!anliegen) {
          return textErgebnis(
            'Es fehlt das Anliegen. Bitte kurz beschreiben, worum es geht — dann bereite ich ' +
            'den E-Mail-Entwurf an ' + KONTAKT_EMAIL + ' vor.'
          );
        }

        var zeilen = ['Guten Tag,', '', anliegen];
        if (eingabe.rueckruf_erwuenscht === true) {
          zeilen.push('', 'Ein telefonischer Rückruf wäre mir recht.');
        }
        zeilen.push('', 'Mit freundlichen Grüßen');
        if (eingabe.name) {
          zeilen.push(eingabe.name);
        }
        if (eingabe.organisation) {
          zeilen.push(eingabe.organisation);
        }

        var betreff = 'Anfrage über tm-ki-consulting.de';
        var mailto =
          'mailto:' + KONTAKT_EMAIL +
          '?subject=' + encodeURIComponent(betreff) +
          '&body=' + encodeURIComponent(zeilen.join('\n'));

        var antwort = {
          hinweis: 'Entwurf vorbereitet. Es wurde nichts versendet — die Freigabe liegt beim Menschen.',
          empfaenger: KONTAKT_EMAIL,
          telefon: KONTAKT_TELEFON,
          betreff: betreff,
          nachricht: zeilen.join('\n'),
          mailto_link: mailto,
          erstgespraech: 'Kostenloses Erstgespräch, 30 Minuten, unverbindlich. Antwort innerhalb von 24 Stunden.',
          abschnitt_auf_der_seite: BASIS_URL + '#kontakt'
        };

        return textErgebnis(
          'Kontaktanfrage vorbereitet (nicht versendet):\n\n' + alsJson(antwort)
        );
      }
    },

    {
      name: 'referenz_demo_oeffnen',
      description:
        'Liefert die öffentlich testbaren Referenzen der ' + FIRMA + ': den in Produktion ' +
        'laufenden Gefahrgut-Agenten für GBM und die interaktive KI-Cockpit-Demo. ' +
        'Gibt Adresse, Beschreibung und Funktionsumfang zurück; auf ausdrücklichen Wunsch ' +
        'wird die Demo zusätzlich in einem neuen Tab geöffnet.',
      inputSchema: {
        type: 'object',
        properties: {
          demo: {
            type: 'string',
            enum: ['gefahrgut', 'cockpit', 'alle'],
            description:
              'Welche Referenz gemeint ist: "gefahrgut" für den laufenden Gefahrgut-Agenten, ' +
              '"cockpit" für die KI-Cockpit-Demo, "alle" für beide. Standard: gefahrgut.'
          },
          im_neuen_tab_oeffnen: {
            type: 'boolean',
            description:
              'Wenn true, wird versucht, die Demo in einem neuen Tab zu öffnen. ' +
              'Popup-Blocker können das verhindern; das Ergebnis meldet, ob es geklappt hat.'
          }
        },
        required: []
      },
      execute: function (argumente) {
        var eingabe = argumente || {};
        var auswahl = eingabe.demo || 'gefahrgut';

        var referenzen;
        if (auswahl === 'cockpit') {
          referenzen = [DEMOS.cockpit];
        } else if (auswahl === 'alle') {
          referenzen = [DEMOS.gefahrgut, DEMOS.cockpit];
        } else {
          referenzen = [DEMOS.gefahrgut];
        }

        var geoeffnet = null;
        if (eingabe.im_neuen_tab_oeffnen === true) {
          try {
            var fenster = window.open(referenzen[0].url, '_blank', 'noopener,noreferrer');
            geoeffnet = fenster ? referenzen[0].url : 'Vom Browser blockiert — bitte den Link manuell öffnen.';
          } catch (fehler) {
            geoeffnet = 'Öffnen nicht möglich — bitte den Link manuell öffnen.';
          }
        }

        var antwort = { referenzen: referenzen };
        if (geoeffnet !== null) {
          antwort.im_neuen_tab_geoeffnet = geoeffnet;
        }

        return textErgebnis(
          'Öffentlich testbare Referenzen der ' + FIRMA + ':\n\n' + alsJson(antwort)
        );
      }
    }
  ];

  // --- Registrierung ------------------------------------------------------

  var modelContext = findeModelContext();
  if (!modelContext) {
    // Kein WebMCP im Browser: bewusst stillschweigend beenden.
    // Keine Konsolenausgabe, keine DOM-Aenderung, kein Fehler.
    return;
  }

  WERKZEUGE.forEach(function (werkzeug) {
    try {
      modelContext.registerTool(werkzeug);
    } catch (fehler) {
      // Eine fehlgeschlagene Registrierung darf die Seite nicht beeintraechtigen.
      if (window.console && typeof window.console.warn === 'function') {
        window.console.warn('WebMCP: Werkzeug "' + werkzeug.name + '" nicht registriert.', fehler);
      }
    }
  });
})();
