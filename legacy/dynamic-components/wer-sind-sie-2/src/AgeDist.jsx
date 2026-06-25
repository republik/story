import React from 'react'
import { Loader } from '@project-r/styleguide'
import { Chart } from '@project-r/styleguide/chart'
import ChartFrame from './ChartFrame'

const MAX_AGE = 100
const MIN_AGE = 16

const AgeChart = ({ ageBuckets }) => {
  let values = []

  for (let i = MIN_AGE; i <= MAX_AGE; i++) {
    values.push({
      key: i,
      value: String(ageBuckets.find((b) => b.key === i)?.count || 0),
    })
  }

  return (
    <Chart
      config={{
        type: 'TimeBar',
        x: 'key',
        unit: 'Verlegerinnen',
        xInterval: 'year',
        xTicks: [20, 40, 60, 80, 100],
        timeFormat: '%-Y',
        padding: 0,
      }}
      values={values}
    />
  )
}

const AgeDist = ({ data, ...props }) => {
  return (
    <ChartFrame {...props}>
      <Loader
        loading={data.loading}
        error={data.error}
        render={() => {
          const ageBuckets = data.membershipStats?.ages?.buckets
          if (!ageBuckets) {
            return null
          }
          return <AgeChart ageBuckets={ageBuckets} />
        }}
      />
    </ChartFrame>
  )
}

export default AgeDist
