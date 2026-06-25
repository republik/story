import React from 'react'
import { Chart } from '@project-r/styleguide/chart'
import ChartFrame from './ChartFrame'
import { capitalise } from './utils'

const data2017 = [
  { key: 'zürich', count: 4032 },
  { key: 'bern', count: 971 },
  { key: 'basel', count: 574 },
  { key: 'winterthur', count: 448 },
  { key: 'luzern', count: 337 },
  { key: 'otherCHAddress', count: 5349 },
  { key: 'otherAddress', count: 472 },
]

const CitiesChart = ({ cityBuckets, labels }) => {
  const totalAdresses2017 = data2017.reduce((acc, city) => acc + city.count, 0)
  const data2021 = cityBuckets.map((c) => ({
    count: c.buckets.find((b) => b.key === '2021').count,
    key: c.key,
  }))
  const totalAdresses2021 = data2021.reduce((acc, city) => acc + city.count, 0)

  const percents2017 = data2017.map((d) => ({
    ...d,
    percent: d.count / totalAdresses2017,
  }))
  const percents2021 = data2021.map((d) => ({
    ...d,
    percent: d.count / totalAdresses2021,
  }))

  const values = percents2021
    .map((d) => {
      const match2017 = percents2017.find((b) => b.key === d.key).percent
      return {
        key: labels[d.key] || capitalise(d.key),
        value: d.percent - match2017,
      }
    })
    .filter((d) => Math.abs(d.value) >= 0.001)
    .map((d) => ({ ...d, value: String(d.value) }))

  return (
    <Chart
      config={{
        type: 'Bar',
        numberFormat: '+.1%',
        y: 'key',
        sort: 'descending',
        showBarValues: true,
      }}
      values={values}
    />
  )
}

const CityDist = ({ cityBuckets, labels, ...props }) => {
  return (
    <ChartFrame {...props}>
      <CitiesChart cityBuckets={cityBuckets} labels={labels} />
    </ChartFrame>
  )
}

export default CityDist
