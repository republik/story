import React, { Component } from 'react'
import { css, select } from 'glamor'
import { mediaQueries, plainButtonRule } from '@project-r/styleguide'

export const SIZE = 240
export const SPACE = 10

const styles = {
  image: css({
    width: '100%',
    height: '100%',
  }),
  slide: css({
    width: SIZE,
    height: SIZE,
    flexShrink: 0,
    transition: 'width 400ms, height 400ms, padding 400ms, margin 400ms'
  })
}

const Item = ({ src, title, onClick, active }) => (
  <div {...styles.slide} style={{
    padding: active ? 0 : SPACE,
    margin: active ? `0 ${SPACE}px` : 0
  }}>
    <button onClick={onClick} {...plainButtonRule}>
      <img {...styles.image} src={src} alt={title} />
    </button>
  </div>
)

export default Item
