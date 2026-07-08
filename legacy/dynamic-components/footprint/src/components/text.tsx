import * as React from 'react'
import { mediaQueries, Interaction } from '@project-r/styleguide'
import { COLORS } from '../theme'
import { PADDING_MOBILE, PADDING } from '../constants'
import { css } from 'glamor'

export function Text({
  children,
  onClick = () => {},
  style = {},
  large = false,
  primary = false,
  margin = false,
  padding = false,
  ...rest
}) {
  const Wrapper = large ? Interaction.H3 : Interaction.P

  return (
    <Wrapper
      onClick={onClick && onClick}
      {...(margin && css({
        margin: `${PADDING_MOBILE}px 0`,
        [mediaQueries.mUp]: {
          margin: `${PADDING}px 0`
        }
      }))}
      {...(margin && css({
        padding: `0 ${PADDING_MOBILE}px`,
        [mediaQueries.mUp]: {
          padding: `0`
        }
      }))}
      style={{
        color: primary ? COLORS.textPrimary : COLORS.textSecondary,
        lineHeight: 1.3,
        ...style
      }}
      {...rest}
    >
      {children}
    </Wrapper>
  )
}

export default Text
