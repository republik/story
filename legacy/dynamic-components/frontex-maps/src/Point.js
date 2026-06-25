import React, { useState } from 'react'
import { useColorContext } from '@project-r/styleguide/lib/components/Colors/useColorContext'

const Point = ({ point, setHoverPoint, setHighlights }) => {
  const [hover, setHover] = useState(false)
  const [colorScheme] = useColorContext()

  const onHover = () => {
    setHoverPoint(point)
    setHighlights(point.highlights || [])
    setHover(true)
  }

  const offHover = () => {
    setHoverPoint(null)
    setHighlights([])
    setHover(false)
  }

  return (
    <circle
      style={{ transition: '0.5s all' }}
      cx={point.x}
      cy={point.y}
      r={point.discrete ? '1.8%' : '2.4%'}
      fill={hover ? 'rgba(0,0,0,0)' : '#1f77b4'}
      stroke={hover ? colorScheme.getCSSColor('default') : 'none'}
      strokeMiterlimit='10'
      strokeWidth='2'
      opacity={hover ? 1 : 0.7}
      onMouseEnter={onHover}
      onTouchStart={onHover}
      onMouseLeave={offHover}
      onTouchEnd={offHover}
    />
  )
}

export default Point
