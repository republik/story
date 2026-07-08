import React, { Fragment } from 'react'
import { css } from 'glamor'
import {
  fontStyles,
  colors
} from '@project-r/styleguide'
import { scaleLinear } from 'd3-scale'

const COLOR = '#96716D' // '#b9746c'
const TEXT_COLOR = '#55403F'
const TEXT_COLOR_LIGHT = '#746361'

const styles = {
  label: css({
    fill: TEXT_COLOR,
    ...fontStyles.serifBold,
    fontSize: 14,
  }),
  annotation: css({
    textAnchor: 'middle',
    fill: TEXT_COLOR,
    ...fontStyles.serifItalic,
    fontSize: 18
  }),
  axis: css({
    textAnchor: 'middle',
    fill: TEXT_COLOR_LIGHT,
    ...fontStyles.serifRegular,
    fontSize: 12
  }),
  opacity: css({
    transition: 'opacity 400ms'
  })
}

const Fade = ({ opacity, visible, children }) => (
  <g
    {...styles.opacity}
    style={{
      opacity: opacity === undefined
        ? visible ? 1 : 0
        : opacity
    }}>
    {children}
  </g>
)

const X_PAD = 35

const PregnancyTimeline = ({ active = [], week, uncertainty, range, labels = {}, size, autoSize, label, annotation }) => {
  const domain = [0, 38]
  const weekScale = scaleLinear().domain(domain).range([0, size[0] - X_PAD * 2])

  const cx = weekScale(
    range
      ? range[0] + ((range[1] - range[0]) / 2)
      : week
  )

  return <Fragment>
    <g transform={`translate(${X_PAD} ${autoSize ? 40 : size[1] / 3})`}>
      <text y={-20} x={cx} textAnchor='middle' {...styles.label}>
        {label || (range ? `${labels.week} ${range[0]}-${range[1]}` : `${labels.week} ${week}`)}
      </text>

      <line y1={0} y2={0} x1={0} x2={weekScale(domain[1])} stroke={COLOR} strokeWidth={1} />
      <line y1={-7.5} y2={7.5} x1={0} x2={0} stroke={COLOR} strokeWidth={1} />
      <line y1={-5} y2={5} x1={weekScale(domain[1] / 2)} x2={weekScale(domain[1] / 2)} stroke={COLOR} strokeWidth={1} />
      <line y1={-7.5} y2={7.5} x1={weekScale(domain[1])} x2={weekScale(domain[1])} stroke={COLOR} strokeWidth={1} />

      <text x={0} y={27.5} {...styles.axis}>
        {labels.axisMin}
      </text>
      <text x={weekScale(domain[1])} y={27.5} {...styles.axis}>
        {labels.axisMax}
      </text>

      {uncertainty && <rect
        x={weekScale(uncertainty[0])}
        width={weekScale(uncertainty[1]) - weekScale(uncertainty[0])}
        y={-15}
        height={30}
        fill={COLOR}
        fillOpacity={0.5}
        rx='5' ry='5' />}

      {(range || [week]).map((w, i) => (
        <circle key={i} cx={weekScale(w)} cy={0} fill={COLOR} stroke='#fff' r={6} />
      ))}

      <text y={60} {...styles.annotation}>
        {annotation && annotation.split('\n').map((text, i) => (
          <tspan key={i} x={weekScale(domain[1] / 2)} dy={i ? '1.4em' : undefined}>{text}</tspan>  
        ))}
      </text>
    </g>
  </Fragment>
}

export default PregnancyTimeline

export const AutoSizePregnancyTimeline = ({ height = 160, maxWidth = Infinity, ...props }) => {
  const ref = React.useRef()
  const [size, setSize] = React.useState()
  React.useEffect(() => {
    const measure = () => {
      setSize([Math.min(maxWidth, ref.current.getBoundingClientRect().width), height])
    }
    window.addEventListener('resize', measure)
    measure()
    return () => {
      window.removeEventListener('resize', measure)
    }
  }, [height, maxWidth]) 
  return <div ref={ref} style={{ height }}>
    {size && <svg width={size[0]} height={size[1]}>
      <PregnancyTimeline {...props} size={size} autoSize />
    </svg>}
  </div>
}
