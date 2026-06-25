import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'

import {
  mediaQueries
} from '@project-r/styleguide'

import DownloadIcon from 'react-icons/lib/md/file-download'
import FacebookIcon from 'react-icons/lib/fa/facebook'
import MailIcon from 'react-icons/lib/md/mail-outline'
import ShareIcon from 'react-icons/lib/md/share'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import WhatsappIcon from 'react-icons/lib/fa/whatsapp'

const DEFAULT_SIZE = 24
const DEFAULT_PADDING = 5

const prefixHover = (selector = ':hover') => `.hover &${selector}`

const stackedStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const mobileOnlyStyle = {
  [mediaQueries.mUp]: {
    display: 'none'
  }
}

const getExtraStyles = (mobileOnly, stacked) => {
  return css({
    ...(stacked && stackedStyle),
    ...(mobileOnly && mobileOnlyStyle)
  })
}

export const styles = {
  link: css({
    color: 'inherit',
    display: 'inline-block',
    maxWidth: '100%',
    textDecoration: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    paddingLeft: DEFAULT_PADDING,
    paddingRight: DEFAULT_PADDING,
    [prefixHover('[href]:hover > *')]: {
      opacity: 0.6
    },
    ':first-child': {
      paddingLeft: 0
    },
    ':last-child': {
      paddingRight: 0
    }
  }),
  text: css({
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    verticalAlign: 'middle'
  }),
  stackedText: css({
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginTop: 5
  }),
  mobileOnly: css({
    [mediaQueries.mUp]: {
      display: 'none'
    }
  })
}

const ICONS = {
  download: DownloadIcon,
  facebook: FacebookIcon,
  mail: MailIcon,
  share: ShareIcon,
  twitter: TwitterIcon,
  whatsapp: WhatsappIcon,
}

const IconLink = ({
  href,
  target,
  fill,
  icon,
  children,
  size = DEFAULT_SIZE,
  mobileOnly,
  style,
  title,
  onClick,
  stacked
}) => {
  const Icon = ICONS[icon]

  return (
    <a
      {...styles.link}
      {...(getExtraStyles(mobileOnly, stacked))}
      href={href}
      onClick={onClick}
      style={style}
      target={target}
      rel={target === '_blank' ? 'noopener' : ''}
      title={title}
    >
      <Icon fill={fill} size={size} />
      {children && (
        <span {...(stacked ? styles.stackedText : styles.text)}>
          {!stacked && (
            <Fragment>&nbsp;</Fragment>
          )}{children}
        </span>
      )}
    </a>
  )
}

IconLink.propTypes = {
  icon: PropTypes.oneOf(Object.keys(ICONS)).isRequired
}

export default IconLink
