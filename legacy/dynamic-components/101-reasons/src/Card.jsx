import React from 'react'
import { css } from 'glamor'
import {
  Editorial,
  Interaction,
  colors, fontStyles,
  inQuotes,
} from '@project-r/styleguide'
import { M_UP } from './constants'
import { primary } from './colors'
import data from './data'

const styles = {
  header: css({
    padding: 5
  }),
  main: css({
    color: colors.negative.text,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 20,
    cursor: 'pointer',
    background: 'black'
  }),
  author: css({
    color: colors.negative.text,
    marginBottom: 10
  }),
  title: css({
    lineHeight: 1.3,
    padding: '20px 40px',
    fontFamily: 'Comic Sans, Comic Sans MS, cursive',
    [M_UP]: {
      padding: '20px 20px 40px',
    }
  }),
  swipeIndicator: css({
    position: 'absolute',
    textTransform: 'uppercase',
    padding: '3px 6px',
    fontSize: 20,
    ...fontStyles.sansSerifMedium,
    pointerEvents: 'none',
    color: 'white',
    transition: 'opacity 300ms',
    transitionDelay: '10ms',
    borderRadius: 1,
    border: '1px solid #1F1F1F'
  }),
  swipeIndicatorLeft: css({
    transform: 'rotate(42deg)',
    right: 20,
    top: 40,
    backgroundColor: colors.negative.error
  }),
  swipeIndicatorRight: css({
    transform: 'rotate(-12deg)',
    left: 30,
    top: 25,
    backgroundColor: primary
  })
}

const BASE_TITLE_SIZE = 48
const BASE_WORD_LENGTH = 10
const BASE_SENTENCE_LENGTH = 40

const getFontSize = (text) => {
  const textLength = text.length
  const maxWordLength = text
    .split(/[- ]/)
    .reduce(
      (currentMax, currentWord) =>
        currentWord.length > currentMax ? currentWord.length : currentMax,
      0
    )
  const textLengthFontSize =
    textLength > BASE_SENTENCE_LENGTH ?
      BASE_TITLE_SIZE * (1/(1 - Math.log2((BASE_SENTENCE_LENGTH / textLength)))) :
      BASE_TITLE_SIZE
  const wordLengthFontSize =
    maxWordLength > BASE_WORD_LENGTH ?
      (BASE_TITLE_SIZE * BASE_WORD_LENGTH) / maxWordLength :
      BASE_TITLE_SIZE
  return Math.min(
    textLengthFontSize,
    wordLengthFontSize,
    BASE_TITLE_SIZE
  )
}

const getIndicatorOpacity = dir => Math.min(2.5 * Math.abs(dir), 1)

const Card = ({
  reason,
  swipeDir
}) => {
  const reasonIdx = data.findIndex(r => r.description === reason.description)
  return (
    <div {...styles.main}>
      <h1
        {...styles.title}
        style={{ fontSize: getFontSize(reason.description) }}
      >
        {inQuotes(reason.description)}
      </h1>
      <div
        {...styles.swipeIndicator}
        {...styles.swipeIndicatorLeft}
        style={{
          opacity: swipeDir < 0 ? getIndicatorOpacity(swipeDir) : 0
        }}
      >
        nein
      </div>
      <div
        {...styles.swipeIndicator}
        {...styles.swipeIndicatorRight}
        style={{
          opacity: swipeDir > 0 ? getIndicatorOpacity(swipeDir) : 0
        }}
      >
        ja!
      </div>
    </div>
  )
}

export const CardHeader = ({
  reason,
  totalReasons
}) => (<div {...styles.header}>
  <Editorial.Credit style={{ marginTop: 0, lineHeight: '22px' }}>
    {reason ? `Grund #${data.findIndex(r => r.description === reason.description) + 1} von ${totalReasons}` : `${totalReasons} Gründe für Republik`}
  </Editorial.Credit>
</div>)

export default Card
