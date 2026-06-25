import React from "react"
import { storiesOf } from "@storybook/react"

import Press from "./Press"

export const QUOTES = {
  "label": "Das Beste der anderen",
  "entries": [
    {
      "description": "Klimawandel erklären? So geht's!",
      "source": "Die Zeit",
      "url": "https://www.zeit.de/wissen/umwelt/2018-08/klimawandel-globale-erderwaermung-zweifel-argumente-klimamodelle",
      "quote": "Wesenszug des Klimas ist Veränderung. Doch das, was wir seit wenigen Jahrzehnten beobachten, ist unnatürlich. Die Hauptursache für die Erwärmung ist die steigende Menge von Treibhausgasen in der Atmosphäre.",
      "date": "19.08.2018"
    },
    {
      "source": "NZZ",
      "description": "«Klimahysterie!», «Klimapropaganda!» – was Klimaforscher zu den häufigsten Argumenten von Skeptikern sagen",
      "url": "https://www.nzz.ch/wissenschaft/klimawandel-forscher-antworten-auf-die-argumente-von-skeptikern-ld.1468011",
      "quote": "Der direkte Pro-Kopf-Ausstoss von CO2 liegt in der Schweiz bei über 6 Tonnen pro Jahr. Wenn man noch die sogenannten grauen Emissionen, die aufgrund von Importen im Ausland entstehen, berücksichtigt, sind wir bei über 10 Tonnen CO2 pro Kopf und Jahr. Damit stehen wir international nicht gut da.",
      "date": "27.03.2019"
    },
    {
      "source": "Bundesamt für Umwelt",
      "description": "Klima: Das Wichtigste in Kürze",
      "url": "https://www.bafu.admin.ch/bafu/de/home/themen/klima/inkuerze.html",
      "quote": "Der Klimawandel äussert sich in der Schweiz überdurchschnittlich: Die mittlere Jahrestemperatur ist seit Messbeginn 1864 um 2°C gestiegen, gut doppelt so stark wie im globalen Mittel.",
      "date": "2017-11-21"
    }
  ]
}

storiesOf("Press", module).add("default", () => (
  <Press quotes={QUOTES} />
))
