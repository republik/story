import React from 'react'
import {
  Label, mediaQueries,
  Interaction, Editorial, Slider
} from '@project-r/styleguide'
import { timeDay } from 'd3-time'

import { Chart, ChartTitle, ChartLead } from '@project-r/styleguide/chart'

import { ranges, steps, formats, defaultValues, chartConfig } from './constants'

import getSeries, { combineSeries, getValues } from './getSeries'
import { ymd, dateMonthFormat } from './utils'

const Plot = ({ title, lead, footnotes, parameter, label, config, overloadLabel, limitLabel, offsetLabel }) => {
  const [value, setValue] = React.useState(defaultValues[parameter])
  const range = ranges[parameter]

  const extentSeries = React.useMemo(() => {
    if (!range) {
      return
    }
    return {
      lower: getSeries({
        ...defaultValues,
        [parameter]: range[0]
      }),
      upper: getSeries({
        ...defaultValues,
        [parameter]: range[1]
      })
    }
  }, [defaultValues, range, parameter])
  const series = React.useMemo(() => {
    return combineSeries({
      ...extentSeries,
      value: getSeries({
        ...defaultValues,
        [parameter]: value
      })
    })
  }, [defaultValues, extentSeries, parameter, value])

  if (!range) {
    return <>Unbekannter Parameter</>
  }

  const lastSickDatum = series.sickDataBag[series.sickDataBag.length - 1]

  return <>
    <ChartTitle>{title}</ChartTitle>
    <ChartLead>{lead}</ChartLead>

    <Interaction.P style={{ marginTop: -5 }}>
      <Label style={{ display: 'block', lineHeight: '20px' }}>{label.replace('{formattedValue}', formats[parameter](value))}</Label>
      <Label>{formats[parameter](range[0])}</Label>
      {' '}
      <Slider min={range[0]} max={range[1]} value={value} step={steps[parameter]} onChange={(_, newValue) => setValue(newValue)} />
      {' '}
      <Label>{formats[parameter](range[1])}</Label>
    </Interaction.P>

    <Chart
      config={{
        ...chartConfig,
        ...config,
        xAnnotations: [
          series.projectedIcuOverload
          ? overloadLabel && {
              x1: '2020-03-27',
              x2: '2020-04-12',
              value: defaultValues.icuBeds,
              label: overloadLabel.replace('{date}', dateMonthFormat(
                series.projectedIcuOverload.date
              ))
            }
          : limitLabel && {
              x1: '2020-03-27',
              x2: '2020-04-12',
              value: defaultValues.icuBeds,
              label: limitLabel
            },
          parameter === 'infectedOffset' && offsetLabel && {
            x1: ymd.format(timeDay.offset(lastSickDatum.date, -value)),
            x2: ymd.format(lastSickDatum.date),
            value: lastSickDatum.value,
            label: offsetLabel.replace('{formattedValue}', formats[parameter](value))
          }
        ].concat(config.xAnnotations).filter(Boolean)
      }}
      values={getValues({
        ...series,
        filterZero: true
      })} />

    <Editorial.Note style={{ marginTop: 10 }}>{footnotes.map((footnote, i) => {
      if (!footnote.href) {
        return footnote.text
      }
      return <Editorial.A key={i} href={footnote.href}>{footnote.text}</Editorial.A>
    })}</Editorial.Note>
  </>
}

export default Plot
