import { timeMonth } from 'd3-time'
import { sum } from 'd3-array'

import { timeParse, timeFormat } from '../../lib/format'

const shortYMSpecifier = '%y-%m'
export const shortYM = {
  specifier: shortYMSpecifier,
  parse: timeParse(shortYMSpecifier),
  format: timeFormat(shortYMSpecifier)
}

const feeRate = 0.03
const price = 24000
export const priceIncome = price - price * feeRate - 500

export const getSeries = ({
  investments = [],
  plannedMemberships = [],
  plannedExpenses = [],
  type,
  renewalRates,
  startMonth,
  stopMonth,
  startLiquidity,
  meanAdditionalIncome = 0,
  membershipsWithExpire,
  payments,
  expenses
}) => {
  const months = timeMonth.range(startMonth, stopMonth)

  let lastPM
  let lastPE

  let liq = startLiquidity

  const renewalRate = (age, created) => renewalRates.cf && age > 12 && age < 22
    ? renewalRates.cf
    : age >= 36
    ? renewalRates.y3 || renewalRates.y2
    : age >= 24
      ? renewalRates.y2
      : renewalRates.y1
  
  let activeMemberships = [].concat(membershipsWithExpire.filter(m => shortYM.parse(m.created) < months[0]))
  const updateActiveMemberships = (newRecord) => {
    let oldRecord = activeMemberships.find(am => (
      am.prev === newRecord.prev &&
      am.expire === newRecord.expire &&
      am.created === newRecord.created
    ))
    if (oldRecord) {
      activeMemberships = activeMemberships.filter(am => am !== oldRecord)
      newRecord.count += oldRecord.count
    }
    activeMemberships.push(newRecord)
  }
  
  return months.map(month => {
    const ym = shortYM.format(month)
    const matchYm = d => d.month === ym

    const actualPayments = payments.find(matchYm)

    lastPM = plannedMemberships.find(matchYm) || lastPM

    const actualExpense = expenses.find(matchYm)
    lastPE = plannedExpenses.find(matchYm) || lastPE
    const exp = actualExpense || lastPE
    
    membershipsWithExpire.filter(d => d.created === ym).forEach(updateActiveMemberships)
    
    if ((!lastPM && !actualPayments) || !exp) {
      return
    }

    let renewCount = 0
    const pendingRenew = activeMemberships.filter(am => am.expire === ym)
    pendingRenew.forEach(renewals => {
      const alreadyRenewedCount = sum(
        activeMemberships.filter(am => (
          am.expire !== renewals.expire &&
          am.prev === renewals.expire &&
          am.created === renewals.created
        )),
        d => d.count
      )
      const age = timeMonth.count(shortYM.parse(renewals.created), shortYM.parse(renewals.expire))
      
      const rate = renewalRate(age, renewals.created)
      activeMemberships = activeMemberships.filter(am => am !== renewals)
      
      const count = Math.floor(((alreadyRenewedCount + renewals.count) * rate) - alreadyRenewedCount)
      if (count < 1) {
        return
      }
      
      updateActiveMemberships({
        prev: renewals.expire,
        expire: shortYM.format(timeMonth.offset(shortYM.parse(renewals.expire), 12)),
        created: renewals.created,
        count
      })

      // console.log(ym, count, 'renewals', rate, age)
      renewCount += count
    })
    // console.log(ym, renewCount, 'total renewals')

    if (actualPayments) {
      liq += actualPayments.chf - actualPayments.chf * feeRate
    } else {
      liq += renewCount * priceIncome
      if (lastPM) {
        liq += lastPM.count * priceIncome
        updateActiveMemberships({
          expire: shortYM.format(timeMonth.offset(shortYM.parse(ym), 12)),
          created: ym,
          count: lastPM.count
        })
      }
      liq += meanAdditionalIncome
    }
    liq -= exp.chf
      
    const investment = investments.find(matchYm)
    if (investment) liq += investment.chf
      
    return {
      type,
      month: ym,
      value: String(liq / 100),
      memberships: sum(activeMemberships, d => d.count)
    }
  }).filter(Boolean)
}
