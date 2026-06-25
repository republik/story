---
template: article
title: 'Mit dynamischem Teil'
darkMode: false
---

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "Map"
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

<section><h6>TITLE</h6>

# Wer sind Sie?

## 

Zeit für einen aktuellen Blick auf die Verlegerschaft

Von [Lucia Hermann](/~lorem-ipsum), 01.03.2021

<hr /></section>

<section><h6>CENTER</h6>

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "Map",
    "scrollBlocks": [
      {
        "active": "start",
        "paragraphs": [
          "Ladies and Gentlemen and everyone beyond",
          "Vor knapp drei Jahren haben wir mit einer ganz wesentlichen Frage beschäftigt:",
          "Wer sind Sie?",
          "Denn ein Vorurteil schwebte im Raum: Die Republik sei ein teures, städtisches Hipster-Ding für Junge. Berechtigt? Der Abgleich mit der verlegerischen Wirklichkeit zeigte ein differenzierteres Bild.",
          "In der Zwischenzeit ist viel geschehen. Sie sind um {aboCount} gewachsen. Aber wohnen Sie immer noch zu einem Drittel in Zürich? Sind Sie im Durchschnitt 44 Jahre alt?",
          "Zeit für einen aktuellen Blick auf/in die Verlagsetage."
        ]
      },
      {
        "active": "zh",
        "title": "Wo wohnen Sie?",
        "paragraphs": [
          "Von den {addressCount} Verlegerinnen, die Ihre Adresse angegeben haben, wohnen die meisten in {topCity}. Gefolgt wird die Rothaus-Stadt von {nextCities}. Damit ist die Reihenfolge gleich geblieben."
        ]
      },
      {
        "active": "cities",
        "paragraphs": [
          "Aber: Die Verhältnisse haben sich von Zürich weg verschoben.",
          "Hatten 2017 noch rund ein Drittel der Republik-Community Zürich als Wohnort angegeben, sind es gegenwärtig nur noch etwa ein Viertel."
        ]
      },
      {
        "active": "plz",
        "paragraphs": [
          "Weitere {countrysideAboCount} von Ihnen verstreuen sich über die ganze Schweiz. Möchten Sie wissen, wie Ihr Wohnort bei der Republik vertreten ist?"
        ]
      },
      {
        "active": "dach",
        "paragraphs": [
          "Im Ausland führt {topAbroad} mit {topAbroadAboCount} Republik-Mitgliedern vor {abroadTwoOrMore}.",
          "Ein einziges Mitglied der Republik finden wir jeweils in {abroadSingles}."
        ]
      }
    ],
    "citiesChartProps":  {
      "title": "(Opt) Location, location, location",
      "lead": "(Opt) Evolution of readers distribution since 2017",
      "legend": "(Opt) Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen.",
      "labels": {
        "otherCHAddress": "Schweiz (ohne Grossstädte)",
        "otherAddress": "Welt (ohne Schweiz)"
      }
    }
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

## Wie alt sind Sie?

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "P",
    "text": "Sie decken eine ziemliche Bandbreite an Altersgruppen ab. Im Vergleich zu 2017 scheinen Sie aber auf den ersten Blick etwas älter geworden zu sein: Lag das Durchschnittsalter damals bei 44 Jahren, so ist es mittlerweile auf {averageAge} Jahre gehüpft."
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section> 

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "AgeDist",
    "title": "What we do in the shadows",
    "legend": "Startling correlation between Republik membership and a statistically aberrant lifespan."
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

Die Kurve der Altersverteilung hat sich aber nicht gleichmässig nach rechts verschoben. Vielmehr sieht es so aus, als sei sie insgesamt breiter geworden und decke nun ältere Altersstufen ab, als vorher. Stimmt das auch?

Die Grafik ist mit Vorsicht zu geniessen. 

Wie Sie wissen, [halten wir bei der Republik den Datenschutz hoch](https://www.republik.ch/2018/05/19/der-neue-datenschutz-der-republik) und überlassen es Ihnen, wie viel Sie von sich preisgeben wollen.

Beim Alter ist diese Bereitschaft ziemlich klein, um nicht zu sagen: minim.

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "P",
    "text": "Nicht einmal {percentBirthdayData}% der Verlegerinnen haben ihr Geburtsdatum bei der Anmeldung erfasst."
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "AgeVal",
    "title": "Stairway to heaven",
    "lead": "Republik boasts a strong immortal readership",
    "labels": {
        "bday": "Those of us with a date of birth",
        "noBday": "Gods, spirits, eternal souls of any kind"
    }
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

Die dünne Datenlage könnte nun bedeuten, dass die Republik mehr von älteren Menschen gelesen wird. Oder aber, dass dieses Alterssegment einfach eher bereit ist, ein Geburtsdatum angeben. Wir wissen es nicht.

Wie alt Sie wirklich sind, bleibt ein Geheimnis. Und das ist Ihr gutes Recht.

Damit zu einem anderen Thema, über das einige sehr gerne, andere lieber überhaupt nicht reden: Geld.

## Wie viel geben Sie aus für die Republik?

Guter Journalismus kostet. Gleichzeitig wollen wir niemanden ausschliessen. Seit dem Start der Republik gibt es deshalb die Möglichkeit von vergünstigten Mitgliedschaften.

Finanziert werden diese vergünstigten Mitgliedschaften über grosszügige Gönnerbeiträge. Das System basiert also auf dem Grundgedanken der Solidarität.

Und das Beste: Es funktioniert. Die Republik-Community unterstützt sich gegenseitig.

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "RevenueSeg",
    "title": "Revenue segments",
    "lead": "Growth and diversification over the past XXX years",
    "legend": "Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen."
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "P",
    "text": "Seit dem 14.01.2018 können Sie die Republik nicht nur im Jahresabo lesen, sondern auch monatlich. Der Anteil der Monatsabos ist seither um {percentMonthlyAbos}% gestiegen/in etwa gleichgeblieben/…"
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "P",
    "text": "Sie sind konstant grosszügig und machen anderen gerne eine Freude: Schon während des Crowdfundings lag der Anteil Geschenkabos bei knapp 4 Prozent und hat sich seit 2018 um die 5 Prozent eingependelt. Aktuell liegt der Wert bei {giftAbosShare}, wie bei den Monatsabos wird sich der Anteil bis Ende Jahr vermutlich noch vergrössern."
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

## Wie heissen Sie?

Zum Schluss zu einem nicht unwichtigen persönlichen Detail, über das bei wir der letzten Übersicht gar nicht sprachen: Ihr Vorname.

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "P",
    "text": "Die meisten Verlegerinnen heissen {topWomensNames}."
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "P",
    "text": "Die meisten Verleger heissen {topMensNames}."
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

So sieht die aktuelle Top 10 der Vornamen aus:

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "TopNames"
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "P",
    "text": "Vielleicht fragen Sie sich jetzt, wo {topWomensNames} geblieben sind? Unter die ersten Plätze schaffen sie es nicht. {topWomensName} liegt auf Platz {topWomensNameRank}, {topWomensName2} kommt etwas abgeschlagen auf Platz {topWomensNameRank2} und {topWomensName3} auf Platz {topWomensNameRank3} (dazwischen, auf Platz {topMixedNameRank} ist {topMixedName}, ein Vorname, den aber sowohl Frauen als auch Männer tragen)."
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

Ein naheliegender Grund für die rein männliche Top 10 ist einer, der uns zugegebenermassen etwas Kopfzerbrechen bereitet: Wenn wir von den Vornamen auf das Geschlecht der Verleger schliessen, dann sind Männer in der Verlagsetage der Republik stark übervertreten. 

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "NameGenders",
    "count": "abos",
    "title": "Gender distribution",
    "lead": "Viel weniger Verlerginnen als Verleger",
    "legend": "Estimation based on first names.",
    "labels": {
        "MALE": "Männer",
        "FEMALE": "Frauen",
        "BOTH": "Unentschieden"
    }
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section>

## Wie viele sind seit Anfang an dabei?

Im Lauf der vergangenen drei Jahre ist die Republik-Community gewachsen. Viele neue Verleger sind dazu gekommen. 

Dabei vergessen wir aber nicht den harten Kern, der uns von Anfang unterstützt hat. 

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "type": "P",
    "text": "{loyalAbos} Verlegerinnen sind schon vor dem 16.01.2018 an Bord gekommen. Sie haben uns durch Höhen und Tiefen und Höhen hindurch begleitet und die Treue gehalten."
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/wer-sind-sie-2/index.js"
}
```

<hr /></section> 

Herzlichen Dank dafür!

<hr /></section>
