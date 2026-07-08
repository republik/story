import { timeFormat, timeParse } from 'd3-time-format'

export const parseDate: (dateStr: string) => Date = timeParse('%d.%m.%Y')
export const formatDate = timeFormat('%d.%m.%Y')
