export const MAP_IMAGE_WIDTH = 2000
export const MAP_IMAGE_HEIGHT = 2000
export const CHART_WIDTH = 320

import { format } from 'd3-format'

export const COLORS: any = {
  chartBg: '#fff',
  mapMarker: '#fff',
}

export const LABELS: {
  [name: string]: {
    label: string
    description: string
    unit: string
    color: string
    formatter?: (value: number) => string
  }
} = {
  Annual_Mean_Temperature: {
    label: 'Temperatur',
    description: 'Jahresdurchschnitt',
    unit: '°C',
    color: '#D3BF5B',
  },
  Annual_Precipitation: {
    label: 'Niederschlag',
    description: 'Jahresmenge',
    unit: 'mm',
    color: '#537DBB',
    formatter: format('.0f')
  },
  Max_Temperature_of_Warmest_Month: {
    label: 'Wärmster Monat',
    description: 'Maximaltemperatur',
    unit: '°C',
    color: '#B35858'
  },
  Min_Temperature_of_Coldest_Month: {
    label: 'Kältester Monat',
    description: 'Minimaltemperatur',
    unit: '°C',
    color: '#62ADB2'
  },
}
