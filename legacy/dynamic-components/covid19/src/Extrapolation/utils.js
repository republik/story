import { timeParse, timeFormat } from 'd3-time-format'

const ymdSpecifier = '%Y-%m-%d'

export const ymd = {
  specifier: ymdSpecifier,
  parse: timeParse(ymdSpecifier),
  format: timeFormat(ymdSpecifier)
}

export const dateMonthFormat = timeFormat('%d.%m.')
