import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Intro from './Intro'
import { PROFILES } from '../App.story'
import { DEFAULT_SIZE } from '../hooks/useSize'

storiesOf('Intro', module).add('default', () => (
  <Intro
    profiles={PROFILES}
    activeProfile={PROFILES[0]}
    size={DEFAULT_SIZE}
    onChange={() => {}}
    resetProfile={() => {}}
  />
))
