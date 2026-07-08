import * as React from 'react'
import { COLORS, LABELS } from './constants'
import {
  Interaction,
  mediaQueries,
  fontFamilies,
} from '@project-r/styleguide'
import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import { Profiles } from './Profile'
import { format } from 'd3-format'
import { css } from 'glamor'

import { EXTENTS } from './profiles'

const f = format('.1f')

const styles = {
  valueLabel: css({
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: 12,
    textAnchor: 'middle',
    fill: '#888',
  }),
  valueLabelHighlight: css({
    fontFamily: fontFamilies.sansSerifMedium,
    fontSize: 12,
    textAnchor: 'middle',
  }),
  header: css({
    fontFamily: fontFamilies.sansSerifMedium,
    fontSize: 16,
  }),
  subheader: css({
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: 16,
    paddingBottom: 5,
  }),
}

type Props = {
  width?: number
  height?: number
  profileData: Profiles
  labelKey: string
  highlight?: boolean
}

const OPACITY = 0.5

const Chart: React.FC<Props> = ({
  width = 400,
  height = 200,
  profileData,
  labelKey,
  highlight,
}) => {
  const dotRadius = width / 50
  const lineWidth = width / 100
  const spacing = 50

  const margins = {
    left: 10 + dotRadius,
    right: 10 + dotRadius,
    top: 0 + dotRadius,
    bottom: 30,
  }

  const w = width - margins.left - margins.right
  const h = height - margins.top - margins.bottom

  const inclineWidth = (w - spacing) / 2

  const values = [
    profileData.orig[labelKey],
    profileData.orig[`future_${labelKey}`],
    profileData.dest[labelKey],
    profileData.dest[`future_${labelKey}`],
  ]

  const [y1, y2, y3, y4] = React.useMemo(() => {
    const [min, max] = extent(values)

    const { diff } = EXTENTS[labelKey]

    const scaleY = scaleLinear()
      .domain([0, diff])
      .range([h, 0])

    return [0, 1, 2, 3].map(i => scaleY(values[i]) - scaleY(max))
  }, [height, profileData])

  const labelDef = LABELS[labelKey]
  const formatter = labelDef.formatter || f

  return (
    <div style={{ width, marginTop: 5 }}>
      <div>
        <div
          {...styles.header}
          style={{
            color: labelDef.color,
            opacity: highlight ? 1 : 1 - OPACITY,
          }}
        >
          {labelDef.label}
        </div>
        <div
          {...styles.subheader}
          style={{ opacity: highlight ? 1 : 1 - OPACITY }}
        >
          {labelDef.description} ({labelDef.unit})
        </div>
      </div>
      <div>
        <svg width={width} height={height}>
          <g transform={`translate(${margins.left},${margins.top})`}>
            <g transform={`translate(${0},${0})`}>
              <line
                strokeWidth={lineWidth}
                stroke={labelDef.color}
                x1={0}
                x2={inclineWidth}
                y1={y1}
                y2={y2}
              />
              <circle
                fill={labelDef.color}
                stroke={'#fff'}
                strokeWidth={2}
                r={dotRadius}
                cx={0}
                cy={y1}
              />
              <circle
                stroke={'#fff'}
                strokeWidth={2}
                fill={labelDef.color}
                r={dotRadius}
                cx={inclineWidth}
                cy={y2}
              />
              <text x={0} y={height - 15} {...styles.valueLabel}>
                heute
              </text>
              <text
                x={inclineWidth}
                y={height - 15}
                fill={labelDef.color}
                {...styles.valueLabelHighlight}
              >
                2050
              </text>
              <text
                x={0}
                y={y1 - dotRadius * (y1 < h / 2 ? -3 : 1.5)}
                {...styles.valueLabel}
              >
                {formatter(values[0])}
              </text>
              <text
                x={inclineWidth}
                y={y2 - dotRadius * (y2 < h / 2 ? -3 : 1.5)}
                fill={labelDef.color}
                {...styles.valueLabelHighlight}
              >
                {formatter(values[1])}
              </text>
            </g>
            <g
              transform={`translate(${inclineWidth + spacing},${0})`}
            >
              <line
                strokeWidth={lineWidth}
                stroke={labelDef.color}
                x1={0}
                x2={inclineWidth}
                y1={y3}
                y2={y4}
              />
              <circle
                stroke={'#fff'}
                strokeWidth={2}
                fill={labelDef.color}
                r={dotRadius}
                cx={0}
                cy={y3}
              />
              <circle
                stroke={'#fff'}
                strokeWidth={2}
                fill={labelDef.color}
                r={dotRadius}
                cx={inclineWidth}
                cy={y4}
              />
              <text
                x={0}
                y={height - 15}
                {...styles.valueLabelHighlight}
                fill={labelDef.color}
              >
                heute
              </text>
              <text
                x={inclineWidth}
                y={height - 15}
                {...styles.valueLabel}
              >
                2050
              </text>

              <text
                x={0}
                y={y3 - dotRadius * (y3 < h / 2 ? -3 : 1.5)}
                {...styles.valueLabelHighlight}
                fill={labelDef.color}
              >
                {formatter(values[2])}
              </text>
              <text
                x={inclineWidth}
                y={y4 - dotRadius * (y4 < h / 2 ? -3 : 1.5)}
                {...styles.valueLabel}
              >
                {formatter(values[3])}
              </text>
            </g>
          </g>
          <rect
            width={width}
            height={height}
            fill="#fff"
            opacity={highlight ? 0 : OPACITY}
          />
        </svg>
      </div>
    </div>
  )
}

export default Chart
