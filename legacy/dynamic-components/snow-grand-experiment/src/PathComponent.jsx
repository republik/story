import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

/* libraries */
import { interpolate } from 'flubber2'

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const PathComponent = (props) => {
  const { d, fill, fillOpacity, style } = props
  const previousD = usePrevious(d) || d

  const pathRef = useRef()

  useEffect(() => {
    const interpolator = interpolate(previousD, d)
    d3.select(pathRef.current)
      .transition()
      .duration(1000)
      .attrTween('d', () => interpolator)
  }, [d])

  return <path ref={pathRef} fill={fill} fillOpacity={fillOpacity} />
}

export default PathComponent
