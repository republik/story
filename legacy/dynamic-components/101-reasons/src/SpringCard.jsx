import React, { useState, useEffect } from 'react'
import { useSpring, animated, interpolate } from 'react-spring/web.cjs'
import { css } from 'glamor'
import { usePrevious } from '@project-r/styleguide'
import Card from './Card'
import { CARD_RATIO_UP, CARD_WIDTH_UP, M_UP } from './constants'

const styles = {
  card: css({
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [M_UP]: {
      alignItems: 'center',
    }
  }),
  cardInner: css({
    position: 'relative',
    userSelect: 'none',
    overflow: 'hidden',
    height: ['90%', 'calc(100% - 40px)'],
    marginTop: 40,
    [M_UP]: {
      marginTop: 40,
      height: CARD_WIDTH_UP * CARD_RATIO_UP
    }
  })
}

const to = () => ({
  x: 0,
  y: -5 + Math.random() * 10,
  scale: 1,
  rot: 0,
  opacity: 1
})
const fromFall = () => ({
  x: 0,
  y: -1200,
  scale: 1.5,
  rot: 0,
  opacity: 1
})
const fromSwiped = ({ dir, velocity, xDelta }, windowWidth) => ({
  x: (200 + windowWidth) * dir,
  // how much the card tilts, flicking it harder makes it rotate faster
  rot: xDelta / 100 + dir * 10 * velocity,
  scale: 1
})

const interpolateTransform = (r, s) =>
  `rotateY(${r / 10}deg) rotateZ(${-r}deg) scale(${s})`

const SpringCard = ({
  index,
  zIndex,
  reason,
  bindGestures,
  cardWidth,
  fallIn,
  isTop,
  isHot,
  swiped,
  windowWidth,
  indicateDir,
  indicatePastDir
}) => {
  const [props, set] = useSpring(() =>
    fallIn && !swiped
      ? { ...to(), delay: fallIn * 100, from: fromFall() }
      : {
        ...to(),
        ...(swiped && fromSwiped(swiped, windowWidth)),
        from: { opacity: 1 }
      }
  )
  const { x, y, rot, scale, opacity } = props
  const wasTop = usePrevious(isTop)
  const wasSwiped = usePrevious(swiped)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    if (swiped) {
      set({
        ...fromSwiped(swiped, windowWidth),
        delay: undefined,
        config: {
          friction: 50,
          tension: 200
        }
      })
    } else if (isTop) {
      set({
        scale: 1,
        rot: 0,
        x: 0
      })
    } else if (wasTop || wasSwiped) {
      set(to())
    }
  }, [swiped, isTop, wasTop, wasSwiped, windowWidth])

  const willChange = isHot ? 'transform' : undefined
  const dir =
    indicateDir ||
    (swiped && swiped.dir) ||
    (slide === 0 && indicatePastDir && indicatePastDir * 0.8)

  return (
    <animated.div
      {...styles.card}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
        zIndex: isTop ? 5 : isHot ? 4 : 3,
        willChange
      }}
    >
      <animated.div
        {...(swiped
          ? undefined // prevent catching a card after swiping
          : bindGestures(set, reason, isTop, index))}
        {...styles.cardInner}
        style={{
          width: cardWidth,
          opacity,
          transform: interpolate([rot, scale], interpolateTransform),
          willChange
        }}
      >
        <Card reason={reason} swipeDir={dir}/>
      </animated.div>
    </animated.div>
  )
}

export default SpringCard