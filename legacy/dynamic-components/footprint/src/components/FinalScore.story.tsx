import * as React from 'react'
import { storiesOf } from '@storybook/react'

import FinalScore from './FinalScore'
import { findActiveOptions } from '../utils'
import { DEFAULT_SIZE } from '../hooks/useSize'
import { PROFILES } from '../App.story'
import { PADDING } from '../constants'

export const GAME_STATE = [
  {
    description: 'Wie möchtest Du dich ernähren?',
    category: 'Ernährung',
    month: 1,
    options: [
      {
        id: 1,
        option: 'Wie bisher',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 2,
        option: 'Vegetarisch',
        delta: -294,
        selected: 0,
        message: 'Du isst neuerdings vegetarisch.',
        dep1: null,
        dep2: null
      },
      {
        id: 3,
        option: 'Vegan',
        delta: -560,
        selected: 1,
        message: 'Du isst neuerdings vegan.',
        dep1: null,
        dep2: null
      }
    ],
    id: 0
  },
  {
    description: 'Ausgaben für Möbel und Einrichtung',
    category: 'Konsum',
    month: 1,
    options: [
      {
        id: 45,
        option: 'Aufstocken auf 300.-',
        delta: 1243,
        selected: 0,
        message: 'Du gibst 300 statt 125 Franken für Möbel aus',
        dep1: null,
        dep2: null
      },
      {
        id: 46,
        option: 'Wie bisher: monatlich 125.-',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 47,
        option: 'Go minimal! Nur noch 25.-',
        delta: -710,
        selected: 1,
        message: 'Du gibst 25 statt 125 Franken für die Einrichtung aus',
        dep1: null,
        dep2: null
      }
    ],
    id: 1
  },
  {
    description: 'Wohin geht’s in die Winterferien?',
    category: 'Mobilität',
    month: 2,
    options: [
      {
        id: 13,
        option: 'Wie letztes Jahr: Rio de Janeiro',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 14,
        option: 'Skitouren im Goms',
        delta: -3100,
        selected: 1,
        message: 'Du verzichtest auf einen Brasilien-Flug',
        dep1: null,
        dep2: null
      }
    ],
    id: 2
  },
  {
    description: 'Dein Freund will bei dir einziehen.',
    category: 'Wohnen',
    month: 2,
    options: [
      {
        id: 28,
        option: 'Lieber nicht.',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 29,
        option: 'Auf jeden Fall!',
        delta: -1120,
        selected: 1,
        message: 'Du teilst die Wohnung neu mit deinem Freund',
        dep1: null,
        dep2: null
      }
    ],
    id: 3
  },
  {
    description: 'Ausgaben für Kleider und Schuhe',
    category: 'Konsum',
    month: 3,
    options: [
      {
        id: 39,
        option: 'Wie bisher: monatlich 250.-',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 40,
        option: 'Ich komme auch mit 100.- durch',
        delta: -488,
        selected: 0,
        message: 'Du gibst 100 statt 250 Franken für Kleidung aus',
        dep1: null,
        dep2: null
      },
      {
        id: 41,
        option: 'Go minimal! Nur noch 20.-',
        delta: -748,
        selected: 1,
        message: 'Du gibst 20 statt 250 Franken für Kleidung aus',
        dep1: null,
        dep2: null
      }
    ],
    id: 4
  },
  {
    description: 'Nur saisonale Gemüse kaufen ist ...',
    category: 'Ernährung',
    month: 4,
    options: [
      {
        id: 4,
        option: 'Schwierig',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 5,
        option: 'Mega wichtig!',
        delta: -240,
        selected: 1,
        message: 'Du kaufst fast nur noch saisonal ein.',
        dep1: null,
        dep2: null
      }
    ],
    id: 5
  },
  {
    description: 'Zu Ostern: Oma besuchen in Berlin?',
    category: 'Mobilität',
    month: 4,
    options: [
      {
        id: 18,
        option: 'Wie letztes Jahr: mit dem Flugzeug',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 19,
        option: 'Mit dem Zug',
        delta: -310,
        selected: 0,
        message: 'Du reist nach Berlin mit dem Zug',
        dep1: null,
        dep2: null
      },
      {
        id: 20,
        option: 'Diesmal nicht',
        delta: -337,
        selected: 1,
        message: 'Du reist gar nicht nach Berlin',
        dep1: null,
        dep2: null
      }
    ],
    id: 6
  },
  {
    description: 'Ausgaben für Restaurants und Hotels',
    category: 'Konsum',
    month: 4,
    options: [
      {
        id: 48,
        option: 'Wie bisher: monatlich 600.-',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 49,
        option: 'Ich komme auch mit 400.- durch',
        delta: -945,
        selected: 0,
        message: 'Du gibst 400 statt 600 Franken für Gastronomie aus',
        dep1: null,
        dep2: null
      },
      {
        id: 50,
        option: 'Fertig Ausgang, nur noch 50.-',
        delta: -1485,
        selected: 1,
        message: 'Du gibst 50 statt 600 Franken für Gastronomie aus',
        dep1: null,
        dep2: null
      }
    ],
    id: 7
  },
  {
    description: 'Den Wäschetumbler benutzt Du:',
    category: 'Wohnen',
    month: 4,
    options: [
      {
        id: 53,
        option: 'Ja, ab und zu',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 54,
        option: 'Nein, nie wieder',
        delta: -18,
        selected: 1,
        message: 'Du trocknest die Wäsche nicht mehr im Tumbler',
        dep1: 28,
        dep2: null
      },
      {
        id: 55,
        option: 'Nein, nie wieder',
        delta: -14,
        selected: 1,
        message: 'Du trocknest die Wäsche nicht mehr im Tumbler',
        dep1: 29,
        dep2: null
      }
    ],
    id: 8
  },
  {
    description: 'Wohin geht’s in die Sommerferien?',
    category: 'Mobilität',
    month: 7,
    options: [
      {
        id: 15,
        option: 'Wie letztes Jahr: Island',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 16,
        option: 'Bretagne (mit Auto)',
        delta: -365,
        selected: 0,
        message: 'Du verzichtest auf einen Island-Flug',
        dep1: null,
        dep2: null
      },
      {
        id: 17,
        option: 'Vierwaldstättersee (mit Zug)',
        delta: -929,
        selected: 1,
        message: 'Du verzichtest auf einen Island-Flug',
        dep1: null,
        dep2: null
      }
    ],
    id: 9
  },
  {
    description: 'Willst Du weniger Essen wegwerfen?',
    category: 'Ernährung',
    month: 8,
    options: [
      {
        id: 6,
        option: 'Nein',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 7,
        option: 'Ja',
        delta: -230,
        selected: 1,
        message: 'Du verhinderst Foodwaste konsequent.',
        dep1: 1,
        dep2: 4
      },
      {
        id: 8,
        option: 'Ja',
        delta: -185,
        selected: 1,
        message: 'Du verhinderst Foodwaste konsequent.',
        dep1: 2,
        dep2: 4
      },
      {
        id: 9,
        option: 'Ja',
        delta: -146,
        selected: 1,
        message: 'Du verhinderst Foodwaste konsequent.',
        dep1: 3,
        dep2: 4
      },
      {
        id: 10,
        option: 'Ja',
        delta: -193,
        selected: 1,
        message: 'Du verhinderst Foodwaste konsequent.',
        dep1: 1,
        dep2: 5
      },
      {
        id: 11,
        option: 'Ja',
        delta: -149,
        selected: 1,
        message: 'Du verhinderst Foodwaste konsequent.',
        dep1: 2,
        dep2: 5
      },
      {
        id: 12,
        option: 'Ja',
        delta: -109,
        selected: 1,
        message: 'Du verhinderst Foodwaste konsequent.',
        dep1: 3,
        dep2: 5
      }
    ],
    id: 10
  },
  {
    description: 'Neuer Job! Pendeln von Bern nach Zürich?',
    category: 'Mobilität',
    month: 8,
    options: [
      {
        id: 26,
        option: 'Ja',
        delta: 711,
        selected: 0,
        message: 'Du pendelst neu von Bern nach Zürich',
        dep1: null,
        dep2: null
      },
      {
        id: 27,
        option: 'Nein',
        delta: 0,
        selected: 1,
        message: null,
        dep1: null,
        dep2: null
      }
    ],
    id: 11
  },
  {
    description: 'Geburtstag: Oma nochmals besuchen?',
    category: 'Mobilität',
    month: 9,
    options: [
      {
        id: 23,
        option: 'Wie letztes Jahr: mit dem Flugzeug',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 24,
        option: 'Mit dem Zug',
        delta: -310,
        selected: 0,
        message: 'Du reist nach Berlin mit dem Zug',
        dep1: null,
        dep2: null
      },
      {
        id: 25,
        option: 'Diesmal nicht',
        delta: -337,
        selected: 1,
        message: 'Du reist gar nicht nach Berlin',
        dep1: null,
        dep2: null
      }
    ],
    id: 12
  },
  {
    description: 'Minergie-Wohnung wird frei! Umziehen?',
    category: 'Wohnen',
    month: 9,
    options: [
      {
        id: 30,
        option: 'Nein',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 31,
        option: 'Ja',
        delta: -1507,
        selected: 1,
        message: 'Du ziehst in eine Minergie-Wohnung um',
        dep1: 28,
        dep2: null
      },
      {
        id: 32,
        option: 'Ja',
        delta: -993,
        selected: 1,
        message: 'Du ziehst in eine Minergie-Wohnung um',
        dep1: 29,
        dep2: null
      }
    ],
    id: 13
  },
  {
    description: 'Geht es auch mit kühlerer Raumtemperatur?',
    category: 'Wohnen',
    month: 10,
    options: [
      {
        id: 33,
        option: 'Nee, weiterhin 23 Grad',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 35,
        option: 'Ja, ab jetzt nur 19 Grad',
        delta: -400,
        selected: 1,
        message: 'Du heizt die Wohnung auf 19 statt auf 23 Grad',
        dep1: 28,
        dep2: 30
      },
      {
        id: 36,
        option: 'Ja, ab jetzt nur 19 Grad',
        delta: -254,
        selected: 1,
        message: 'Du heizt die Wohnung auf 19 statt auf 23 Grad',
        dep1: 29,
        dep2: 30
      },
      {
        id: 37,
        option: 'Ja, ab jetzt nur 19 Grad',
        delta: -88,
        selected: 1,
        message: 'Du heizt die Wohnung auf 19 statt auf 23 Grad',
        dep1: 28,
        dep2: 31
      },
      {
        id: 38,
        option: 'Ja, ab jetzt nur 19 Grad',
        delta: -56,
        selected: 1,
        message: 'Du heizt die Wohnung auf 19 statt auf 23 Grad',
        dep1: 29,
        dep2: 32
      }
    ],
    id: 14
  },
  {
    description: 'Ausgaben für Freizeit und Kultur',
    category: 'Konsum',
    month: 10,
    options: [
      {
        id: 42,
        option: 'Wie bisher: monatlich 600.-',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 43,
        option: 'Ich komme auch mit 260.- durch',
        delta: -964,
        selected: 0,
        message: 'Du gibst 260 statt 600 Franken für Freizeit aus',
        dep1: null,
        dep2: null
      },
      {
        id: 44,
        option: 'Go minimal! Nur noch 50.-',
        delta: -1560,
        selected: 1,
        message: 'Du gibst 50 statt 600 Franken für Freizeit aus',
        dep1: null,
        dep2: null
      }
    ],
    id: 15
  },
  {
    description: 'Deinen Starbucks-Kaffee trinkst Du ...',
    category: 'Ernährung',
    month: 10,
    options: [
      {
        id: 51,
        option: 'im Pappbecher',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 52,
        option: 'im mitgebrachten Gefäss',
        delta: -10,
        selected: 1,
        message: 'Du holst den Starbucks-Kaffee im Mehrwegbecher',
        dep1: null,
        dep2: null
      }
    ],
    id: 16
  },
  {
    description: 'Weihnachts-Shopping:',
    category: 'Mobilität',
    month: 11,
    options: [
      {
        id: 21,
        option: 'Wie letztes Jahr: in New York',
        delta: 0,
        selected: 0,
        message: null,
        dep1: null,
        dep2: null
      },
      {
        id: 22,
        option: 'Im Tivoli Spreitenbach',
        delta: -2000,
        selected: 1,
        message: 'Du verzichtest auf einen Amerika-Flug',
        dep1: null,
        dep2: null
      }
    ],
    id: 17
  }
]
storiesOf('FinalScore', module)
  .add('default', () => (
    <div style={{width: 414}}>
    <FinalScore
      profile={PROFILES[0]}
      gameState={GAME_STATE}
      size={DEFAULT_SIZE}
      score={[]}
      resetProfile={() => {}}
      scoreTotal={50}
      budgetTotal={100}
    />
    </div>
  ))
  .add('wide', () => (
    <FinalScore
      score={[]}
      profile={PROFILES[0]}
      gameState={GAME_STATE}
      size={{
        width: 695,
        height: 768,
        top: 0,
        padding: PADDING,
        mobile: false,
        headerHeight: 60
      }}
      resetProfile={() => {}}
      scoreTotal={50}
      budgetTotal={100}
    />
  ))
