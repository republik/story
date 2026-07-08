import React, { Fragment } from 'react'
import { css } from 'glamor'
import { mediaQueries, VideoPlayer, FigureCaption, FigureByline, Editorial } from '@project-r/styleguide'

// const ASSETS_BASE_URL = 'https://cdn.repub.ch/s3/republik-assets/dynamic-components/REPOSLUG/asserts'

const DEFAULT_MARGIN = 15
const NARROW_WIDTH = 495

const breakoutMq = `@media only screen and (min-width: ${665 + NARROW_WIDTH / 4 * 2 + 20}px)`

const styles = {
  single: css({
    display: 'block',
    maxWidth: 140,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 20,
    float: 'left',
    clear: 'left',
    [breakoutMq]: {
      marginLeft: -NARROW_WIDTH / 4,
      maxWidth: NARROW_WIDTH / 2
    }
  }),
  half: css({
    display: 'block',
    maxWidth: 140,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 20,
    float: 'left',
    clear: 'left',
    [breakoutMq]: {
      marginLeft: -NARROW_WIDTH / 6,
      maxWidth: NARROW_WIDTH / 3
    }
  }),
  duet: css({
    display: 'block',
    maxWidth: NARROW_WIDTH,
    margin: '0 auto'
  }),
  middle: css({
    display: 'block',
    maxWidth: NARROW_WIDTH / 2,
    margin: '0 auto'
  })
}

const Index = ({ size = 'single', src, aspectRatio, credit, creditUrl, music, musicUrl }) => {
  return <>
    <figure
      {...styles[size]}
    >
      <VideoPlayer hideTime loop src={src} aspectRatio={aspectRatio} />
      {(credit || music) && <FigureCaption>
        <FigureByline>
          {credit && <Editorial.A href={creditUrl}>{credit}</Editorial.A>}
          {' '}
          {music && <>
            <Editorial.A href={musicUrl}>
              <svg width='12' height='12' viewBox='0 0 48 48' fill='currentColor' style={{ verticalAlign: 'middle', marginRight: 1 }}>
                <path fillRule='evenodd' clipRule='evenodd' d='M35 10.76a1 1 0 00-1.22-.98l-15.99 3.64a1 1 0 00-.78.97V38c.03 2.17-2.2 4.43-5.4 5.28-3.56.96-6.96-.2-7.6-2.57-.63-2.37 1.74-5.07 5.3-6.02a9.2 9.2 0 013.7-.25V14.39a5 5 0 013.9-4.87l15.98-3.64A5 5 0 0139 10.76v22.36c.08 2.2-2.17 4.5-5.4 5.36-3.56.95-6.96-.2-7.6-2.57-.63-2.38 1.74-5.08 5.3-6.03a9.2 9.2 0 013.7-.25V10.76z'/>
              </svg>
              {music}
            </Editorial.A>
          </>}
        </FigureByline>
      </FigureCaption>}
    </figure>
  </>
}

export default Index
