import { timeDay } from 'd3-time'
import { max, range } from 'd3-array'
import { scaleTime } from 'd3-scale'

import sickDataBag from './sickDataBag'

import {
  firstMeasurements,
  mostMeasurements,
  duplicationDays,
  startDate,
  preliminaryEnd,
  needIcus,
  icuDelay,
  icuDays,
  labels
} from './constants'

import { ymd } from './utils'

const getSeries = ({ infectedOffset, preventionByMeasurements, icuBeds }) => {
  const getRate = scaleTime()
    .domain([
      firstMeasurements,
      mostMeasurements
    ])
    .range([
      1 / duplicationDays,
      (1 / duplicationDays) * (1 - preventionByMeasurements)
    ])
    .clamp(true);
  const infectedBackStartDate = timeDay.offset(startDate, infectedOffset);
  const infectedValues = sickDataBag
    .filter(d => d.date >= infectedBackStartDate)
    .map(d => ({
      ...d,
      date: timeDay.offset(d.date, -infectedOffset)
    }));
  const lastInfectedValue = infectedValues[infectedValues.length - 1];
  const projectedInfectedValues = timeDay
    .range(timeDay.offset(lastInfectedValue.date, 1), preliminaryEnd)
    .reduce((all, date) => {
      const prev = all[all.length - 1];
      all.push({
        date,
        value: prev.value + prev.value * getRate(date)
      });
      return all;
    }, [].concat(infectedValues));

  const projectedCaseValues = projectedInfectedValues
    .slice(infectedValues.length - 1, -infectedOffset)
    .map(d => ({
      ...d,
      date: timeDay.offset(d.date, infectedOffset)
    }));
  const projectedIcuCases = []
    .concat(sickDataBag.map(d => ({ ...d, value: d.value * needIcus })))
    .concat(
      projectedCaseValues
        .slice(1)
        .map(d => ({ ...d, value: d.value * needIcus }))
    )
    .reduce((cases, d) => {
      return cases.concat(
        range(0, Math.floor(d.value - cases.length)).map(() => ({
          start: timeDay.offset(d.date, icuDelay),
          end: timeDay.offset(d.date, icuDays + icuDelay)
        }))
      );
    }, []);
  const projectedIcuCaseValues = []
    .concat(sickDataBag)
    .concat(projectedCaseValues.slice(1))
    .map(d => {
      return {
        date: d.date,
        value: projectedIcuCases.filter(
          c => c.start <= d.date && c.end >= d.date
        ).length
      };
    });

  const projectedIcuOverload = projectedIcuCaseValues.find(
    d => d.value >= icuBeds
  );
  const projectedIcuPeakValue = max(
    projectedIcuCaseValues.map(d => d.value)
  );
  const projectedIcuPeak = projectedIcuCaseValues.find(
    d => d.value === projectedIcuPeakValue
  );
  const maxValue = max(
    []
      .concat(projectedCaseValues)
      .concat(projectedInfectedValues)
      .concat(projectedIcuCaseValues)
      .map(d => d.value)
  );

  return {
    sickDataBag,
    projectedCaseValues,
    projectedInfectedValues,
    projectedIcuCaseValues,
    projectedIcuCases,
    projectedIcuOverload,
    projectedIcuPeak,
    maxValue
  };
}

export default getSeries

export const combineSeries = ({ lower, value, upper }) => {
  const combineValues = key =>
    value[key].map((d, i) => ({
      value_lower: lower[key][i].value,
      value_upper: upper[key][i].value,
      ...d
    }));

  return {
    value,
    lower,
    upper,
    ...value,
    projectedCaseValues: combineValues('projectedCaseValues'),
    projectedInfectedValues: combineValues('projectedInfectedValues'),
    projectedIcuCaseValues: combineValues('projectedIcuCaseValues'),
    maxValue: max([lower.maxValue, value.maxValue, upper.maxValue])
  };
}

export const getValues = ({
  sickDataBag = [],
  projectedCaseValues = [],
  projectedInfectedValues = [],
  projectedIcuCaseValues = [],
  minDate,
  maxDate,
  filterZero
}) => {
  const filter = d =>
    (!minDate || d.date >= minDate) && (!maxDate || d.date <= maxDate);
  return []
    .concat(sickDataBag.filter(filter).map(mapToString(labels.sick)))
    .concat(
      projectedCaseValues.filter(filter).map(mapToString(labels.projectedSick))
    )
    .concat(
      projectedInfectedValues
        .filter(filter)
        .map(mapToString(labels.projectedInfected))
    )
    .concat(
      projectedIcuCaseValues.filter(filter).map(mapToString(labels.needIcu))
    )
    .map(
      filterZero
        ? d => (d.value !== "0" ? d : { ...d, value: undefined })
        : d => d
    );
}

const mapToString = type => d => ({
  type,
  ...d,
  date: ymd.format(d.date),
  value: String(d.value),
  value_lower: d.value_lower ? String(d.value_lower) : String(d.value),
  value_upper: d.value_upper ? String(d.value_upper) : String(d.value)
})
