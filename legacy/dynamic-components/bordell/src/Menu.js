import React, { useState } from 'react'
import { css, merge } from 'glamor'
import { Editorial, mediaQueries, colors } from '@project-r/styleguide'
import MdClose from 'react-icons/lib/md/close'

const ASSETS_BASE_URL = 'https://cdn.repub.ch/s3/republik-assets/dynamic-components/bordell/assets'
// const ASSETS_BASE_URL = '/assets'

const IMG_WIDTH_INIT = 380
const IMG_WIDTH = 340

const IMG_WIDTH_MUP_INIT = 520
const IMG_WIDTH_MUP = 390
const IMG_WIDTH_MINI = 50

const IMG_RIGHT_OFFSET = 20

const IMG_RATIO = 1.77

export const PADDING_MINI = 5
export const PADDING_MINI_MUP = 40

// animations
const EXPAND_FACTOR = 1.1
const SHRINK_FACTOR = 0.7

// convenience values
const IMG_HEIGHT_INIT = IMG_WIDTH_INIT * IMG_RATIO
const IMG_HEIGHT_MUP_INIT = IMG_WIDTH_MUP_INIT * IMG_RATIO
const IMG_HEIGHT = IMG_WIDTH * IMG_RATIO
const IMG_HEIGHT_MUP = IMG_WIDTH_MUP * IMG_RATIO
export const IMG_HEIGHT_MINI = IMG_WIDTH_MINI * IMG_RATIO

const IMG_WIDTH_EXPANDED = IMG_WIDTH * EXPAND_FACTOR
const IMG_WIDTH_EXPANDED_MUP = IMG_WIDTH_MUP * EXPAND_FACTOR
const IMG_WIDTH_SHRUNKEN = IMG_WIDTH_MINI * SHRINK_FACTOR

const IMG_HEIGHT_EXPANDED = IMG_HEIGHT * EXPAND_FACTOR
const IMG_HEIGHT_EXPANDED_MUP = IMG_HEIGHT_MUP * EXPAND_FACTOR
const IMG_HEIGHT_SHRUNKEN = IMG_HEIGHT_MINI * SHRINK_FACTOR

const whiteBg = alpha => `rgba(255, 255, 255, ${alpha})`

const interpolateValue = (initValue, endValue) => progress => typeof progress === 'number' ? initValue + progress * (endValue - initValue) : null
const calculateWidth = interpolateValue(IMG_WIDTH_INIT, IMG_WIDTH)
const calculateHeight = interpolateValue(IMG_HEIGHT_INIT, IMG_HEIGHT)
const calculateWidthMup = interpolateValue(IMG_WIDTH_MUP_INIT, IMG_WIDTH_MUP)
const calculateHeightMup = interpolateValue(IMG_HEIGHT_MUP_INIT, IMG_HEIGHT_MUP)
const calculateImgOffset = interpolateValue(IMG_WIDTH_INIT / 2, IMG_RIGHT_OFFSET)

const styles = {
  overlay: css({
    zIndex: 1,
    position: 'fixed',
    bottom: 0,
    height: '100%',
    background: whiteBg(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&.open-animation': {
      animation: `${css.keyframes({
        '0%': {
          width: IMG_WIDTH_MINI,
          height: IMG_HEIGHT_MINI,
          bottom: PADDING_MINI,
          right: PADDING_MINI,
          background: whiteBg(0)
        },
        '25%': { width: 100 },
        '75%': { height: 180, background: whiteBg(0) },
        '100%': { width: '100%', height: '100%', bottom: 0, right: 0, background: whiteBg(1) }
      })} .2s linear forwards`,
      [mediaQueries.mUp]: {
        animation: `${css.keyframes({
          '0%': {
            width: IMG_WIDTH_MINI,
            height: IMG_HEIGHT_MINI,
            bottom: PADDING_MINI_MUP,
            right: PADDING_MINI_MUP,
            background: whiteBg(0)
          },
          '25%': { width: 100 },
          '75%': { height: 180, background: whiteBg(0) },
          '100%': { width: '100%', height: '100%', bottom: 0, right: 0, background: whiteBg(1) }
        })} .3s linear forwards`
      },
    },
    '&.close-animation': {
      animation: `${css.keyframes({
        '0%': { width: '100%', height: '100%', bottom: 0, right: 0, background: whiteBg(1) },
        '25%': { height: 180 },
        '75%': { width: 100, background: whiteBg(0) },
        '95%': { width: IMG_WIDTH_MINI, position: 'fixed' },
        '100%': {
          width: IMG_WIDTH_MINI,
          height: IMG_HEIGHT_MINI,
          bottom: PADDING_MINI,
          right: PADDING_MINI,
          background: whiteBg(0)
        }
      })} .2s linear forwards`,
      [mediaQueries.mUp]: {
        animation: `${css.keyframes({
          '0%': { width: '100%', height: '100%', bottom: 0, right: 0, background: whiteBg(1) },
          '25%': { height: 180 },
          '75%': { width: 100, background: whiteBg(0) },
          '95%': { width: IMG_WIDTH_MINI, position: 'fixed' },
          '100%': {
            width: IMG_WIDTH_MINI,
            height: IMG_HEIGHT_MINI,
            bottom: PADDING_MINI_MUP,
            right: PADDING_MINI_MUP,
            background: whiteBg(0)
          }
        })} .3s linear forwards`
      },
    },
    '&.closed': {
      width: IMG_WIDTH_MINI,
      height: IMG_HEIGHT_MINI,
      bottom: PADDING_MINI,
      right: PADDING_MINI,
      overflow: 'visible',
      background: whiteBg(0),
      [mediaQueries.mUp]: {
        right: PADDING_MINI_MUP,
        bottom: PADDING_MINI_MUP
      }
    }
  }),
  staticOverlay: css({
    position: 'static',
    overflow: 'hidden',
    marginLeft: -15,
    marginRight: -15,
    [mediaQueries.mUp]: {
      marginBottom: 80,
      marginLeft: 0,
      marginRight: 0,
      overflow: 'visible'
    },
  }),
  container: css({
    position: 'relative',
    height: IMG_HEIGHT,
    top: 20,
    width: '100%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    background: whiteBg(0.8),
    boxShadow: '0 0 10px 5px white',
    transition: 'opacity 0.1s',
    [mediaQueries.mUp]: {
      height: IMG_HEIGHT_MUP
    },
    '.open-animation &': {
      animation: `${css.keyframes({
        '0%': { height: IMG_HEIGHT_MINI, width: IMG_WIDTH_MINI, top: 0 },
        '67%': { height: IMG_HEIGHT_EXPANDED, width: '110%', top: 20 },
        '100%': { height: IMG_HEIGHT, width: '100%', top: 20 }
      })} .3s ease-in-out forwards`,
      [mediaQueries.mUp]: {
        animation: `${css.keyframes({
          '0%': { height: IMG_HEIGHT_MINI, width: IMG_WIDTH_MINI, top: 0 },
          '67%': { height: IMG_HEIGHT_EXPANDED_MUP, width: '110%', top: 20 },
          '100%': { height: IMG_HEIGHT_MUP, width: '100%', top: 20 }
        })} .45s ease-in-out forwards`
      }
    },
    '.close-animation &': {
      animation: `${css.keyframes({
        '0%': { height: IMG_HEIGHT, width: '100%', top: 20 },
        '67%': { height: IMG_HEIGHT_SHRUNKEN, width: IMG_WIDTH_SHRUNKEN, top: 0 },
        '100%': { height: IMG_HEIGHT_MINI, width: IMG_WIDTH_MINI, top: 0 }
      })} .3s ease-in-out forwards`,
      [mediaQueries.mUp]: {
        animation: `${css.keyframes({
          '0%': { height: IMG_HEIGHT_MUP, width: '100%', top: 20 },
          '67%': { height: IMG_HEIGHT_SHRUNKEN, width: IMG_WIDTH_SHRUNKEN, top: 0 },
          '100%': { height: IMG_HEIGHT_MINI, width: IMG_WIDTH_MINI, top: 0 }
        })} .45s ease-in-out forwards`
      },
    },
    '.closed &': {
      width: IMG_WIDTH_MINI,
      height: IMG_HEIGHT_MINI,
      top: 0
    }
  }),
  staticContainer: css({
    top: 0
  }),
  image: css({
    position: 'absolute',
    width: IMG_WIDTH,
    right: `calc(50% - ${IMG_RIGHT_OFFSET}px)`,
    [mediaQueries.mUp]: {
      width: IMG_WIDTH_MUP
    },
    '.open-animation &': {
      animation: `${css.keyframes({
        '0%': { width: IMG_WIDTH_MINI },
        '67%': { width: IMG_WIDTH_EXPANDED },
        '100%': { width: IMG_WIDTH }
      })} .3s ease-in-out forwards`,
      [mediaQueries.mUp]: {
        animation: `${css.keyframes({
          '0%': { width: IMG_WIDTH_MINI },
          '67%': { width: IMG_WIDTH_EXPANDED_MUP },
          '100%': { width: IMG_WIDTH_MUP }
        })} .45s ease-in-out forwards`
      },
    },
    '.close-animation &': {
      animation: `${css.keyframes({
        '0%': { width: IMG_WIDTH },
        '67%': { width: IMG_WIDTH_SHRUNKEN },
        '100%': { width: IMG_WIDTH_MINI }
      })} .3s ease-in-out forwards`,
      [mediaQueries.mUp]: {
        animation: `${css.keyframes({
          '0%': { width: IMG_WIDTH_MUP },
          '67%': { width: IMG_WIDTH_SHRUNKEN },
          '100%': { width: IMG_WIDTH_MINI }
        })} .45s ease-in-out forwards`
      },
    },
    '.closed &': {
      width: IMG_WIDTH_MINI
    }
  }),
  sections: css({
    position: 'absolute',
    left: '50%',
    right: '1rem',
    bottom: 135,
    opacity: 0,
    animation: `${css.keyframes({
      '0%': { opacity: 0 },
      '100%': { opacity: 1 }
    })} .4s ease-in-out forwards`,
    [mediaQueries.mUp]: {
      bottom: 150
    },
    '.open-animation &': {
      opacity: 0,
      animation: `${css.keyframes({
        '0%': { opacity: 0 },
        '100%': { opacity: 1 }
      })} .4s ease-in-out forwards .4s`,
      [mediaQueries.mUp]: {
        animation: `${css.keyframes({
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        })} .6s ease-in-out forwards .6s`
      }
    },
    '.close-animation &': {
      display: 'none'
    },
    '.closed &': {
      display: 'none'
    }
  }),
  section: css({
    lineHeight: '1.1rem',
    marginTop: '0.65rem',
    marginBottom: '0.65rem',
    '& a': {
      color: colors.text,
      textDecoration: 'none',
      '&:hover': {
        color: '#ec008c'
      }
    },
    [mediaQueries.mUp]: {
      marginTop: '1.2rem',
      marginBottom: '1.2rem'
    }
  }),
  close: css({
    position: 'absolute',
    top: 50,
    right: 13,
    zIndex: 1,
    cursor: 'pointer',
    [mediaQueries.mUp]: {
      top: 70,
      right: 20
    }
  })
}

const Menu = ({ sections, isStatic, isDesktop, progress, hide }) => {
  const [ui, setUiState] = useState(isStatic ? '' : 'closed')

  const goTo = (e, anchor) => {
    e.preventDefault()
    e.stopPropagation()
    !isStatic && setUiState('closed')
    document.getElementById(anchor).scrollIntoView({ behavior: 'smooth' })
    if (history.pushState) {
      history.pushState(null, null, `#${anchor}`)
    } else {
      location.hash = `#${anchor}`
    }
  }

  const isClosed = ui === 'closed' || ui === 'close-animation'

  const dynamicStyles = {
    image: {
      width: isDesktop ? calculateWidthMup(progress) : calculateWidth(progress),
      right: `calc(50% - ${calculateImgOffset(progress)}px)`,
      cursor: isClosed ? 'pointer' : 'default'
    },
    container: {
      height: isDesktop ? calculateHeightMup(progress) : calculateHeight(progress),
      opacity: hide && isClosed ? 0 : 1
    },
    sections: {
      display: progress < 0.8 ? 'none' : null,
      zIndex: isStatic ? 0 : 1
    }
  }

  return <div {...merge(styles.overlay, isStatic && styles.staticOverlay)} className={ui}>
    {!isStatic && !isClosed &&
    <MdClose size={24} fill='#000' {...styles.close} onClick={() => setUiState('close-animation')}/>}
    <div {...merge(styles.container, isStatic && styles.staticContainer)}
         style={dynamicStyles.container}
         onClick={() => isClosed && setUiState('open-animation')}>
      <div {...styles.sections}
           style={dynamicStyles.sections}>
        {sections.map((section, i) => {
          return (
            <Editorial.Subhead {...styles.section} key={i}>
              <small>
                <a href={`#${section.anchor}`} onClick={(e) => goTo(e, section.anchor)}>{section.name}</a>
              </small>
            </Editorial.Subhead>)
        })}
      </div>
      <img {...styles.image}
           style={dynamicStyles.image}
           src={`${ASSETS_BASE_URL}/bordell.${isStatic || isClosed ? 'png' : 'gif'}`}
           alt='freestanding brothel'/>
    </div>
  </div>
}

export default Menu
