import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'

import {
  mediaQueries,
  fontStyles,
  useColorContext,
  convertStyleToRem,
  pxToRem,
} from '@project-r/styleguide'
import { PADDING } from './Center'

const styles = {
  caption: css({
    margin: '5px auto 0 auto',
    width: '100%',
    maxWidth: `calc(100vw - ${PADDING * 2}px)`,
    ...convertStyleToRem(fontStyles.sansSerifRegular12),
    [mediaQueries.mUp]: {
      ...convertStyleToRem(fontStyles.sansSerifRegular15),
      lineHeight: pxToRem('18px'),
    },
  }),
}

export const Caption = ({ children, attributes }) => {
  const [colorScheme] = useColorContext()

  return (
    <figcaption
      {...colorScheme.set('color', 'text')}
      {...attributes}
      {...styles.caption}
    >
      {children}
    </figcaption>
  )
}

Caption.propTypes = {
  children: PropTypes.node.isRequired,
  attributes: PropTypes.object,
}

export default Caption
