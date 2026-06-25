import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Story from './Story'
import { JOURNEYS } from './journeys';

import { PROFILES } from './profiles'

storiesOf('Story', module)
  .add('default', () =>
    <div style={{height: 8000}}>
      <Story journey={JOURNEYS.bern} width={500} height={window.innerHeight} profile={PROFILES} />
    </div>
  )