import React, { Fragment } from 'react'

import {
  colors
} from '@project-r/styleguide'

import IconLink from './IconLink'

const Share = ({
  url,
  tweet = '',
  emailSubject,
  emailBody = '',
  emailAttachUrl = true,
  fill = colors.secondary,
  download
}) => {
  const emailAttache = emailAttachUrl ? `\n\n${url}` : ''

  const options = [
    {
      target: '_blank',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      icon: 'facebook'
    },
    {
      target: '_blank',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweet
      )}&url=${encodeURIComponent(url)}`,
      icon: 'twitter'
    },
    {
      mobileOnly: true,
      target: '_blank',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
      icon: 'whatsapp'
    },
    {
      href: `mailto:?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody + emailAttache)}`,
      icon: 'mail'
    },
    download && {
      target: '_blank',
      download: true,
      href: download,
      icon: 'download'
    }
  ]

  return <Fragment>
    {options.filter(Boolean).map((props, i) => (
      <IconLink
        key={props.icon}
        fill={fill}
        {...props}
      >
        {props.label}
      </IconLink>
    ))}
  </Fragment>
}

export default Share
