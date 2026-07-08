import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import {
  useBoundingClientRect,
  fontStyles,
  FigureCaption,
  FigureByline,
  Button,
  colors,
  mediaQueries
} from '@project-r/styleguide'
import { ChartTitle, ChartLead } from '@project-r/styleguide/chart'
import { css } from 'glamor'

import dataNormal from './BIP-normal.json'
import dataCorona from './BIP-corona.json'

const { mBreakPoint, lBreakPoint } = mediaQueries
const HEIGHT_DESKTOP = 470
const HEIGHT_MOBILE = 650

const color = d3.scaleOrdinal()
  .domain([
    "Landw.","Industrie","Pharma","Bau","Handel","Transport","Restaurants, Hotels","Kommunikation","Finanz","Immobilien","Unternehmens-Dienstl.","Verwaltung","Gesundheit, Bildung","Sonstige Dienstl."])
  .range([
    "#ffc600","#e41f1b","#70a5c6","#f86707","#e41f1b","#d41a19","#791b05","#ffb300","#ffc600","#ffcc00","#eb3814","#b0d2e3","#f96a06","#cb1a17"
  ])

const captions = {
  'Handel': 'Detail- und Grosshandel',
  'Information': 'Verlagswesen, Rundfunk, Kommunikation, Informationstechnologie',
  'Transport': 'Land- und Luftverkehr inkl. Post- und Kurierdienste',
  'Sonstige Dienstl.': 'Kunst, Unterhaltung, Erholung, Interessensvertretungen, Reparaturen, persönliche Dienstleistungen, Haushaltshilfen',
  'Landw.': 'Landwirtschaft inkl. Forstwirtschaft'
}

const PADDING_RIGHT = 7

const styles = {
  choices: css({
    display: 'flex',
    width: ['100%', `calc(100% - ${PADDING_RIGHT}px)`],
    marginTop: 3,
    ...fontStyles.sansSerifRegular21,
    color: colors.text,
    justifyContent: 'flex-end',
  }),
  choice: css({
    textAlign: 'right',
    marginBottom: 20,
    ...fontStyles.sansSerifRegular21,
    WebkitTapHighlightColor: 'transparent',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    WebkitAppearance: 'none',
    padding: '0px 6px',
    [mediaQueries.mUp]: {
      padding: '0px 10px'
    },
    ':last-child': {
      paddingRight: 0
    },
    ':first-child': {
      paddingLeft: 0
    }
  }),
  disabled: css({
    textDecoration: 'none',
    color: colors.disabled,
    ':hover': {
      color: colors.text
    }
  }),
  active: css({
    textDecoration: 'none',
    color: colors.text
  })
}

const TRANSITION_MS = 140

export default () => {
  const containerRef = useRef(null)
  const svgRef = useRef(null)

  const getWidth = () =>
    containerRef.current &&
    containerRef.current.getBoundingClientRect().width

  const [width, setWidth] = useState(-1)
  const height = width <= mBreakPoint
    ? HEIGHT_MOBILE
    : HEIGHT_DESKTOP

  const fontSize = width > 1000
    ? 16
    : width > 650 ? 14 : 11

  //console.log({ width, height, fontSize, gWidth: getWidth() })

  const [bit, setBit] = useState(1)
  const data = bit
    ? dataCorona
    : dataNormal

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    if (svg) {
      const treemap = d3.treemap()
        .tile(d3.treemapSquarify)
        .size([width, height])
        .padding(1.0)
        .round(true)

      const root = treemap(
        d3.hierarchy(data)
        .sum(d => d.value)
      )

      const leaves = root.leaves()

      const gLeaves = svg.selectAll("g")
        .data(leaves)
        .join(
          enter => {
            const leaf = enter.append("g")

            leaf
              .attr("transform", d => `translate(${d.x0},${d.y0})`)

            leaf
              .append("title")

            leaf.append("rect")
              .attr("fill", d => {
                if(d.data.name == 'Rest') {
                  return color(d.parent.data.name)
                }
                else {
                  return d3.color(color(d.parent.data.name)).copy({opacity: 0.2})
                }
              })
              .attr("fill-opacity", 0.9)
              .attr("width", d => d.x1 - d.x0)
              .attr("height", d => d.y1 - d.y0)

            leaf
              .append("text")

            return leaf
          }
        )
      gLeaves
        .transition().duration(TRANSITION_MS)
          .attr("transform", d => `translate(${d.x0},${d.y0})`)
      gLeaves
        .select("title")
        .text(d => [
          `${captions[d.parent.data.name] || d.parent.data.name}:`,
          d3.format('.1%')(d.value),
          bit === 1 && `(${d.data.name})`,
        ].filter(Boolean).join(' '))
      gLeaves
        .select("rect")
        .transition().duration(TRANSITION_MS)
          .attr("width", d => d.x1 - d.x0)
          .attr("height", d => d.y1 - d.y0)
      gLeaves
        .select("text")
        .attr("fill-opacity", d => d.data.name === 'Ausfall' && bit === 0 || d.value < 0.001 ? 0 : 1)
        .attr("font-size", d => {
          const text = d.parent.data.name
          if (['Restaurants, Hotels', 'Landw.'].includes(text) && fontSize < 16) {
            return fontSize-3
          }
          return null
        })
        .selectAll("tspan")
        .data(d => {
          if (d.data.name !== 'Rest') {
            return ''
          }
          return [
            ...`${d.parent.data.name}`.split(/(?=[A-Z][a-z])|\s+/g),
            `${d3.format(d.value <= 0.025 ? '.1%' : '.0%')(d.value)}`
          ].filter(Boolean)
        })
        .join("tspan")
        .attr("x", 3)
        .attr("y", (d, i, nodes) => `${(i > 0 && i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
        .text(d => d)
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
      <ChartTitle>Die Wirtschaft im Corona-Modus</ChartTitle>
      <ChartLead>Anteil der Branchen am Schweizer BIP</ChartLead>
      <div {...styles.choices}>
        {[0, 1].map(c =>
          <button
            key={c}
            {...styles.choice}
            {...styles[c === bit ? 'active' : 'disabled']}
            onClick={(e) => {
              e.preventDefault()
              setBit((bit+1)%2)
            }}
          >
            {c ? 'im Lockdown' : 'im Normalfall'}
          </button>
        )}
      </div>
      { width > 0 && height > 0 &&
        <svg ref={svgRef}
          style={{
            ...fontStyles.sansSerifRegular,
            display: 'block',
            fontSize
          }}
          width={width} height={height} />
      }
      <FigureCaption>
        Die Farbe einer Branche gibt den Wertschöpfungsrückgang im April wieder. Die einzelnen Anteile ergeben rundungsbedingt nicht exakt 100 Prozent.{' '}
        {Object.keys(captions).map( c => `${c} = ${captions[c]}`).join('. ')}.
      </FigureCaption>
      <FigureByline>Quelle: Seco</FigureByline>
    </div>
  )
}
