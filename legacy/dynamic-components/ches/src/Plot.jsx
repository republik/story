import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { scaleSqrt } from 'd3-scale'
import { nest } from 'd3-collection'
import { csvFormat } from 'd3-dsv'
import { ascending, extent } from 'd3-array'
import { css } from 'glamor'

import { fontStyles, colors, mediaQueries } from '@project-r/styleguide'
import { Chart } from '@project-r/styleguide/chart'
import ScatterPlot from './ScatterPlot'

import data from './data.json'

const PADDING_RIGHT = 7

const styles = {
  years: css({
    display: 'flex',
    width: ['100%', `calc(100% - ${PADDING_RIGHT}px)`],
    marginTop: 3,
    ...fontStyles.sansSerifRegular21,
    color: colors.text,
    justifyContent: 'flex-end',
  }),
  year: css({
    textAlign: 'right',
    marginBottom: 20,
    ...fontStyles.sansSerifRegular21,
    WebkitTapHighlightColor: 'transparent',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    WebkitAppearance: 'none',
    padding: '0px 6px',
    [mediaQueries.mUp]: {
      padding: '0px 10px'
    },
    ':last-child': {
      paddingRight: 0
    },
    ':first-child': {
      paddingLeft: 0
    }
  })
}

const dataByYear = nest().key(d => d.year).object(data)
const colorMap = ({
  'kommunistisch/sozialistisch': "#BF3939",
  sozialdemokratisch: "#F0554D",
  christdemokratisch: "#D6862B",
  'grün/ökologisch': "#84B547",
  agrarisch: "#4B8A3E",
  liberal: "#49A5E7",
  konservativ: "#3872B5",
  rechts: "#A65E42",
  andere: "#B8B8B8"
})
const colorRangeForPartyFamilies = (data, key) => {
  const values = Array.from(new Set(data.map(d => d[key]))).sort(ascending)
  
  return values.map(v => colorMap[v] || colorMap.andere)
}
const absVoteExtent = extent(data, d => d.vote_abs)
const absVoteScale = scaleSqrt().range([0, 30]).domain(absVoteExtent)
const getAbsVoteSizeRange = (data) => {
  const e = extent(data, d => d.vote_abs)
  return e.map(absVoteScale)
}
const years = Object.keys(dataByYear)

class Wrapper extends Component {
  render () {
    const { year, inlines = {}, width, heightRatio = 1, onPhaseState } = this.props

    const colorRange = colorRangeForPartyFamilies(dataByYear[year], 'family')

    return <Fragment>
      <div {...styles.years}>
        {years.map(y => <button key={y} {...styles.year} style={{
          color: y === year
            ? '#000'
            : colors.disabled
        }} onClick={(e) => {
          e.preventDefault()
          onPhaseState({year: y})
        }}>{y}</button>)}
      </div>
      {width && <ScatterPlot
        width={width}
        colorRanges={{
          sequential3: [],
          discrete: []
        }}
        tLabel={l => l}
        {...{
          color: 'family',
          colorRange,
          colorLegendValues: Object.keys(colorMap)
            .filter(key => colorRange.indexOf(colorMap[key]) !== -1),
          numberFormat: '.1f',
          label: 'dynamic_label',
          paddingTop: 20,
          paddingLeft: 15,
          paddingRight: PADDING_RIGHT,
          x: 'lrgen',
          y: 'position',
          heightRatio,
          yNice: 0,
          yLines: [
            { tick: 1, label: 'stark anti-EU' },
            { tick: 4, label: 'neutral' },
            { tick: 7, label: 'stark pro-EU' }
          ],
          xLines: [
            { tick: 0, label: 'extrem links', base: false },
            { tick: 5, label: 'Mitte' },
            { tick: 10, label: 'extrem rechts' }
          ],
          yUnit: 'EU-Position',
          xUnit: 'Ideologie',
          detail: 'detail',
          inlineLabel: 'inline',
          inlineSecondaryLabel: 'inline_country',
          inlineLabelPosition: 'inline_pos',
          size: 'vote_abs',
          sizeRange: getAbsVoteSizeRange(dataByYear[year]),
          opacity: 0.5
        }}
        values={dataByYear[year].map(d => {
          d.key = `${d.country}:${d.abbr}`
          const inline = inlines[`${d.country}:${d.abbr}`]
          if (inline) {
            d.inline = inline.label || d.abbr
            d.inline_country = inline.country ? d.country : undefined
            d.inline_pos = inline.pos
          } else {
            d.inline = undefined
            d.inline_country = undefined
            d.inline_pos = undefined
          }
          d.dynamic_label = (
            d.inline === d.abbr ||
            d.label.indexOf(d.abbr) === 0 ||
            (d.abbr.length > 2 && d.label.indexOf(d.abbr) !== -1)
          )
            ? d.label
            : `${d.abbr}: ${d.label}`
          return d
        })} />}
    </Fragment>
  }
}

export default Wrapper
