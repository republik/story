import React, { useRef } from 'react'
import { css } from 'glamor'
import {
  fontFamilies,
  useMediaQuery,
  ChartTitle,
  ChartLead,
  Center,
  createFormatter,
  Editorial,
} from '@project-r/styleguide'
import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import { csvParse } from 'd3-dsv'
import { line } from 'd3-shape'
import { curveNatural, area } from 'd3'
import { motion, useTransform, useSpring, useScroll } from 'framer-motion'

import { data, wideData } from './data'

import { XAxis } from './xAxis'
import { YAxis } from './yAxis'

import { HEIGHT, WIDTH, margin } from './config'
import { format } from './utils'

const colors = {
  immigration: 'rgba(106, 81, 163, 1)',
  emmigration: 'rgba(254, 145, 74, 1)',
}

const migrationData = csvParse(data, (d) => {
  return { ...d, value: +d.value }
})

const areaData = csvParse(wideData, (d) => {
  return { ...d, immigration: +d.immigration, emmigration: +d.emmigration }
})

const YLABELS = areaData.map((d) => d.year).filter((d, idx) => idx % 5 === 0)

const YTICKS = areaData.map((d) => d.year)

const domain = extent(migrationData, (d) => d.value)

const mobileBreakpoint = `@media only screen and (max-width: 850px)`

const Index = ({
  steps,
  translations,
  annotations,
  chartTitle,
  chartSubTitle,
}) => {
  const t = createFormatter(translations)
  const isMobile = useMediaQuery(mobileBreakpoint)
  const chartContainer = useRef(null)
  const { scrollYProgress } = useScroll({
    target: chartContainer,
    offset: ['start center', 'end 80vh'],
  })
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 1])
  const dynamicHeight = useTransform(scrollYProgress, [0.04, 0.05], [0, 275])
  const dynamicHeightAnimationStyle = useSpring(dynamicHeight, {
    stiffness: 400,
    damping: 90,
  })

  const rectHeight = useTransform(yRange, [0, 1], [0, HEIGHT])
  const rectHeightAnimationStyle = useSpring(rectHeight, {
    stiffness: 400,
    damping: 90,
  })

  const width = isMobile
    ? Math.min(400, window.innerWidth - margin.right - margin.left)
    : WIDTH

  // ? window.innerWidth - margin.right - margin.left
  // : WIDTH

  const xScale = scaleLinear()
    .domain([0, domain[1]])
    .range([margin.left, width - margin.right])

  const yScale = scaleLinear()
    .domain(extent(migrationData, (d) => d.year))
    .range([margin.top, HEIGHT - margin.bottom])

  const lineShape = line()
    .x((d) => xScale(d.value))
    .y((d) => yScale(d.year))
    .defined((d) => !isNaN(d.value))
    .curve(curveNatural)

  const immigrationLine = lineShape(
    migrationData.filter((d) => d.category === 'immigration')
  )

  const emmigrationLine = lineShape(
    migrationData.filter((d) => d.category === 'emmigration')
  )

  const clipPathEmmigrationShape = area()
    .y((d) => yScale(d.year))
    .x0(0)
    .x1((d) => xScale(d.emmigration))
    .defined((d) => !isNaN(d.emmigration))
    .curve(curveNatural)

  const clipPathImmigrationShape = area()
    .y((d) => yScale(d.year))
    .x0(width)
    .x1((d) => xScale(d.emmigration))
    .defined((d) => !isNaN(d.emmigration))
    .curve(curveNatural)

  const areaShapeGeneratorEmmigration = area()
    .y((d) => yScale(d.year))
    .x0(width)
    .x1((d) => xScale(d.immigration))
    .defined((d) => !isNaN(d.emmigration))
    .curve(curveNatural)

  const areaShapeGeneratorImmigration = area()
    .y((d) => yScale(d.year))
    .x0(0)
    .x1((d) => xScale(d.immigration))
    .defined((d) => !isNaN(d.emmigration))
    .curve(curveNatural)

  const clipPathEmmigration = clipPathEmmigrationShape(areaData)
  const clipPathImmigration = clipPathImmigrationShape(areaData)

  const emmigrationArea = areaShapeGeneratorEmmigration(areaData)

  const immigrationArea = areaShapeGeneratorImmigration(areaData)

  return (
    <div>
      <Center>
        <ChartTitle>{chartTitle}</ChartTitle>
        <ChartLead>{chartSubTitle}</ChartLead>
      </Center>
      <div
        ref={chartContainer}
        style={{
          position: 'relative',
          margin: '0 auto',
          width: '100%',
          maxWidth: 900,
          padding: '0 15px 15px',
        }}
      >
        <XAxis xScale={xScale} legendStyle={styles.legend} />
        {!isMobile &&
          steps.map(({ step, title, positionX, positionY, threshold }) => (
            <TextOverlay
              key={`desktop-text-overlay-${title}`}
              title={title}
              text={t.elements(step + '/text', {
                link1: (
                  <Link
                    text={t(step + '/linkText1')}
                    href={t(step + '/linkUrl1')}
                  />
                ),
                link2: (
                  <Link
                    text={t(step + '/linkText2')}
                    href={t(step + '/linkUrl2')}
                  />
                ),
                emmigrationLabel: (
                  <TextLabel
                    color={colors.emmigration}
                    text={t(step + '/emmigrationLabel')}
                    type='Emmigration'
                  />
                ),
                immigrationLabel: (
                  <TextLabel
                    color={colors.immigration}
                    text={t(step + '/immigrationLabel')}
                    type='Immigration'
                  />
                ),
              })}
              positionX={positionX}
              positionY={positionY}
              threshold={threshold}
              yRange={yRange}
              yScale={yScale}
              isMobile={isMobile}
            />
          ))}

        {annotations.map(
          ({
            title,
            positionX,
            mobilePositionX,
            positionY,
            color,
            threshold,
            mobileThreshold,
          }) => (
            <TextAnnotation
              key={`annotation-${title}`}
              title={title}
              x={isMobile ? xScale(mobilePositionX) : xScale(positionX)}
              y={yScale(positionY)}
              fill={colors[color]}
              yRange={yRange}
              threshold={isMobile ? mobileThreshold : threshold}
            />
          )
        )}

        <svg width={width} height={HEIGHT}>
          <clipPath id='emmigration'>
            <path d={clipPathEmmigration}></path>
          </clipPath>
          <clipPath id='immigration'>
            <path d={clipPathImmigration}></path>
          </clipPath>
          <g>
            <g>
              <motion.path
                fill={colors.immigration}
                fillOpacity={0.1}
                d={immigrationArea}
                clipPath='url(#immigration)'
              ></motion.path>
              <motion.path
                fill={colors.emmigration}
                fillOpacity={0.1}
                d={emmigrationArea}
                clipPath='url(#emmigration)'
              ></motion.path>
              <motion.path
                fill='none'
                strokeWidth='2'
                stroke={colors.emmigration}
                d={emmigrationLine}
              ></motion.path>
              <motion.path
                fill='none'
                strokeWidth='2'
                stroke={colors.immigration}
                d={immigrationLine}
              ></motion.path>

              {!isMobile && (
                <motion.rect
                  width={width - margin.right}
                  height={HEIGHT}
                  fill='var(--color-default)'
                  y={rectHeightAnimationStyle}
                  x={margin.left}
                ></motion.rect>
              )}

              <YAxis
                yScale={yScale}
                yLabels={YLABELS}
                yTicks={YTICKS}
                legendStyle={styles.legend}
                tickStyle={styles.line}
              />

              <PeakAnnotation
                x1={xScale(54223)}
                x2={xScale(121081)}
                y1={yScale('1975')}
                y2={yScale('1975')}
                yRange={yRange}
                threshold={isMobile ? [0, 0.02] : [0.1, 0.11]}
                color={colors.emmigration}
                number={format(121081 - 54223)}
                numberPositionY={yScale('1975')}
                numberPositionX={xScale(75000)}
                isMobile={isMobile}
              />
              <PeakAnnotation
                x1={xScale(73443)}
                x2={xScale(133100)}
                y1={yScale('1991')}
                y2={yScale('1991')}
                yRange={yRange}
                threshold={isMobile ? [0.3, 0.31] : [0.41, 0.42]}
                number={format(133100 - 73443)}
                numberPositionY={yScale('1991')}
                numberPositionX={xScale(95000)}
                isMobile={isMobile}
              />
              <PeakAnnotation
                x1={xScale(53517)}
                x2={xScale(105014)}
                y1={yScale('2002')}
                y2={yScale('2002')}
                yRange={yRange}
                threshold={isMobile ? [0.5, 0.51] : [0.61, 0.62]}
                number={format(105014 - 53517)}
                numberPositionY={yScale('2002')}
                numberPositionX={xScale(65000)}
                isMobile={isMobile}
              />
              <PeakAnnotation
                x1={xScale(58266)}
                x2={xScale(161629)}
                y1={yScale('2008')}
                y2={yScale('2008')}
                yRange={yRange}
                threshold={isMobile ? [0.6, 0.61] : [0.72, 0.73]}
                number={format(161629 - 58266)}
                numberPositionY={yScale('2008')}
                numberPositionX={xScale(90000)}
                isMobile={isMobile}
              />
              <PeakAnnotation
                x1={xScale(90088)}
                x2={xScale(167407)}
                y1={yScale('2016')}
                y2={yScale('2016')}
                yRange={yRange}
                threshold={isMobile ? [0.7, 0.71] : [0.91, 0.92]}
                number={format(167407 - 90088)}
                numberPositionY={yScale('2016')}
                numberPositionX={xScale(110000)}
                isMobile={isMobile}
              />
            </g>
          </g>
        </svg>
        {isMobile && (
          <motion.div
            style={{
              position: 'sticky',
              bottom: 0,
              backgroundColor: 'var(--color-default)',
              zIndex: 100,
              height: dynamicHeightAnimationStyle,
              boxShadow: '0 -5px 5px -5px rgb(0, 0, 0, 0.1)',
              marginLeft: '-15px',
              marginRight: '-15px',
              opacity: 1,
              overflow: 'hidden',
            }}
          >
            {isMobile &&
              steps.map(({ step, title, mobileThreshold }) => (
                <TextOverlay
                  key={`mobile-text-overlay-${title}`}
                  title={title}
                  text={t.elements(step + '/text', {
                    link1: (
                      <Link
                        text={t(step + '/linkText1')}
                        href={t(step + '/linkUrl1')}
                      />
                    ),
                    link2: (
                      <Link
                        text={t(step + '/linkText2')}
                        href={t(step + '/linkUrl2')}
                      />
                    ),
                    emmigrationLabel: (
                      <TextLabel
                        color={colors.emmigration}
                        text={t(step + '/emmigrationLabel')}
                        type='Emmigration'
                      />
                    ),
                    immigrationLabel: (
                      <TextLabel
                        color={colors.immigration}
                        text={t(step + '/immigrationLabel')}
                        type='Immigration'
                      />
                    ),
                  })}
                  threshold={mobileThreshold}
                  yRange={yRange}
                  isMobile={isMobile}
                />
              ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Index

const TextOverlay = ({
  text,
  yRange,
  threshold,
  positionY,
  positionX,
  yScale,
  isMobile,
}) => {
  const opacity = useTransform(yRange, threshold, [0, 1, 1, 0])
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: positionY ? yScale(positionY) : 0,
        left: positionX ? positionX : 'unset',
        textAlign: 'left',
        opacity: opacity,
        width: isMobile ? '100%' : '420px',
        padding: 20,
        color: 'var(--color-text)',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <ChartLead>{text}</ChartLead>
      </div>
    </motion.div>
  )
}

const TextAnnotation = ({ title, yRange, threshold, x, y, fill }) => {
  const opacity = useTransform(yRange, threshold, [0, 1, 1, 0])
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        color: fill,
        opacity: opacity,
        fontSize: 14,
        fontFamily: fontFamilies.sansSerifRegular,
      }}
    >
      {title}
    </motion.div>
  )
}

const PeakAnnotation = ({
  x1,
  x2,
  y1,
  y2,
  yRange,
  threshold,
  number,
  numberPositionX,
  numberPositionY,
  isMobile,
}) => {
  return (
    <g>
      <motion.line
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        stroke='var(--color-text)'
        strokeWidth={useTransform(yRange, threshold, [0, 1])}
        style={{ shapeRendering: 'crispEdges' }}
      ></motion.line>

      <motion.circle
        r={useTransform(yRange, threshold, [0, 4])}
        cx={x1}
        cy={y1}
        strokeWidth='1'
        stroke='var(--color-text)'
        fill='transparent'
      ></motion.circle>

      <motion.circle
        r={useTransform(yRange, threshold, [0, 4])}
        cx={x2}
        cy={y1}
        strokeWidth='1'
        stroke='var(--color-text)'
        fill='transparent'
      ></motion.circle>

      <motion.text
        {...styles.legend}
        opacity={useTransform(yRange, threshold, [0, 1])}
        y={numberPositionY}
        x={numberPositionX}
        dy='22'
        dx={isMobile ? '-10' : 0}
      >
        {number}
      </motion.text>
    </g>
  )
}

const Link = (props) => {
  const { href, text } = props
  return <Editorial.A href={href}>{text}</Editorial.A>
}

const TextLabel = ({ text, color, type }) => {
  return (
    <span
      {...styles.labelLine}
      {...styles['labelLine' + type]}
      style={{ textDecorationColor: color }}
    >
      {text}
    </span>
  )
}

const styles = {
  legend: css({
    fontWeight: 'normal',
    fontSize: 14,
    fontFeatureSettings: '"tnum", "kern"',
    fontFamily: fontFamilies.sansSerifRegular,
    fill: 'var(--color-text)',
    color: 'var(--color-text)',
  }),
  line: css({
    strokeWidth: '1px',
    shapeRendering: 'crispEdges',
    opacity: 0.5,
    stroke: 'var(--color-text)',
  }),
  labelLine: css({
    position: 'relative',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    textDecorationThickness: '2px',
    display: 'inline-block',
    paddingRight: '20px',
    '&:after': {
      content: ' ',
      display: 'inline-block',
      marginLeft: '4px',
      marginRight: '-20px',
      width: '19px',
      height: '9px',
    },
  }),
  labelLineImmigration: css({
    '&:after': {
      backgroundImage: `url('data:image/svg+xml,<svg width="19" height="9" viewBox="0 0 19 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.51593 4.01472C1.51593 4.01472 4.18798 6.24147 6.5 7C8.81202 7.75853 10.5531 2.619 12.5 1.99999C14.4469 1.38097 17.101 3.62084 17.5155 3.89272" stroke="${colors.immigration}" stroke-width="2"/></svg>')`,
    },
  }),
  labelLineEmmigration: css({
    '&:after': {
      backgroundImage: `url('data:image/svg+xml,<svg width="19" height="9" viewBox="0 0 19 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.51593 4.01472C1.51593 4.01472 4.18798 6.24147 6.5 7C8.81202 7.75853 10.5531 2.619 12.5 1.99999C14.4469 1.38097 17.101 3.62084 17.5155 3.89272" stroke="${colors.emmigration}" stroke-width="2"/></svg>')`,
    },
  }),
}
