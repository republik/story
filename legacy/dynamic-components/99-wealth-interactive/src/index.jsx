import React, { useState, useEffect } from 'react'
import { formatLocale } from 'd3-format'
import { css } from 'glamor'

import { Slider, Field, Editorial } from '@project-r/styleguide'
import {
  Chart,
  ChartTitle,
  ChartLead,
  ChartLegend,
} from '@project-r/styleguide/chart'

import { useEventListener, createCustomEvent, toNumber } from './lib/utils'

const thousandSeparator = '\u2019'
const swissNumbers = formatLocale({
  decimal: ',',
  thousands: thousandSeparator,
  grouping: [3],
  currency: ['CHF\u00a0', ''],
})

const formatNumber = swissNumbers.format(',d')

const styles = {
  sliderLabels: css({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 0,
    marginBottom: '10px',
    textAlign: 'center',
  }),
  legendLabel: css({
    marginRight: '10px',
    borderBottom: '3px solid',
    paddingBottom: '1px',
  }),
  textMarker: css({
    borderBottom: '3px solid',
    paddingBottom: '1px',
  }),
}

const data = [
  {
    percentile: 0,
    threshold: 0,
  },
  {
    percentile: 1,
    threshold: 0,
  },
  {
    percentile: 2,
    threshold: 0,
  },
  {
    percentile: 3,
    threshold: 0,
  },
  {
    percentile: 4,
    threshold: 0,
  },
  {
    percentile: 5,
    threshold: 0,
  },
  {
    percentile: 6,
    threshold: 0,
  },
  {
    percentile: 7,
    threshold: 0,
  },
  {
    percentile: 8,
    threshold: 0,
  },
  {
    percentile: 9,
    threshold: 0,
  },
  {
    percentile: 10,
    threshold: 0,
  },
  {
    percentile: 11,
    threshold: 0,
  },
  {
    percentile: 12,
    threshold: 0,
  },
  {
    percentile: 13,
    threshold: 0,
  },
  {
    percentile: 14,
    threshold: 0,
  },
  {
    percentile: 15,
    threshold: 0,
  },
  {
    percentile: 16,
    threshold: 0,
  },
  {
    percentile: 17,
    threshold: 0,
  },
  {
    percentile: 18,
    threshold: 0,
  },
  {
    percentile: 19,
    threshold: 0,
  },
  {
    percentile: 20,
    threshold: 0,
  },
  {
    percentile: 21,
    threshold: 0,
  },
  {
    percentile: 22,
    threshold: 0,
  },
  {
    percentile: 23,
    threshold: 0,
  },
  {
    percentile: 24,
    threshold: 110,
  },
  {
    percentile: 25,
    threshold: 381,
  },
  {
    percentile: 26,
    threshold: 732,
  },
  {
    percentile: 27,
    threshold: 1166,
  },
  {
    percentile: 28,
    threshold: 1682,
  },
  {
    percentile: 29,
    threshold: 2280,
  },
  {
    percentile: 30,
    threshold: 2962,
  },
  {
    percentile: 31,
    threshold: 3726,
  },
  {
    percentile: 32,
    threshold: 4575,
  },
  {
    percentile: 33,
    threshold: 5507,
  },
  {
    percentile: 34,
    threshold: 6523,
  },
  {
    percentile: 35,
    threshold: 7624,
  },
  {
    percentile: 36,
    threshold: 8810,
  },
  {
    percentile: 37,
    threshold: 10081,
  },
  {
    percentile: 38,
    threshold: 11438,
  },
  {
    percentile: 39,
    threshold: 12883,
  },
  {
    percentile: 40,
    threshold: 14415,
  },
  {
    percentile: 41,
    threshold: 16038,
  },
  {
    percentile: 42,
    threshold: 17752,
  },
  {
    percentile: 43,
    threshold: 19561,
  },
  {
    percentile: 44,
    threshold: 21469,
  },
  {
    percentile: 45,
    threshold: 23480,
  },
  {
    percentile: 46,
    threshold: 25601,
  },
  {
    percentile: 47,
    threshold: 27838,
  },
  {
    percentile: 48,
    threshold: 30203,
  },
  {
    percentile: 49,
    threshold: 32706,
  },
  {
    percentile: 50,
    threshold: 35364,
  },
  {
    percentile: 51,
    threshold: 38195,
  },
  {
    percentile: 52,
    threshold: 41224,
  },
  {
    percentile: 53,
    threshold: 44479,
  },
  {
    percentile: 54,
    threshold: 47997,
  },
  {
    percentile: 55,
    threshold: 51820,
  },
  {
    percentile: 56,
    threshold: 55965,
  },
  {
    percentile: 57,
    threshold: 60409,
  },
  {
    percentile: 58,
    threshold: 65134,
  },
  {
    percentile: 59,
    threshold: 70126,
  },
  {
    percentile: 60,
    threshold: 75380,
  },
  {
    percentile: 61,
    threshold: 80905,
  },
  {
    percentile: 62,
    threshold: 86730,
  },
  {
    percentile: 63,
    threshold: 92910,
  },
  {
    percentile: 64,
    threshold: 99536,
  },
  {
    percentile: 65,
    threshold: 106723,
  },
  {
    percentile: 66,
    threshold: 114502,
  },
  {
    percentile: 67,
    threshold: 122871,
  },
  {
    percentile: 68,
    threshold: 131828,
  },
  {
    percentile: 69,
    threshold: 141376,
  },
  {
    percentile: 70,
    threshold: 151525,
  },
  {
    percentile: 71,
    threshold: 162295,
  },
  {
    percentile: 72,
    threshold: 173724,
  },
  {
    percentile: 73,
    threshold: 185882,
  },
  {
    percentile: 74,
    threshold: 198879,
  },
  {
    percentile: 75,
    threshold: 212868,
  },
  {
    percentile: 76,
    threshold: 227954,
  },
  {
    percentile: 77,
    threshold: 244226,
  },
  {
    percentile: 78,
    threshold: 261780,
  },
  {
    percentile: 79,
    threshold: 280727,
  },
  {
    percentile: 80,
    threshold: 301195,
  },
  {
    percentile: 81,
    threshold: 323334,
  },
  {
    percentile: 82,
    threshold: 347323,
  },
  {
    percentile: 83,
    threshold: 373385,
  },
  {
    percentile: 84,
    threshold: 401809,
  },
  {
    percentile: 85,
    threshold: 432976,
  },
  {
    percentile: 86,
    threshold: 467424,
  },
  {
    percentile: 87,
    threshold: 505933,
  },
  {
    percentile: 88,
    threshold: 549545,
  },
  {
    percentile: 89,
    threshold: 599360,
  },
  {
    percentile: 90,
    threshold: 656804,
  },
  {
    percentile: 91,
    threshold: 723879,
  },
  {
    percentile: 92,
    threshold: 803550,
  },
  {
    percentile: 93,
    threshold: 900553,
  },
  {
    percentile: 94,
    threshold: 1023200,
  },
  {
    percentile: 95,
    threshold: 1186444,
  },
  {
    percentile: 96,
    threshold: 1416658,
  },
  {
    percentile: 97,
    threshold: 1772646,
  },
  {
    percentile: 98,
    threshold: 2430361,
  },
  {
    percentile: 99,
    threshold: 4150191,
  },
]

const Index = ({
  showLabel,
  showSlider,
  showAllBars,
  allBarsTitle,
  allBarsLead,
  showPoorerBars,
  poorerBarsTitle,
  poorerBarsLead,
  showRicherBars,
  richerBarsTitle,
  richerBarsLead,
  sliderTitle,
  sliderLabel,
  sliderLabelSuffix,
  inputLabel,
  showSliderText,
  sliderTextPrefix,
  sliderTextLabel,
  sliderTextSuffix,
  showWealthText,
  wealthTextPrefix,
  wealthTextLabel,
  wealthTextSuffix,
  wealthTextLabel2,
  chartLegend,
  chartLegendUrl,
  wealthTitle,
  sliderFootnote,
  wealthFootnote,
  wealthLead,
  legendEstimate,
  legendWealth,
}) => {
  const [sliderValue, setSliderValue] = useState(50)
  const [barChartData, setBarChartData] = useState(data)
  const [userWealth, setUserWealth] = useState(0)
  const [userPercentile, setUserPercentile] = useState(47)
  const [estimatedWealth, setEstimatedWealth] = useState(320000)

  useEffect(() => {
    setBarChartData(
      data.map((d) => {
        return {
          percentile: d.percentile.toString(),
          value: d.threshold.toString(),
          color:
            d.percentile === sliderValue
              ? 'estimate'
              : d.percentile === userPercentile
              ? 'reality'
              : 'default',
        }
      })
    )
    setEstimatedWealth(barChartData[sliderValue].value)
  }, [sliderValue, userPercentile])

  useEffect(() => {
    let percentile =
      parseInt(userWealth) < data[99].threshold
        ? data.find((o) => o.threshold >= parseInt(userWealth)).percentile - 1
        : 99
    setUserPercentile(userWealth === 0 ? 0 : percentile)
  }, [userWealth, sliderValue])

  useEventListener('sliderMove', (event) => setSliderValue(event.detail))
  useEventListener('wealthInput', (event) => setUserWealth(event.detail))

  const onChangeSliderValue = (_, value) => {
    setSliderValue(toNumber(value))
    window.dispatchEvent(
      createCustomEvent('sliderMove', { detail: toNumber(value) })
    )
  }

  const onChangeUserWealth = (_, value) => {
    setUserWealth(toNumber(value))
    window.dispatchEvent(
      createCustomEvent('wealthInput', { detail: toNumber(value) })
    )
  }

  const createOnTickUserWealth = (inc) => (_) =>
    onChangeUserWealth(_, userWealth + inc)

  return (
    <div>
      {showSlider && (
        <>
          <ChartTitle>{sliderTitle}</ChartTitle>
          <Slider
            label={sliderLabel + sliderValue + sliderLabelSuffix}
            value={sliderValue}
            min='0'
            max='99'
            fullWidth
            onChange={onChangeSliderValue}
          />
          <Editorial.Note {...styles.sliderLabels}>
            <span>0</span>
            <span>99. Perzentil</span>
          </Editorial.Note>
          <Editorial.Note style={{ marginTop: '6px' }}>
            {sliderFootnote}
          </Editorial.Note>
        </>
      )}
      {showLabel && (
        <>
          <ChartTitle>{wealthTitle}</ChartTitle>
          <ChartLead>{wealthLead}</ChartLead>
          <Field
            label={inputLabel}
            value={userWealth}
            onChange={onChangeUserWealth}
            onInc={createOnTickUserWealth(1000)}
            onDec={createOnTickUserWealth(-1000)}
          />
          <Editorial.Note style={{ marginTop: '6px' }}>
            {wealthFootnote}
          </Editorial.Note>
        </>
      )}

      {showSliderText && (
        <Editorial.P>
          {sliderTextPrefix}
          <span {...styles.textMarker} style={{ borderColor: '#1f77b4' }}>
            {sliderValue}
            {sliderTextLabel}
          </span>
          {sliderTextSuffix}
        </Editorial.P>
      )}

      {showWealthText && (
        <Editorial.P>
          {wealthTextPrefix}
          <strong>
            {formatNumber(userWealth)}
            {wealthTextLabel}
          </strong>
          {wealthTextSuffix}
          <span {...styles.textMarker} style={{ borderColor: '#d62728' }}>
            {userPercentile}
            {wealthTextLabel2}
          </span>
          .
        </Editorial.P>
      )}

      {showAllBars && (
        <div>
          <ChartTitle>{allBarsTitle}</ChartTitle>
          <ChartLead>{allBarsLead}</ChartLead>
          <Editorial.Note style={{ marginTop: 0, marginBottom: '12px' }}>
            <span {...styles.legendLabel} style={{ borderColor: '#1f77b4' }}>
              {legendEstimate}
            </span>
            <span {...styles.legendLabel} style={{ borderColor: '#d62728' }}>
              {legendWealth}
            </span>
          </Editorial.Note>
          <Chart
            config={{
              type: 'TimeBar',
              x: 'percentile',
              padding: 0,
              xTicks: [0, 25, 50, 75, 99],
              yTicks: [],
              xScale: 'linear',
              xBandPadding: 0.5,
              height: 60,
              color: 'color',
              colorLegend: false,
              colorMap: {
                default: '#D5D8D7',
                estimate: '#1f77b4',
                reality: '#d62728',
              },
              unit: 'Franken',
              xUnit: 'Perzentil',
              xAnnotations: [
                {
                  x: sliderValue?.toString(),
                  value: '1000',
                  showValue: false,
                  label: sliderValue,
                  position: 'top',
                  textAlignment: 'right',
                },
                {
                  x: userPercentile?.toString(),
                  value: '1000',
                  showValue: false,
                  label: userPercentile,
                  position: 'top',
                  textAlignment: 'right',
                },
              ],
            }}
            values={barChartData.map((d) => {
              return { ...d, value: '1000' }
            })}
          />
          <ChartLegend>
            Quelle:{' '}
            <Editorial.A href={chartLegendUrl}>{chartLegend}</Editorial.A>
          </ChartLegend>
        </div>
      )}

      {showPoorerBars && (
        <div>
          <ChartTitle>{poorerBarsTitle}</ChartTitle>
          <ChartLead>{poorerBarsLead}</ChartLead>
          <Editorial.Note style={{ marginTop: 0, marginBottom: '12px' }}>
            {sliderValue <= 50 && (
              <span {...styles.legendLabel} style={{ borderColor: '#1f77b4' }}>
                {legendEstimate}
              </span>
            )}
            {userPercentile <= 50 && (
              <span {...styles.legendLabel} style={{ borderColor: '#d62728' }}>
                {legendWealth}
              </span>
            )}
          </Editorial.Note>
          <Chart
            config={{
              type: 'TimeBar',
              x: 'percentile',
              padding: 0,
              xTicks: [0, 25, 50, 75, 99],
              yTicks: [0, 50000],
              xScale: 'linear',
              xBandPadding: 0.5,
              numberFormat: ',.3r',
              height: 121,
              domain: [0, 50000],
              color: 'color',
              colorLegend: false,
              colorMap: {
                default: '#D5D8D7',
                estimate: '#1f77b4',
                reality: '#d62728',
              },
              unit: 'Franken',
              xUnit: 'Perzentil',
              yScaleInvert: true,
              xAnnotations: [
                {
                  x: '50',
                  value: '35364',
                  label: '50 Prozent',
                  showValue: true,
                  unit: 'Franken',
                  position: 'bottom',
                  textAlignment: 'right',
                },
              ],
            }}
            values={barChartData.map((d) => {
              return {
                value: d.percentile <= 50 ? d.value?.toString() : '0',
                percentile: d.percentile?.toString(),
                color: d.color,
              }
            })}
          />
          <ChartLegend>
            Quelle:{' '}
            <Editorial.A href={chartLegendUrl}>{chartLegend}</Editorial.A>
          </ChartLegend>
        </div>
      )}

      {showRicherBars && (
        <div>
          <ChartTitle>{richerBarsTitle}</ChartTitle>
          <ChartLead>{richerBarsLead}</ChartLead>
          <Editorial.Note style={{ marginTop: 0, marginBottom: '12px' }}>
            <span {...styles.legendLabel} style={{ borderColor: '#1f77b4' }}>
              {legendEstimate}
            </span>
            <span {...styles.legendLabel} style={{ borderColor: '#d62728' }}>
              {legendWealth}
            </span>
          </Editorial.Note>
          <Chart
            config={{
              type: 'TimeBar',
              x: 'percentile',
              padding: 0,
              xTicks: [0, 25, 50, 75, 99],
              yTicks: [],
              domain: [0, 4160000],
              numberFormat: ',.3r',
              xScale: 'linear',
              xBandPadding: 0.5,
              height: 10000,
              color: 'color',
              colorLegend: false,
              colorMap: {
                default: '#D5D8D7',
                estimate: '#1f77b4',
                reality: '#d62728',
              },
              unit: 'Franken',
              xUnit: 'Perzentil',
              yScaleInvert: true,
              xAnnotations: [
                {
                  x1: '0',
                  x2: '50',
                  value: '35364',
                  label: '50. Perzentil',
                  showValue: true,
                  unit: 'Franken',
                  position: 'bottom',
                  leftLabel: true,
                },
                {
                  x1: '0',
                  x2: '75',
                  value: '212868',
                  label: '75. Perzentil',
                  showValue: true,
                  unit: 'Franken',
                  position: 'bottom',
                  leftLabel: true,
                },
                {
                  x1: '0',
                  x2: '90',
                  value: '656804',
                  label: 'Reichste 10 Perzentile',
                  showValue: true,
                  unit: 'Franken',
                  position: 'bottom',
                  leftLabel: true,
                },
                {
                  x1: '0',
                  x2: '95',
                  value: '1186444',
                  label: 'Reichste 5 Perzentile',
                  showValue: true,
                  unit: 'Franken',
                  position: 'bottom',
                  leftLabel: true,
                },
                {
                  x1: '0',
                  x2: '96',
                  value: '1416658',
                  label: 'Reichste 4 Perzentile',
                  showValue: true,
                  unit: 'Franken',
                  position: 'bottom',
                  leftLabel: true,
                },
                {
                  x1: '0',
                  x2: '97',
                  value: '1772646',
                  label: 'Reichste 3 Perzentile',
                  showValue: true,
                  unit: 'Franken',
                  position: 'bottom',
                  leftLabel: true,
                },
                {
                  x1: '0',
                  x2: '98',
                  value: '2430361',
                  label: 'Reichste 2 Perzentile',
                  showValue: true,
                  unit: 'Franken',
                  position: 'bottom',
                  leftLabel: true,
                },
                {
                  x1: '0',
                  x2: '99',
                  value: '4150191',
                  label: 'Reichstes Perzentil',
                  showValue: true,
                  unit: 'Franken',
                  position: 'bottom',
                  leftLabel: true,
                },
              ],
            }}
            values={barChartData.map((d) => {
              return {
                value: d.value?.toString(),
                percentile: d.percentile?.toString(),
                color: d.color,
              }
            })}
          />
          <ChartLegend>
            Quelle:{' '}
            <Editorial.A href={chartLegendUrl}>{chartLegend}</Editorial.A>
          </ChartLegend>
        </div>
      )}
    </div>
  )
}

export default Index
