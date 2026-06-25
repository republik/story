import React from 'react'
import { Chart, ChartTitle } from '@project-r/styleguide/chart'
import { Editorial } from '@project-r/styleguide'

import data from './chartData.json'

export default (props) => {
  return (
    <div>
      <ChartTitle>Entwicklung der Lebenserwartung bei Geburt</ChartTitle>
      <Chart
        config={{
          "type": "Line",
          "unit": "Jahre",
          "numberFormat": ".1f",
          "zero": false,
          "colorRange": ["#C40046","#F2BF18","#F28502"],
          "category": "datum.gender"
        }}
        values={data.map( d => {
          // value must be a string ¯\_(ツ)_/¯
          d.value = `${d.value}`
          return d
        })}
      />
      <Editorial.Note>
        Quelle: <Editorial.A href='http://www.humanmortality.de/'>Human Mortality Database</Editorial.A>. University of California, Berkeley (USA) und Max-Planck-Institut
      </Editorial.Note>
    </div>
  )
}
