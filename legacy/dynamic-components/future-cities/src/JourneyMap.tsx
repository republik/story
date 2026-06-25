import * as React from 'react'
import { css } from 'glamor'
import { scaleLinear } from 'd3-scale'
import { fontFamilies } from '@project-r/styleguide'
import {
  COLORS,
  MAP_IMAGE_HEIGHT,
  MAP_IMAGE_WIDTH,
} from './constants'

export type Props = {
  width: number
  height: number
  center?: number
  progress?: number
  journey: {
    image: any
    width?: number
    height?: number
    origin: string
    originX: number
    originY: number
    dest: string
    destX: number
    destY: number
  }
}

const styles = {
  wrapper: css({
    position: 'relative',
  }),
  label: css({
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: 16,
  }),
  credit: css({
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: 10,
    position: 'absolute',
    bottom: 0,
    left: 12,
    padding: 3,
    color: '#fff',
    '& > a': {
      color: '#fff',
      textDecoration: 'underline',
    },
  }),
}

const MARKER_RADIUS = 10
const MARKER_WIDTH = 5

const JourneyMap: React.FC<Props> = ({
  width,
  height,
  center = 0.5 * width,
  progress = 0,
  journey: { image, origin, originX, originY, dest, destX, destY },
}) => {
  const journeyXScale = React.useMemo(() => {
    const scale = scaleLinear()
      .domain([0, 1])
      .range([originX, destX])
    scale.clamp(true)
    return scale
  }, [originX, destX])

  const journeyYScale = React.useMemo(() => {
    const scale = scaleLinear()
      .domain([0, 1])
      .range([originY, destY])
    scale.clamp(true)
    return scale
  }, [originY, destY])

  const x2 = journeyXScale(progress)
  const y2 = journeyYScale(progress)

  const markerOffset = (destY < originY ? -2.5 : 2.5) * MARKER_RADIUS

  return (
    <div
      {...styles.wrapper}
      style={{ width, height, overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'absolute',
          left: Math.min(
            0,
            -Math.min(originX, destX) -
              Math.abs(destX - originX) * 0.5 +
              center,
          ),
          top: Math.min(
            -700,
            -Math.min(originY, destY) -
              Math.abs(destY - originY) * 0.5 +
              height * 0.5,
          ),
        }}
      >
        <img
          src={image}
          width={MAP_IMAGE_WIDTH}
          height={MAP_IMAGE_HEIGHT}
          style={{ position: 'absolute', top: 0 }}
        />
        <svg
          width={MAP_IMAGE_WIDTH}
          height={MAP_IMAGE_HEIGHT}
          style={{ position: 'absolute', top: 0 }}
        >
          <text
            x={originX}
            y={originY - markerOffset}
            textAnchor="middle"
            fill={COLORS.mapMarker}
            dominantBaseline="middle"
            {...styles.label}
          >
            {origin}
          </text>
          <line
            x1={originX}
            y1={originY}
            x2={x2}
            y2={y2}
            stroke={COLORS.mapMarker}
            strokeWidth={MARKER_WIDTH}
          />
          <circle
            cx={originX}
            cy={originY}
            r={MARKER_RADIUS}
            fill={COLORS.mapMarker}
          />
          <text
            x={destX}
            y={destY + markerOffset}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={COLORS.mapMarker}
            {...styles.label}
          >
            {progress > 0.99 && dest}
          </text>
          <circle
            cx={x2}
            cy={y2}
            r={MARKER_RADIUS}
            fill={COLORS.mapMarker}
          />
        </svg>
      </div>
      <div {...styles.credit}>
        <a href="https://s2maps.eu">{`Sentinel-2 cloudless`}</a>
        {` von `}
        <a href="https://eox.at/">{`EOX IT Services GmbH`}</a>
      </div>
    </div>
  )
}

export default JourneyMap
