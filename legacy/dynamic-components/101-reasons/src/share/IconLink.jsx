import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'

import { mediaQueries, colors, useColorContext } from '@project-r/styleguide'

import DownloadIcon from 'react-icons/lib/md/file-download'
import MailIcon from 'react-icons/lib/md/mail-outline'
import FacebookIcon from 'react-icons/lib/fa/facebook'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import WhatsAppIcon from 'react-icons/lib/fa/whatsapp'
import TelegramIcon from './Telegram'
import ThreemaIcon from './Threema'
import MessengerIcon from './Messenger'
import SmsIcon from 'react-icons/lib/md/sms'
import LinkedInIcon from 'react-icons/lib/fa/linkedin-square'
import CopyIcon from 'react-icons/lib/md/content-copy'
import VideoIcon from './Video'

const DEFAULT_SIZE = 24
const DEFAULT_PADDING = 5

const stackedStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const mobileOnlyStyle = {
  [mediaQueries.mUp]: {
    display: 'none',
  },
}

const getExtraStyles = (mobileOnly, stacked) => {
  return css({
    ...(stacked && stackedStyle),
    ...(mobileOnly && mobileOnlyStyle),
  })
}

const solidScaleframes = css.keyframes({
  '0%': { transform: 'scale(0)' },
  '50%': { transform: 'scale(1.5)' },
  '100%': { transform: 'scale(1.5)' },
})

const solidOpacityKeyframes = css.keyframes({
  from: { opacity: 0.2 },
  to: { opacity: 0 },
})

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
    '@media(hover)': {
      '[href]:hover > *': {
        opacity: 0.6,
      },
    },
    ':first-child': {
      paddingLeft: 0,
    },
    ':last-child': {
      paddingRight: 0,
    },
  }),
  icon: css({
    position: 'relative',
    verticalAlign: 'middle',
  }),
  text: css({
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    paddingLeft: 3,
    verticalAlign: 'middle',
  }),
  stackedText: css({
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginTop: 'auto',
    paddingTop: 5,
  }),
  mobileOnly: css({
    [mediaQueries.mUp]: {
      display: 'none',
    },
  }),
  solid: css({
    position: 'absolute',
    top: 0.5,
    left: 0,
    borderRadius: '50%',
    backgroundColor: colors.primary,
    animation: [
      `${solidScaleframes} 1.8s cubic-bezier(0.8, 0, 0.8, 1) alternate both`,
      `${solidOpacityKeyframes} 1.3s cubic-bezier(0.8, 0, 0.8, 1) both`,
    ].join(','),
  }),
}

const ICONS = {
  copy: CopyIcon,
  download: DownloadIcon,
  facebook: FacebookIcon,
  mail: MailIcon,
  twitter: TwitterIcon,
  whatsapp: WhatsAppIcon,
  telegram: TelegramIcon,
  threema: ThreemaIcon,
  linkedin: LinkedInIcon,
  messenger: MessengerIcon,
  sms: SmsIcon,
  video: VideoIcon,
}

const IconLink = ({
  href,
  target,
  icon,
  children,
  size = DEFAULT_SIZE,
  mobileOnly,
  style,
  title,
  onClick,
  stacked,
}) => {
  const [colorScheme] = useColorContext()
  const Icon = ICONS[icon]

  return (
    <a
      {...styles.link}
      {...getExtraStyles(mobileOnly, stacked)}
      href={href}
      onClick={onClick}
      style={style}
      target={target}
      rel={target === '_blank' ? 'noopener' : ''}
      title={title}
    >
      <span {...styles.icon}>
        <Icon {...colorScheme.set('fill', 'text')} size={size} />
      </span>
      {children && (
        <span {...(stacked ? styles.stackedText : styles.text)}>
          {children}
        </span>
      )}
    </a>
  )
}

IconLink.propTypes = {
  icon: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
}

export default IconLink
