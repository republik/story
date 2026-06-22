import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Choice from './Choice'

storiesOf('Choice', module).add('default', () => (
  <Choice
    {...{
      title: 'Was bezeichnet der englische Begriff «Davos Man»?',
      value: 3,
      options: [
        {
          id: 1,
          option: 'Klaus Schwab',
        },
        {
          id: 2,
          option:
            'Ein Festival der Jungfreisinnigen auf dem gefrorenen Davosersee',
        },
        {
          id: 3,
          option:
            'Den prototypischen Vertreter der globalen Machtelite: alt, männlich, weiss.',
        },
      ],
    }}
  ></Choice>
))
