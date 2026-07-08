import scrollIntoView from 'scroll-into-view'
import DownIcon from 'react-icons/lib/md/keyboard-arrow-down'
import React from 'react'
import { merge, css } from 'glamor'
import { colors, fontStyles } from '@project-r/styleguide'
import UpIcon from 'react-icons/lib/md/keyboard-arrow-up'
import { M_UP } from './constants'

const styles = {
  shared: css({
    cursor: 'pointer',
    textAlign: 'center',
    color: colors.negative.text,
    '& p': {
      ...fontStyles.sansSerifMedium14
    },
    '& svg': {
      fontSize: 32,
      opacity: 0.7,
      [M_UP]: {
        fontSize: 37
      }
    }
  }),
  up: css({
    '& p': {
      marginTop: 0
    }
  }),
  down: css({
    '& p': {
      marginBottom: 0
    }
  }),
}

export const scrollToId = (id, event) => {
  if (event) {
    event.stopPropagation()
  }
  scrollIntoView(
    document.getElementById(id),
    {
      time: 300,
      align: {
        top: 1
      }
    })
}

export const ScrollDown = ({ id, text }) => (
  <div {...merge(styles.shared, styles.down)}
       onClick={(e) => scrollToId(id, e)}>
    <p>{text}</p>
    <DownIcon />
  </div>
)

export const ScrollUp = ({ id, text }) => (
  <div {...merge(styles.shared, styles.up)}
       onClick={(e) => scrollToId(id, e)}>
    <UpIcon/>
    <p>{text}</p>
  </div>
)