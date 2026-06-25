import React from 'react'

import {
  FigureCaption,
  FigureByline,
  LazyLoad
} from '@project-r/styleguide'

import Viewer from './Viewer'

export default ({ options, caption, byline, height = 500 }) => {

  return <>
    <LazyLoad style={{ height }}>
      <Viewer options={options} height={height} />
    </LazyLoad>
    {!!(caption || byline) && <FigureCaption>
      {caption && `${caption} `}
      {byline && <FigureByline>{byline}</FigureByline>}
    </FigureCaption>}
  </>
}
