import React from 'react'
import Comments from './Comments'
import PressQuotes from './Press'

import { mediaQueries, Breakout } from '@project-r/styleguide'
import { css } from 'glamor'

const styles = {
  wrapper: css({
    margin: `30px 0`,
    [mediaQueries.lUp]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
  col: css({
    [mediaQueries.lUp]: {
      width: '47.5%'
    }
  })
}

const Quotes = ({ comments, press }) => (
  <Breakout size='breakout'>
  <div {...styles.wrapper}>
    <div {...styles.col}>
      <Comments comments={comments} />
    </div>
    <div {...styles.col}>
      <PressQuotes quotes={press} />
    </div>
  </div>
  </Breakout>
)

export default Quotes
