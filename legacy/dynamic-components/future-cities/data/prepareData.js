var fs = require('fs')
var cityPairs = require('./cityPairs')
var data = require('./s1_table')

var { extent } = require('d3-array')

const prepareCityPair = ([orig, dest]) => {
  return {
    highlightKey: orig.highlightKey,
    distance: orig.distance,
    orig: {
      ...data.find(d => d['current_city'] === orig.key),
      label: orig.label,
      country: orig.country
    },
    dest: {
      ...data.find(d => d['current_city'] === dest.key),
      label: dest.label,
      country: dest.country
    },
  }
}

var profiles = cityPairs.map(prepareCityPair)

const res = profiles.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.orig.current_city.toLowerCase()]: cur,
  }),
  {},
)

const keys = [
  'Annual_Mean_Temperature',
  'Annual_Precipitation',
  'Max_Temperature_of_Warmest_Month',
  'Min_Temperature_of_Coldest_Month'
]

// const extents = Object.entries(res).reduce((acc, [key, {orig, dest}]) => {
//   keys.forEach(k => {
//     acc[k] = acc[k] || {min: 100, max: -100}
//     if (acc[k].max - acc[k].min <= Math.abs(orig[k] - dest[k])) {
//       acc[k].max = Math.max(orig[k], dest[k])
//       acc[k].min = Math.min(orig[k], dest[k])
//     }
//   })
//   return acc
// }, {})


const extents = Object.values(res).reduce((acc, cur) => {
  keys.forEach(k => {
    const [min, max] = extent([
      cur.dest[k], cur.orig[k], cur.dest[`future_${k}`], cur.orig[`future_${k}`]
    ])
    //acc[k] = Math.max((acc[k] || 0), Math.abs(max - min))

    acc[k] = acc[k] || {min: 0, max: 0, diff: 0}

    if (acc[k].diff < Math.abs(max - min)) {
      acc[k] = {
        max, min, diff: Math.abs(max - min)
      }
    }
  })
  return acc
}, {})

const apply = (fn, defaultVal) =>
  Object.values(res).reduce((acc, cur) => {
    keys.forEach(
      k => (acc[k] = fn(acc[k] || defaultVal, cur.orig[k] || defaultVal)),
    )
    keys.forEach(k => (acc[k] = fn(acc[k] || defaultVal, cur.dest[k] || defaultVal)))
    return acc
  }, {})

fs.writeFileSync(
  './data/extents.json',
  JSON.stringify(
    extents,
    // { mins: apply(Math.min, Number.MAX_VALUE), maxs: apply(Math.max, 0) },
    null,
    2,
  ),
)
fs.writeFileSync('./data/profiles.json', JSON.stringify(res, null, 2))
