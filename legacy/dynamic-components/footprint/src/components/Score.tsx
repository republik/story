import * as React from 'react'
import { COLORS } from '../theme'
import { css } from 'glamor'
import { PADDING, PADDING_MOBILE } from '../constants'
import { mediaQueries } from '@project-r/styleguide'
import { CardType, GameState, Profile, Size } from '../types'
import { findActiveOptions } from '../utils'
import { useSpring, animated, useTransition } from 'react-spring'
import PrimaryText from './text'
import range from 'lodash/range'
import flatMap from 'lodash/flatMap'

type Props = {
  share?: boolean
  size: Size
  rows: any[]
  scoreTotal: number
  budgetTotal: number
  score: any
  displayScore: any
  markerSize: number
}

const styles = {
  wrapper: css({
    position: 'relative',
    color: COLORS.textPrimary,
    background: COLORS.bgPrimary,
    padding: PADDING_MOBILE,
    [mediaQueries.mUp]: {
      padding: PADDING
    }
  }),
  dots: css({
    position: 'absolute',
    top: 0,
    left: 0
  }),
  footer: css({
    display: 'flex',
    justifyContent: 'space-between'
  }),
  legend: css({
    paddingRight: 5,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  })
}

const Score: React.FC<Props> = ({
  share,
  size,
  rows = [],
  scoreTotal,
  budgetTotal,
  score,
  displayScore,
  markerSize
}) => {
  const width = size.width - 2 * (size.mobile ? PADDING_MOBILE : PADDING)

  const height = rows[0].length * markerSize

  // const [props, set] = useSpring(() => ({
  //   r: 1,
  //   config: { duration: 50 }
  // }))

  // React.useEffect(() => {
  //   set({ r: cellSize / 2.5 })
  //   setTimeout(() => {
  //     set({ r: cellSize / 2.5 })
  //   }, 50)
  // }, [scoreTotal])

  const fills = flatMap(displayScore, ([k, v]) =>
    range(v).map(j => COLORS.categories[k])
  )

  const percent = 100 * (scoreTotal / budgetTotal)

  return (
    <div {...(!share && styles.wrapper)}>
      <div
        style={share ? {
          height: size.height - 2*size.padding,
          width: size.width - 2*size.padding,
          padding: size.padding,
          display: 'flex',
          background: COLORS.bgPrimary,
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'content-box',
        } : {}}
      >
        {share && (
          <div style={{ paddingBottom: 20 }}>
            <PrimaryText
              primary
              style={{
                whiteSpace: 'nowrap',
                paddingRight: 0,
                paddingTop: 3,
                fontSize: 30
              }}
            >
              <svg
                width={markerSize}
                height={markerSize}
                style={{ verticalAlign: 'middle', marginRight: 0 }}
              >
                <circle
                  cx={markerSize / 2}
                  cy={markerSize / 2}
                  r={markerSize / 2.7}
                  strokeWidth={1}
                  stroke={'#fff'}
                  fill={'none'}
                />
              </svg>{' '}
              = 100 kg CO₂
            </PrimaryText>
          </div>
        )}
        {/* <div>
        Budget: {budgetTotal}kg / Score: {budgetTotal - scoreTotal}kg / cells: {cells.length} / 1 cell ={' '}
        {Math.round(budgetTotal / cells.length)}kg / Target {Math.floor(cells.length / 2)}
      </div> */}
        <svg width={width} height={height}>
          <g transform={`translate(${markerSize / 2},${markerSize / 2})`}>
            {rows.map((c, i) =>
              c.map((v: number, j) => {
                return (
                  <g key={v}>
                    <circle
                      key={`${i}-${j}`}
                      r={markerSize / 2.7}
                      cx={i * markerSize}
                      cy={j * markerSize}
                      stroke={'#777'}
                      strokeWidth={share || fills[v] ? 0 : 1}
                      fill={fills[v] || COLORS.bgPrimary}
                    ></circle>
                  </g>
                )
              })
            )}
          </g>
          <text
            textAnchor='middle'
            fill='#fff'
            fontSize={size.mobile ? 60 : size.width / 5}
            x={width / 2}
            y={height / 2 + size.width / 15}
            style={{
              opacity: percent !== 100 ? 1 : 0,
              transition: 'opacity .1s ease-in'
            }}
          >
            {percent > 100 ? '+' : '-'}
            {Math.abs(100 - Math.floor(percent)).toFixed(0)} %
          </text>
        </svg>
        <div {...styles.footer}>
          {!share && (
            <div>
              <PrimaryText
                primary
                style={{
                  whiteSpace: 'nowrap',
                  paddingRight: 10,
                  paddingTop: 3,
                  fontSize: 12
                }}
              >
                <svg
                  width={markerSize}
                  height={markerSize}
                  style={{ verticalAlign: 'middle', marginRight: 2 }}
                >
                  <circle
                    cx={markerSize / 2}
                    cy={markerSize / 2}
                    r={markerSize / 2.7}
                    strokeWidth={1}
                    stroke={'#fff'}
                    fill={'none'}
                  />
                </svg>
                = 100 kg CO₂
              </PrimaryText>
            </div>
          )}

          <div {...styles.legend}>
            {score.map(([k, v]) => (
              <PrimaryText
                key={k}
                primary
                style={{
                  whiteSpace: 'nowrap',
                  paddingRight: 10,
                  paddingTop: 3,
                  fontSize: share ? 30 : 12
                }}
              >
                <svg
                  width={markerSize}
                  height={markerSize}
                  style={{ verticalAlign: 'middle', marginRight: 2 }}
                >
                  <circle
                    cx={markerSize / 2}
                    cy={markerSize / 2}
                    r={markerSize / 2.7}
                    fill={COLORS.categories[k]}
                  />
                </svg>
                {k}
              </PrimaryText>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Score
