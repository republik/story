import React, { useEffect, useRef, useState } from 'react'
import { FigureCaption, FigureByline, fontStyles } from '@project-r/styleguide'
import { ChartTitle, ChartLead } from '@project-r/styleguide/chart'
import ColorLegend from './ColorLegend'
import Countries from './Countries'
import Migrations from './Migrations'
import SarZones from './SarZones'
import Point from './Point'
import { journey } from './data'

const HEIGHT_RATIO = 0.67

export default ({
  title,
  lead,
  caption,
  byline,
  showJourney,
  showMigrations,
  showSarZones,
  migrationsLegend
}) => {
  const containerRef = useRef(null)
  const [width, setWidth] = useState(0)

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
    <div ref={containerRef} style={{ textAlign: 'left', position: 'relative' }}>
      {title && <ChartTitle>{title}</ChartTitle>}
      {lead && <ChartLead>{lead}</ChartLead>}
      {migrationsLegend && (
        <ColorLegend
          title={migrationsLegend.title}
          values={[
            {
              color: '#bcbd22',
              label: migrationsLegend.withPlane,
            },
            {
              color: '#1f77b4',
              label: migrationsLegend.noPlane,
            },
          ]}
        />
      )}
      <svg
        viewBox='0 0 996 664'
        style={{ backgroundColor: '#3a4b51', ...fontStyles.sansSerifMedium22 }}
        width={width}
        height={width * HEIGHT_RATIO}
      >
        <SarZones discrete={!showSarZones} />
        {showMigrations && <Migrations />}
        <Countries />
        {showJourney && (
          <g>
            {journey.map((point, i) => (
              <Point x={point.x} y={point.y} key={i} />
            ))}
          </g>
        )}
      </svg>
      {caption && (
        <FigureCaption>
          {caption} {byline && <FigureByline>{byline}</FigureByline>}
        </FigureCaption>
      )}
    </div>
  )
}
