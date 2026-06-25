import React from 'react'
import { Loader } from '@project-r/styleguide'
import { Chart } from '@project-r/styleguide/chart'
import ChartFrame from './ChartFrame'

const NameChart = ({ nameBuckets }) => {
  const values = nameBuckets
    .slice(0, 11)
    .filter((b) => b.key)
    .map((b) => ({
      name: b.key,
      value: String(b.count),
      category: b.key ? '0' : '1',
    }))
  return (
    <Chart
      config={{
        type: 'Bar',
        color: 'category',
        y: 'name',
        inlineValue: true,
        sort: 'descending',
      }}
      values={values}
    />
  )
}

const TopNames = ({ data, ...props }) => {
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
          return <NameChart nameBuckets={nameBuckets} />
        }}
      />
    </ChartFrame>
  )
}

export default TopNames
