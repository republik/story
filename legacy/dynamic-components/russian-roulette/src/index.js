import React, { useRef, useState, useEffect } from 'react'
import { css } from 'glamor'
import { plainButtonRule, fontStyles } from '@project-r/styleguide'
import Lottie from 'lottie-react'
import animationData from './data.json'

const SHOT_HEIGHT = 58

const styles = {
  button: css({
    ...fontStyles.sansSerifMedium,
    fontSize: 16,
    lineHeight: '20px',
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    float: 'right',
    zIndex: 1,
    position: 'absolute',
    right: 10,
    bottom: '10%',
    borderRadius: '20px'
  }),
  shots: css({
    float: 'right'
  })
}

const Index = ({ ratio = 0.5, labels = {} }) => {
  const [isReady, setIsReady] = useState(false)
  const [history, setHistory] = useState([])
  const goFast = history.length > 0
  const lottieRef = useRef()
  const lastShot = useRef()
  const needsReload = useRef()

  const [shotHeight, setShotHeight] = useState(SHOT_HEIGHT)
  const [rows, setRows] = useState(2)
  const containerRef = useRef()

  const addShot = shot => setHistory(current => [shot, ...current.slice(0, 9)])
  useEffect(() => {
    lottieRef.current.playSegments([0, 170], true)
    const calcShotHeight = () => {
      const { width } = containerRef.current.getBoundingClientRect()
      const n = width / 10 >= 40 ? 10 : 5
      setShotHeight(width / n)
      setRows(10 / n)
    }
    window.addEventListener('resize', calcShotHeight)
    calcShotHeight()
    return () => {
      window.removeEventListener('resize', calcShotHeight)
    }
  }, [])

  return (
    <>
      <div style={{ position: 'relative' }} ref={containerRef}>
        <Lottie
          animationData={animationData}
          autoplay={false}
          loop={false}
          lottieRef={lottieRef}
          onComplete={(...args) => {
            if (needsReload.current) {
              needsReload.current = false
              setTimeout(() => {
                lottieRef.current.setSpeed(goFast ? 1 : 0.75)
                lottieRef.current.playSegments([300, 330])
              }, goFast ? 100 : 200)
            }
            if (!isReady) {
              setIsReady(true)
            }
          }}
        />
        <button {...plainButtonRule} {...styles.button} style={{
          opacity: isReady ? 1 : 0
        }} onClick={() => {
          if (lastShot.current) {
            addShot(lastShot.current)
            lastShot.current = undefined
          }
          setIsReady(false)
          const hit = Math.random() <= ratio
          lastShot.current = {
            time: Date.now(),
            hit
          }
          lottieRef.current.setSpeed(1)
          lottieRef.current.playSegments([180, 191], true)
          lottieRef.current.playSegments(hit ? [210, 270] : [270, 292])
          needsReload.current = true
          setTimeout(() => {
            if (lastShot.current) {
              addShot(lastShot.current)
              lastShot.current = undefined
            }
          }, 400)
        }}>
          {labels.shoot || 'ABDRÜCKEN'}
        </button>
      </div>
      <div {...styles.shots} style={{ minHeight: rows * shotHeight }}>
        {history.map(d => (
          <Shot size={shotHeight} hit={d.hit} key={d.time} />
        ))}
      </div>
      <br style={{ clear: 'right' }} />
    </>
  )
}

const Shot = ({ hit, size = 100 }) => {
  return <svg style={{ float: 'right' }} width={size} height={size} viewBox='0 0 100 100'>
    <circle cx='50' cy='50' r='30.87' fill='none' stroke='red' strokeMiterlimit='10' strokeWidth='4.15'/>
    {hit && <path fill='red' d='M56.36 41.3l37.66-20.18L61.16 47.8l23.04-2.31-24.53 6.38 30.55 16.95-29.56-8.72 5.7 24.5-15.84-20.53L36.5 91.93 43 59.95 21.48 72.52l18.68-16.17-15.04 1.99 10.01-6.18L.87 50l33.72-3.71-20.92-10.9 23.87 6.01-5.79-25.37 17.52 20.9 4.31-12.41.22 6.95L63.93 5.39 56.36 41.3z' />}
  </svg>
}

export default Index
