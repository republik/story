import React from 'react'
import { css, left } from 'glamor'

import { Label, useColorContext } from '@project-r/styleguide'

const styles = {
  container: css({
    position: 'absolute',
    top: 0,
    transition: 'left 1s ease',
  }),
  legendEntry: css({
    marginTop: '5px',
  }),
  square: css({
    display: 'inline-block',
    width: '20px',
    height: '10px',
    marginTop: '0.1em',
    opacity: 1,
    mixBlendMode: 'multiply',
  }),
}

const ColorLegend = (props) => {
  const { items, labels, positionLeft } = props
  const [colorScheme] = useColorContext()

  return (
    <div style={{ position: 'relative' }}>
      <div {...styles.container} style={{ left: positionLeft }}>
        <div style={{ display: 'flex' }}>
          {items.map((item, index) => (
            <div key={index} {...styles.legendEntry}>
              <span
                {...styles.square}
                {...colorScheme.set('backgroundColor', item)}
              ></span>
              {/* <Label>{labels[item]}</Label> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ColorLegend
