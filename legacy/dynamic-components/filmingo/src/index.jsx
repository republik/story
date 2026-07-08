import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { css, merge } from 'glamor'

import {
  mediaQueries,
  RawHtml,
  ColorContextProvider,
  Interaction,
} from '@project-r/styleguide'
import { breakoutStyles } from './Center'
import Caption from './Caption'
import Image from './Image'
import PlayIcon from './PlayIcon'

const Index = ({
  url,
  title,
  thumbnail,
  aspectRatio = 16 / 9,
  playNote = 'Dieses Video wird über Filmingo abgespielt. <a target="_blank" href="https://www.filmingo.ch/de/privacy-policy">Datenschutzerklärung</a>',
  noAccessNote = 'Aus rechtlichen und finanziellen Gründen können wir den Film nur Mitgliedern und Probelesenden zeigen.',
  size,
  attributes,
}) => {
  const [embedIframe, setEmbedIframe] = useState(false)
  return (
    <figure {...attributes} {...merge(styles.container, breakoutStyles[size])}>
      {!embedIframe && (
        <div
          {...styles.thumbnail}
          style={{ cursor: url ? 'pointer' : 'auto' }}
          onClick={(e) => {
            if (!url) {
              return
            }
            if (e.target.nodeName === 'A') {
              return
            }
            e.preventDefault()
            if (navigator.userAgent.match(/RepublikApp/)) {
              window.open(url)
            } else {
              setEmbedIframe(true)
            }
          }}
        >
          {url ? (
            <>
              <span {...styles.playIcon}>
                <PlayIcon />
              </span>
              <span {...styles.playNote}>
                <ColorContextProvider colorSchemeKey='dark'>
                  <RawHtml
                    white
                    dangerouslySetInnerHTML={{
                      __html: playNote,
                    }}
                  />
                </ColorContextProvider>
              </span>
            </>
          ) : (
            <div {...styles.noMembercontainer}>
              <div {...styles.noMemeberText}>
                <Interaction.P>
                  <span style={{ color: 'white', lineHeight: 'initial' }}>
                    {noAccessNote}
                  </span>
                </Interaction.P>
              </div>
            </div>
          )}

          <Image src={thumbnail} alt='' aspectRatio={aspectRatio} />
        </div>
      )}
      {embedIframe && (
        <div
          {...css(styles.embedContainer, {
            paddingBottom: `${100 / aspectRatio}%`,
          })}
        >
          <iframe
            {...styles.embedIframe}
            src={url}
            frameBorder='0'
            title={title}
            allowFullScreen
            allow='autoplay; fullscreen'
          />
        </div>
      )}
      <Caption>{title || ''}</Caption>
    </figure>
  )
}

const styles = {
  container: css({
    textDecoration: 'none',
    position: 'relative',
    padding: 0,
    margin: 0,
    marginTop: 36,
    marginBottom: 36,
    [mediaQueries.mUp]: {
      marginTop: 45,
      marginBottom: 45,
    },
  }),
  thumbnail: css({
    cursor: 'pointer',
    lineHeight: 0,
    position: 'relative',
    width: '100%',
    '::before': {
      position: 'absolute',
      background: 'rgba(0, 0, 0, .6)',
      content: ' ',
      height: '100%',
      width: '100%',
      zIndex: 9,
    },
    marginBottom: 8,
  }),
  playIcon: css({
    color: '#fff',
    lineHeight: 0,
    position: 'absolute',
    left: 'calc(50% - 13px)',
    top: 'calc(50% - 18px)',
    zIndex: 9,
  }),
  playNote: css({
    position: 'absolute',
    top: 'calc(50% + 18px)',
    left: '50%',
    transform: 'translate(-50%,0)',
    color: '#fff',
    width: '100%',
    maxWidth: 400,
    padding: 10,
    lineHeight: 1.2,
    textAlign: 'center',
    zIndex: 9,
  }),
  embedContainer: css({
    position: 'relative',
    height: 0,
    width: '100%',
    marginBottom: 8,
  }),
  embedIframe: css({
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
  }),
  noMembercontainer: css({
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  }),
  noMemeberText: css({
    maxWidth: 600,
    width: '90%',
  }),
}

Index.propTypes = {
  url: PropTypes.string,
  thumbnail: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number,
  size: PropTypes.oneOf(Object.keys(breakoutStyles)),
}

export default Index
