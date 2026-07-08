import * as React from 'react'
import { css } from 'glamor'

import Card from './Card'
import Score from './Score'
import { Size, Action, CardType, GameState, Profile, Option } from '../types'
import FinalScore from './FinalScore'
import useSize, { DEFAULT_SIZE } from '../hooks/useSize'
import { actions2Cards, selectOptions, findActiveOptions } from '../utils'
import { COLORS } from '../theme'
import { PADDING_MOBILE, PADDING, CATEGORIES } from '../constants'
import { Button, mediaQueries } from '@project-r/styleguide'
import { ChartTitle } from '@project-r/styleguide'
import Text from './text'
import sum from 'lodash/sum'
import range from 'lodash/range'
import chunk from 'lodash/chunk'
import flatMap from 'lodash/flatMap'

type Props = {
  size: Size
  profile: Profile
  resetProfile: () => void
}

const Game: React.FC<Props> = ({ size, profile, resetProfile }) => {
  const cards = actions2Cards(profile.actions)
  const scoreRef = React.useRef(null)
  const scoreSize = useSize(scoreRef)

  const [gameState, setGameState] = React.useState<GameState>(cards)

  const selectCardOptions = (cardId: number, optionGroupIds: number[]) => {
    setGameState(selectOptions(gameState, cardId, optionGroupIds))
  }

  const [activeCards, setActiveCards] = React.useState(1)
  const updateActiveCards = (id, visible) => {
    setActiveCards(activeCards => Math.max(visible ? id : id - 1, 1))
  }

  const budget: any = CATEGORIES.map(c => [c, profile.budget[c]])
  const budgetTotalPadding = sum(
    flatMap(gameState, card => card.options).map(o =>
      o.delta > 0 ? o.delta : 0
    )
  )
  const budgetTotal = sum(budget.map(([k, v]) => v))

  const numRows = budgetTotal > 24e3 ? 10 : 7

  const detailedScore: { [key: string]: number } = gameState
    .filter((c, i) => c.id <= activeCards)
    .map((c, i) => {
      return {
        category: c.category,
        delta: findActiveOptions(gameState, c.id)[0].delta
      }
    })
    .reduce((acc, cur) => {
      acc[cur.category] = (acc[cur.category] || 0) + cur.delta
      return acc
    }, {})

  const score: any = CATEGORIES.map(c => [
    c,
    profile.budget[c]
  ]).map(([k, v]) => [k, v + (Number(detailedScore[k]) || 0)])

  const scoreTotal = sum(score.map(([k, v]) => v))

  const displayBudget = budget.map(([k, v]) => [k, v / 100])
  const displayScore = score.map(([k, v]) => [k, v / 100])

  const paddingCells = range(budgetTotalPadding / 100).map(i => null)
  const cells = flatMap(displayBudget, ([k, v]) => range(v))
    .concat(paddingCells)
    .map((v, j) => j)

  const scoreChunks = chunk(cells, numRows)

  let markerSize = Math.floor(
    (scoreSize.width - 2 * (scoreSize.mobile ? PADDING_MOBILE : PADDING)) /
      scoreChunks.length
  )
  markerSize = markerSize % 2 === 0 ? markerSize : markerSize

  return (
    <div>
      <Text large margin padding>
        Das ist dein Fussabdruck
      </Text>
      <div style={{ position: 'relative' }}>
        <div
          ref={scoreRef}
          style={{
            position: 'sticky',
            zIndex: 1,
            top: size.headerHeight
          }}
        >
          {scoreSize && (
            <Score
              size={scoreSize}
              rows={scoreChunks}
              scoreTotal={scoreTotal}
              budgetTotal={budgetTotal}
              score={score}
              displayScore={displayScore}
              markerSize={markerSize}
            />
          )}
        </div>
        <Text margin padding>
          Du hast diverse Möglichkeiten, um deinen Fussabdruck zu reduzieren.
          Der Zwischenstand wird laufend aktualisiert.
        </Text>
        {scoreSize &&
          gameState.map((card, i) => (
            <Card
              key={card.id}
              active={card.id <= activeCards}
              {...card}
              selectedOption={findActiveOptions(gameState, card.id)[0]}
              activeOptions={findActiveOptions(gameState, card.id, true)}
              onSelect={selectCardOptions}
              onVisibilityChange={updateActiveCards}
              markerSize={markerSize}
            />
          ))}
      </div>
      {scoreSize && (
        <FinalScore
          profile={profile}
          size={scoreSize}
          gameState={gameState}
          resetProfile={resetProfile}
          score={score}
          scoreTotal={scoreTotal}
          budgetTotal={budgetTotal}
        />
      )}
    </div>
  )
}

export default Game
