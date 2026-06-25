import * as React from 'react'
import { storiesOf } from '@storybook/react'
import App from './App'
import { Center, HeaderHeightProvider } from '@project-r/styleguide'

storiesOf('App', module).add('default', () => (
  <HeaderHeightProvider config={[{minWidth: 0, headerHeight: 200}]}>
    <Center>
      <App />
    </Center>
  </HeaderHeightProvider>
))
