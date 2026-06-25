import React, { useMemo } from 'react'
import { Editorial, RawHtml } from '@project-r/styleguide'
import { countFormat, makeNameList, translate } from './utils'
import { groupByBday } from './AgeVal'

const TranslateP = ({ text, data }) => {
  const translations = useMemo(() => {
    const { membershipStats, revenueStats } = data
    if (!membershipStats || !revenueStats) return {}
    const birthdayData = groupByBday(membershipStats.ages?.buckets || [{}, {}])
    const latestRevenueStats =
      revenueStats.segments?.buckets[revenueStats.segments.buckets.length - 1]
    const nameBuckets = membershipStats?.names?.buckets
    const femaleNames = nameBuckets
      .filter((b) => b.sex === 'FEMALE')
      .map((b) => b.key)
    const maleNames = nameBuckets
      .filter((b) => b.sex === 'MALE')
      .map((b) => b.key)
    const topWomensName = femaleNames[0]
    const getRank = (name) => nameBuckets.findIndex((n) => n.key === name)
    const topWomensNameRank = getRank(topWomensName)
    const topMixedName = nameBuckets.find((n) => n.sex === 'BOTH' && n.key).key

    return {
      percentBirthdayData: Math.ceil(
        (100 * birthdayData[0].value) /
          (birthdayData[0].value + birthdayData[1].value)
      ),
      averageAge: Math.round(membershipStats.ages?.averageAge),
      percentMonthlyAbos: Math.round(
        100 * latestRevenueStats.buckets?.find((b) => b.key === 'abo')?.share
      ),
      giftAbosShare: Math.round(
        100 * latestRevenueStats.buckets?.find((b) => b.key === 'give')?.share
      ),
      topWomensNames: makeNameList(femaleNames.slice(0, 3)),
      topMensNames: makeNameList(maleNames.slice(0, 3)),
      topWomensName,
      topWomensNameRank,
      topWomensName2: femaleNames[1],
      topWomensNameRank2: getRank(femaleNames[1]),
      topWomensName3: femaleNames[2],
      topWomensNameRank3: getRank(femaleNames[2]),
      topMixedName,
      topMixedNameRank: getRank(topMixedName),
      beforeTopWomensName: makeNameList(
        nameBuckets
          .slice(topWomensNameRank - 3, topWomensNameRank)
          .map((b) => b.key)
      ),
      loyalAbos: countFormat(
        membershipStats.evolution.buckets[0].activeLoyalists
      ),
    }
  }, [data])

  return (
    <RawHtml
      type={Editorial.P}
      black
      dangerouslySetInnerHTML={{
        __html: translate(translations, text),
      }}
    />
  )
}

export default TranslateP
