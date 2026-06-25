import React, { Fragment } from 'react'
import Art from './Art'
import Freq from './Freq'

export default ({ type, ...props }) => type === 'art'
  ? <Art {...props} />
  : <Freq {...props} />
