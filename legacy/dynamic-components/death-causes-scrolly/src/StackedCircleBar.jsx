import React from 'react'
import { css } from 'glamor'

import {
  useMediaQuery,
  mediaQueries,
  useColorContext,
} from '@project-r/styleguide'

const styles = {
  circle: css({
    transition: 'fill 50ms ease-in-out',
  }),
}

const PADDING_SIDES = 10
// const LEGEND_SPACING = 25

const StackedCirleBar = (props) => {
  const { width, chartData, age, convertCauseName } = props

  const [colorScheme] = useColorContext()
  const isMobile = useMediaQuery(mediaQueries.onlyS)
  const WAFFLE_PADDING = !isMobile && 0.1
  const PADDING_TOP = isMobile ? 5 : 15

  const circleData = []

  chartData.forEach((d) => {
    for (let i = 1; i <= d.cause_color; i++) {
      circleData.push(d)
    }
  })

  const rowAmount = isMobile ? 20 : 34
  const columns = Math.ceil(1000 / rowAmount)

  const chartWidth = isMobile ? width : width / 2 - PADDING_SIDES

  const circleSize = chartWidth / columns
  const radius = (circleSize - WAFFLE_PADDING) / 2

  const barHeight = circleSize * rowAmount + PADDING_TOP

  const dataSet =
    circleSize &&
    circleData.map((d, i) => {
      let colIndex = isMobile ? Math.floor(i / rowAmount) : i % columns
      let rowIndex = isMobile ? i % rowAmount : Math.floor(i / columns)
      return {
        cx: colIndex * circleSize,
        cy: rowIndex * circleSize,
        fill: convertCauseName(d.cause),
        r: radius,
        age: d.altersgruppe,
        cause: d.cause,
        id: i,
      }
    })
  return (
    circleSize > 0 && (
      <svg width={chartWidth} height={barHeight}>
        <g transform={`translate(${radius}, ${PADDING_TOP})`}>
          {dataSet.map((d) => (
            <circle
              {...styles.circle}
              key={d.id}
              {...colorScheme.set(
                'fill',
                d.age === age ? d.fill : 'greyCircles'
              )}
              r={d.r}
              cx={d.cx}
              cy={d.cy}
            />
          ))}
        </g>
      </svg>
    )
  )
}

export default StackedCirleBar
