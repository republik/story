import React from 'react'
import { storiesOf } from '@storybook/react'
import { Center, Editorial, Breakout } from '@project-r/styleguide'

import Indicators from './Indicators'

export const STORYVALUES = [
  {
    label: 'CO₂-Austoss pro Kopf',
    value: '4.8',
    unit: ' t',
    source: {
      name: 'Global Carbon Project',
      url: 'https://www.globalcarbonproject.org',
      date: '2017',
    },
    color: 'rgb(8,48,107)',
  },
  {
    label: 'CO₂-Dichte',
    value: '412',
    unit: ' ppm',
    description: 'Millionstel CO₂-Moleküle in der Atmosphäre.',
    source: {
      name: 'NASA',
      url: 'https://climate.nasa.gov/vital-signs/carbon-dioxide/',
      date: 'Juni 2019',
    },
    color: 'rgb(8,48,107)',
  },
  {
    label: 'Temperatur',
    value: '+0.9°',
    unit: '',
    description: 'Abweichung vom langjährigen Durchschnitt 1951–1980',
    source: {
      name: 'NASA',
      url: 'https://climate.nasa.gov/vital-signs/global-temperature/',
      date: '2018',
    },
    color: 'rgb(187,21,26)',
  },
  {
    label: 'Meeresspiegel',
    value: '+93',
    unit: ' mm',
    description: 'Anstieg seit 1993 ',
    source: {
      name: 'NASA',
      url: 'https://climate.nasa.gov/vital-signs/sea-level/',
      date: 'März 2019',
    },
    color: 'rgb(187,21,26)',
  },
]

const DOMESTIC = [
  {
    label: 'CO₂-Austoss pro Kopf',
    value: '4.5',
    unit: ' t',
    description: 'Emissionen im Inland',
    source: {
      name: 'Bafu',
      url:
        'https://www.bafu.admin.ch/bafu/de/home/themen/klima/inkuerze.html#-1439031040',
      date: '2015',
    },
    color: 'rgb(8,48,107)',
  },
  {
    label: 'Treibhausgas-Fussabdruck',
    value: '14',
    unit: ' t',
    description:
      'Emissionen aller Treibhausgase in CO₂-Äquivalenten pro Kopf im Inland aufgrund des in- und ausländischen Konsums',
    source: {
      name: 'Bafu',
      url:
        'https://www.bafu.admin.ch/bafu/de/home/themen/klima/inkuerze.html#-1439031040',
      date: '2015',
    },
    color: 'rgb(8,48,107)',
  },
  {
    label: 'Temperatur',
    value: '+2',
    unit: '°',
    description: 'Veränderung der Jahresmitteltemperatur seit 1864',
    source: {
      name: 'MeteoSchweiz',
      url:
        'https://www.meteoschweiz.admin.ch/home/klima/klimawandel-schweiz/temperatur-und-niederschlagsentwicklung.html',
      date: '2018',
    },
    color: 'rgb(187,21,26)',
  },
  {
    label: 'Gletscher',
    value: '–25',
    unit: '%',
    description:
      'Veränderung des Eisvolumens der Schweizer Gletscher seit 2000',
    source: {
      name: 'GLAMOS',
      url:
        'https://www.bfs.admin.ch/bfs/de/home/statistiken/raum-umwelt/klimabezogene-indikatoren/beobachtete-veraenderungen.assetdetail.9226851.html',
      date: '2018',
    },
    color: 'rgb(187,21,26)',
  },
]

const ELECTIONS = [
  {
    label: 'Kandidierende',
    value: '4735',
    unit: '',
    description:
      'Anzahl Kandidatinnen und Kandidaten für 246 Sitze in National- und Ständerat',
    source: {
      name: 'Republik Wahltindär',
      url: 'https://www.republik.ch/wahltindaer',
      date: '01.10.2019',
    },
    color: 'rgb(187,21,26)',
  },
  {
    label: 'Kandidatinnen',
    value: '40,3%',
    unit: '',
    description: 'Frauenanteil bei den Kandidierenden',
    source: {
      name: 'BFS',
      url:
        'https://www.bfs.admin.ch/bfs/de/home/statistiken/kataloge-datenbanken/tabellen.assetdetail.9466387.html',
      date: '30.09.2019',
    },
    color: 'rgb(187,21,26)',
  },
  {
    label: 'Stimmberechtigte',
    value: '5,4 Mio.',
    unit: '',
    description: 'Anzahl Stimmberechtigte',
    source: {
      name: 'BFS',
      url:
        'https://www.bfs.admin.ch/bfs/de/home/statistiken/politik/abstimmungen/stimmbeteiligung.assetdetail.7646490.html',
      date: '23.10.2018',
    },
    color: 'rgb(187,21,26)',
  },
  {
    type: 'Timer',
    countdown: true,
    label: 'Zeit bis zur Wahl',
    value: new Date('2019/11/1'),
    description:
      'Verbleibende Zeit bis zur Schliessung der Wahllokale am 20. Oktober um 12:00',
    color: 'rgb(187,21,26)',
  },
]

storiesOf('Indicators', module)
  .add('4 worldwide', () => (
    <Center>
      <Breakout size="breakout">
        <Indicators values={STORYVALUES} />
      </Breakout>
    </Center>
  ))
  .add('4 domestic', () => (
    <Center>
      <Breakout size="breakout">
        <Indicators values={DOMESTIC} />
      </Breakout>
    </Center>
  ))
  .add('2 numbers', () => (
    <Center>
      <Breakout size="breakout">
        <Indicators values={STORYVALUES.slice(0, 2)} />
      </Breakout>
    </Center>
  ))
  .add('countdown', () => (
    <Center>
      <Breakout size="breakout">
        <Indicators values={ELECTIONS} />
      </Breakout>
    </Center>
  ))
  .add('timer', () => (
    <Center>
      <Breakout size="breakout">
        <Indicators values={[
          {
            type: 'Timer',
            countdown: true,
            label: 'Zeit bis zur Wahl',
            value: '2019/10/30'
          },
          {
            type: 'Timer',
            label: 'Zeit seit der Wahl',
            value: '2017/03/29'
          }
        ]} />
      </Breakout>
    </Center>
  ))

