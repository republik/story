import { formatLocale } from 'd3'

const thousandSeparator = '\u2019'
const swissNumbers = formatLocale({
  decimal: ',',
  thousands: thousandSeparator,
  grouping: [3],
  currency: ['CHF\u00a0', ''],
  minus: '\u2212',
  percent: '\u2009%',
})

export const format = (number) => {
  return swissNumbers.format(',.0f')(number)
}
