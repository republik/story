import * as React from 'react'
import { storiesOf } from '@storybook/react'
import App from './App'

storiesOf('App', module)
  .add('Bern', () => (
    <App descriptions={['Lorem ipsum']} city="bern" />
  ))
  .add('Miami', () => (
    <App descriptions={['Lorem ipsum']} city="miami" />
  ))
