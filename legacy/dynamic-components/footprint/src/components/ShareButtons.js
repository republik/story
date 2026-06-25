import React, { useState, useEffect } from 'react'

import { css } from 'glamor'

import IconLink from './IconLink'

import copyToClipboard from 'clipboard-copy'

const styles = {
  buttonGroup: css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    '& > a': {
      flex: 'auto',
      marginTop: 15,
      marginBottom: 15,
      flexGrow: 0
    },
    '@media print': {
      display: 'none'
    }
  })
}

const ShareButtons = ({
  url,
  tweet,
  emailSubject,
  emailBody,
  emailAttachUrl,
  fill = '#000',
  grid = false,
  onClose = () => {}
}) => {
  const [copyLinkSuffix, setLinkCopySuffix] = useState()
  useEffect(
    () => {
      if (copyLinkSuffix === 'success') {
        const timeout = setTimeout(
          () => {
            setLinkCopySuffix()
          },
          5 * 1000
        )
        return () => clearTimeout(timeout)
      }
    },
    [copyLinkSuffix]
  )

  const emailAttache = emailAttachUrl ? `\n\n${url}` : ''

  const shareOptions = [
    {
      target: '_blank',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      icon: 'facebook',
      title: 'Auf Facebook teilen',
      label: 'Facebook'
    },
    {
      target: '_blank',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweet
      )}&url=${encodeURIComponent(url)}`,
      icon: 'twitter',
      title: 'Auf Twitter teilen',
      label: 'Twitter'
    },
    {
      target: '_blank',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
      icon: 'whatsapp',
      title: 'Auf WhatsApp teilen',
      label: 'WhatsApp'
    },
    {
      href: `mailto:?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody + emailAttache)}`,
      icon: 'mail',
      title: 'Per E-Mail verschicken',
      label: 'E-Mail'
    },
    {
      href: url,
      icon: 'copyLink',
      title: 'Link kopieren',
      label: copyLinkSuffix === 'success' 
        ? 'Link kopiert!'
        : copyLinkSuffix === 'error'
          ? 'Nicht unterstützt :('
          : 'Link kopieren',
      onClick: (e) => {
        e.preventDefault()
        copyToClipboard(url)
          .then(() => setLinkCopySuffix('success'))
          .catch(() => setLinkCopySuffix('error'))
      },
      style: {
        minWidth: 105
      }
    }
  ]

  return (
    <div {...styles.buttonGroup}>
      {shareOptions.map((props, i) => (
        <IconLink
          key={props.icon}
          fill={fill}
          size={32}
          stacked
          {...props}
          onClick={(e) => {
            if (props.onClick) {
              return props.onClick(e)
            }
            onClose && onClose()
          }}
          style={grid ? {
            padding: 0,
            width: '33%',
            ...props.style
          } : {
            marginRight: 20,
            ...props.style
          }}
        >
          {props.label}
        </IconLink>
      ))}
    </div>
  )
}

export default ShareButtons
