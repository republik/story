import { hierarchy } from 'd3-hierarchy'
import { nest } from 'd3-collection'
import { sum } from 'd3-array'

// pk: Personalkosten
// sk: Sachkosten

export const getTotal = (data) => sum(data, (d) => +(d.pk + d.sk))

export const getBudget = (data) => {
  const total = getTotal(data)
  return hierarchy({
    children: nest()
      .key((d) => d.category)
      .entries(data)
      .map((d) => {
        return {
          ...d.values[0],
          total: sum(d.values, (v) => +(v.pk + v.sk)),
          fraction: sum(d.values, (v) => +(v.pk + v.sk)) / total,
          pk: sum(d.values, (v) => +v.pk),
          sk: sum(d.values, (v) => +v.sk),
          children: d.values.map((c) => {
            return {
              ...c,
              total: c.pk + c.sk,
              fraction: (c.pk + c.sk) / total,
            }
          }),
        }
      }),
  }).sum((d) => d.Anzahl)
}
