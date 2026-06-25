import React, { Fragment } from 'react'
import { css } from 'glamor'
import { format } from 'd3-format'
import { max } from 'd3-array'
import {
  Label, mediaQueries,
  Interaction, Editorial,
  colors, useColorContext,
  Slider
} from '@project-r/styleguide'
import { Chart, ChartTitle, ChartLead } from '@project-r/styleguide/chart'

import { timeFormat } from '../../lib/format'

import { shortYM, priceIncome, getSeries } from './simulate'

import Share from '../Share'

import membershipsWithExpire from '../../data/memberships20.json'
import payments from '../../data/payments20.json'
import expenses from '../../data/expenses20.json'

const formatLongYM = timeFormat('%B %Y')

const defaultRenewalRates = {
  y1: 0.60,
  y2: 0.75,
  y3: 0.85
}

const currentExpenses = 49166600
export const numMembersNeeded = Math.ceil(currentExpenses * 12 / priceIncome)
const securedInvestments = [
  {month: '20-04', chf: 60000000}
]

const baseData = {
  membershipsWithExpire,
  payments,
  expenses,
  investments: securedInvestments,
  renewalRates: defaultRenewalRates,
  startMonth: new Date('2020-01-01T00:00:00.000+01:00'),
  stopMonth: new Date('2024-02-01T00:00:00.000+01:00'),
  startLiquidity: 244408300,
  meanAdditionalIncome: 5000000,
  plannedExpenses: [
    {month: '20-04', chf: currentExpenses}
  ]
}


const planMemberships = 500

const formatPercent = format('.0%')

const styles = {
  sliderGroup: css({
    width: 290,
    marginRight: 10,
    marginBottom: 10,
    float: 'left',
    fontFeatureSettings: '"tnum" 1, "kern" 1'
  }),
  slider: css({
    marginBottom: 5
  }),
  extract: css({
    boxSizing: 'border-box',
    width: 600,
    padding: '60px 35px',
    height: 314,
    transform: 'scale(2)',
    transformOrigin: 'top left',
    backgroundColor: '#F6F8F7'
  })
}

const isMobile = () => typeof window !== 'undefined'
  ? window.innerWidth < mediaQueries.mBreakPoint
  : true

const normalizePercent = (min, max, percent) =>
  Math.round(Math.max(min, Math.min(percent, max)) * 100) / 100
const normalizeCount = (min, max, step, count) =>
  Math.round(Math.max(min, Math.min(count, max)) / step) * step

const ASSETS_SERVER_BASE_URL = 'https://cdn.repub.ch'

const parsePlan = (plan = '') => {
  let [
    y1,
    y2,
    y3,
    memberships
  ] = plan.split('-')
  y1 = normalizePercent(0.25, 0.95, y1)
  y2 = normalizePercent(0.25, 0.95, y2)
  y3 = normalizePercent(0.25, 0.95, y3)
  memberships = normalizeCount(5, 1000, 5, memberships)
  if (
    isNaN(y1) ||
    isNaN(y2) ||
    isNaN(y3) ||
    isNaN(memberships)
  ) {
    return undefined
  }
  return {
    dirty: true,
    renewalRates: {
      y1,
      y2,
      y3
    },
    memberships
  }
}

const Simulator = (props) => {
  const [colorScheme] = useColorContext()

  const [state, setState] = React.useState(() => {
    const plan = parsePlan(props.query.plan) || {
      dirty: false,
      renewalRates: defaultRenewalRates,
      memberships: planMemberships
    }

    return {
      mobile: isMobile(),
      ...plan
    }
  })

  const { mobile, dirty, memberships, renewalRates } = state

  React.useEffect(() => {
    const measure = () => {
      const newMobile = isMobile()
      if (newMobile !== mobile) {
        setState(state => ({ ...state, mobile: newMobile }))
      }
    }
    window.addEventListener('resize', measure)
    measure()
    return () => {
      window.removeEventListener('resize', measure)
    }
  }, [mobile])

  const { t, extract, query } = props

  const userSeries = getSeries({
    ...baseData,
    type: t(extract ? 'label/extract/user' : 'label/user'),
    plannedMemberships: [
      {month: '20-04', count: memberships}
    ],
    renewalRates,
    stopMonth: new Date('2029-02-01T00:00:00.000+01:00')
  })

  const bankrupt = userSeries.find(m => +m.value < 0)
  const sufficient = userSeries.reduce(
    (months, m) => {
      if (m.memberships >= numMembersNeeded) {
        return months.concat(m)
      }
      return []
    },
    []
  )[0]
  const outcome = bankrupt
    ? 'bankrupt'
    : sufficient ? 'sufficient' : 'survive'
  const outcomeYM = (
    (bankrupt && bankrupt.month) ||
    (sufficient && sufficient.month)
  )
  const outcomeMonthYear = outcomeYM && formatLongYM(shortYM.parse(outcomeYM))

  const showUserPlan = dirty && (
    !extract ||
    (
      query.share === outcome &&
      (query.ym === outcomeYM || query.share === 'survive')
    )
  )

  const planSeries = getSeries({
    ...baseData,
    type: t(extract ? 'label/extract/plan' : 'label/plan'),
    plannedMemberships: [
      {month: '20-04', count: planMemberships}
    ]
  })

  const scenarios = [
    planSeries,
    getSeries({ ...baseData, type: 'HShare' }),
    showUserPlan
      ? userSeries.slice(0, planSeries.length)
      : getSeries({ ...baseData, type: 'HUser' }),
    getSeries({ ...baseData, type: 'HPast' })
  ]
  const commonConfig = {
    type: 'Line',
    height: extract
      ? 142
      : mobile
        ? 160
        : 180,
    paddingRight: extract
      ? 140
      : 127,
    sort: 'none',
    color: 'type',
    colorSort: 'none',
    colorRange: [
      // 'rgba(148, 103, 189, 0.9)',
      'rgba(31, 119, 180, 0.9)',
      'rgba(255, 127, 14, 0.9)',
      'rgba(60, 173, 0, 0.9)',
      `rgba(${showUserPlan ? '60, 173, 0' : '31, 119, 180'}, 1)`
    ],
    x: 'month',
    xTicks: ['20-01', '22-01', '24-01'],
    timeParse: shortYM.specifier,
    timeFormat: '%Y',
    labelFilter: 'datum.type && datum.type[0] != "H"',
    stroke: 'datum.type[0] != "H"',
  }

  const values = scenarios.reduce((all, scenario) => all.concat(scenario))

  const width = extract ? 600 - 70 : undefined
  const liqChart = <div {...css(colorScheme.text !== colors.text && {
    '& text, & tspan': {
      fill: `${colorScheme.text} !important`
    },
    '& svg > g > g > g > line': {
      stroke: 'rgba(255, 255, 255, 0.4) !important'
    },
    '& div': {
      color: `${colorScheme.text} !important`
    }
  })}>
    <Chart
      width={width}
      config={{
        ...commonConfig,
        unit: t('unit/chf'),
        numberFormat: '.2s',
        yNice: 0,
        yAnnotations: [{
          value: 1000000,
          label: t('annotation/min'),
          dy: '0.9em'
        }]
      }}
      values={values} />
  </div>

  if (extract) {
    const theChart = outcome === 'bankrupt'
      ? liqChart
      : membershipChart

    return (
      <div {...styles.extract}>
        {theChart}
      </div>
    )
  }

  const href = typeof window !== 'undefined'
    ? window.location.href.split('?')[0]
    : ''
  const shareUrl = `${href}?share=${outcome}&ym=${outcomeYM}&plan=${[
    renewalRates.y1,
    renewalRates.y2,
    renewalRates.y3,
    memberships
  ].join('-')}`

  return (
    <div style={{ marginTop: 10 }}>
      <ChartTitle style={{ marginBottom: 10, color: colorScheme.text }}>{t('slider/title')}</ChartTitle>
      <div {...styles.sliderGroup}>
        <div {...styles.slider}>
          <Label style={{ color: colorScheme.text }}>{t('slider/group/2', { count: memberships })}</Label><br />
          <Slider min={5} max={1000} step={5}
            value={memberships}
            onChange={(_, value) => setState(state => ({
              ...state, dirty: true, memberships: value
            }))}
            style={{ width: 260 }} />
        </div>
        <div {...styles.slider}>
          <Label style={{ color: colorScheme.text }}>
            {t('slider/group/1/y1', { percent: formatPercent(renewalRates.y1) })}
          </Label><br />
          <Slider min={0.25} max={0.95} step={0.01}
            value={renewalRates.y1}
            onChange={(_, value) => setState(state => ({ 
              ...state, dirty: true, renewalRates: { ...state.renewalRates, y1: value }
            }))} />
        </div>
      </div>
      <div {...styles.sliderGroup}>
        <div {...styles.slider}>
          <Label style={{ color: colorScheme.text }}>
            {t('slider/group/1/y2', { percent: formatPercent(renewalRates.y2) })}
          </Label><br />
          <Slider min={0.25} max={0.95} step={0.01}
            value={renewalRates.y2}
            onChange={(_, value) => setState(state => ({ 
              ...state, dirty: true, renewalRates: { ...state.renewalRates, y2: value }
            }))} />
        </div>
        <div {...styles.slider}>
          <Label style={{ color: colorScheme.text }}>
            {t('slider/group/1/y3', { percent: formatPercent(renewalRates.y3) })}
          </Label><br />
          <Slider min={0.25} max={0.95} step={0.01}
            value={renewalRates.y3}
            onChange={(_, value) => setState(state => ({ 
              ...state, dirty: true, renewalRates: { ...state.renewalRates, y3: value }
            }))} />
        </div>
      </div>
      <br style={{ clear: 'left' }} />

      <ChartTitle style={{ marginBottom: 10, color: colorScheme.text }}>
        {t('chart/liq/title')}
      </ChartTitle>
      {liqChart}
      <Editorial.Note style={{ margin: 0 }}>{t('chart/liq/footnote2020')}</Editorial.Note>
      <br />
    </div>
  )
}

export default Simulator
