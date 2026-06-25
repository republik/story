import * as React from 'react'
import { css, selection } from 'glamor'
import groupBy from 'lodash/groupBy'
import range from 'lodash/range'
import IntersectionObserver from 'intersection-observer-polyfill'

import { COLORS } from '../theme'
import { PADDING, PADDING_MOBILE } from '../constants'
import { Interaction, mediaQueries } from '@project-r/styleguide'

import { CardType, Option } from '../types'
import useSize from '../hooks/useSize'
import PrimaryText from './text'
import { color } from 'd3-color'

export type Props = CardType & {
  active?: boolean
  onSelect?: (cardId: number, optionIds: number[]) => void
  selectedOption?: Option
  activeOptions: Option[]
  onVisibilityChange?: (id: number, visible: boolean) => void
  markerSize: number
}

const styles = {
  wrapper: css({
    position: 'relative',
    scrollSnapAlign: 'start',
    color: COLORS.textSecondary,
    borderTop: '1px solid #fff',
    background: COLORS.bgPrimary,
    marginBottom: PADDING_MOBILE,
    [mediaQueries.mUp]: {
      marginBottom: PADDING
    }
  }),
  title: css({
    padding: PADDING_MOBILE,
    marginBottom: 0,
    [mediaQueries.mUp]: {
      padding: PADDING
    }
  }),
  carousel: css({
    position: 'relative',
    width: 'auto',
    overflowX: 'scroll',
    paddingLeft: PADDING_MOBILE,
    paddingBottom: PADDING_MOBILE,
    [mediaQueries.mUp]: {
      paddingLeft: PADDING,
      paddingBottom: PADDING,
      overflowX: 'hidden'
    }
  }),
  buttons: css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'no-wrap'
  }),
  button: css({
    textAlign: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    minHeight: 50,
    border: '1px solid #fff',
    background: 'none',
    cursor: 'pointer',
    marginRight: PADDING_MOBILE,
    padding: PADDING_MOBILE,
    [mediaQueries.mUp]: {
      padding: PADDING,
      marginRight: PADDING,
      flexShrink: 1
    }
  }),
  buttonSelected: css({
    background: '#999'
  })
}

const Card: React.FC<Props> = ({
  id,
  description,
  options,
  onSelect,
  activeOptions = [],
  selectedOption,
  category,
  active,
  onVisibilityChange,
  markerSize
}) => {
  const cardRef = React.useRef(null)
  const mountedRef = React.useRef(false)
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (mountedRef.current) {
          onVisibilityChange && onVisibilityChange(id, entry.isIntersecting)
        } else {
          mountedRef.current = true
        }
      },
      {
        rootMargin: `20000px 0px 0px 0px`,
        threshold: 0.1
      }
    )
    observer.observe(cardRef.current)
    return () => {
      observer.unobserve(cardRef.current)
    }
  }, [cardRef.current])

  const size = useSize(cardRef)

  const categoryColor = COLORS.categories[category]

  const optionGroups = groupBy(options, o => o.option)

  return (
    <div
      {...styles.wrapper}
      style={{
        minHeight: 100,
        background: active ? categoryColor : '#eee',
        transition: 'background .1s ease-in'
      }}
    >
      <PrimaryText {...styles.title} large primary>
        {description}
      </PrimaryText>
      <div ref={cardRef} {...styles.carousel}>
        <div {...styles.buttons}>
          {activeOptions.map((o, i, arr) => (
            <div
              key={i}
              {...styles.button}
              style={{
                width:
                  activeOptions.length > 2
                    ? size.width / 2.5
                    : (size.width - 3 * size.padding) / 2,
                background:
                  o.option === selectedOption?.option
                    ? COLORS.bgSecondary
                    : 'none'
              }}
              onClick={() =>
                onSelect(
                  id,
                  optionGroups[o.option].map(j => j.id)
                )
              }
            >
              <PrimaryText
                margin
                style={{
                  color:
                    o.option === selectedOption?.option
                      ? COLORS.textSecondary
                      : COLORS.textPrimary
                }}
              >
                {o.option}
              </PrimaryText>
              <div>
                {range(Math.abs(o.delta / 100)).map(i => (
                  <span key={i} style={{ paddingRight: 1 }}>
                    <svg width={markerSize} height={markerSize}>
                      <circle
                        stroke={
                          o.option === selectedOption?.option
                            ? categoryColor
                            : '#fff'
                        }
                        strokeWidth={1}
                        fill={
                          o.delta < 0
                            ? 'none'
                            : o.option === selectedOption?.option
                            ? categoryColor
                            : '#fff'
                        }
                        cx={markerSize / 2}
                        cy={markerSize / 2}
                        r={markerSize / 2.7}
                      />
                    </svg>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card
