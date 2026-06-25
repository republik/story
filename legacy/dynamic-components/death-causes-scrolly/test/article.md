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

<section><h6>CENTER</h6>

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "anchor": "plot",
    "phases": [
      {
        "age": "0-14",
        "title": "0-14-Jährige"
      },
      {
        "age": "15-44",
        "title": "15-44-Jährige"
      },
      {
        "age": "45-64",
        "title": "45-64-Jährige"
      },
      {
        "age": "65-84",
        "title": "65-84-Jährige"
      },
      {
        "age": "85+",
        "title": "85 und älter"
      }
    ],
    "translations": [
      {"key": "0-14/text", "value": "Wir beginnen die Reise durch die Statistik mit einer guten Nachricht: Kinder sterben in der Schweiz selten. Von 1000 Todesfällen – alle grauen Punkte des jeweiligen Geschlechts – sterben fünf Mädchen und sechs Jungen zwischen 0 und 14 Jahren. Angeborene Fehlbildungen und Komplikationen rund um die Geburt bergen die grösste Gefahr für das Überleben der Kleinsten. Da diese Todesursachen bei den anderen Altersgruppen nicht häufig sind, wurden sie unter {other} eingeordnet."},
      {"key": "0-14/perinatal", "value": "Angeborene Fehlbildungen und perinatale Ursachen"},
      {"key": "0-14/other", "value": "diverse Todesursachen"},
      {"key": "15-44/text", "value": "Zwischen 15 und 44 Jahren sterben doppelt so viele Männer wie Frauen. Rechnet man die Todesfälle in dieser Altersgruppe auf 100'000 Personen, auch Sterbeziffer genannt, kommt man bei Männern auf einen Wert von 52,8. Bei Frauen liegt der Wert bei 27,9, also etwa halb so hoch. Der grösste Unterschied zwischen den Geschlechtern zeigt sich bei {suicide} und {accident}. Knapp ein Viertel der Männer aller Altersgruppen, die durch einen Selbstmord gestorben sind, brachte sich mit einer Schusswaffe um. Nur vier Prozent der Frauen, die sich suizidierten, wagten diesen Schritt. Solche, zumeist effektive Suizidmethoden werden als {link1} bei Männern genannt. Das Männlichkeitsbild und der Umgang von Männern mit ihren Schwächen und Emotionen könnten {link2} sein."},
      {"key": "15-44/suicide", "value": "Suizid"},
      {"key": "15-44/accident", "value": "Unfällen"},
      {"key": "15-44/link1/href", "value": "https://bmcpsychiatry.biomedcentral.com/track/pdf/10.1186/s12888-017-1398-8.pdf"},
      {"key": "15-44/link1/text", "value": "möglicher Grund für die höhere Suizidrate"},
      {"key": "15-44/link2/href", "value": "https://pubmed.ncbi.nlm.nih.gov/33751613/"},
      {"key": "15-44/link2/text", "value": "weitere Erklärungen für die Differenz"},
      {"key": "45-64/text", "value": "Bei Frauen machen {cancer} in dieser Altersgruppe die Hälfte der Todesfälle aus. Krebs ist in der Schweiz die häufigste Ursache für vorzeitige Sterblichkeit, also ein Tod vor dem 70. Lebensjahr. Die höhere Mortalität von Männern setzt sich in dieser Altersgruppe fort. Männer sterben häufiger an {heart}, {suicide} oder {accident}."},
      {"key": "45-64/cancer", "value": "Krebserkrankungen"},
      {"key": "45-64/heart", "value": "Herz-Kreislauf-Erkrankungen"},
      {"key": "45-64/accident", "value": "Unfällen"},
      {"key": "45-64/suicide", "value": "Suizid"},
      {"key": "65-84/text", "value": "Für viele Männer ist hier Schluss. Knapp die Hälfte der Todesfälle liegt bei Männern in dieser Altersgruppe. Warum leben aber Frauen länger als Männer? Eine Begründung dafür ist der Lebenssstil: Männer trinken mehr Alkohol, rauchen häufiger und sind eher übergewichtig. Zu diesem Befund kommen die {link1}. Bei beiden Geschlechtern sind {cancer} und {heart} die häufigsten Todesursachen dieser Altersgruppe. Bei Frauen ist {dementia} die dritthäufigste Grund für den Tod, bei Männern sind es Atemwegserkrankungen, in der Grafik unter {other} dargestellt."},
      {"key": "65-84/link1/href", "value": "https://www.bfs.admin.ch/bfs/de/home/statistiken/gesundheit/erhebungen/sgb.html"},
      {"key": "65-84/link1/text", "value": "Gesundheitsbefragungen des Bundes"},
      {"key": "65-84/heart", "value": "Herz-Kreislauf-Erkrankungen"},
      {"key": "65-84/cancer", "value": "Krebserkrankungen"},
      {"key": "65-84/other", "value": "diverse Todesursachen"},
      {"key": "65-84/dementia", "value": "Demenz"},
      {"key": "85+/text", "value": "Und am Ende mag das Herz nicht mehr schlagen. Bei beiden Geschlechtern und insgesamt auf alle Altersgruppen gerechnet, sind {heart} die häufigste Todesursache. Der Trend aus der vorangehenden Altersgruppe setzt sich fort: Frauen erkranken häufiger an {dementia} als Männer. Ein Grund dafür ist auch die längere Lebenserwartung von Frauen und damit verbunden eine höhere Wahrscheinlichkeit beispielsweise an Alzheimer zu erkranken. Einen weiteren Grund sehen Forscherinnen in der {link1}: Durch den fallenden Östrogenspiegel sei das Gehirn anfälliger für Schäden."},
      {"key": "85+/link1/href", "value": "https://www.spektrum.de/news/menopause-und-alzheimer-wie-haengen-wechseljahre-und-demenz-zusammen/1722972"},
      {"key": "85+/link1/text", "value": "Menopause"},
      {"key": "85+/heart", "value": "Herz-Kreislauf-Erkrankungen"},
      {"key": "85+/dementia", "value": "Demenz"}
    ]
  },
  "src": "https://cdn.republik.space/s3/republik-assets/dynamic-components/death-causes-scrolly/index.js"
}
```

<hr /></section>

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
