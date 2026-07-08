import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import sortBy from 'lodash/sortBy'
import random from 'lodash/random'
import last from 'lodash/last'
import memoize from 'lodash/memoize'

import { css } from 'glamor'
import { fontFamilies, fontStyles, mediaQueries, colors } from '@project-r/styleguide'
import { COLORS, margins, SMALL_WIDTH } from './constants'

export const DOT_RADIUS = {
  small: 5,
  large: 7
}

const styles = {
  tooltipBold: css({
    fontFamily: fontFamilies.sansSerifMedium,
    fontSize: 14,
    fill: colors.text,
  }),
  tooltip: css({
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: 14,
    fill: colors.text,
  }),
  legend: css({
    ...fontStyles.sansSerifRegular14,
    fill: '#fff',
  }),
}

class DotPlot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hover: undefined,
      animate: navigator ? !navigator.userAgent.match(/Trident/) : false,
    }
    this.animationRefs = []
  }

  componentDidMount() {
    if (this.state.animate) {
      this.animationRefs.filter(Boolean).forEach(r => r.beginElement && r.beginElement())
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.profile.name !== this.props.profile.name) {
      this.setState({hover: undefined})
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.animate && prevProps.profile.name !== this.props.profile.name) {
      this.animationRefs.filter(Boolean).forEach(r => {
        try {
          r.beginElement && r.beginElement()
        } catch (e) {
          console.log('DotPlot.js:108 [e]', e)
        }
      })
      this.animationRefs = []
    }
  }

  render() {

    const {profile: {data, name}, width, height} = this.props

    if (data.length < 1)
      return null

    const isSmall = width < SMALL_WIDTH
    const dotRadius = isSmall ? DOT_RADIUS.small : DOT_RADIUS.large
    const fontSize = isSmall ? 9 : 11

    const h = height - margins.top - margins.bottom
    const w = width - margins.left - margins.right - 40

    const maxAlt = Math.max(...data.map(d => +d['MAX_Z']))
    const minAlt = Math.min(...data.map(d => +d['MIN_Z']))

    const yScale = scaleLinear().domain([minAlt, this.props.max || maxAlt]).rangeRound([h, isSmall ? 60 : 35])

    const xStep = Math.round(w / (data.length + 1))
    const sortedData = sortBy(data, d => +d['MAX_Z'])

    const hoverData = this.state.hover || last(sortedData)
    const hoverIdx = sortedData.findIndex(d => d.UUID === hoverData.UUID)
    const hoverX = hoverIdx * xStep
    const hoverY = yScale(+hoverData.MAX_Z)
    const hoverPadding = xStep > dotRadius * 3 ? dotRadius : 0

    const animationDuration = this.props.letItSnow ? 1.2 : 0.9
    const keyTimes = '0; 0.7; 1'
    const profileId = name.split(' ')[0]


    return (
      <>
        <defs>
          <clipPath id={`dots-${profileId}`}>
            <rect width={w + 20} height={h} x={margins.left} y={margins.top + 10}/>
          </clipPath>
        </defs>
        <g transform={`translate(${margins.left + 15}, ${margins.top})`}>
          <g clipPath={`url(#dots-${profileId})`}>
            {
              !this.props.letItSnow && (
                <rect
                  key={`hover-${hoverX}`}
                  x={hoverX + xStep / 2 - dotRadius - hoverPadding}
                  y={hoverY - dotRadius - hoverPadding}
                  rx={dotRadius + hoverPadding}
                  ry={dotRadius + hoverPadding}
                  width={2 * (dotRadius + hoverPadding)}
                  height={2 * h}
                  fill='#fff'
                  opacity={0.20}
                >
                  {
                    this.state.animate &&
                    <>
                      <animate
                        ref={ref => this.animationRefs.push(ref)}
                        attributeName='opacity'
                        from={0}
                        to={0.2}
                        dur={animationDuration} values='0; 0; 0.2'
                        keyTimes={keyTimes}
                        fill='freeze'/>
                    </>

                  }

                </rect>
              )
            }
            {
              sortedData.map((d, i) => {
                const cx = (i + 0.5) * xStep
                const y1 = yScale(+d.MIN_Z)
                const y2 = yScale(+d.MAX_Z)
                return (
                  <g key={`${d.NAME}${i}`}>
                    <line x1={cx} y1={this.state.animate ? y2 : y1} x2={cx} y2={y2} strokeWidth={1} stroke={COLORS.line}>
                      {
                        this.state.animate &&
                          <>
                            <animate ref={ref => this.animationRefs.push(ref)} attributeName='opacity'
                                     dur={animationDuration} values='0; 0; 1' keyTimes={keyTimes} fill='freeze'/>
                            <animate ref={ref => this.animationRefs.push(ref)} attributeName='y1'
                                     values={`${y2}; ${y2}; ${y1 + 5}; ${y1}`} keyTimes='0; 0.7; 0.8; 1'
                                     dur={animationDuration} fill='freeze'/>
                          </>

                      }
                    </line>

                    <circle cx={cx} cy={y1} opacity={this.state.animate ? 0 : 1} r={dotRadius}
                            fill={COLORS[d[`${this.props.scenario} bottom`]] || COLORS.missing} stroke={COLORS.border}>
                      {
                        this.state.animate &&
                        <>
                          <animate ref={ref => this.animationRefs.push(ref)} attributeName='opacity'
                                   dur={animationDuration} values='0; 0; 1' keyTimes={keyTimes} fill='freeze'/>
                          <animate ref={ref => this.animationRefs.push(ref)} attributeName='cy' dur={animationDuration}
                                   values={`${y2}; ${y2}; ${y1 + 5}; ${y1}`} keyTimes='0; 0.7; 0.8; 1' fill='freeze'
                                   keySplines='0 0 0 0; 0 0 0 0; 0 0 .59 1;'/>
                        </>

                      }
                    </circle>

                    <circle cx={cx} cy={this.state.animate ? margins.top - 50 : y2} opacity={this.state.animate ? 0 : 1} r={dotRadius}
                            fill={COLORS[d[`${this.props.scenario} top`]] || COLORS.missing} stroke={COLORS.border}>
                      {
                        this.state.animate &&
                        <>
                          <animate ref={ref => this.animationRefs.push(ref)} attributeName='opacity' dur={animationDuration}
                                   values='0; 1; 1' keyTimes='0; 0.5; 1' fill='freeze'/>
                          <animate ref={ref => this.animationRefs.push(ref)} attributeName='cy' dur={animationDuration}
                                   values={`${margins.top - 50}; ${y2}; ${y2}`} keyTimes={keyTimes} fill='freeze'
                                   keySplines='.42 0 1 1; 0 0 .59 1; 0 0 0 0;'/>

                        </>

                      }
                    </circle>

                    <rect x={cx - xStep / 2} y={20} width={xStep} height={h}
                          opacity={0}
                          onClick={() => this.setState({hover: d})}
                          onMouseEnter={() => this.setState({hover: d})}
                          style={{WebkitTapHighlightColor: 'transparent'}}
                    />
                  </g>
                )
              })
            }
          </g>
          {
            !this.props.letItSnow && (
              <>
                <g>
                  <g transform={`translate(${hoverX + xStep / 2}, ${h + 2 * dotRadius})`}>
                    <rect fill={'#fff'} x={-2 * w} width={4 * w} height={30}/>
                    <text {...styles.tooltipBold}
                          x={hoverX < w / 2 ? -(dotRadius + hoverPadding) : dotRadius + hoverPadding}
                          textAnchor={hoverX < w / 2 ? 'start' : 'end'} y={16}>{hoverData.NAME}</text>
                    <text {...styles.tooltip}
                          x={hoverX < w / 2 ? -(dotRadius + hoverPadding) : dotRadius + hoverPadding}
                          textAnchor={hoverX < w / 2 ? 'start' : 'end'}
                          y={32}>{`${hoverData.MIN_Z}\u00A0m bis ${hoverData.MAX_Z}\u00A0m`}</text>
                  </g>
                </g>
                <g transform={`translate(${margins.left},${margins.top + 30})`}>
                  <g>
                    <text {...styles.legend} x={75 - dotRadius} y={fontSize} textAnchor={'end'}>Bergstation</text>
                    <text {...styles.legend} x={75 - dotRadius} y={fontSize + 5 * dotRadius}
                          textAnchor={'end'}>Talstation
                    </text>


                    <line x1={85} x2={85} y1={dotRadius} y2={6 * dotRadius} stroke={COLORS.line}/>

                    <circle cx={85} cy={dotRadius} r={dotRadius} fill={COLORS.green}/>
                    <circle cx={110} cy={dotRadius} r={dotRadius} fill={COLORS.yellow}/>
                    <circle cx={135} cy={dotRadius} r={dotRadius} fill={COLORS.red}/>

                    <circle cx={85} cy={6 * dotRadius} fill={COLORS.green} r={dotRadius}/>


                    <text {...styles.legend}
                          transform={`translate(90,${isSmall ? 13 : 17}) rotate(45)`}>{isSmall ? `sicher` : `schneesicher`}</text>
                    <text {...styles.legend} transform={`translate(115,${isSmall ? 13 : 17}) rotate(45)`}>gefährdet
                    </text>
                    <text {...styles.legend} transform={`translate(140,${isSmall ? 13 : 17}) rotate(45)`}>kritisch
                    </text>

                  </g>
                </g>
              </>
            )
          }
        </g>

      </>
    )
  }
}

export default DotPlot