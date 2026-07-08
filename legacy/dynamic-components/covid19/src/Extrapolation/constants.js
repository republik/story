import { format } from 'd3-format'

import { ymd } from './utils'

export const firstMeasurements = ymd.parse('2020-03-13') // ab 14. über 100 Personen verboten, ab 16. Schulen geschlossen
export const mostMeasurements = ymd.parse('2020-03-17') // ab 17. Ausserordentliche Lage: Restaurants, Bars & co. geschlossen, ab 21. über 5 verboten

export const preliminaryEnd = ymd.parse('2020-04-13')
export const startDate = ymd.parse('2020-03-01')

export const duplicationDays = 6
export const icuDays = 10
export const icuDelay = 4
export const needIcus = 0.05

export const defaultValues = {
  infectedOffset: 10,
  preventionByMeasurements: 0.74,
  icuBeds: 1200
}
export const ranges = {
  infectedOffset: [5, 20],
  preventionByMeasurements: [0.05, 0.95],
  icuBeds: [600, 1600]
}
export const steps = {
  infectedOffset: 1,
  preventionByMeasurements: 0.01,
  icuBeds: 10
}
export const formats = {
  infectedOffset: Number,
  preventionByMeasurements: format('.0%')
}

const labelData = [
  { key: 'sick', label: 'positiv Getestete', color: 'rgba(31, 119, 180, 1)' },
  {
    key: 'projectedSick',
    label: 'hochgerechnet Positive',
    color: 'rgba(31, 119, 180, 0.9)'
  },
  // { key: 'infected', label: 'infiziert', color: 'rgba(127,191,123, 1)' },
  {
    key: 'projectedInfected',
    label: 'bereits Infizierte',
    color: 'rgba(127,191,123, 0.9)'
  },
  {
    key: 'needIcu',
    label: 'auf der Intensivstation',
    color: 'rgba(175,141,195, 1)'
  }
]

export const labels = labelData.reduce((map, item) => {
  map[item.key] = item.label;
  return map;
}, {})

export const chartConfig = {
  type: 'Line',
  height: 240,
  sort: 'none',
  color: 'type',
  colorSort: 'none',
  unit: 'Personen',
  numberFormat: ',.0f',
  x: 'date',
  timeParse: '%Y-%m-%d',
  timeFormat: '%d.%m.',
  colorMap: labelData.reduce((map, item) => {
    map[item.label] = item.color;
    return map;
  }, {}),
  labelFilter: 'false',
  stroke: `datum.type !== "${labels.sick}"`,
  yScale: 'log',
  yNice: 0,
  yTicks: [
    1,
    10,
    100,
    1000,
    10000,
    100000
  ],
  band: 'value',
  bandLegend: 'Bandbreite des Reglers',
  colorLegend: true,
  colorLegendValues: [labels.sick, labels.projectedInfected, labels.needIcu]
}
