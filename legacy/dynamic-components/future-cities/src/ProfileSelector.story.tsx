import * as React from 'react'
import { storiesOf } from '@storybook/react'

import ProfileSelector from './ProfileSelector'

storiesOf('ProfileSelector', module)
  .add('default', () =>
    <ProfileSelector />
  )