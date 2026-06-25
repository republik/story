import React from 'react'

import { TICK_MARGIN_LEFT } from './config'

const XTICKS = [
  0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000,
  110000, 120000, 130000, 140000, 150000, 160000, 170000, 180000,
]
const XLABELS = [0, 60000, 120000, 180000]

import { format } from './utils'

export const XAxis = ({
  xScale,
  xTicks = XTICKS,
  xLabels = XLABELS,
  legendStyle,
}) => {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        padding: '20px 0',
        // backgroundColor: 'rgba(255, 255, 255, 0.6)',
        zIndex: 2,
        height: '20px',
        marginBottom: '10px',
        marginLeft: TICK_MARGIN_LEFT,
      }}
      {...legendStyle}
    >
      {xLabels.map((tick, idx) => (
        <span
          key={`x-tick-${idx}`}
          style={{
            position: 'absolute',
            left:
              idx === 0
                ? xScale(tick) - 2.5
                : idx === 1
                ? xScale(tick) - 20
                : xScale(tick) - 25,
            marginTop: '-10px',
          }}
        >
          {format(tick)}
        </span>
      ))}
      {xTicks.map((tick, idx) => (
        <span
          key={`x-tick-${idx}`}
          style={{
            position: 'absolute',
            left: xScale(tick),
            height: idx !== 0 && idx % 6 !== 0 ? '4px' : '8px',
            width: '1px',
            backgroundColor: 'var(--color-text)',
            opacity: '0.5',
            marginTop: idx !== 0 && idx % 6 !== 0 ? '14px' : '10px',
          }}
        ></span>
      ))}
    </div>
  )
}
