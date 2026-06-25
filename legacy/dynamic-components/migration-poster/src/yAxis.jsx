import React from 'react'

import { TICK_MARGIN_LEFT } from './config'

import { margin } from './config'

export const YAxis = ({ yScale, yTicks, yLabels, legendStyle, tickStyle }) => {
  return (
    <g {...legendStyle} transform={`translate(${TICK_MARGIN_LEFT}, 0)`}>
      {yLabels.map((tick, idx) => (
        <g key={`y-label-${idx}`} transform={`translate(0, ${yScale(tick)})`}>
          <text textAnchor='start'>
            <tspan dy='5' dx={-TICK_MARGIN_LEFT}>
              {tick}
            </tspan>
          </text>
        </g>
      ))}
      {yTicks.map((tick, idx) => (
        <g
          key={`y-tick-${idx}`}
          transform={`translate(${
            idx !== 0 && idx % 5 !== 0 ? margin.left - 6 : margin.left - 10
          }, ${yScale(tick)})`}
        >
          <line
            {...tickStyle}
            x1={
              idx !== 0 && idx % 5 !== 0 ? margin.left - 36 : margin.left - 32
            }
            x2={0}
          ></line>
        </g>
      ))}
    </g>
  )
}
