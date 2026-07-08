import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Profile from './Profile'

import { PROFILES } from './profiles'

storiesOf('Profile', module).add('default', () => (
  <Profile profile={PROFILES.bern} />
))
