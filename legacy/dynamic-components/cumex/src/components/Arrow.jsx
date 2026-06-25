import React, { Fragment } from 'react'
import swoopyArrow from '../lib/swoopyArrow'
import {
  colors
} from '@project-r/styleguide'

const ARROW_HEAD_IDS = {
  primary: 'CumExArrowHead',
  error: 'CumExArrowHeadError'
}
const STROKE_WIDTH = 1.5

export const MarkerDefs = () => (
  <Fragment>
    {Object.keys(ARROW_HEAD_IDS).map(key => (
      <marker key={key} id={ARROW_HEAD_IDS[key]} viewBox='-10 -10 20 20' refX='0' refY='0' markerWidth='20' markerHeight='20' strokeWidth='1' orient='auto' fill='none' stroke={colors[key]}>
        <polyline strokeLinejoin='bevel' points='-6.75,-6.75 0,0 -6.75,6.75' />
      </marker>
    ))}
  </Fragment>
)

const Arrow = ({ source, target, cc = false, error = false }) => {
  const swoopy = swoopyArrow().clockwise(!cc).angle(Math.PI/2)
  const colorKey = error ? 'error' : 'primary'

  return (
    <path
      fill='none'
      stroke={colors[colorKey]}
      strokeWidth={STROKE_WIDTH}
      markerEnd={`url(#${ARROW_HEAD_IDS[colorKey]})`}
      d={swoopy([
        source,
        target
      ])} />
  )
}

export default Arrow

