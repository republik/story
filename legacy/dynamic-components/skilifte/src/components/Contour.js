import React, { Component } from 'react'
import { range, extent } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import { area } from 'd3-shape'

import {
  colors,
  fontFamilies,
  mediaQueries
} from '@project-r/styleguide'
import { css } from 'glamor'
import { COLORS, margins } from './constants'
import { SMALL_WIDTH } from './constants'

const styles = {
  stationLabel: css({
    fontWeight: 'normal',
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: 14,
    fill: colors.text,
    [mediaQueries.mUp]: {
      fontSize: 12,
    },

  }),
  yScale: css({
    fontWeight: 'normal',
    fontFamily: fontFamilies.sansSerifMedium,
    fontSize: 12,
    textAnchor: 'end',
    fill: '#fff',
  })
}

class Contour extends Component {

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.profile.name !== this.props.profile.name || nextProps.width !== this.props.width
  }

  render() {

    const {inline, width, height} = this.props

    const isSmall = width < SMALL_WIDTH

    const h = height - margins.top - margins.bottom
    const w = width - margins.left - margins.right

    const {stations = [], profile, data = []} = this.props.profile

    const alts = profile.map(p => +p.alts.COMB || +p.alts.DTM25)
    const dists = profile.map(p => +p.dist)

    const [minDist, maxDist] = extent(dists)
    const [minHeight, maxHeight] = extent(alts.concat(data.map(d => d.MAX_Z)))
    const xrange = [0, w]

    const xScale = scaleLinear().domain([minDist, maxDist]).rangeRound(xrange)
    const yScale = scaleLinear().domain([minHeight, this.props.max || maxHeight]).rangeRound([h, isSmall ? 60 : 35])

    const contourArea = area().x(d => xScale(+d.dist)).y0(d => yScale(minHeight)).y1(d => yScale(+d.alts.COMB || +d.alts.DTM25))

    const profileId = this.props.profile.name.split(' ')[0]

    const svgBody =
      <>
        <defs>
          <linearGradient id="grad" x1="100%" y1="100%" x2="0" y2="0">
            <stop offset="0%" style={{stopColor: COLORS.bg, stopOpacity: 0}}/>
            <stop offset="50%" style={{stopColor: COLORS.bg, stopOpacity: 0.7}}/>
            <stop offset="100%" style={{stopColor: COLORS.bg, stopOpacity: 1}}/>
          </linearGradient>
          <pattern id="stripe" patternUnits="userSpaceOnUse" width="4" height="4">
            <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke={'#fff'} strokeWidth={1}/>
          </pattern>
          <mask id="mask">
            <rect height="100%" width="100%" style={{fill: 'url(#stripe)'}}/>
          </mask>
          <clipPath id={`contour-${profileId}`}>
            <path d={contourArea(profile)}/>
          </clipPath>
        </defs>
        <g transform={`translate(${margins.left}, ${margins.top + 20})`}>
          <rect height={h - 20} width={w} fill='url(#grad)'/>
        </g>
        <g transform={`translate(${margins.left}, ${margins.top})`}>
          <rect width={w} height={h} clipPath={`url(#contour-${profileId})`} fill={COLORS.contour}/>
          <rect y={h - 2} height={15} width={w} fill={COLORS.contour}/>
        </g>
        {
          !this.props.letItSnow &&
          <>
            <g transform={`translate(${margins.left}, ${margins.top})`}>
              {
                range(0, maxHeight, 250).map(v => (yScale(v) < h - 5) &&
                  <g key={v}>
                    {(maxHeight - minHeight < 1000 || v % 500 === 0) &&
                    <g>
                      <text {...styles.yScale} x={w - 3} y={yScale(v) + 5}>{v}</text>
                    </g>
                    }
                    <line
                      x1={0}
                      x2={maxHeight - minHeight < 1000 || v % 500 === 0 ? w - 40 : w}
                      y1={yScale(v)}
                      y2={yScale(v)}
                      stroke={'#CDE4EB'}
                      clipPath={`url(#contour-${profileId})`}/>
                  </g>
                )
              }
            </g>
            {
              stations.map((s, i) => {
                  if (i === 0 || i === stations.length - 1 || !isSmall) {
                    return (
                      <g key={s.name} transform={`translate(${margins.left + xScale(s.dist)}, 0)`}>
                        <text {...styles.stationLabel} y={10} textAnchor={i === 0 ? 'start' : 'end'}>{s.name}</text>
                        <text {...styles.stationLabel} y={24}
                              textAnchor={i === 0 ? 'start' : 'end'}>{`${Math.round(+s.Z || +s.alts.COMB || +s.alts.DTM25)}\u00A0m`}</text>
                      </g>
                    )
                  } else {
                    return null
                  }
                }
              )
            }
          </>

        }
      </>

    return inline ? svgBody : <svg width={width} height={height}>{svgBody}</svg>

  }
}

Contour.defaultProps = {
  width: 800,
  height: 400,
}

export default Contour