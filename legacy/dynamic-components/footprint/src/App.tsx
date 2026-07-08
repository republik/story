import * as React from 'react'
import { css, active } from 'glamor'

import { mediaQueries } from '@project-r/styleguide'
import { PADDING, CATEGORIES } from './constants'

import Game from './components/Game'
import { Profile } from './types'
import useSize, { DEFAULT_SIZE } from './hooks/useSize'
import { COLORS } from './theme'
import Intro from './components/Intro'
import Score from './components/Score'

import { parse } from 'querystring'
import chunk from 'lodash/chunk'
import range from 'lodash/range'
import sum from 'lodash/sum'

type Props = {
  profiles: Profile[]
  extract?: boolean
}

const styles = {
  wrapper: css({
    margin: '40px auto',
    userSelect: 'none',
    maxWidth: 414,
    [mediaQueries.mUp]: {
      maxWidth: 665
    }
  }),
  game: css({
    position: 'relative',
    background: COLORS.bgSecondary
  }),
  intro: css({
    background: COLORS.bgPrimary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  }),
  buttons: css({
    padding: PADDING,
    position: 'relative'
  }),
  button: css({
    alignItems: 'center',
    display: 'flex',
    padding: PADDING,
    cursor: 'pointer'
  }),
}

const App: React.FC<Props> = ({ profiles = [], extract }) => {
  const [activeProfile, setActiveProfile] = React.useState()

  const appRef = React.useRef<HTMLDivElement>(null)
  const size = useSize(appRef)

  const query =
    typeof window !== 'undefined'
      ? parse(window.location.search.substring(1))
      : {}

  if (extract) {
    const shareStr = query.share
    if (shareStr && query.extract) {
      const width = 1200
      const height = 628
      const padding = 30
      const shareVals = shareStr.toString().split(',')
      const profileId = shareVals[0]
      const budgetTotal = +shareVals[1]
      const scoreVals = shareVals.splice(2)
      const score = CATEGORIES.map((cat, i) => [cat, scoreVals[i]])
      const scoreTotal = sum(score.map(([k, v]) => +v))
      const displayScore = score.map(([k, v]) => [k, +v / 100])
      const numRows = budgetTotal > 24e3 ? 10 : 7
      const cells = range(budgetTotal / 100)
      const scoreChunks = chunk(cells, numRows)
      let markerSize = Math.floor((width - 2 * padding) / scoreChunks.length)
      return (
        <div style={{ width }}>
          <Score
            share={true}
            size={{
              width,
              height,
              top: 0,
              padding,
              mobile: false,
              headerHeight: 0
            }}
            rows={scoreChunks}
            scoreTotal={scoreTotal}
            budgetTotal={budgetTotal}
            score={score}
            displayScore={displayScore}
            markerSize={markerSize}
          />
        </div>
      )
    }
    return null
  }

  const resetProfile = () => {
    window.scrollTo({
      top: appRef.current.offsetTop - size.headerHeight,
      left: 0,
      behavior: 'smooth'
    })
    setActiveProfile(null)
  }

  return (
    <div ref={appRef} {...styles.wrapper}>
      {size && (
        <Intro
          profiles={profiles}
          size={size}
          onChange={setActiveProfile}
          activeProfile={activeProfile}
          resetProfile={resetProfile}
        />
      )}
      {/* {activeProfile && (
        <PrimaryText
          style={{ background: COLORS.bgPrimary, textAlign: 'center' }}
          onClick={resetProfile}
        >
          Abbrechen
        </PrimaryText>
      )} */}
      {activeProfile && size && (
        <div {...styles.game}>
          <Game
            size={size}
            profile={activeProfile}
            resetProfile={resetProfile}
          />
        </div>
      )}
    </div>
  )
}

export default App
