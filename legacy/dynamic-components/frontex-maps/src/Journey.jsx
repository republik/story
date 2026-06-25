import React, { useEffect, useRef, useState } from 'react'
import {
  FigureCaption,
  FigureByline,
  useColorContext,
  fontStyles,
} from '@project-r/styleguide'
import { ChartTitle, ChartLead } from '@project-r/styleguide/chart'
import Point from './Point'
import { journey } from './data'
import CountriesZoom from './CountriesZoom'
import ContextMap from './ContextMap'
import ContextBox, { ContextBoxValue } from './ContextBox'

export default ({ title, lead, caption, byline, pointsText }) => {
  const [colorScheme] = useColorContext()
  const containerRef = useRef(null)
  const [width, setWidth] = useState(0)
  const [hoverPoint, setHoverPoint] = useState(null)
  const [highlights, setHighlights] = useState([])

  const syncWidth = () => {
    const rect = containerRef?.current?.getBoundingClientRect()
    if (!rect) return
    setWidth(rect.width)
  }

  useEffect(() => {
    syncWidth()
    window.addEventListener('resize', syncWidth)
    return () => {
      window.removeEventListener('resize', syncWidth)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ textAlign: 'left' }}>
      {title && <ChartTitle>{title}</ChartTitle>}
      {lead && <ChartLead>{lead}</ChartLead>}
      <div style={{ position: 'relative', height: width, width }}>
        <svg
          viewBox='0 0 996 996'
          style={{
            backgroundColor: '#3a4b51',
            ...fontStyles.sansSerifMedium22,
            letterSpacing: '0.1em',
          }}
          width='100%'
        >
          <CountriesZoom highlights={highlights} />
          <g>
            {journey.map((point, i) => (
              <Point
                point={{ ...point, ...pointsText[i] }}
                key={i}
                setHoverPoint={setHoverPoint}
                setHighlights={setHighlights}
              />
            ))}
          </g>
        </svg>
        <svg
          viewBox='0 0 448 664'
          height={width / 3}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderTopWidth: 2,
            borderTopStyle: 'solid',
            borderLeftWidth: 2,
            borderLeftStyle: 'solid',
          }}
          {...colorScheme.set('borderTopColor', 'default')}
          {...colorScheme.set('borderLeftColor', 'default')}
        >
          <ContextMap />
        </svg>
        {hoverPoint && (
          <ContextBox
            orientation={hoverPoint.orientation}
            x={(hoverPoint.x / 996) * width}
            y={
              (hoverPoint.y / 996) * width +
              (hoverPoint.orientation === 'top' ? -1 : 1) * (width / 15)
            }
          >
            <ContextBoxValue label={hoverPoint.title}>
              {hoverPoint.text}
            </ContextBoxValue>
          </ContextBox>
        )}
      </div>
      {caption && (
        <FigureCaption>
          {caption} {byline && <FigureByline>{byline}</FigureByline>}
        </FigureCaption>
      )}
    </div>
  )
}
