import React, { useRef, useEffect, useMemo } from 'react'
import * as d3 from 'd3'
import { css } from 'glamor'

import { getTextPosition, icons, dataByStep } from './data'
import { useColorContext } from '@project-r/styleguide'

const HEIGHT = 500

const Plot = (props) => {
  const { innerWidth, size, phase, labels } = props
  const linksG = useRef()
  const nodesBackgroundG = useRef()
  const nodesG = useRef()

  const [colorScheme] = useColorContext()

  const cx = size / 2
  const cy = HEIGHT / 2

  const styleRules = useMemo(
    () => ({
      lines: css({
        stroke: colorScheme.getCSSColor('lines'),
      }),
      icons: css({
        fill: colorScheme.getCSSColor('background'),
      }),
      labels: css({
        fill: colorScheme.getCSSColor('text'),
      }),
      victim: css({
        fill: colorScheme.getCSSColor('victim'),
      }),
      media: css({
        fill: colorScheme.getCSSColor('media'),
      }),
      person: css({
        fill: colorScheme.getCSSColor('person'),
      }),
      movement: css({
        fill: colorScheme.getCSSColor('movement'),
      }),
    }),
    [colorScheme]
  )

  useEffect(() => {
    const data = dataByStep[phase.step]
    const nodeData = data.nodes
    const linkData = data.links

    linkData.forEach((link) => {
      link.source = nodeData.find(
        (n) => n.id === (link.source?.id || link.source)
      )
      link.target = nodeData.find(
        (n) => n.id === (link.target?.id || link.target)
      )
    })

    const updateLinks = () => {
      d3.select(linksG.current)
        .selectAll('line')
        .data(linkData, (d) => d.source.id + d.target.id)
        .join(
          (enter) => {
            enter
              .append('line')
              .attr('class', styleRules.lines)
              .attr('x1', (d) => d.source.tx || d.source.x)
              .attr('y1', (d) => d.source.ty || d.source.y)
              .attr('x2', (d) => d.target.tx || d.target.x)
              .attr('y2', (d) => d.target.ty || d.target.y)
              .style('opacity', 0)
              .transition()
              .duration(1000)
              .style('opacity', 1)
          },
          (update) => {
            update
              .attr('x1', (d) => d.source.tx || d.source.x)
              .attr('y1', (d) => d.source.ty || d.source.y)
              .attr('x2', (d) => d.target.tx || d.target.x)
              .attr('y2', (d) => d.target.ty || d.target.y)
          },
          (exit) => {
            exit.remove()
          }
        )
      d3.select(nodesBackgroundG.current)
        .selectAll('circle')
        .data(nodeData, (d) => d.id)
        .join('circle')
        .attr('cx', (d) => d.tx || d.x)
        .attr('cy', (d) => d.ty || d.y)
        .attr('r', 20)
        .attr('class', styleRules.icons)
    }

    d3.select(nodesG.current)
      .selectAll('g')
      .data(nodeData, (d) => d.id)
      .join(
        (enter) => {
          enter
            .append('g')
            .attr('transform', (d) => `translate(${d.x},${d.y})`)
            .call((g) => {
              g.append('path')
                .attr('d', (d) => icons[d.type])
                .attr('transform', 'translate(-15, -15)')
                .attr('class', (d) => styleRules[d.type])
                .style('opacity', 0)
                .transition()
                .duration(1000)
                .style('opacity', 1)
              g.append('text')
                .text((d) => labels[d.id])
                .attr('y', (d) => getTextPosition(d.id, phase.step).y)
                .attr('x', (d) => getTextPosition(d.id, phase.step).x)
                .attr('class', styleRules.labels)
                .attr(
                  'text-anchor',
                  (d) => getTextPosition(d.id, phase.step).anchor
                )
                .style('font-size', 12)
                .style('opacity', 0)
                .transition()
                .duration(1000)
                .style('opacity', 1)
            })
        },
        (update) => {
          let pendingUpdates = update.size()
          update
            .style('opacity', 1)
            .transition()
            .duration(1000)
            .attrTween('transform', function (d, i) {
              pendingUpdates--

              const shouldUpdateLinks = pendingUpdates === 0

              const { e: x, f: y } = this.transform.baseVal.consolidate().matrix
              const ipX = d3.interpolateNumber(x, d.x)
              const ipY = d3.interpolateNumber(y, d.y)

              return (t) => {
                d.tx = ipX(t)
                d.ty = ipY(t)
                if (shouldUpdateLinks) {
                  updateLinks()
                }
                return `translate(${d.tx},${d.ty})`
              }
            })
            .on('interrupt end', (d, i) => {
              d.tx = undefined
              d.ty = undefined
            })
          update
            .select('text')
            .style('opacity', 1)
            .transition()
            .duration(1000)
            .attr('y', (d) => getTextPosition(d.id, phase.step).y)
            .attr('x', (d) => getTextPosition(d.id, phase.step).x)
            .attr(
              'text-anchor',
              (d) => getTextPosition(d.id, phase.step).anchor
            )
          update.select('path').style('opacity', 1)
        },
        (exit) => {
          exit.transition().duration(500).style('opacity', 0).remove()
        }
      )
    updateLinks()
  }, [size, innerWidth, phase.step])

  return (
    <svg width={size} height={HEIGHT}>
      <g transform={`translate(${cx},${cy})`}>
        <g ref={linksG} />
        <g ref={nodesBackgroundG} />
        <g ref={nodesG} />
      </g>
    </svg>
  )
}

export default Plot
