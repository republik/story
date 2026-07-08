import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  ColorContextProvider
} from '@project-r/styleguide'

import ScrollBlocks from './components/ScrollBlocks'
import { AutoSizePregnancyTimeline } from './components/PregnancyTimeline'

const Switch = ({ schema, phases = [], backgrounds = [], labels, anchor, timeline }) => {
  if (timeline) {
    return <AutoSizePregnancyTimeline labels={labels} {...timeline} />
  }
  return <ScrollBlocks
    key={`phases${phases.length}`}
    phases={phases}
    schema={schema}
    anchor={anchor}
    labels={labels}
    backgrounds={backgrounds} />
}

const LightWrapper = props => {
  if (ColorContextProvider) {
    return <ColorContextProvider colorSchemeKey='light'>
      <Switch {...props} />
    </ColorContextProvider>
  }
  return <Switch {...props} />
}

export default LightWrapper
