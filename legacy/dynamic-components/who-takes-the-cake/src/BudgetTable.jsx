import React from 'react'
import { css, merge } from 'glamor'
import { fontFamilies, useColorContext } from '@project-r/styleguide'
import { formatLocale } from 'd3-format'

const thousandSeparator = '\u2019'
export const swissNumbers = formatLocale({
  decimal: ',',
  thousands: thousandSeparator,
  grouping: [3],
  currency: ['CHF\u00a0', ''],
  minus: '\u2212',
  percent: '\u2009%',
})

const count4Format = swissNumbers.format('.0f')
const count5Format = swissNumbers.format(',.0f')
export const countFormat = (value) => {
  if (String(Math.round(value)).length > 4) {
    return count5Format(value)
  }
  return count4Format(value)
}

const percentFormat = swissNumbers.format('.1%')
const percentFormatTotal = swissNumbers.format('.0%')

const td = css({
  textAlign: 'left',
  verticalAlign: 'top',
  paddingTop: 2,
  paddingBottom: 2,
})

const num = merge(td, {
  textAlign: 'right',
  fontFeatureSettings: '"tnum" 1, "kern" 1',
})

const groupTd = css({
  paddingTop: 5,
  borderTopWidth: 1,
  borderTopStyle: 'solid',
  verticalAlign: 'bottom',
  'tr:first-child > &': {
    paddingTop: 50,
  },
  'tr:last-child > &': {
    marginTop: 10,
  },
})

const styles = {
  table: css({
    fontFamily: fontFamilies.sansSerifRegular,
    borderSpacing: '0 2px',
    minWidth: '100%',
    marginTop: 15,
    fontSize: 14,
    '@media (max-width: 600px)': {},
    '& th': {
      fontFamily: fontFamilies.sansSerifMedium,
      fontWeight: 'normal',
    },
  }),
  td,
  num,
  groupTd: merge(td, groupTd),
  groupTdNum: merge(num, groupTd),
  highlight: css({
    fontFamily: fontFamilies.sansSerifMedium,
    fontWeight: 'normal',
  }),
}

const Table = ({ children }) => (
  <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
    <table {...styles.table}>{children}</table>
  </div>
)

const BudgetTable = ({ data, total, pk, sk, fraction }) => {
  const [colorScheme] = useColorContext()
  const singleRow = data && data.length === 1
  return (
    <Table>
      <thead>
        <tr>
          <th {...styles.td}>Bereich</th>
          <th {...styles.num}>PK</th>
          <th {...styles.num}>SK</th>
          <th {...styles.num}>Total</th>
          <th {...styles.num}>Anteil</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ label, total, pk, sk, fraction }, i) => (
          <tr key={`row${i}`}>
            <td {...styles.td}>{label}</td>
            <td {...styles.num}>{countFormat(pk / 1000)}</td>
            <td {...styles.num}>{countFormat(sk / 1000)}</td>
            <td {...styles.num}>{countFormat(total / 1000)}</td>
            <td {...styles.num}>
              {singleRow
                ? `~${percentFormatTotal(fraction)}`
                : percentFormat(fraction)}
            </td>
          </tr>
        ))}
        {!singleRow && (
          <tr>
            <th
              {...styles.groupTd}
              {...colorScheme.set('borderTopColor', 'text')}
            >
              Total
            </th>
            <th {...styles.groupTdNum}>{countFormat(pk / 1000)}</th>
            <th {...styles.groupTdNum}>{countFormat(sk / 1000)}</th>
            <th {...styles.groupTdNum}>{countFormat(total / 1000)}</th>
            <th {...styles.groupTdNum}>~{percentFormatTotal(fraction)}</th>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default BudgetTable
