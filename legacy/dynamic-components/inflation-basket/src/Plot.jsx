import React, { useRef, useEffect, useMemo } from 'react'
import * as d3 from 'd3'
import { css } from 'glamor'

import { fontFamilies } from '@project-r/styleguide'

import { dataByStep } from './data'

import { useColorContext } from '@project-r/styleguide'

const styles = {
  legend: css({
    fontWeight: 'normal',
    fontSize: 12,
    fontFamily: fontFamilies.sansSerifRegular,
    fontFeatureSettings: '"tnum", "kern"',
  }),
  line: css({
    strokeWidth: '1px',
    shapeRendering: 'crispEdges',
    opacity: 0.3,
  }),
}

const HEIGHT = 500

const Plot = (props) => {
  const { innerWidth, size, phase, setHoverPoint } = props
  const [colorScheme] = useColorContext()

  const bubblesG = useRef()

  const styleRules = useMemo(
    () => ({
      grey: css({
        fill: colorScheme.getCSSColor('grey'),
      }),
      CP011: css({
        fill: colorScheme.getCSSColor('CP011'),
      }),
      CP045: css({
        fill: colorScheme.getCSSColor('CP045'),
      }),
      CP072: css({
        fill: colorScheme.getCSSColor('CP072'),
      }),
      CP112: css({
        fill: colorScheme.getCSSColor('CP112'),
      }),
      CP041: css({
        fill: colorScheme.getCSSColor('CP041'),
      }),
      CP082_083: css({
        fill: colorScheme.getCSSColor('CP082_083'),
      }),
    }),
    [colorScheme]
  )

  useEffect(() => {
    const data = dataByStep[phase.step]

    d3.select(bubblesG.current)
      .selectAll('g')
      .data(data, (d) => d.COICOP)
      .join(
        (enter) => {
          enter
            .append('g')
            .attr('transform', (d) => `translate(${d.x},${d.y})`)
            .call((g) => {
              g.append('circle')
                .attr('r', 0)
                .transition()
                .duration(1000)
                .attr('r', (d) => d.radius)
                .attr('class', (d) => styleRules?.[d.COICOP] || styleRules.grey)
            })
        },
        (update) => {
          update
            .transition()
            .duration(1000)
            .attr('transform', (d) => `translate(${d.x},${d.y})`)
        },
        (exit) => {
          exit.transition().duration(500).style('opacity', 0).remove()
        }
      )

    d3.select(bubblesG.current)
      .selectAll('g')
      .on('mouseenter', (d) => setHoverPoint(d))
      .on('mouseleave', () => setHoverPoint(null))
  }, [size, innerWidth, phase.step])

  return (
    <svg width={size} height={HEIGHT}>
      <g {...styles.legend} transform={`translate(10, 20)`}>
        <g transform='translate(0, 429.07142857142856)'>
          <text textAnchor='start' {...colorScheme.set('fill', 'text')}>
            <tspan dy='-5'>{'\u221210'}</tspan>
          </text>
          <line
            {...styles.line}
            x2={size}
            {...colorScheme.set('stroke', 'text')}
          ></line>
        </g>

        <g transform='translate(0,  357.6428571428571)'>
          <text textAnchor='start' {...colorScheme.set('fill', 'text')}>
            <tspan dy='-5'>{'0'}</tspan>
          </text>
          <line
            {...styles.line}
            x2={size}
            {...colorScheme.set('stroke', 'text')}
          ></line>
        </g>
        <g transform='translate(0, 286.2142857142857)'>
          <text textAnchor='start' {...colorScheme.set('fill', 'text')}>
            <tspan dy='-5'>{'10'}</tspan>
          </text>
          <line
            {...styles.line}
            x2={size}
            {...colorScheme.set('stroke', 'text')}
          ></line>
        </g>
        <g transform='translate(0, 214.78571428571425)'>
          <text textAnchor='start' {...colorScheme.set('fill', 'text')}>
            <tspan dy='-5'>{'20'}</tspan>
          </text>
          <line
            {...styles.line}
            x2={size}
            {...colorScheme.set('stroke', 'text')}
          ></line>
        </g>
        <g transform='translate(0, 143.35714285714286)'>
          <text textAnchor='start' {...colorScheme.set('fill', 'text')}>
            <tspan dy='-5'>{'30'}</tspan>
          </text>
          <line
            {...styles.line}
            x2={size}
            {...colorScheme.set('stroke', 'text')}
          ></line>
        </g>

        <g transform='translate(0,  71.92857142857135)'>
          <text textAnchor='start' {...colorScheme.set('fill', 'text')}>
            <tspan dy='-5'>{'40'}</tspan>
          </text>
          <line
            {...styles.line}
            x2={size}
            {...colorScheme.set('stroke', 'text')}
          ></line>
        </g>
        <g transform='translate(0, 0.5)'>
          <text textAnchor='start' {...colorScheme.set('fill', 'text')}>
            <tspan dy='-5'>{'50\u2009% Inflation'}</tspan>
          </text>
          <line
            {...styles.line}
            x2={size}
            {...colorScheme.set('stroke', 'text')}
          ></line>
        </g>
      </g>

      <g ref={bubblesG} transform={`translate(15, 20)`} />
    </svg>
  )
}

export default Plot
