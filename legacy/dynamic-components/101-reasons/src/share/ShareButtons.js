import React, { useState, useEffect } from 'react'
import { css } from 'glamor'
import copyToClipboard from 'clipboard-copy'
import IconLink from './IconLink'
import { mediaQueries, useColorContext } from '@project-r/styleguide'
import { useWindowSize } from '../useWindowSize'
import track from './piwik'

const styles = {
  buttonGroup: css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    '& > a': {
      flex: 'auto',
      marginTop: 15,
      flexGrow: 0,
    },
    '@media print': {
      display: 'none',
    },
  }),
}

const ShareButtons = ({
  body,
  subject, // needed for email
  url,
  videoUrl, // needed for video
  icons,
  style,
}) => {
  const [colorScheme] = useColorContext()
  const [copyLinkStatus, setLinkCopyStatus] = useState(null)
  const [windowWidth, windowHeight] = useWindowSize()
  useEffect(() => {
    if (copyLinkStatus === 'success') {
      const timeout = setTimeout(() => {
        setLinkCopyStatus()
      }, 5 * 1000)
      return () => clearTimeout(timeout)
    }
  }, [copyLinkStatus])

  const isMobile = windowWidth < mediaQueries.mBreakPoint
  const isAndroidApp =
    window &&
    window.navigator &&
    !!window.navigator.userAgent.match(/RepublikApp/) &&
    !!window.navigator.userAgent.match(/android/i)

  const encodedSubject = encodeURIComponent(subject)
  const encodedBody = encodeURIComponent(body)
  const encodedBodyShort = encodeURIComponent(body.slice(0, 253) + '...')
  const encodedUrl = encodeURIComponent(url)

  const shareOptions = [
    {
      target: '_blank',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: 'facebook',
      label: 'Facebook',
      title: 'Auf Facebook teilen',
    },
    {
      target: '_blank',
      href: `https://twitter.com/intent/tweet?text=${encodedBody}`,
      icon: 'twitter',
      label: 'Twitter',
      title: 'Auf Twitter teilen',
    },
    {
      target: '_blank',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`,
      icon: 'linkedin',
      label: 'LinkedIn',
      title: 'Auf LinkedIn teilen',
    },
    {
      href: `mailto:?subject=${encodedSubject}&body=${encodedBody}`,
      icon: 'mail',
      label: 'E-Mail',
      title: 'Per E-Mail verschicken',
    },
    {
      target: '_blank',
      href: `https://api.whatsapp.com/send?text=${encodedBody}`,
      icon: 'whatsapp',
      label: 'WhatsApp',
      title: 'Auf WhatsApp teilen',
    },
    {
      target: '_blank',
      href: `tg://msg?text=${encodedBody}`,
      icon: 'telegram',
      label: 'Telegram',
      title: 'Auf Telegram teilen',
      mobileOnly: true,
    },
    {
      target: '_blank',
      href: `threema://compose?text=${encodedBody}`,
      icon: 'threema',
      label: 'Threema',
      title: 'Auf Threema teilen',
      mobileOnly: true,
    },
    {
      target: '_blank',
      href: `fb-messenger://share?link=${encodedUrl}`,
      icon: 'messenger',
      label: 'Messenger',
      title: 'Auf Messenger teilen',
      mobileOnly: true,
    },
    {
      target: '_blank',
      href: `sms://;?&body=${encodedBody}`,
      icon: 'sms',
      label: 'SMS',
      title: 'Per SMS verschicken',
      mobileOnly: true,
    },
    {
      target: '_blank',
      href: videoUrl,
      icon: 'video',
      label: 'Video',
      title: 'Video herunterladen',
    },
    {
      href: '#',
      icon: 'copy',
      smaller: true,
      title: 'Inhalt kopieren',
      label:
        copyLinkStatus === 'success' ? 'Inhalt kopiert!' : 'Inhalt kopieren',
      onClick: (e) => {
        e.preventDefault()
        copyToClipboard(body)
          .then(() => setLinkCopyStatus('success'))
          .catch(() => setLinkCopyStatus('error'))
      },
      disableOnAndroidApp: true,
      style: {
        minWidth: 105,
      },
    },
  ]

  return (
    <div {...styles.buttonGroup} style={style}>
      {shareOptions
        .filter((option) =>
          icons && icons.length
            ? icons.find((icon) => option.icon === icon)
            : true
        )
        .filter((option) => !option.mobileOnly || isMobile)
        .filter((option) => !isAndroidApp || !option.disableOnAndroidApp)
        .map((props) => (
          <IconLink
            key={props.icon}
            size={props.smaller ? 28 : 32}
            stacked
            {...props}
            onClick={(e) => {
              track(['trackEvent', 'ShareKampa', props.icon])
              if (props.onClick) {
                return props.onClick(e)
              }
            }}
            style={
              isMobile
                ? {
                    padding: 0,
                    width: '33%',
                    ...props.style,
                  }
                : {
                    marginRight: 20,
                    ...props.style,
                  }
            }
          >
            {props.label}
          </IconLink>
        ))}
    </div>
  )
}

export default ShareButtons
