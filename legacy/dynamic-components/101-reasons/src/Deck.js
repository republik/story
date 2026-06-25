import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useGesture } from 'react-use-gesture/dist/index.js'
import { css } from 'glamor'
import { useWindowSize } from './useWindowSize'
import Container from './Container'
import SpringCard from './SpringCard'
import {
  CARD_RATIO_UP,
  CARD_WIDTH_UP,
  M_UP,
  MOBILE_BREAKPOINT,
  REASONS_WEIGHT_CUTOFF
} from './constants'
import { shuffle } from 'd3-array'
import { CardHeader } from './Card'
import { colors, Interaction, fontStyles } from '@project-r/styleguide'
import data from './data'
import track from './share/piwik'

const styles = {
  cardContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100vw'
  }),
  bgCard: css({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    [M_UP]: {
      top: -20,
      border: '1px solid #1F1F1F',
      boxShadow: '3px 10px 6px -6px rgba(0, 0, 0, 0.5)',
      height: CARD_WIDTH_UP * CARD_RATIO_UP,
      width: CARD_WIDTH_UP
    },
    '&:after': {
      content: ' ',
      position: 'absolute',
      top: 30,
      left: -10,
      right: -10,
      borderBottom: `5px dotted ${colors.negative.divider}`,
      zIndex: 2
    }
  }),
  again: css({
    color: colors.negative.text,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: '1',
    justifyContent: 'center',
    paddingTop: 120,
    cursor: 'pointer'
  }),
  doneTitle: css({
    fontFamily: 'Comic Sans, Comic Sans MS, cursive',
    fontSize: 25,
    color: colors.negative.text,
    padding: '15px 30px 0',
    margin: 0
  }),
  resultsContainer: css({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  }),
  lovometerOuter: css({
    backgroundColor: colors.negative.lightFill,
    height: 8,
    margin: '5px 30px 30px',
    position: 'relative'
  }),
  lovometerInner: css({
    display: 'block',
    position: 'absolute',
    backgroundColor: '#f31d81',
    left: 0,
    top: 0,
    bottom: 0,
    width: 0,
    transition: 'width 0.5s ease-in-out 2s'
  }),
  guide: css({
    display: 'block',
    position: 'absolute',
    bottom: 20,
    left: '50%',
    marginLeft: -125,
    zIndex: 1000,
    pointerEvents: 'none',
    transition: 'opacity 0.4s'
  })
}

const TOTAL_REASONS = 101

const shuffleReasons = reasons => {
  const groupA = shuffle(reasons.filter(r => r.weight >= REASONS_WEIGHT_CUTOFF))
  const groupB = shuffle(reasons.filter(r => r.weight < REASONS_WEIGHT_CUTOFF))
  return groupA.concat(groupB).slice(0, TOTAL_REASONS)
}

const nNew = 5
const nOld = 3

const HeartString = ({ finalCount }) => {
  const [text, setText] = useState('')
  const textRef = useRef()
  textRef.current = text

  useEffect(() => {
    setText('')
    for (let i = 0; i < finalCount; i++) {
      setTimeout(() => {
        setText(textRef.current.concat('💖 '))
      }, 500 + i * 50)
    }
  }, [finalCount])

  return <Interaction.P style={{
    fontSize: `${Math.min(48, 12 + (36 / (finalCount / 5)))}px`,
    margin: '0 30px'
  }}>{text.trim()}</Interaction.P>
}

const Score = ({ finalCount }) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setWidth(100 * finalCount / TOTAL_REASONS)
    }, finalCount * 50)
  }, [finalCount])

  return <div {...styles.lovometerOuter}>
    <span {...styles.lovometerInner} style={{ width: `${width}%` }}/>
  </div>
}

const Deck = () => {
  const [allSwipes, setSwipes] = useState([])
  const [reasons, setReasons] = useState(data)
  const [hearts, setHearts] = useState('')
  const swipedMap = useMemo(() => {
    return new Map(allSwipes.map(swipe => [swipe.reasonId, swipe]))
  }, [allSwipes])
  const swipedLength = allSwipes.length
  const totalReasons = reasons.length

  const getUnswipedIndex = () => {
    const firstUnswipedIndex = reasons.findIndex(reason => {
      const swipe = swipedMap.get(reason.description)
      return !swipe
    })
    return firstUnswipedIndex === -1 ? totalReasons : firstUnswipedIndex
  }
  const topIndex = getUnswipedIndex()

  const [dragDir, setDragDir] = useState(false)

  const [windowWidth, windowHeight] = useWindowSize()
  const cardWidth =
    windowWidth > MOBILE_BREAKPOINT ? CARD_WIDTH_UP : windowWidth

  const dragTime = useRef(0)
  const onCard = useRef(false)

  const isDone = swipedLength >= totalReasons
  const reasonsCount = allSwipes.filter(s => s.dir === 1).length

  useEffect(() => {
    const onTouchMove = event => {
      if (onCard.current) {
        event.preventDefault()
      }
    }
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  const onSwipe = (swiped, reason) => {
    setSwipes(swipes => {
      track(['trackEvent', '101Reasons', swiped.dir > 0 ? 'yes' : 'no', swiped.reasonId])
      const newRecord = {
        ...swiped,
        cardCache: reason.payload ? reason : undefined,
        date: new Date().toISOString()
      }
      return swipes
        .filter(swipe => swipe.reasonId !== swiped.reasonId)
        .concat(newRecord)
    })
  }

  const bindGestures = useGesture(
    ({
      first,
      last,
      time,
      args: [set, card, isTop, index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      if (first) {
        dragTime.current = time
        onCard.current = true
      }
      if (last) {
        dragTime.current = time - dragTime.current
        onCard.current = false
      }

      const out = Math.abs(xDelta) > cardWidth * 0.4
      const trigger = velocity > 0.4 || out
      const dir = out ? (xDelta < 0 ? -1 : 1) : xDir < 0 ? -1 : 1

      if (!down && trigger) {
        onSwipe({ dir, xDelta, velocity, reasonId: card.description }, card)
        setDragDir(false)
        return
      }

      const newDragDir =
        (trigger && down && dir) ||
        (down && Math.abs(xDelta) > 10
          ? (Math.abs(xDelta) / (cardWidth * 0.4)) * 0.5 * (xDelta < 0 ? -1 : 1)
          : false)
      if (newDragDir !== dragDir) {
        setDragDir(newDragDir)
      }

      const x = down ? xDelta : 0
      const rot = down ? xDelta / 100 : 0
      const scale = down || isTop ? 1 : 1

      set({
        x,
        rot,
        scale,
        delay: undefined,
        config: {
          friction: 50,
          tension: down ? 800 : 500
        }
      })
    }
  )

  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      withHeight
    >
      {!!windowWidth && reasons.length && (
        <>
          <div {...styles.bgCard}>
            <CardHeader reason={!isDone && reasons[topIndex || 0]} totalReasons={totalReasons}/> }
            {isDone &&
            (<div {...styles.resultsContainer}>
              <h1 {...styles.doneTitle}>
                Sie haben {reasonsCount} {reasonsCount === 1 ? 'Grund' : 'Gründe'} für die Republik gesammelt.
              </h1>
              <div style={{ margin: 'auto' }}>
                <HeartString finalCount={reasonsCount}/>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <Interaction.P
                  style={{ color: colors.negative.text }}>{Math.round(100 * reasonsCount / TOTAL_REASONS)}%
                  Kompatibilität</Interaction.P>
                <Score finalCount={reasonsCount}/>
              </div>
            </div>)
            }
          </div>
          {reasons.map((reason, i) => {
            if (i + nOld < topIndex || i - nNew >= topIndex) {
              return null
            }
            const isTop = topIndex === i

            const swipe = swipedMap.get(reason.description)
            let swiped = swipe

            return (
              <SpringCard
                key={reason.description}
                index={i}
                reason={reason}
                swiped={swiped}
                dragTime={dragTime}
                windowWidth={windowWidth}
                cardWidth={cardWidth}
                isHot={isTop || Math.abs(topIndex - i) === 1}
                isTop={isTop}
                indicateDir={isTop && dragDir}
                zIndex={totalReasons - i}
                bindGestures={bindGestures}
              />
            )
          })}
        </>
      )}
      <svg width="249" height="107" viewBox="0 0 249 107" {...styles.guide} style={{
        opacity: swipedLength > 2 ? 0 : 1
      }}>
        <g transform="translate(-43)" fill="none" fillRule="evenodd">

          <text style={fontStyles.sansSerifRegular} fontSize="16" fill="#969696">
            <tspan x="43.63" y="84">Wischen Sie nach rechts wenn Ja,</tspan> <tspan x="89.1" y="105">nach links falls nicht.</tspan>
          </text>
        </g>
      </svg>
    </Container>
  )
}

export default Deck
