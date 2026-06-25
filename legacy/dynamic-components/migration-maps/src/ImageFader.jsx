import React from 'react'
import { css } from 'glamor'

const ASSETS_BASE_URL =
  'https://cdn.repub.ch/s3/republik-assets/dynamic-components/migration-maps/assets/'

const styles = {
  container: css({
    position: 'relative',
    height: '50vh',
    maxWidth: 695,
    width: '100%',
    margin: '0 auto',
  }),
  backgroundImage: css({
    width: '100%',
    transition: 'opacity 1000ms',
  }),
  foregroundImage: css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    transition: 'opacity 800ms',
  }),
}

const ImageFader = (props) => {
  const {
    phase,
    imageStep1,
    imageStep2,
    imageStep3,
    imageStep4,
    imageStep5,
    imageStep6,
  } = props

  return (
    <div {...styles.container}>
      <img
        {...styles.backgroundImage}
        src={ASSETS_BASE_URL + imageStep1}
        style={{
          opacity: phase.step === 'step1' ? 1 : 0,
        }}
      />
      <img
        {...styles.foregroundImage}
        style={{
          opacity: phase.step === 'step2' ? 1 : 0,
        }}
        src={ASSETS_BASE_URL + imageStep2}
      />
      <img
        {...styles.foregroundImage}
        style={{
          opacity: phase.step === 'step3' ? 1 : 0,
        }}
        src={ASSETS_BASE_URL + imageStep3}
      />
      <img
        {...styles.foregroundImage}
        style={{
          opacity: phase.step === 'step4' ? 1 : 0,
        }}
        src={ASSETS_BASE_URL + imageStep4}
      />
      <img
        {...styles.foregroundImage}
        style={{
          opacity: phase.step === 'step5' ? 1 : 0,
        }}
        src={ASSETS_BASE_URL + imageStep5}
      />
      <img
        {...styles.foregroundImage}
        style={{
          opacity: phase.step === 'step6' ? 1 : 0,
        }}
        src={ASSETS_BASE_URL + imageStep6}
      />
    </div>
  )
}

export default ImageFader
