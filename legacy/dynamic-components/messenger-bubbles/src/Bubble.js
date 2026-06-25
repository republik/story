import React from 'react'
import { css } from 'glamor'
import {
  fontStyles,
  fontFamilies,
  mediaQueries,
  useColorContext,
} from '@project-r/styleguide'

let pixelArial = css.fontFace({
  fontFamily: 'PixelArial',
  fontStyle: 'normal',
  fontWeight: 400,
  src:
    "url('https://cdn.repub.ch/s3/republik-assets/dynamic-components/messenger-bubbles/assets/PIXEARG.TTF')",
})

const styles = {
  quote: css({
    margin: 0,
    marginBottom: 10,
    maxWidth: '80%',
    clear: 'both',
  }),
  quoteAligns: {
    right: css({
      float: 'right',
      textAlign: 'right',
    }),
  },
  bubble: css({
    margin: 0,
    verticalAlign: 'bottom',
    display: 'inline-block',
    padding: '8px 10px',
    maxWidth: 400,
    ...fontStyles.sansSerifRegular14,
    [mediaQueries.mUp]: {
      ...fontStyles.sansSerifRegular16,
    },
    // https://github.com/nostalgic-css/NES.css/blob/develop/scss/utilities/rounded-corners-mixin.scss
    borderStyle: 'solid',
    borderWidth: 3,
    borderImageSlice: 3,
    borderImageWidth: 3,
    borderImageOutset: 1,
    borderImageRepeat: 'stretch',
    //for chrome
    '@media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm)': {
      borderImageRepeat: 'space',
    },
    // for firefox
    '@supports (-moz-appearance: meterbar)': {
      borderImageRepeat: 'stretch',
    },
  }),
  bubbleAligns: {
    left: css({
      fontFamily: pixelArial,
      backgroundColor: 'rgb(117, 215, 255)',
      color: '#000',
      borderRadius: '15px 15px 15px 0px',
      borderImageSource: `url(
        'data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(104, 207, 249)" /></svg>'
      )`,
    }),
    right: css({
      backgroundColor: 'rgb(44, 107, 237)',
      color: '#fff',
      borderRadius: '15px 15px 0px 15px',
      textAlign: 'left',
      fontSize: 28,
      borderImageSource: `url(
        'data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(30, 95, 230)" /></svg>'
      )`,
    }),
  },
  cite: css({
    display: 'block',
    ...fontStyles.sansSerifRegular14,
    fontFamily: fontFamilies.sansSerifItalic,
    fontStyle: 'normal',
  }),
  avatar: css({
    display: 'inline-block',
    borderRadius: '25px',
    textAlign: 'center',
    width: 35,
    height: 35,
    backgroundColor: '#eee',
    verticalAlign: 'bottom',
    padding: '5px',
    ...fontStyles.sansSerifRegular16,
    borderStyle: 'solid',
    borderWidth: 3,
    borderImageSlice: 3,
    borderImageWidth: 3,
    borderImageOutset: 1,
    borderImageRepeat: 'stretch',
    //for chrome
    '@media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm)': {
      borderImageRepeat: 'space',
    },
    // for firefox
    '@supports (-moz-appearance: meterbar)': {
      borderImageRepeat: 'stretch',
    },
    borderImageSource: `url(
      'data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(0, 103, 176)" /></svg>'
    )`,
  }),
}

export default ({ children, name, avatar, date, align = 'left' }) => {
  const [colorScheme] = useColorContext()
  return (
    <div {...styles.quote} {...styles.quoteAligns[align]}>
      <p>
        {avatar && align === 'left' && (
          <p style={{ margin: '0 16px 0 0' }} {...styles.avatar}>
            {avatar}
          </p>
        )}
        <p {...styles.bubble} {...styles.bubbleAligns[align]}>
          {children}
        </p>
        {avatar && align === 'right' && (
          <p style={{ margin: '0 0 0 16px' }} {...styles.avatar}>
            {avatar}
          </p>
        )}
      </p>
      {name && (
        <cite {...colorScheme.set('color', 'textSoft')} {...styles.cite}>
          {`${name ? name : ''} ${date ? date : ''}`}
        </cite>
      )}
    </div>
  )
}
