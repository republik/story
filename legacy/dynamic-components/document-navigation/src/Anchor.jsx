import React, { useMemo } from 'react'
import { css } from 'glamor'
import { useHeaderHeight } from '@project-r/styleguide'

const Anchor = ({ offset = 20, id }) => {
  const [ _, rules ] = useHeaderHeight()

  const rule = useMemo(() => css(rules.reduce((acc, { mediaQuery, headerHeight }) => 
    Object.assign(
      acc,
      {[mediaQuery]: {top: -(headerHeight + offset)}}
    ), {
      display: 'block',
      visibility: 'hidden',
      position: 'relative'
    })
  ), [offset, rules])

  return <a {...rule} id={id} />
}

export default Anchor
