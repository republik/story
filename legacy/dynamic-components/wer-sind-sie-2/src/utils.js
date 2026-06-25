import { formatLocale } from 'd3-format'

export const thousandSeparator = '\u2019'
export const swissNumbers = formatLocale({
  decimal: ',',
  thousands: thousandSeparator,
  grouping: [3],
  currency: ['CHF\u00a0', ''],
})
const count4Format = swissNumbers.format('.0f')
const count5Format = swissNumbers.format(',.0f')
export const countFormat = (value) => {
  if (String(Math.round(value)).length > 4) {
    return count5Format(value)
  }
  return count4Format(value)
}

export const capitalise = (name) => name.replace(/^\w/, (c) => c.toUpperCase())

export const makeNameList = (names) => {
  if (names.length === 1) return names[0]
  const firsts = names.slice(0, names.length - 1)
  const last = names[names.length - 1]
  return firsts.join(', ') + ' und ' + last
}

export const translate = (replacements, text) => {
  Object.keys(replacements).forEach((replacementKey) => {
    text = text.replace(`{${replacementKey}}`, replacements[replacementKey])
  })
  return text
}

export const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})

export const HEADER_HEIGHT = 60
export const HEADER_HEIGHT_MOBILE = 48
