import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import {
  fontStyles,
  FigureCaption,
  FigureByline,
  mediaQueries,
} from '@project-r/styleguide'
import { ChartTitle, ChartLead } from '@project-r/styleguide/chart'
import { formatLocale } from 'd3-format'

export const thousandSeparator = '\u2019'
export const swissNumbers = formatLocale({
  decimal: ',',
  thousands: thousandSeparator,
  grouping: [3],
  currency: ['CHF\u00a0', ''],
})

const format = (number) => {
  return swissNumbers
    .format('.3~s')(number)
    .replace('M', 'Mio.')
    .replace('G', ' Mrd.')
    .replace('T', ' Bio.')
}

const { mBreakPoint } = mediaQueries
const HEIGHT_DESKTOP = 470
const HEIGHT_MOBILE = 650

const TRANSITION_MS = 140

export default ({ title, lead, caption, byline, data, numberFormat }) => {
  const containerRef = useRef(null)
  const svgRef = useRef(null)

  const getWidth = () =>
    containerRef.current && containerRef.current.getBoundingClientRect().width

  const [width, setWidth] = useState(-1)
  const height = width <= mBreakPoint ? HEIGHT_MOBILE : HEIGHT_DESKTOP

  const fontSize = width > 1000 ? 16 : width > 650 ? 14 : 11

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    if (svg) {
      const treemap = d3
        .treemap()
        .tile(d3.treemapSquarify)
        .size([width, height])
        .padding(3.0)
        .round(true)

      const root = treemap(d3.hierarchy(data).sum((d) => d.value))

      const leaves = root.leaves()

      const gLeaves = svg
        .selectAll('g')
        .data(leaves)
        .join((enter) => {
          const leaf = enter.append('g')

          leaf.attr('transform', (d) => `translate(${d.x0},${d.y0})`)

          leaf.append('title')

          leaf
            .append('rect')
            .attr('fill', (d) => d.data.color || '#bbb')
            .attr('fill-opacity', 0.9)
            .attr('width', (d) => d.x1 - d.x0)
            .attr('height', (d) => d.y1 - d.y0)

          leaf.append('text')

          return leaf
        })
      gLeaves
        .transition()
        .duration(TRANSITION_MS)
        .attr('transform', (d) => `translate(${d.x0},${d.y0})`)
      gLeaves.select('title').text((d) => `${d.data.name}\n${format(d.value)}`)
      gLeaves
        .select('rect')
        .transition()
        .duration(TRANSITION_MS)
        .attr('width', (d) => d.x1 - d.x0)
        .attr('height', (d) => d.y1 - d.y0)
      gLeaves
        .select('text')
        .style('font-size', (d) =>
          d.data.name === d.parent.data.children[0].name ? '4em' : null
        )
        .selectAll('tspan')
        .data((d) => {
          const maxWidth = d.x1 - d.x0
          const meanLetterWidth = width > 1000 ? 9 : width > 650 ? 8 : 6
          const words = d.data.name.split(' ')
          const lines = words.reduce((accumulator, currentWord) => {
            if (!accumulator.length) return [currentWord]
            const longerLine =
              accumulator[accumulator.length - 1] + ' ' + currentWord
            if (longerLine.length > maxWidth / meanLetterWidth) {
              return accumulator.concat(currentWord)
            } else {
              accumulator[accumulator.length - 1] = longerLine
              return accumulator
            }
          }, [])
          return lines.concat(format(d.value, numberFormat))
        })
        .join('tspan')
        .attr('x', 5)
        .attr(
          'y',
          (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
        )
        .attr('fill-opacity', (d, i, nodes) =>
          i === nodes.length - 1 ? 0.7 : null
        )
        .text((d) => d.replace('Astra zeneca', 'Astrazeneca'))
    }

    const syncWidth = () => {
      const measuredWidth = getWidth()
      if (width !== measuredWidth) {
        setWidth(measuredWidth)
      }
    }
    if (width === -1) {
      syncWidth()
    }
    window.addEventListener('resize', syncWidth)

    return () => {
      window.removeEventListener('resize', syncWidth)
    }
  }, [width, data])

  return (
    <div ref={containerRef}>
      {title && <ChartTitle>{title}</ChartTitle>}
      {lead && <ChartLead>{lead}</ChartLead>}
      {width > 0 && height > 0 && (
        <svg
          ref={svgRef}
          style={{
            ...fontStyles.sansSerifRegular,
            display: 'block',
            fontSize,
          }}
          width={width}
          height={height}
        />
      )}
      {caption && <FigureCaption>{caption}</FigureCaption>}
      {byline && <FigureByline>{byline}</FigureByline>}
    </div>
  )
}
