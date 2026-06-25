import React from 'react'
import { css } from 'glamor'

const ASSETS_BASE_URL =
  'https://cdn.repub.ch/s3/republik-assets/dynamic-components/china-belt-images/assets/'

const styles = {
  container: css({
    position: 'relative',
    height: '100vh',
  }),
  backgroundImage: css({
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }),

  foregroundImage: css({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    transition: 'opacity 800ms',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }),
}

const ImageFader = (props) => {
  const { phase, foregroundImage, backgroundImage, backgroundPosition } = props

  return (
    <div {...styles.container}>
      <div
        {...styles.backgroundImage}
        style={{
          backgroundImage: 'url(' + ASSETS_BASE_URL + backgroundImage + ')',
          backgroundPosition: backgroundPosition,
        }}
      ></div>
      <div
        {...styles.foregroundImage}
        style={{
          opacity: phase.step === 'step1' ? 0 : 1,
          backgroundImage: 'url(' + ASSETS_BASE_URL + foregroundImage + ')',
          backgroundPosition: backgroundPosition,
        }}
      ></div>
    </div>
  )
}

export default ImageFader
