import React, { useState } from 'react'
import { css } from 'glamor'
import {
  mediaQueries,
  fontStyles,
  Dropdown,
  ChartTitle,
  ChartLead,
  ChartLegend,
} from '@project-r/styleguide'
import { data, customData } from './data'
import { TimeTableNumbers, TimeTableTrees } from './TimeTables'

const YELLOW = '#fff816'

const ASSETS_BASE_URL =
  'https://cdn.republik.ch/s3/republik-assets/dynamic-components/train-flight-comparison/assets/static/'

const styles = {
  wrapper: css({
    clear: 'left',
    padding: '10px',
    backgroundColor: 'black',
    [mediaQueries.onlyS]: {
      marginTop: '10px',
    },
  }),
  dropDownContainer: css({
    marginBottom: '30px',
  }),
  titleWrapper: css({
    backgroundColor: 'black',
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    padding: '10px',
    paddingBottom: '20px',
    [mediaQueries.onlyS]: {
      paddingBottom: '10px',
    },
  }),
  titleColumn: css({
    display: 'flex',
    flexWrap: 'wrap',
    flexBasis: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    [mediaQueries.onlyS]: {
      justifyContent: 'flex-start',
    },
  }),
  row: css({
    backgroundColor: 'black',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    [mediaQueries.onlyS]: {
      justifyContent: 'flex-start',
    },
  }),
  column: css({
    flexBasis: '33%',
  }),
  timeTable: css({
    display: 'flex',
    flexWrap: 'wrap',
  }),
  number: css({
    zIndex: '2',
    alignSelf: 'center',
  }),
  blockTitle: css({
    ...fontStyles.sansSerifRegular12,
    color: '#a3a3a3',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    textAlign: 'center',
    padding: '4px',
    margin: '2px',
    [mediaQueries.onlyS]: {
      padding: '0 0 0 1px',
      margin: '6px 0 0 0',
      textAlign: 'left',
    },
  }),
  customTitle: css({
    flexBasis: '100%',
    [mediaQueries.onlyS]: {
      textAlign: 'left',
    },
  }),
  columnTitle: css({
    ...fontStyles.sansSerifMedium12,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    padding: '0 0 6px 1px',
    textAlign: 'left',
  }),
  mobileOnly: css({
    display: 'block',
    [mediaQueries.mUp]: {
      display: 'none',
    },
  }),
  desktopOnly: css({
    display: 'block',
    [mediaQueries.onlyS]: {
      display: 'none',
    },
  }),
}

const departureStations = [
  {
    value: 'Basel',
    text: 'Basel',
  },
  {
    value: 'Zürich',
    text: 'Zürich',
  },
]

const Index = (props) => {
  const [departureStation, setDepartureStation] = useState('Zürich')
  const [arrivalStation, setArrivalStation] = useState('London')

  const arrivalStations = Object.keys(data[departureStation])
    .sort()
    .map((d) => {
      return {
        value: d,
        text: d,
      }
    })

  const arrivalData = data[departureStation]
  const timeTableData = Object.keys(data[departureStation]).includes(
    arrivalStation
  )
    ? arrivalData[arrivalStation]
    : setArrivalStation('London')

  const fields = ['duration', 'prize', 'changes', 'co2', 'trees']

  const handleDepartureChange = (item) => {
    setDepartureStation(item.value)
  }

  const handleArrivalChange = (item) => {
    setArrivalStation(item.value)
  }

  return (
    <>
      <ChartTitle>{props.title}</ChartTitle>
      <ChartLead>{props.lead}</ChartLead>
      {!props.customData && (
        <div {...styles.dropDownContainer}>
          <Dropdown
            label={props.from}
            items={departureStations}
            value={departureStation}
            onChange={handleDepartureChange}
          />
          <Dropdown
            label={props.to}
            items={arrivalStations}
            value={arrivalStation}
            onChange={handleArrivalChange}
          />
        </div>
      )}

      {props.customData && (
        <div {...styles.titleWrapper}>
          <div {...styles.titleColumn}>
            <div {...styles.blockTitle} {...styles.customTitle}>
              {props.from}
            </div>
            <TimeTableNumbers
              string={props.departure.toUpperCase()}
              padding={10}
            />
          </div>
          <div {...styles.titleColumn}>
            <div {...styles.blockTitle} {...styles.customTitle}>
              {props.to}
            </div>
            <TimeTableNumbers
              string={props.arrival.toUpperCase()}
              padding={10}
            />
          </div>
        </div>
      )}
      <div {...styles.wrapper}>
        <div {...styles.desktopOnly}>
          <DesktopTimeTable
            timeTableData={
              props.customData ? customData[props.arrival] : timeTableData
            }
            translations={props}
            fields={fields}
          />
        </div>

        <div {...styles.mobileOnly}>
          <MobileTimeTable
            timeTableData={
              props.customData ? customData[props.arrival] : timeTableData
            }
            translations={props}
            fields={fields}
          />
        </div>
      </div>
      <ChartLegend>{props.source}</ChartLegend>
    </>
  )
}

export default Index

const DesktopTimeTable = (props) => {
  const { timeTableData, translations, fields } = props
  return (
    <>
      <div {...styles.row}>
        <div
          {...styles.columnTitle}
          style={{ flexBasis: '50%', textAlign: 'left' }}
        >
          {translations.column_title_1}
        </div>
        <div
          {...styles.columnTitle}
          style={{ flexBasis: '50%', textAlign: 'right' }}
        >
          {translations.column_title_2}
        </div>
      </div>
      {fields.map((d) => (
        <div {...styles.row} key={d}>
          <div
            {...styles.column}
            style={{ flexBasis: d === 'trees' && '192px' }}
          >
            <div {...styles.timeTable}>
              {d === 'trees' ? (
                <TimeTableTrees
                  treeAmount={parseInt(timeTableData['co2_train'])}
                  maxTreeAmount={Math.max(
                    parseInt(timeTableData['co2_train']),
                    parseInt(timeTableData['co2_plane'])
                  )}
                />
              ) : (
                <TimeTableNumbers
                  string={timeTableData[`${d}_train`]}
                  align='left'
                  color={timeTableData[`${d}_winner`] === 'train' && YELLOW}
                />
              )}
            </div>
          </div>
          <div {...styles.column}>
            <div
              {...styles.blockTitle}
              dangerouslySetInnerHTML={{ __html: translations[`${d}_title`] }}
            />
          </div>

          <div
            {...styles.column}
            style={{ flexBasis: d === 'trees' && '192px' }}
          >
            <div {...styles.timeTable} style={{ justifyContent: 'flex-end' }}>
              {d === 'trees' ? (
                <TimeTableTrees
                  treeAmount={parseInt(timeTableData['co2_plane'])}
                  maxTreeAmount={Math.max(
                    parseInt(timeTableData['co2_train']),
                    parseInt(timeTableData['co2_plane'])
                  )}
                  align='right'
                />
              ) : (
                <TimeTableNumbers
                  string={timeTableData[`${d}_plane`]}
                  align='right'
                  color={timeTableData[`${d}_winner`] === 'plane' && YELLOW}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

const MobileTimeTable = (props) => {
  const { timeTableData, translations, fields } = props
  return (
    <>
      <div {...styles.row}>
        <div {...styles.columnTitle}>{translations.column_title_1}</div>
      </div>
      {fields.map((d) => (
        <div key={d}>
          <div {...styles.row}>
            <div
              {...styles.blockTitle}
              dangerouslySetInnerHTML={{ __html: translations[`${d}_title`] }}
            />
          </div>
          <div {...styles.row}>
            <div
              {...styles.timeTable}
              style={{ flexBasis: d === 'trees' && '192px' }}
            >
              {d === 'trees' ? (
                <TimeTableTrees
                  treeAmount={parseInt(timeTableData['co2_train'])}
                  maxTreeAmount={Math.max(
                    parseInt(timeTableData['co2_train']),
                    parseInt(timeTableData['co2_plane'])
                  )}
                />
              ) : (
                <TimeTableNumbers
                  string={timeTableData[`${d}_train`]}
                  color={timeTableData[`${d}_winner`] === 'train' && YELLOW}
                />
              )}
            </div>
          </div>
        </div>
      ))}
      <div {...styles.row} style={{ marginTop: '20px' }}>
        <div {...styles.columnTitle}>{translations.column_title_2}</div>
      </div>
      {fields.map((d) => (
        <div key={d}>
          <div {...styles.row}>
            <div
              {...styles.blockTitle}
              dangerouslySetInnerHTML={{ __html: translations[`${d}_title`] }}
            />
          </div>
          <div {...styles.row} key={d}>
            <div
              {...styles.timeTable}
              style={{ flexBasis: d === 'trees' && '192px' }}
            >
              {d === 'trees' ? (
                <TimeTableTrees
                  treeAmount={parseInt(timeTableData['co2_plane'])}
                  maxTreeAmount={Math.max(
                    parseInt(timeTableData['co2_train']),
                    parseInt(timeTableData['co2_plane'])
                  )}
                />
              ) : (
                <TimeTableNumbers
                  string={timeTableData[`${d}_plane`]}
                  color={timeTableData[`${d}_winner`] === 'plane' && YELLOW}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
