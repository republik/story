import React, { Fragment } from 'react'
import swoopyArrow from '../lib/swoopyArrow'
import {
  colors
} from '@project-r/styleguide'

const arrowColors = {
  primary: colors.primary,
  error: colors.error,
  black: '#000'
}

const arrowHeadId = key => `CumExArrowHead-${key}`

const STROKE_WIDTH = 1.5

export const MarkerDefs = () => (
  <Fragment>
    {Object.keys(arrowColors).map(key => (
      <marker key={key} id={arrowHeadId(key)} viewBox='-10 -10 20 20' refX='0' refY='0' markerWidth='20' markerHeight='20' strokeWidth='1' orient='auto' fill='none' stroke={arrowColors[key]}>
        <polyline strokeLinejoin='bevel' points='-6.75,-6.75 0,0 -6.75,6.75' />
      </marker>
    ))}
  </Fragment>
)

const straightArrow = ([[x0, y0], [x1, y1]]) => `M ${x0} ${y0} L ${x1} ${y1}`

const Arrow = ({ source, target, straight = false, cc = false, error = false, color = 'primary' }) => {
  const genPath = straight
    ? straightArrow
    : swoopyArrow().clockwise(!cc).angle(Math.PI/2)

  const colorKey = error
    ? 'error'
    : color

  return (
    <path
      fill='none'
      stroke={arrowColors[colorKey]}
      strokeWidth={STROKE_WIDTH}
      markerEnd={`url(#${arrowHeadId(colorKey)})`}
      d={genPath([
        source,
        target
      ])} />
  )
}

export default Arrow

