import React from 'react'
import { Loader } from '@project-r/styleguide'
import { Chart } from '@project-r/styleguide/chart'
import ChartFrame from './ChartFrame'

export const groupByBday = (buckets, labels) =>
  buckets.reduce(
    (accumulator, currentValue) => {
      const categoryIndex = currentValue.key ? 0 : 1
      accumulator[categoryIndex].value =
        accumulator[categoryIndex].value + currentValue.count
      return accumulator
    },
    [
      {
        value: 0,
        category: labels?.bday || 'bday',
      },
      {
        value: 0,
        category: labels?.noBday || 'noBday',
      },
    ]
  )

const AgeChart = ({ ageBuckets, labels }) => {
  const values = groupByBday(ageBuckets, labels).map((d) => ({
    ...d,
    value: String(d.value),
  }))

  return (
    <Chart
      config={{
        type: 'Bar',
        color: 'category',
        colorRange: ['neutral', 'sequential100'],
        y: 'category',
        inlineValue: true,
        sort: 'descending',
      }}
      values={values}
    />
  )
}

const AgeVal = ({ data, labels, ...props }) => {
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
          return <AgeChart ageBuckets={ageBuckets} labels={labels} />
        }}
      />
    </ChartFrame>
  )
}

export default AgeVal
