import React from 'react'
import { css } from 'glamor'
import { Interaction, fontStyles, mediaQueries } from '@project-r/styleguide'
import StackedCirleBar from './StackedCircleBar'

import { deathCauseWomen, deathCauseMen } from './data'

import { csvParse } from 'd3-dsv'
import ColorLegend from './ColorLegend'

const colorItems = [
  'Herz-Kreislauf-Erkrankungen',
  'Krebserkrankungen',
  'Demenz',
  'Unfälle',
  'Suizid',
  'Diverse Todesursachen',
]

const styles = {
  container: css({
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
  }),
  left: css({
    width: '50%',
    paddingRight: '10px',
    [mediaQueries.onlyS]: {
      width: '100%',
      paddingRight: 0,
    },
  }),
  right: css({
    width: '50%',
    paddingLeft: '10px',
    [mediaQueries.onlyS]: {
      width: '100%',
      paddingLeft: 0,
    },
  }),
  wrapper: css({
    marginTop: '10px',
  }),
  bar: css({
    marginTop: '3px',
    backgroundColor: 'red',
    height: '20px',
    width: 0,
    display: 'flex',
    alignItems: 'center',
    opacity: 0.7,
  }),
  innerValue: css({
    minWidth: '100px',
    ...fontStyles.sansSerifRegular12,
    paddingLeft: '4px',
  }),
  label: css({
    ...fontStyles.sansSerifRegular12,
  }),
}

const convertCauseName = (cause) => {
  if (cause === 'Diverse Todesursachen') {
    return 'other'
  }
  return cause
}

const womenData = csvParse(deathCauseWomen)
const menData = csvParse(deathCauseMen)

const Plot = (props) => {
  const { width, age } = props
  return (
    <div>
      <ColorLegend items={colorItems} convertCauseName={convertCauseName} />
      <div {...styles.container}>
        <div {...styles.left}>
          <div>
            <Interaction.H3>Frauen</Interaction.H3>
          </div>
          <StackedCirleBar
            convertCauseName={convertCauseName}
            width={width}
            chartData={womenData}
            age={age}
            showYLegend={true}
          />
        </div>
        <div {...styles.right}>
          <div>
            <Interaction.H3>Männer</Interaction.H3>
          </div>

          <StackedCirleBar
            convertCauseName={convertCauseName}
            width={width}
            chartData={menData}
            age={age}
          />
        </div>
      </div>
      <ColorLegend items={['dot_legend']} convertCauseName={convertCauseName} />
    </div>
  )
}

export default Plot
