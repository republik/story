import React from 'react'
import { css } from 'glamor'

import { Label, useColorContext } from '@project-r/styleguide'

const styles = {
  legendEntry: css({
    display: 'flex',
    marginTop: '5px',
    alignItems: 'center',
    paddingRight: '10px',
  }),
  circle: css({
    display: 'inline-block',
    borderRadius: '50%',
    width: '10px',
    height: '10px',
    marginRight: '5px',
  }),
}

const ColorLegend = (props) => {
  const { items, convertCauseName } = props
  const [colorScheme] = useColorContext()

  return (
    <div style={{ marginBottom: '15px', display: 'flex', flexWrap: 'wrap' }}>
      {items.map((item, index) => (
        <div key={index} {...styles.legendEntry}>
          <span
            {...styles.circle}
            {...colorScheme.set(
              'backgroundColor',
              item === 'dot_legend' ? 'greyCircles' : convertCauseName(item)
            )}
          ></span>
          <Label>
            {item === 'dot_legend' ? '1 von 1000 Todesfällen' : item}
          </Label>
        </div>
      ))}
    </div>
  )
}

export default ColorLegend
