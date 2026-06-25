import React, { useEffect, useRef, useState } from 'react'
import { css } from 'glamor'
import { useColorContext, fontStyles } from '@project-r/styleguide'
import { ChartLegend, ChartTitle, ChartLead } from '@project-r/styleguide/chart'

const last = (array, index) => array.length - 1 === index
const X_TICK_HEIGHT = 4

const styles = {
  columnTitle: css({
    ...fontStyles.sansSerifMedium14,
  }),
  axisLabel: css({
    ...fontStyles.sansSerifRegular12,
  }),
  axisXLine: css({
    strokeWidth: '1px',
    shapeRendering: 'crispEdges',
  }),
}

const Index = ({ title, subtitle, legend }) => {
  const [colorScheme] = useColorContext()
  const [width, setWidth] = useState(0)
  const svgRef = useRef()
  const xTicks = [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1]

  useEffect(() => {
    const handleResize = () => {
      setWidth(svgRef.current.scrollWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const increment = width / (xTicks.length - 1)

  if (title) {
    return (
      <>
        <ChartTitle>{title}</ChartTitle>
        <ChartLead>{subtitle}</ChartLead>
      </>
    )
  }
  return (
    <>
      <svg ref={svgRef} style={{ width: '100%', height: 30 }}>
        <g
          id='Group'
          {...styles.axisXLine}
          {...colorScheme.set('stroke', 'text')}
        >
          <line x1='0.5' y1='5' x2={width - 0.5} y2='5' id='Path'></line>
        </g>
        {xTicks.map((tick, i) => {
          let textAnchor = 'middle'
          if (last(xTicks, i)) {
            textAnchor = 'end'
          }
          if (i === 0) {
            textAnchor = 'start'
          }
          return (
            <g
              key={`x${tick}`}
              style={{
                transform: `translate(${
                  i === 10 ? i * increment - 0.5 : i * increment + 0.5
                }px,${10}px)`,
              }}
            >
              <line
                {...styles.axisXLine}
                {...colorScheme.set('stroke', 'text')}
                y2={X_TICK_HEIGHT}
              />
              <text
                {...styles.axisLabel}
                {...colorScheme.set('fill', 'text')}
                y={X_TICK_HEIGHT + 5}
                dy='0.6em'
                textAnchor={textAnchor}
              >
                {tick}
              </text>
            </g>
          )
        })}
      </svg>
      <ChartLegend>{legend}</ChartLegend>
    </>
  )
}

export default Index
