import * as React from 'react'
import { storiesOf } from '@storybook/react'
import JourneyMap from './JourneyMap'
import { JOURNEYS } from './journeys';

storiesOf('JourneyMap', module)
  .add('narrow 0%', () => (
    <JourneyMap
      journey={JOURNEYS.bern}
      width={400}
      height={800}
      progress={0}
    />
  ))
  .add('narrow 50%', () => (
    <JourneyMap
      journey={JOURNEYS.bern}
      width={400}
      height={800}
      progress={0.5}
    />
  ))
  .add('narrow 100%', () => (
    <JourneyMap
      journey={JOURNEYS.bern}
      width={400}
      height={800}
      progress={1}
    />
  ))
  .add('large 100%', () => (
    <JourneyMap
      journey={JOURNEYS.bern}
      width={800}
      height={800}
      progress={9}
    />
  ))
