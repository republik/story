import React from 'react'
import { css } from 'glamor'
import { colors, mediaQueries } from '@project-r/styleguide'
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE } from './constants'
import { scrollToId } from './Scroll'

const styles = {
  container: css({
    position: 'relative',
    backgroundColor: colors.negative.primaryBg,
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    height: `calc(100vh - ${HEADER_HEIGHT_MOBILE}px)`,
    [mediaQueries.mUp]: {
      height: 750
    }
  })
}

const Container = ({ children, style = {} }) => {
  return (
    <div
      {...styles.container}
      style={style}
    >
      {children}
    </div>
  )
}

export default Container
