import * as React from 'react'
import { css } from 'glamor'
import { mediaQueries, colors, Button } from '@project-r/styleguide'
import { Chart, ChartTitle, ChartLead } from '@project-r/styleguide/chart'
import { PADDING_MOBILE, PADDING, CATEGORIES } from '../constants'
import { COLORS } from '../theme'
import { GameState, Size, Profile } from '../types'
import { findActiveOptions } from '../utils'
import PrimaryText, { Text } from './text'
import uniq from 'lodash/uniq'
import ShareButtons from './ShareButtons'

type Props = {
  size: Size
  profile: Profile
  gameState: GameState
  resetProfile: () => void
  score: any
  scoreTotal: number
  budgetTotal: number
}

const styles = {
  wrapper: css({
    color: COLORS.textPrimary,
    background: COLORS.bgSecondary,
    padding: `${PADDING_MOBILE}px`,
    margin: `${PADDING_MOBILE}px 0`,
    [mediaQueries.mUp]: {
      padding: `${0}px`
    }
  }),
  chart: css({
    margin: `30px auto`
  }),
  footer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  })
}

const FinalScore: React.FC<Props> = ({
  gameState,
  size,
  profile,
  resetProfile,
  score,
  scoreTotal,
  budgetTotal
}) => {
  const chartScore = gameState
    .map((c, i) => {
      const activeOption = findActiveOptions(gameState, c.id)[0]
      return {
        label: `${activeOption.message}`,
        category: c.category,
        value: `${activeOption.delta}`
      }
    })
    .filter(s => +s.value < 0)

  const percent = 100 * (scoreTotal / budgetTotal)

  const usedCats = uniq(chartScore.map(s => s.category))
  const chartRange = Object.entries(COLORS.categories)
    .filter(([k, c]) => usedCats.includes(k))
    .map(([k, c]) => c)

  const reductionPct = 100 - Math.floor(percent)

  const shareNames = {
    P1: 'Städterin',
    P2: 'Berufstätiger',
    P3: 'Familie'
  }
  return chartScore.length < 1 ? (
    <Text margin padding>
      Wähle mindestens eine reduzierende Massnahme, um am Ende des Spiels eine
      Auswertung zu erhalten.
    </Text>
  ) : (
    <div
      {...styles.wrapper}
      style={{
        color: COLORS.textSecondary
      }}
    >
      <img
        src={`https://cdn.republik.space/s3/republik-assets/dynamic-components/footprint/${profile.id}.svg`}
        width={125}
        style={{ float: 'left', paddingRight: 15, paddingBottom: 15 }}
      />
      <div>
        <PrimaryText large margin>
          Hier dein Resultat
        </PrimaryText>
        <PrimaryText margin>
          {`Du hast deinen Footprint um ${Math.abs(
            reductionPct
          )} Prozent von ${(budgetTotal / 1000)
            .toFixed(1)
            .replace('.', ',')} Tonnen auf ${(scoreTotal / 1000)
            .toFixed(1)
            .replace('.', ',')} Tonnen CO₂
          ${reductionPct > 0 ? 'gesenkt' : 'erhöht'}.`}
        </PrimaryText>
        <PrimaryText>{profile.analysis}</PrimaryText>
      </div>
      <div style={{ clear: 'both' }}></div>
      <div {...styles.chart}>
        <ChartTitle>Was hat viel gebracht, was weniger?</ChartTitle>
        <ChartLead>Reduktionen, in Kilogramm CO₂-Äquivalenten</ChartLead>
        <Chart
          config={{
            type: 'Bar',
            numberFormat: 's',
            y: 'label',
            color: 'category',
            colorRange: chartRange,
            colorLegend: false,
            inlineValue: true,
            column: 'category'
          }}
          values={chartScore}
        />
      </div>
      <PrimaryText margin>{profile.outro}</PrimaryText>
      <div {...styles.footer}>
        <Button black onClick={resetProfile}>
          Profil wechseln
        </Button>
      </div>
      <PrimaryText large>Teile dein Resultat</PrimaryText>
      <div
        {...styles.footer}
        style={{ marginTop: 20, justifyContent: 'flex-start' }}
      >
        <ShareButtons
          url={`${window.location.href.split('?')[0]}?share=${
            profile.id
          },${budgetTotal},${CATEGORIES.map(c => score.find(s => c == s[0])[1]).join(',')}`}
          tweet={`Das @RepublikMagazin-Klimagame: Als «${
            shareNames[profile.id]
          }» den CO₂-Fussabdruck um ${Math.abs(reductionPct)} Prozent ${
            reductionPct > 0 ? 'gesenkt' : 'erhöht'
          }.`}
          emailSubject={`Das Republik-Klimagame: Als «${
            shareNames[profile.id]
          }» den CO₂-Fussabdruck um ${Math.abs(reductionPct)} Prozent ${
            reductionPct > 0 ? 'gesenkt' : 'erhöht'
          }.`}
          emailBody=''
          emailAttachUrl
        />
      </div>
    </div>
  )
}

export default FinalScore
