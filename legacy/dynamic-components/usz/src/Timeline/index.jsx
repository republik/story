import * as React from 'react'
import TimelineItem from './TimelineItem'
import { css } from 'glamor'
import {
  mediaQueries,
  Editorial,
  fontStyles,
  Overlay,
  OverlayBody,
  useColorContext,
  plainButtonRule,
} from '@project-r/styleguide'
import { MdClose } from '@react-icons/all-files/md/MdClose'

const styles = {
  header: css({
    paddingBottom: 36,
    marginTop: 0,
  }),
  item: css({
    ...fontStyles.sansSerifRegular14,
    [mediaQueries.mUp]: {
      ...fontStyles.sansSerifRegular15,
    },
    display: 'flex',
    flexDirection: 'column',
    borderLeft: `2px solid`,
    [mediaQueries.onlyS]: {
      marginLeft: 0,
    },
    paddingLeft: 18,
    paddingBottom: 45,
  }),
  timestamp: css({
    ...fontStyles.serifTitle22,
    [mediaQueries.mUp]: {
      ...fontStyles.serifTitle22,
    },
    lineHeight: 1.5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -29,
    paddingLeft: 0,
  }),
  closeButton: css({
    position: 'absolute',
    padding: 8,
    top: 0,
    right: 0,
  }),
  closeButtonFixed: css({
    position: 'fixed',
    padding: 8,
    top: 0,
    right: 0,
    [mediaQueries.mUp]: {
      display: 'none',
    },
  }),
  corrective: css({
    ...fontStyles.serifRegular14
  })
}

const TimestampIcon = React.memo(({ width = 20, height = 20 }) => {
  const [colorScheme] = useColorContext()
  return (
    <svg width={width} height={height}>
      <circle
        cx={height / 2}
        cy={height / 2}
        r={10}
        {...colorScheme.set('fill', 'overlay')}
      />
      <circle
        cx={height / 2}
        cy={height / 2}
        r={5}
        {...colorScheme.set('fill', 'text')}
      />
    </svg>
  )
})

const Timeline = ({ timeline, utm, onClose, corrective }) => {
  const [colorScheme] = useColorContext()
  return (
    <Overlay
      mUpStyle={{ width: '80%', maxWidth: 720, maxHeight: 'none' }}
      onClose={onClose}
    >
      <button {...styles.closeButton} {...plainButtonRule} onClick={onClose}>
        <MdClose size={32} />
      </button>

      <OverlayBody>
        <button
          {...styles.closeButtonFixed}
          {...plainButtonRule}
          {...colorScheme.set('backgroundColor', 'overlay')}
          onClick={onClose}
        >
          <MdClose size={32} />
        </button>

        <Editorial.Headline {...styles.header}>
          Die Chronologie
        </Editorial.Headline>
        {timeline.map((item, j) => (
          <div
            key={j}
            {...styles.item}
            {...colorScheme.set('borderColor', 'text')}
            style={{
              paddingBottom: j === timeline.length - 1 ? 0 : undefined,
            }}
          >
            <div {...styles.timestamp} style={{ marginTop: j === 0 ? -10 : 0 }}>
              <TimestampIcon />
              <span style={{ marginLeft: 10 }}>{item.date}</span>
            </div>
            <TimelineItem item={item} />
          </div>
        ))}
        { corrective && (
          <p {...styles.corrective}>{corrective}</p>
        )}
      </OverlayBody>
    </Overlay>
  )
}

export default Timeline
