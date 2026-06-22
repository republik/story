import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Estimate from './Estimate'

storiesOf('Estimate', module).add('default', () => (
  <Estimate
    {...{
      id: 1,
      title:
        'Wie viele Täter von Gewaltdelikten waren laut deutscher polizeilicher Kriminalstatistik 2018 Deutsche?',
      type: 'estimate',
      options: [
        {
          value: 'WAHR',
          option: '69 Prozent',
          debriefing: 'Lorem ipsum dolor sit amet. Quelle:',
          sourceTitle: 'Bundesamt für Statistik',
          source: 'https://www.example.org',
        },
        {
          value: 'FALSCH',
          option: '37 Prozent',
          debriefing: 'Lorem ipsum dolor sit amet. Quelle:',
          sourceTitle: 'Bundesamt für Statistik',
          source: 'https://www.example.org',
        },
        {
          value: 'FALSCH',
          option: '3 Prozent',
          debriefing: 'Lorem ipsum dolor sit amet. Quelle:',
          sourceTitle: 'Bundesamt für Statistik',
          source: 'https://www.example.org',
        },
      ],
    }}
  />
))
