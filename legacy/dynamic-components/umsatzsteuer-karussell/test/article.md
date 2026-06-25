---
template: article
title: 'Umsatzsteuerkarussell'
---

<section><h6>TITLE</h6>

```
{
  "center": true
}
```

# Umsatzsteuer­karussell

Umsatzsteuer klauen? So haben internationale Banden aus der Umsatzsteuer Profit gemacht.

Von [Sylke Gruhnwald](/~dd782b8d-4eae-4a05-80d8-494760d2d58a) und [Marguerite Meyer](/~49c97bfa-310d-4d45-90ee-9f2f7cf5081b), 07.05.2019

<hr /></section>

<section><h6>CENTER</h6>

Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien. Es ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den Mund fliegen.

<hr /></section>

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "anchor": "karussell",
    "labels": {
      "buffer": "Händler C",
      "io": "Firma A",
      "mt": "Firma B",
      "distributor": "Händler D",
      "amt": "Finanzamt",
      "amtOrt": "Deutschland",
      "distributorOrt": "Deutschland",
      "mtOrt": "Deutschland",
      "ioOrt": "Luxemburg",
      "bufferOrt": "Deutschland"
    },
    "phases": [
      {
        "active": [
          "io",
          "io-mt",
          "mt"
        ],
        "html": "A in Luxemburg verkauft die Ware über die EU-Innengrenze an B in Deutschland. Dies ist mehrwertsteuerbefreit."
      },
      {
        "active": [
          "io",
          "io-mt",
          "mt",
          "mt-buffer",
          "buffer"
        ],
        "html": "Hier geschieht der Kern des Betrugs: B fälscht ihre Rechnungen und tut so, als hätte sie Mehrwertsteuer an A bezahlt. Die Ware verkauft sie an C weiter, inklusive Gewinnmarge und 100 Euro Mehrwertsteuer."
      },
      {
        "active": [
          "io",
          "io-mt",
          "mt",
          "mt-buffer",
          "buffer",
          "buffer-distributor",
          "distributor"
        ],
        "html": "C verkauft inländisch an D weiter – erneut inklusive Gewinnmarge und damit 130 Euro Mehrwertsteuer."
      },
      {
        "active": [
          "io",
          "io-mt",
          "mt",
          "mt-buffer",
          "buffer",
          "buffer-distributor",
          "distributor",
          "distributor-io"
        ],
        "html": "D verkauft zurück ins EU-Ausland. Dies ist mehrwertsteuerfrei."
      },
      {
        "active": [
          "io",
          "io-mt",
          "mt",
          "mt-buffer",
          "buffer",
          "buffer-distributor",
          "distributor",
          "distributor-io",
          "amt"
        ],
        "html": "Das deutsche Finanzamt muss die Steuer ausgleichen."
      },
      {
        "active": [
          "io",
          "io-mt",
          "mt",
          "mt-buffer",
          "buffer",
          "buffer-distributor",
          "distributor",
          "distributor-io",
          "amt",
          "buffer-amt",
          "amt-distributor"
        ],
        "html": "C zahlt B 100 Euro Mehrwertsteuer. 130 Euro Mehrwertsteuer verrechnet sie D. Die Differenz – 30 Euro – zahlt sie dem Finanzamt ein. D erhält die bezahlte Steuer vom Amt zurück. Diese Transaktionen sind alle korrekt."
      },
      {
        "active": [
          "io",
          "io-mt",
          "mt-faded",
          "mt-buffer",
          "buffer",
          "buffer-distributor",
          "distributor",
          "distributor-io",
          "amt",
          "buffer-amt",
          "amt-distributor",
          "mt-amt"
        ],
        "html": "B müsste die Mehrwertsteuer von 100 Euro ans Finanzamt abführen, tut das aber nicht. Meist löst sich die Firma nach den Geschäften in Luft auf. Das Finanzamt hat unter dem Strich 100 Euro ausbezahlt, die es nie erhalten hat."
      }
    ],
    "schema": "UStKarussell"
  },
  "src": "https://cdn.republik.space/s3/republik-assets/dynamic-components/umsatzsteuer-karussell/index.js?v=2"
}
```

<hr /></section>

<section><h6>CENTER</h6>

Nicht einmal von der allmächtigen Interpunktion werden die Blindtexte beherrscht – ein geradezu unorthographisches Leben.

Eines Tages aber beschloß eine kleine Zeile Blindtext, ihr Name war Lorem Ipsum, hinaus zu gehen in die weite Grammatik. Der große Oxmox riet ihr davon ab, da es dort wimmele von bösen Kommata, wilden Fragezeichen und hinterhältigen Semikoli, doch das Blindtextchen ließ sich nicht beirren.

Es packte seine sieben Versalien, schob sich sein Initial in den Gürtel und machte sich auf den Weg. Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rhetorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy.

Die Copy warnte das Blindtextchen, da, wo sie herkäme wäre sie zigmal umgeschrieben worden und alles, was von ihrem Ursprung noch übrig wäre, sei das Wort "und" und das Blindtextchen solle umkehren und wieder in sein eigenes, sicheres Land zurückkehren.

Doch alles Gutzureden konnte es nicht überzeugen und so dauerte es nicht lange, bis ihm ein paar heimtückische Werbetexter auflauerten, es mit Longe und Parole betrunken machten und es dann in ihre Agentur schleppten, wo sie es für ihre Projekte wieder und wieder mißbrauchten. Und wenn es nicht umgeschrieben wurde, dann benutzen Sie es immernoch. Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte.

<hr /></section>
