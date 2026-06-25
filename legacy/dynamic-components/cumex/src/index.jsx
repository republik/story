import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import ScrollBlocks from './components/ScrollBlocks'

const Wrapper = ({ schema, phases = [], anchor }) => {
  return <ScrollBlocks
    key={`phases${phases.length}`}
    phases={phases}
    schema={schema}
    anchor={anchor} />
}

export default Wrapper
