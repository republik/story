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
    "title": "Das Netzwerk der Infokrieger",
    "lead": "In den vergangenen zweieinhalb Jahren hat sich in der Schweiz ein eng verwobenes Netzwerk aus rechten Journalisten und Akteur*innen der verschwörungsideologischen Szene gebildet. Hier die wichtigsten Ereignisse und Verbindungen in ihrer chronologischen Abfolge.",
    "phases": [
      {
        "title": "September 2019",
         "step": "step1"
      },
      {
        "title": "Juni 2020",
        "step": "step2"
      },
      {
        "title": "September 2020",
        "step": "step3"
      },
      {
        "title": "Februar 2021",
        "step": "step4"
      },
      {
        "title": "April 2021",
        "step": "step5"
      },
      {
        "title": "Juli 2021",
        "step": "step6"
      },{
        "title": "März 2022",
        "step": "step7"
      },
      {
        "title": "Mai 2022",
        "step": "step8"
      }
    ],
    "translations": [
      {"key": "lead", "value": "In den vergangenen zweieinhalb Jahren hat sich in der Schweiz ein eng verwobenes Netzwerk aus rechten, {person} und {victim} gebildet. Ihre Inhalte publizieren sie in {media} und bei {movement}. Hier die wichtigsten Ereignisse und Verbindungen in ihrer chronologischen Abfolge."},
      {"key": "step1", "value": "Vor der Pandemie gab es noch kaum Querverbindungen zwischen etablierten Medien und der verschwörungsideologischen Bewegung. Ronnie Grob war seit August 2019 Chefredaktor des «Schweizer Monat», {Matuschek}, der seit mehreren Jahren als Autor für die NZZ tätig war, wurde kurz darauf Grobs Stellvertreter. Seit Herbst 2018 führte {Milius} die Onlinepublikation «Die Ostschweiz» und {Gut} war seit 2010 stellvertretender Chefredaktor der «Weltwoche»."},
      {"key": "step2", "value": "Im Dezember 2019 gibt {Gut} seinen Posten als stellvertretender Chefredaktor bei der «Weltwoche» ab. Ab Februar 2020 arbeitet {Rimoldi} beim «Schweizer Monat» unter Ronnie Grob."},
      {"key": "step3", "value": "Ab September 2020 tritt {Gut} als Autor bei «Die Ostschweiz» auf. Gleichzeitig verliert {Matuschek} seine Kolumne bei der NZZ, nachdem er einen Artikel beim Verschwörungsportal «{kenfm}» zweitpublizieren liess."},
      {"key": "step4", "value": "Per Ende 2020 ist {Matuschek} nicht mehr als stellvertretender Chefredaktor beim «Schweizer Monat» tätig. Nicolas Rimoldi gründet im Februar 2021 den Massnahmengegner-Verein {massvoll}, bei dem {joyce} von Beginn an als Leiterin des «Content-Teams» auftritt."},
      {"key": "step5", "value": "Im März 2021 relauncht Markus Somm den {nebelspalter}. Mit dabei sind {Matuschek}, «Die Ostschweiz»-Chefredaktor {Milius} und der bisherige Tamedia-Redaktor Dominik Feusi. Ab April 2021 arbeitet auch {joyce} für den «Schweizer Monat» – parallel zu ihrer und Rimoldis Aktivität bei «Mass-Voll»."},
      {"key": "step6", "value": "Im Juli 2021 publiziert «Die Ostschweiz» zwei Artikel, die sich positiv auf das Verschwörungsportal {uncutnews} beziehen. Ebenfalls im Juli tritt {Gut} erstmals als Autor im «Nebelspalter» auf. {joyce} tritt zum letzten Mal öffentlich als «Schweizer Monat»-Autorin in Erscheinung, verlässt «Mass-Voll» und wird gleichzeitig als Autorin bei der {Weltwoche} engagiert."},
      {"key": "step7", "value": "Im September 2021 kündigt {Rimoldi} seine Stelle beim {Schweizer Monat}, um sich voll auf «Mass-Voll» konzentrieren zu können. Ab März 2022 ist er Autor für die {Weltwoche}. Im Januar 2022 – noch während seiner Zusammenarbeit mit dem «Nebelspalter» – lässt {Matuschek} mehrere Texte beim Verschwörungsportal {Corona-Transition} zweitpublizieren."},
      {"key": "step8", "value": "Im Mai 2022 verlassen {Milius} und {Matuschek} gleichzeitig den {nebelspalter}. Beide werden umgehend von der {Weltwoche} engagiert. Im Mai erscheint zudem der verschwörungsideologische Film {pandamned}, in dem behauptet wird, die Covid-Impfung würde nach 3 bis 5 Jahren zum Tod führen. Der Film wurde von Milosz Matuschek co-produziert, Nicolas Rimoldi kommt darin als «Mass-Voll»-Vertreter vor."}
    ],
    "labels": {
      "Köppel": "Roger Köppel",
      "Gut": "Philipp Gut",
      "NZZ": "NZZ",
      "Matuschek": "Milosz Matuschek",
      "Grob": "Ronnie Grob",
      "Milius": "Stefan Millius",
      "Ostschweiz": "Die Ostschweiz",
      "kenfm": "KenFM",
      "Rimoldi": "Nicolas Rimoldi",
      "Corona-Transition": "Corona-Transition",
      "massvoll": "Mass-voll",
      "joyce": "Joyce Küng",
      "nebelspalter": "Nebelspalter",
      "pandamned": "Pandamned",
      "Weltwoche": "Weltwoche",
      "Schweizer Monat": "Schweizer Monat",
      "uncutnews": "Uncut-News",
      "person": "etablierten Journalistinnen",
      "victim": "verschwörungsideologischen Akteuren",
      "media": "klassischen Medien",
      "movement": "verschwörungsideologischen Plattformen"
      }
  },
  "src": "https://cdn.republik.space/s3/republik-assets/dynamic-components/alternative-media-network/index.js"
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
