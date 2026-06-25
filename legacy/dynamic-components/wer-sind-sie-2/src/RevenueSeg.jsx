import React from 'react'
import { Loader } from '@project-r/styleguide'
import { Chart } from '@project-r/styleguide/chart'
import ChartFrame from './ChartFrame'
import { descending } from 'd3-array'

const sorting = {
  membership: 1,
  abo: 2,
  donation: 3,
  give: 4,
  goodie: 5,
}

const RevenueChart = ({ revenueBuckets }) => {
  const values = revenueBuckets
    .reduce(
      (acc, year) =>
        acc.concat(
          year.buckets.map((b) => ({
            key: b.label,
            value: String(b.share),
            year: year.key,
          }))
        ),
      []
    )
    .sort((a, b) => descending(sorting[a.label], sorting[b.label]))
  return (
    <Chart
      config={{
        type: 'TimeBar',
        color: 'key',
        colorRange: [
          'sequential100',
          '#9467bd',
          '#17becf',
          '#ff7f0e',
          '#2ca02c',
        ],
        numberFormat: '.0%',
        domain: [0, 1],
      }}
      values={values}
    />
  )
}

const RevenueSeg = ({ data, ...props }) => {
  return (
    <ChartFrame {...props}>
      <Loader
        loading={data.loading}
        error={data.error}
        render={() => {
          const revenueBuckets = data.revenueStats?.segments?.buckets
          if (!revenueBuckets) {
            return null
          }
          return <RevenueChart revenueBuckets={revenueBuckets} />
        }}
      />
    </ChartFrame>
  )
}

export default RevenueSeg
