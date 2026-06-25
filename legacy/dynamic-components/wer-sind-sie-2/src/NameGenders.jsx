import React from 'react'
import { Loader } from '@project-r/styleguide'
import { Chart } from '@project-r/styleguide/chart'
import ChartFrame from './ChartFrame'
import { countFormat } from './utils'

const GenderChart = ({ nameBuckets, count, labels }) => {
  const values = nameBuckets
    .reduce((accumulator, currentValue) => {
      const currentSex = currentValue.sex || 'BOTH'
      const sex = accumulator.find((d) => d.sex === currentSex)
      const currentCount =
        count === 'abos' ? currentValue.count : currentValue.sex ? 1 : 0
      if (sex) {
        sex.count += currentCount
      } else {
        accumulator.push({ count: currentCount, sex: currentSex })
      }
      return accumulator
    }, [])
    .map((d) => ({ ...d, sex: labels[d.sex], value: countFormat(d.count) }))
  return (
    <Chart
      config={{
        type: 'Bar',
        color: 'sex',
        colorRange: ['#9467bd', '#2ca02c', 'neutral'],
        y: 'sex',
        inlineValue: true,
        sort: 'descending',
      }}
      values={values}
    />
  )
}

const NameGenders = ({ data, labels, count, ...props }) => {
  return (
    <ChartFrame {...props}>
      <Loader
        loading={data.loading}
        error={data.error}
        render={() => {
          const nameBuckets = data.membershipStats?.names?.buckets
          if (!nameBuckets) {
            return null
          }
          return (
            <GenderChart
              nameBuckets={nameBuckets}
              count={count}
              labels={labels}
            />
          )
        }}
      />
    </ChartFrame>
  )
}

export default NameGenders
