import React, { useState, useEffect, useMemo } from 'react'
import { css, merge } from 'glamor'
import {
  fontStyles,
  colors,
  mediaQueries,
  useColorContext,
  Editorial,
} from '@project-r/styleguide'
import Checkbox from './Checkbox'
import {
  Chart,
  ChartTitle,
  ChartLead,
  ChartLegend,
} from '@project-r/styleguide/chart'
import { mapData } from './data'

import { csvParse } from 'd3-dsv'

const NOT_SELECTED_COLOR = '#A0A0A0'
const MISSING_DATA_COLOR = '#E8E8E8'

const styles = {
  tabs: css({
    display: 'flex',
    marginTop: 3,
    color: colors.text,
    justifyContent: 'left',
    flexWrap: 'wrap',
  }),
  tabContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    marginRight: '5px',
    cursor: 'pointer',
    [mediaQueries.mUp]: {
      ':first-of-type': {
        paddingLeft: 0,
      },
    },
    [mediaQueries.onlyS]: {
      width: '100%',
      justifyContent: 'flex-start',
      marginBottom: 0,
    },
  }),
  tab: css({
    textAlign: 'left',
    WebkitTapHighlightColor: 'transparent',
    border: 'none',
    background: 'transparent',
    outline: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    ...fontStyles.sansSerifRegular16,

    ':last-child': {
      paddingRight: 0,
    },
    ':first-child': {
      paddingLeft: 0,
    },
  }),
  circle: css({
    display: 'inline-block',
    borderRadius: '50%',
    width: '14px',
    height: '14px',
    marginRight: '4px',
    marginTop: '2px',
  }),
  missingColorLegend: css({
    justifyContent: 'left',
    ...fontStyles.sansSerifRegular14,
    display: 'flex',
  }),
}

const Index = (props) => {
  const [colorScheme] = useColorContext()
  const [activeTab, setActiveTab] = useState([
    'Beinahe genügend',
    'Kompatibel mit Klimaabkommen',
  ])

  const [colorMapping, setColorMapping] = useState()
  const chartData = csvParse(mapData)

  const tabsDict = {
    'Kompatibel mit Klimaabkommen': '#2ca02c',
    'Beinahe genügend': '#17becf',
    Ungenügend: '#ff7f0e',
    'Höchst ungenügend': '#d62728',
    'Kritisch ungenügend': '#9467bd',
  }

  useEffect(() => {
    const colorsObject = {}
    activeTab.forEach((d) => (colorsObject[d] = tabsDict[d]))
    Object.keys(tabsDict).forEach(
      (d) =>
        (colorsObject[d] = activeTab.includes(d)
          ? tabsDict[d]
          : NOT_SELECTED_COLOR)
    )
    setColorMapping(colorsObject)
  }, [activeTab])

  const handleTabClick = (item) =>
    activeTab.includes(item)
      ? setActiveTab(activeTab.filter((d) => d !== item))
      : setActiveTab((currentArray) => [...currentArray, item])

  const buttonStyleRules = useMemo(
    () =>
      css({
        backgroundColor: 'transparent',
        color: colorScheme.getCSSColor('text'),
      }),

    [colorScheme]
  )

  const buttonStyles = merge(styles.tabContainer, buttonStyleRules)

  return (
    <>
      <ChartTitle>{props.title}</ChartTitle>
      <ChartLead>{props.lead}</ChartLead>
      <div>
        <div {...styles.tabs}>
          {Object.keys(tabsDict).map((d) => (
            <div
              key={d}
              {...buttonStyles}
              onClick={(e) => {
                e.preventDefault()
                handleTabClick(d)
              }}
            >
              <div style={{ marginTop: '4px' }}>
                <Checkbox
                  fill={activeTab.includes(d) && tabsDict[d]}
                  checked={activeTab.includes(d)}
                />
              </div>
              <button {...styles.tab} {...colorScheme.set('color', 'text')}>
                {d}
              </button>
            </div>
          ))}
        </div>
        <Chart
          config={{
            type: 'GenericMap',
            colorLegend: false,
            heightRatio: 0.469,
            choropleth: true,
            color: 'category',
            colorMap: colorMapping,
            features: {
              url:
                'https://cdn.repub.ch/s3/republik-assets/dynamic-components/climate-action-tracker-map/assets/static/geo/world-atlas-110m-without-antarctic.json',
              object: 'countries',
            },
            label: 'label',
            missingDataLegend: 'Nicht untersucht',
            missingDataColor: MISSING_DATA_COLOR,
          }}
          values={chartData.map((d) => {
            return {
              feature: d.feature,
              category: d.category,
            }
          })}
        />
      </div>
      <ChartLegend>
        Quelle:{' '}
        <Editorial.A href='https://climateactiontracker.org/'>Climate Action Tracker</Editorial.A>,
        September 2021. Diese Länder{' '}
        <span
          {...styles.circle}
          {...colorScheme.set('backgroundColor', MISSING_DATA_COLOR)}
          style={{ marginTop: '3px' }}
        />{' '}
        wurden nicht untersucht. {props.footnote}
      </ChartLegend>
    </>
  )
}

export default Index
