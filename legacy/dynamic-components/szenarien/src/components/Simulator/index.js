import React, { Component, Fragment } from 'react'
import { css } from 'glamor'
import { format } from 'd3-format'
import { max } from 'd3-array'
import {
  Label, mediaQueries,
  Interaction, Editorial, Slider
} from '@project-r/styleguide'
import { Chart, ChartTitle, ChartLead } from '@project-r/styleguide/chart'

import { timeFormat } from '../../lib/format'

import { shortYM, priceIncome, getSeries } from './simulate'

import Share from '../Share'

import membershipsWithExpire from '../../data/memberships.json'
import payments from '../../data/payments.json'
import expenses from '../../data/expenses.json'

const formatLongYM = timeFormat('%B %Y')

const defaultRenewalRates = {
  cf: 0.5,
  y1: 0.65,
  y2: 0.75
}

const currentExpenses = 54600000
const securedInvestments = [
  {month: '18-07', chf: 76326400},
  {month: '18-11', chf: 66666666},
  {month: '19-01', chf: 33333333}
]

const baseData = {
  membershipsWithExpire,
  payments,
  expenses,
  investments: securedInvestments,
  renewalRates: defaultRenewalRates,
  startMonth: new Date('2018-07-01T00:00:00.000+02:00'),
  stopMonth: new Date('2023-02-01T00:00:00.000+01:00'),
  startLiquidity: 276326400,
  meanAdditionalIncome: 2955740.888888889
}

const planInvestment = 100000000
const planMemberships = 675
const planBudget = 0.9

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

const ASSETS_SERVER_BASE_URL = 'https://cdn.republik.space'

const parsePlan = (plan = '') => {
  let [
    cf,
    y1,
    y2,
    memberships,
    budget,
    investment
  ] = plan.split('-')
  cf = normalizePercent(0.25, 0.95, cf)
  y1 = normalizePercent(0.25, 0.95, y1)
  y2 = normalizePercent(0.25, 0.95, y2)
  memberships = normalizeCount(5, 1000, 5, memberships)
  budget = normalizePercent(0.5, 1.5, budget)
  investment = normalizeCount(0, 1000000000, 10000000, investment)
  if (
    isNaN(cf) ||
    isNaN(y1) ||
    isNaN(y2) ||
    isNaN(memberships) ||
    isNaN(budget) ||
    isNaN(investment)
  ) {
    return undefined
  }
  return {
    dirty: true,
    renewalRates: {
      cf,
      y1,
      y2
    },
    memberships,
    budget,
    investment
  }
}

class Simulator extends Component {
  constructor (props) {
    super(props)

    const emptyPlan = {
      dirty: false,
      renewalRates: defaultRenewalRates,
      memberships: planMemberships,
      budget: planBudget,
      investment: planInvestment
    }
    const plan = parsePlan(props.query.plan) || emptyPlan

    this.state = {
      mobile: isMobile(),
      ...plan
    }
    this.measure = () => {
      const mobile = isMobile()
      if (this.state.mobile !== mobile) {
        this.setState({ mobile })
      }
    }
  }
  componentDidMount () {
    window.addEventListener('resize', this.measure)
    this.measure()
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.measure)
  }
  render () {
    const { t, extract, query } = this.props
    const { mobile, dirty, budget, memberships, investment, renewalRates } = this.state

    const userSeries = getSeries({
      ...baseData,
      type: t(extract ? 'label/extract/user' : 'label/user'),
      plannedMemberships: [
        {month: '19-01', count: memberships} // 500 * 12 = 6000
      ],
      plannedExpenses: [
        {month: '19-04', chf: currentExpenses * budget}
      ],
      investments: [
        ...securedInvestments,
        {month: '19-06', chf: investment}
      ],
      renewalRates,
      stopMonth: new Date('2029-02-01T00:00:00.000+01:00')
    })

    const numMembersNeeded = Math.ceil(currentExpenses * budget * 12 / priceIncome)

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
        {month: '19-01', count: planMemberships}
      ],
      plannedExpenses: [
        {month: '19-04', chf: currentExpenses * planBudget}
      ],
      investments: [
        ...securedInvestments,
        {month: '19-06', chf: planInvestment}
      ]
    })

    const scenarios = [
      // getSeries({
      //   ...baseData,
      //   type: t('label/unchanged'),
      //   plannedMemberships: [
      //     {month: '19-01', count: 430}
      //   ],
      //   plannedExpenses: [
      //     {month: '19-04', chf: currentExpenses}
      //   ]
      // }),
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
      xTicks: ['19-01', '21-01', '23-01'],
      timeParse: shortYM.specifier,
      timeFormat: '%Y',
      labelFilter: 'datum.type && datum.type[0] != "H"',
      stroke: 'datum.type[0] != "H"',
    }

    const values = scenarios.reduce((all, scenario) => all.concat(scenario))

    const width = extract ? 600 - 70 : undefined
    const liqChart = <Chart
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
    const maxTick = (
      Math.ceil(
        Math.max(
          numMembersNeeded + 2500,
          max(values, d => d.memberships)
        ) / 10000
      )
    ) * 10000
    const membershipChart = <Chart
      width={width}
      config={{
        ...commonConfig,
        unit: t('unit/memberships'),
        numberFormat: 's',
        yNice: 0,
        yTicks: [ 0, maxTick / 2, maxTick ],
        yAnnotations: [{
          value: numMembersNeeded, 
          label: t('annotation/stable')
        }]
      }}
      values={values.map(d => ({...d, value: String(d.memberships)}))} />

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
      renewalRates.cf,
      renewalRates.y1,
      renewalRates.y2,
      memberships,
      budget,
      investment
    ].join('-')}`

    return (
      <div style={{ marginTop: 10 }}>
        <ChartTitle style={{ marginBottom: 10 }}>{t('slider/title')}</ChartTitle>
        <div {...styles.sliderGroup}>
          <div {...styles.slider}>
            <Label>
              {t('slider/group/1/cf', { percent: formatPercent(renewalRates.cf) })}
            </Label><br />
            <Slider min={0.25} max={0.95} step={0.01}
              value={renewalRates.cf}
              onChange={(_, value) => this.setState(state => ({ 
                dirty: true, renewalRates: { ...state.renewalRates, cf: value }
              }))} />
          </div>
          <div {...styles.slider}>
            <Label>
              {t('slider/group/1/y1', { percent: formatPercent(renewalRates.y1) })}
            </Label><br />
            <Slider min={0.25} max={0.95} step={0.01}
              value={renewalRates.y1}
              onChange={(_, value) => this.setState(state => ({ 
                dirty: true, renewalRates: { ...state.renewalRates, y1: value }
              }))} />
          </div>
          <div {...styles.slider}>
            <Label>
              {t('slider/group/1/y2', { percent: formatPercent(renewalRates.y2) })}
            </Label><br />
            <Slider min={0.25} max={0.95} step={0.01}
              value={renewalRates.y2}
              onChange={(_, value) => this.setState(state => ({ 
                dirty: true, renewalRates: { ...state.renewalRates, y2: value }
              }))} />
          </div>
        </div>
        <div {...styles.sliderGroup}>
          <div {...styles.slider}>
            <Label>{t('slider/group/2', { count: memberships })}</Label><br />
            <Slider min={5} max={1000} step={5}
              value={memberships}
              onChange={(_, value) => this.setState({
                dirty: true, memberships: value
              })}
              style={{ width: 260 }} />
          </div>
          <div {...styles.slider}>
            <Label>
              {t(
                `slider/group/3/${(budget - 1) > 0 ? 'grow' : 'save'}`,
                { percent: formatPercent(Math.abs(1 - budget)) }
              )}
            </Label><br />
            <Slider min={0.5} max={1.5} step={0.01}
              value={budget}
              onChange={(_, value) => this.setState({
                dirty: true, budget: value
              })}
              style={{ width: 260 }} />
          </div>
          <div {...styles.slider}>
            <Label>
              {t.pluralize('slider/group/4', { count: investment / 100 / 1000000 })}
            </Label><br />
            <Slider min={0} max={1000000000} step={10000000}
              value={investment}
              onChange={(_, value) => this.setState({
                dirty: true, investment: value
              })}
              style={{ width: 260 }} />
          </div>
        </div>
        <br style={{ clear: 'left' }} />

        <ChartTitle style={{ marginBottom: 10 }}>
          {t('chart/liq/title')}
        </ChartTitle>
        {liqChart}
        <Editorial.Note style={{ margin: 0 }}>{t('chart/liq/footnote')}</Editorial.Note>
        <br />

        <ChartTitle style={{ marginBottom: 10 }}>
          {t('chart/mem/title')}
        </ChartTitle>
        {membershipChart}
        <br />

        <ChartTitle>{t('user/title')}</ChartTitle>
        {dirty ? <Fragment>
          <ChartLead>
            <Interaction.Emphasis>
              {t(`user/${outcome}/statment`, {
                monthYear: outcomeMonthYear
              })}
            </Interaction.Emphasis>
            {' '}
            {t(`user/${outcome}/text`, { monthYear: outcomeMonthYear })}
          </ChartLead>
          <Share
            url={shareUrl}
            emailSubject={t.first([`user/${outcome}/subject`, `user/${outcome}/statment`], {
              monthYear: outcomeMonthYear
            })}
            tweet='#republikszenario'
            download={`${ASSETS_SERVER_BASE_URL}/render?width=1200&height=1&url=${encodeURIComponent(`${shareUrl}&extract=1`)}`} />
          <Editorial.P>{t('user/share/p1')}</Editorial.P>
          <Editorial.P>{t('user/share/p2')}</Editorial.P>
        </Fragment> : <ChartLead>{t('user/share/clean')}</ChartLead>}
        <Editorial.P>{t('user/after1')}</Editorial.P>
        <Editorial.P>{t('user/after2')}</Editorial.P>
      </div>
    )
  }
}

export default Simulator
