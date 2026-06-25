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

## 1. Verzögerung

Standardmässig gehen wir – wie oben erwähnt – von 10 Tagen aus zwischen Ansteckung und Testergebnis. Das Modell sagt dann voraus, dass die Belastung der Spitäler schon sehr bald ihren Höhepunkt erreicht.

Allerdings wissen wir nicht mit Sicherheit, wie viel Zeit zwischen Infektion und positivem Test wirklich verstreicht. Es könnte sein, dass diese Zeitdauer deutlich kürzer ist als die angenommenen 10 Tage. Oder länger. Was passiert dann?

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "parameter": "infectedOffset",
    "label": "{formattedValue} Tage zwischen Ansteckung und positivem Test",
    "title": "Wie viel Zeit vergeht bis zum Test?",
    "lead": "Probieren Sie es selbst aus:",
    "limitLabel": "Plätze auf den Intensivstationen:",
    "overloadLabel": "mutmassliche Überlastung am {date}",
    "offsetLabel": "bereits vor {formattedValue} Tagen infiziert",
    "footnotes": [
      {"text": "Quelle: "},
      {"text": "Bundesamt für Gesundheit", "href": "https://www.bag.admin.ch/bag/de/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/novel-cov/situation-schweiz-und-international.html"},
      {"text": ", eigene Berechnungen."}
    ],
    "config": {
      "xTicks": [
        "2020-03-01",
        "2020-03-25",
        "2020-04-12"
      ]
    }
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/covid19/extrapolation.js"
}
```

<hr /></section>

Zur Erinnerung: Schweizweit gibt es momentan rund 1200 Betten auf Intensivstationen. Es stehen aber nicht alle Plätze für Covid-19-Fälle zur Verfügung, auch andere Patientinnen benötigen intensive Pflege.

Wie sich zeigt, reagieren die Kurven stark auf den Zeitfaktor. Verstreichen zwischen Ansteckung und positivem Test beispielsweise 14 Tage, so brauchen wir schon bald doppelt so viele Plätze auf Intensiv­stationen wie zuvor.

Denn die Epidemie hat im zweiten Fall bereits mehr Zeit gehabt, um sich auszubreiten – und zwar genau in jenen Tagen, bevor in der Schweiz der «Lockdown light» beschlossen wurde. Es bedeutet, dass es zu diesem Zeitpunkt noch viel mehr unbekannte Infizierte gab. Und dass ein Teil dieser Infizierten nun als schwere Fälle auf der Intensiv­station landen.

Wie viel Zeit im Schnitt von der Ansteckung bis zum positiven Test wirklich vergeht, weiss niemand auf den Tag genau. Doch das Modell zeigt, dass wenige Tage bereits grosse Auswirkungen haben können. Als Behörde, die Massnahmen verhängt oder Spital­kapazitäten plant, muss man dies in Betracht ziehen.

## 2. Effektivität der Massnahmen

Was wir ebenfalls noch nicht genau kennen, ist die Effektivität der vom Bundesrat beschlossenen Massnahmen. Wir haben sie bei 70 Prozent angesetzt. Das würde bedeuten, dass Infizierte im Schnitt viermal weniger Personen als vor Beginn der Massnahmen anstecken würden.

Was ist, wenn die bisherigen Anstrengungen nicht ausreichen? Wenn die Massnahmen weniger wirken, steigt die Zahl der Kranken:

<section><h6>DYNAMIC_COMPONENT</h6>

```
{
  "autoHtml": false,
  "props": {
    "parameter": "preventionByMeasurements",
    "label": "{formattedValue} weniger Ansteckungen ab dem 17. März",
    "title": "Wie wirkungsvoll sind die Massnahmen?",
    "lead": "Probieren Sie es selbst aus:",
    "limitLabel": "Plätze auf den Intensivstationen:",
    "overloadLabel": "mutmassliche Überlastung am {date}",
    "footnotes": [
      {"text": "Quelle: "},
      {"text": "Bundesamt für Gesundheit", "href": "https://www.bag.admin.ch/bag/de/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/novel-cov/situation-schweiz-und-international.html"},
      {"text": ", eigene Berechnungen."}
    ],
    "config": {
      "xTicks": [
        "2020-03-01",
        "2020-03-17",
        "2020-04-12"
      ]
    }
  },
  "src": "https://cdn.repub.ch/s3/republik-assets/dynamic-components/covid19/extrapolation.js"
}
```

<hr /></section>

Die Effektivität der Massnahmen ist entscheidend: Fällt sie unter einen bestimmten Wert, so stabilisieren sich die Zahlen überhaupt nicht. Immer mehr Schwerkranke landen auf den Intensiv­stationen, bis diese voll sind. Dann werden Ärztinnen und Pfleger bald äusserst schwierige Entscheide fällen müssen: Wer wird auf der Intensiv­station versorgt? Und wer nicht?

Wenn sich die Ansteckungsrate in den vergangenen zwei Wochen dank social distancing und weiteren Massnahmen hingegen substanziell verbessert hat, so werden die benötigten Kapazitäten auf den Intensiv­stationen vermutlich bald wieder sinken – das zeigen auch Modelle aus der Wissenschaft.

<hr /></section>
