import React, { useMemo } from 'react'
import { css } from 'glamor'

import { Interaction, colors, mediaQueries, useHeaderHeight } from '@project-r/styleguide'

import Flags from './cantons/Flags'

import { createOnSlugClick } from './utils'
import Anchor from './Anchor'

const CantonList = ({ id, list = [], containerStyle, maxWidth = 665, width = 145, widthMUp = 220, align = 'left' }) => {
  const hasDetails = list.some(d => d.detail)
  const SIZE = hasDetails ? 40 : 30
  const WIDTH = width
  const WIDTH_MUP = widthMUp
  const MARGIN_Y = 10

  const [ headerHeight ] = useHeaderHeight()

  const styles = useMemo(() => ({
    cantons: css({
      paddingTop: MARGIN_Y * 2,
      maxWidth: maxWidth,
      margin: '0 auto',
      textAlign: align
    }),
    canton: css(Interaction.fontRule, {
      verticalAlign: 'top',
      fontSize: 14,
      position: 'relative',
      paddingLeft: SIZE + 10,
      paddingTop: 0,
      display: 'inline-block',
      color: colors.text,
      marginBottom: MARGIN_Y,
      textAlign: 'left',
      width: WIDTH,
      height: SIZE + MARGIN_Y,
      [mediaQueries.mUp]: {
        width: WIDTH_MUP,
        fontSize: 16
      }
    }),
    detail: css({
      fontSize: 12,
      [mediaQueries.mUp]: {
        fontSize: 14
      }
    }),
    link: css({
      display: 'inline-block',
      color: colors.text,
      textDecoration: 'none',
      '@media(hover)': {
        '[href]:hover > *': {
          opacity: 0.8
        }
      }
    }),
    linkTwoLines: css({
      paddingTop: 2,
      [mediaQueries.mUp]: {
        paddingTop: 1
      }
    }),
    linkOneLine: css({
      paddingTop: 7,
      [mediaQueries.mUp]: {
        paddingTop: 6
      }
    }),
    flag: css({
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0
    }),
    updated: css({
      borderLeft: `3px solid ${colors.primary}`,
      paddingLeft: 7,
      marginLeft: -10
    })
  }), [])

  return <div style={containerStyle}>
    {id && <Anchor offset={0} id={id} />}
    <div {...styles.cantons}>
      {list.map((item, i) => {
        const Flag = Flags[item.abbr] || null
        const { href } = item

        return (
          <div {...styles.canton} key={item.abbr || i}>
            <a {...styles.link} {...(hasDetails || item.name.length >= 16 ? styles.linkTwoLines : styles.linkOneLine)} href={href} onClick={createOnSlugClick(href)}>
              {Flag && <span {...styles.flag} {...item.updated && styles.updated} style={{ height: SIZE }}>
                <Flag size={SIZE} />
              </span>}
              <strong>{item.name}</strong>
              {!!item.detail && <>
                <br />
                <span {...styles.detail}>{item.detail}</span>
              </>}
            </a>
          </div>
        )
      })}
    </div>
  </div>
}

export default CantonList
