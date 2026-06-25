import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { extent } from 'd3-array'
import { css } from 'glamor'

import {
  Loader, Editorial, useColorContext, colors
} from '@project-r/styleguide'

import { Chart, ChartTitle, ChartLead } from '@project-r/styleguide/chart'
import { timeParse, timeFormat, countFormat } from '../../lib/format'

import { numMembersNeeded } from '../Simulator/Y2020'

const formatDateTime = timeFormat('%d.%m.%Y %H:%M')
const formatYM = timeFormat('%Y-%m')

const query = gql`
query MembershipEvolution($max: YearMonthDate!) {
  membershipStats {
    evolution(min: "2018-01", max: $max) {
      updatedAt
      buckets {
        key
        gaining
        activeEndOfMonth
        expired
        cancelled
        pending
        pendingSubscriptionsOnly
      }
    }
  }
}
`

// https://ultradashboard.republik.ch/question/506
const bucketsBefore = [
  { key: '2017-04', presale: 9703 },
  { key: '2017-05', presale: 3866 },
  // { key: '2017-07', presale: 100 },
  // { key: '2017-08', presale: 148 },
  // { key: '2017-09', presale: 152 },
  // { key: '2017-10', presale: 154 },
  // { key: '2017-11', presale: 204 },
  // { key: '2017-12', presale: 624 },
].reduce((summed, d) => {
  const prev = summed[summed.length - 1]
  summed.push({ ...d, preactive: d.presale + (prev ? prev.preactive : 0) })
  return summed
}, [])

const MembershipEvolution = ({ title, lead, footnote, data, t }) => {
  const [colorScheme] = useColorContext()

  const labels = [
    {key: 'preactive', color: '#318D00', label: 'Crowdfunders'},
    {key: 'active', color: '#3CAD00', label: 'bestehende'},
    {key: 'gaining', color: '#256900', label: 'neue'},
    {key: 'pending', color: '#25705A', label: 'offene'},
    {key: 'loss', color: '#AA6039', label: 'Abgänge'},
    {key: 'missing', color: '#9D344B', label: 'fehlende'}
  ]
  const labelMap = labels.reduce((map, d) => {
    map[d.key] = d.label
    return map
  }, {})
  const colorMap = labels.reduce((map, d) => {
    map[d.label] = d.color
    return map
  }, {})
  const { evolution: { buckets, updatedAt } } = data.membershipStats || { evolution: {} }

  return <>
    <Loader loading={data.loading} error={data.error} style={{ minHeight: 300 }} render={() => {
      const minMaxValues = []
      const lastBucket = buckets[buckets.length - 1]
      const values = bucketsBefore
        .map(bucket => ({
          month: bucket.key,
          label: labelMap.preactive,
          value: bucket.preactive
        }))
        .concat(buckets.reduce(
          (flat, bucket, i) => {
            const notNew = i === 0 ? bucketsBefore[bucketsBefore.length - 1].preactive : 0
            const pending = bucket.pending - bucket.pendingSubscriptionsOnly
            minMaxValues.push(bucket.activeEndOfMonth + bucket.pending)
            minMaxValues.push(-bucket.expired + -bucket.cancelled)
            flat.push({
              month: bucket.key,
              label: labelMap.active,
              value: bucket.activeEndOfMonth - bucket.gaining + bucket.pendingSubscriptionsOnly + notNew
            })
            flat.push({
              month: bucket.key,
              label: labelMap.gaining,
              value: bucket.gaining - notNew
            })
            flat.push({
              month: bucket.key,
              label: labelMap.pending,
              value: pending
            })
            flat.push({
              month: bucket.key,
              label: labelMap.loss,
              value: -bucket.expired + -bucket.cancelled
            })
            return flat
          },
          []
        ))
      const activeCount = lastBucket.activeEndOfMonth + lastBucket.pending
      const missingCount = numMembersNeeded - activeCount
      if (missingCount > 0) {
        values.push({
          month: lastBucket.key,
          label: labelMap.missing,
          value: missingCount
        })
      }
      minMaxValues.push(numMembersNeeded)
      const [minValue, maxValue] = extent(minMaxValues).map((d, i) => (
        Math[i ? 'ceil' : 'floor'](Math.round(d / 1000) * 1000)
      ))

      return <>
        <ChartTitle style={{ color: colorScheme.text }}>
          {title
            .replace('{activeCount}', countFormat(activeCount))
            .replace('{missingCount}', countFormat(missingCount))
          }
        </ChartTitle>
        <ChartLead style={{ color: colorScheme.text }}>
          {lead
            .replace('{activeCount}', countFormat(activeCount))
            .replace('{missingCount}', countFormat(missingCount))
          }
        </ChartLead>
        <div {...css(colorScheme.text !== colors.text && {
          '& text': {
            fill: `${colorScheme.text} !important`
          },
          '& line': {
            stroke: 'rgba(255, 255, 255, 0.4) !important'
          },
          '& div': {
            color: `${colorScheme.text} !important`
          }
        })}>
          <Chart
            config={{
              type: 'TimeBar',
              color: 'label',
              colorMap,
              numberFormat: 's',
              x: 'month',
              timeParse: '%Y-%m',
              timeFormat: '%b %y',
              xInterval: 'month',
              xTicks: ['2017-04', '2018-01', '2019-01', '2020-01'],
              domain: [minValue, maxValue],
              yTicks: [
                0,
                10000,
                20000
              ],
              yAnnotations: [{
                value: numMembersNeeded,
                label: t('annotation/stable')
              }],
              xBandPadding: 0
            }}
            values={values.map(d => ({...d, value: String(d.value)}))} />
        </div>
        <Editorial.Note style={{ marginTop: 10 }}>
          {footnote}
          {updatedAt && ` Datenstand: ${formatDateTime(new Date(updatedAt))}`}
        </Editorial.Note>
      </>
    }} />
  </>
}

export default compose(
  graphql(query, {
    options: () => ({
      variables: {
        max: formatYM(new Date())
      }
    })
  })
)(MembershipEvolution)
