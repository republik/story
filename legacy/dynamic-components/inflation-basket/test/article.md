---
template: article
title: 'Mit dynamischem Teil'
darkMode: false
---

<section><h6>TITLE</h6>

# Mit dynamischem Teil

Mach mehr als das CMS erlaubt.

Von einem Team

<hr /></section>

<section><h6>CENTER</h6>

Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte. Abgeschieden wohnen sie in Buchstabhausen an der Küste des Semantik, eines grossen Sprachozeans. Ein kleines Bächlein namens Duden fliesst durch ihren Ort und versorgt sie mit den nötigen Regelialien.

Es ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den Mund fliegen. Nicht einmal von der allmächtigen Interpunktion werden die Blindtexte beherrscht – ein geradezu unorthographisches Leben. Eines Tages aber beschloss eine kleine Zeile Blindtext, ihr Name war Lorem Ipsum, hinaus zu gehen in die weite Grammatik.

Der grosse Oxmox riet ihr davon ab, da es dort wimmele von bösen Kommata, wilden Fragezeichen und hinterhältigen Semikoli, doch das Blindtextchen liess sich nicht beirren. Es packte seine sieben Versalien, schob sich sein Initial in den Gürtel und machte sich auf den Weg.

<hr /></section>

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "anchor": "plot",
    "title": "What's in the basket?",
    "lead": "A close look at how the categories in the goods basket evolve at various levels of the COICOP classification (levels of detail in the goods basket ranging from 0 to 4).",
    "phases": [
      {
        "title": "April 2019",
         "step": "step1"
      },
      {
        "title": "April 2020",
        "step": "step2"
      },
      {
        "title": "April 2021",
        "step": "step3"
      },
      {
        "title": "April 2022",
        "step": "step4"
      }
    ],
    "translations": [
      {
        "key": "step1/text",
        "value": "Ein halbes Jahr vor der Pandemie ist die Inflation im Euroraum insgesamt recht niedrig (+1,2 Prozent). Die Werte der einzelnen Posten im Warenkorb liegen relativ nahe beieinander. Beispielhaft dafür: {CP011}. Ihr Preis steigt um exakt denselben Wert wie jener des gesamten Warenkorbs (+1,2 Prozent)."
      },
      {
        "key": "step1/CP011",
        "value": "Nahrungsmittel"
      },
      {
        "key": "step2/text",
        "value": "Während der ersten Coronawelle geht die Nachfrage nach Energie stark zurück. So sinken die Preise für {CP045} (-6,3 Prozent) und fürs {CP072} {8.9}. Das dämpft auch die Gesamtinflation: Sie ist im Mai 2020 praktisch inexistent (+0,1 Prozent)."
      },
      {
        "key": "step2/CP045",
        "value": "Strom und Gas"
      },
      {
        "key": "step2/CP072",
        "value": "Autofahren"
      },
      {
        "key": "step3/text",
        "value": "Ein Jahr später stehen die Vorzeichen umgekehrt. Die {CP045} (+7,7 Prozent) und die Kosten des {CP072} (+11 Prozent) nehmen wieder zu. Anders läuft es in der {CP112}, wo die Preise fallen {3.2}. Unter dem Strich liegt die Inflation im Mai 2021 aber genau am geldpolitisch gewünschten Ziel {2}."
      },
      {
        "key": "step3/CP045",
        "value": "Strom- und Gaspreise"
      },
      {
        "key": "step3/CP072",
        "value": "Autofahrens"
      },
      {
        "key": "step3/CP112",
        "value": "Hotellerie"
      },
      {
        "key": "step4/text",
        "value": "Das ist im Mai 2022 nicht mehr der Fall. {CP045} (+44 Prozent), {CP072} (+19 Prozent), {CP011} (+8,9 Prozent): Zahlreiche Waren, die energieintensiv sind oder aus Asien importiert werden müssen, sind nun deutlich teurer als ein Jahr zuvor. Und auch in der {CP112} steigen nach der Aufhebung mancher Reiserestriktionen wieder die Preise (+14 Prozent). Die Gesamtinflation schnellt hoch {8.1}. Aber nicht alles wird teurer: Beispielsweise sind {CP041} {1.5} und {CP082_083} {0.6} kaum von Inflation betroffen."
      },
      {
        "key": "step4/CP045",
        "value": "Strom und Gas"
      },
      {
        "key": "step4/CP072",
        "value": "Autofahren"
      },
      {
        "key": "step4/CP011",
        "value": "Nahrungsmittel"
      },
      {
        "key": "step4/CP112",
        "value": "Hotellerie"
      },
      {
        "key": "step4/CP041",
        "value": "Mieten"
      },
      {
        "key": "step4/CP082_083",
        "value": "Mobilfunk"
      }
    ],
      "labels": {
        "source": "Quelle: ",
        "sourceText": "Eurostat",
        "href": "http://www.bla.ch",
        "toolTipLabelInflation": "Inflation",
        "moreInflation": "Viel Inflation",
        "lessInflation": "Wenig Inflation",
  "CP011": "Nahrungsmittel",
  "CP012": "Alkoholfreie Getränke",
  "CP021": "Alkoholische Getränke",
  "CP022": "Tabak",
  "CP031": "Bekleidung",
  "CP032": "Schuhe",
  "CP041": "Wohnungsmieten",
  "CP043": "Instandhaltung der Wohnung",
  "CP044": "Wasserversorung, Müllabfuhr, Abwasser",
  "CP045": "Strom und Gas",
  "CP051": "Wohnungseinrichtung",
  "CP052": "Heimtextilien",
  "CP053": "Haushaltsgeräte",
  "CP054": "Glaswaren, Geschirr",
  "CP055": "Werkzeug",
  "CP056": "Reinigung",
  "CP061": "Medikamente, Medizinprodukte",
  "CP062": "Ambulante Medizindienstleistungen",
  "CP063": "Krankenhausdienstleistungen",
  "CP071": "Fahrzeuge",
  "CP072": "Fahrzeugwartung und -treibstoff",
  "CP073": "Öffentlicher Verkehr",
  "CP081": "Postdienstleistungen",
  "CP082_083": "Telefone und Mobilfunk",
  "CP091": "Computer, Software, Kameras",
  "CP092": "Musikinstrumente, Wohnmobile, Pferde",
  "CP093": "Spielzeug, Sportartikel, Haustiere, Gartenutensilien",
  "CP094": "Freizeit- und Kulturdienstleistungen",
  "CP095": "Zeitungen, Bücher und Schreibwaren",
  "CP096": "Pauschalreisen",
  "CP101": "Kindergärten und Vorbildung",
  "CP102": "Schulbildung Sekundarstufe",
  "CP103": "Berufliche Weiterbildung",
  "CP104": "Tertiäre Schulbildung",
  "CP105": "Nicht einstufbare Bildung",
  "CP111": "Gastronomie",
  "CP112": "Hotellerie",
  "CP121": "Körperpflege",
  "CP123": "Uhren, Schmuck, Babyartikel",
  "CP124": "Kinder- und Seniorenbetreuung",
  "CP125": "Versicherungen",
  "CP126": "Finanzdienstleistungen",
  "CP127": "Verwalltung, Anwälte"
  }
  },
  "src": "https://cdn.republik.space/s3/republik-assets/dynamic-components/inflation-basket/index.js"
}
```

<hr /></section>

<section><h6>CENTER</h6>

Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

<hr /></section>
«
