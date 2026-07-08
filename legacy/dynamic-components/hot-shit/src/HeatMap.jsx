import React, { useEffect, useState } from 'react'
import {
  ChartTitle,
  ChartLead,
  Chart,
  ChartLegend,
} from '@project-r/styleguide'
import { data } from './data'

export default () => {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (idx < data.length - 1) {
      setTimeout(function () {
        setIdx(idx + 1)
      }, 500)
    }
  }, [idx])

  const currentData = data[idx]

  return (
    <>
      <ChartTitle>Heat Days in {currentData.time}</ChartTitle>
      <ChartLead>Lorem ipsum</ChartLead>
      <Chart
        config={{
          type: 'SwissMap',
          sizeRangeMax: 300,
          points: true,
          colorLegend: false,
          features: {
            url:
              'https://cdn.republik.space/s3/republik-assets/assets/geo/ch-cantons-wo-lakes.json',
            object: 'cantons',
          },
          showValue: true,
          color: 'cat',
          colorRange: [
            '#ccc',
            '#fcbba1',
            '#fc9272',
            '#fb6a4a',
            '#ef3b2c',
            '#cb181d',
            '#99000d',
          ],
          heightRatio: 0.63,
          opacity: 1,
          tooltipLabel: '{name}',
          tooltipBody: '{value} Hitze Tage.',
        }}
        values={currentData.stations}
      />
      <ChartLegend>Quelle: meteoschweiz</ChartLegend>
    </>
  )
}
