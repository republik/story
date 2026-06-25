import React from 'react'
import { css } from 'glamor'
import {
  ChartTitle,
  ChartLead,
  FigureCaption,
  fontFamilies,
  Editorial,
} from '@project-r/styleguide'

import { csvParse } from 'd3-dsv'
import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import { nest } from 'd3-collection'

import { data } from './data'

const WAFFLE_WIDTH = 215
const RADIUS = 6
const margins = { left: 80, top: 20, bottom: 0, right: 20 }

const councilSeats = csvParse(data, (d) => {
  return { ...d, value: +d.seats }
})

const PARTY_COLORS = {
  SVP: '#4B8A3E',
  SP: '#F0554D',
  FDP: '#3872B5',
  Übrige: '#A09E9C',
  CVP: '#D6862B',
  Grüne: '#84B547',
  BDP: '#E6C820',
  GLP: '#C4C43D',
}

const xScale = scaleLinear()
  .domain(extent(councilSeats, (d) => +d.year))
  .range([0, WAFFLE_WIDTH])

const groupByCanton = nest()
  .key((d) => d.canton)
  .object(councilSeats)

const Index = ({
  title,
  lead,
  filterList,
  annotationColumn,
  annotations,
  source,
  href,
}) => {
  const sortedData = filterList.map((key) => ({
    key: key,
    values: groupByCanton[key],
  }))

  return (
    <div>
      <ChartTitle>{title}</ChartTitle>
      <ChartLead>{lead}</ChartLead>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {sortedData.map(({ key, values }) => (
          <div key={key}>
            <div>
              <strong style={{ color: 'var(--color-text)' }}>{key}</strong>
            </div>
            <WaffleComponent
              group={values}
              groupKey={'party'}
              canton={key}
              annotationColumn={annotationColumn}
              annotations={annotations}
            />
          </div>
        ))}
      </div>
      <FigureCaption>
        Quelle: <Editorial.A href={href}>{source}</Editorial.A>.
      </FigureCaption>
    </div>
  )
}

export default Index

const WaffleComponent = ({
  group,
  groupKey,
  canton,
  annotationColumn,
  annotations,
}) => {
  const waffleGroup = nest()
    .key((d) => d[groupKey])
    .entries(group)
  return (
    <svg width={WAFFLE_WIDTH + margins.left + margins.right} height={115}>
      <g>
        {canton === annotationColumn &&
          annotations.map(
            ({ label, positionX, positionY, mirror, fill, labelOffset }) => (
              <Annotation
                key={label}
                label={label}
                positionX={positionX}
                positionY={positionY}
                mirror={mirror}
                fill={fill}
                labelOffset={labelOffset}
              />
            )
          )}
        {waffleGroup.map(({ key, values }, idx) => (
          <g key={key} transform={`translate(0, ${margins.top + idx * 20})`}>
            <text {...styles.legend}>{key}</text>
            <g transform={`translate(${margins.left}, ${-RADIUS})`}>
              <line
                {...styles.line}
                x1={0}
                x2={WAFFLE_WIDTH}
                y1={0}
                y2={0}
              ></line>
              {values.map(({ year, value, party }, idx) => (
                <WaffleCircle
                  key={`circle-${idx}`}
                  year={year}
                  value={value}
                  fill={PARTY_COLORS[party]}
                />
              ))}
            </g>
          </g>
        ))}
      </g>
    </svg>
  )
}

const Annotation = ({
  label,
  positionX,
  positionY,
  mirror = true,
  fill = 'var(--color-text)',
  labelOffset,
}) => {
  return (
    <g transform={`translate(${positionX}, ${positionY})`}>
      {mirror ? (
        <path
          d='M8.93926 1.0037C8.66517 1.03725 8.47016 1.28664 8.5037 1.56074L9.05032 6.02741C9.08386 6.30151 9.33326 6.49652 9.60735 6.46298C9.88145 6.42943 10.0765 6.18004 10.0429 5.90594L9.55703 1.93556L13.5274 1.44968C13.8015 1.41614 13.9965 1.16674 13.963 0.892646C13.9294 0.618548 13.68 0.42354 13.4059 0.457084L8.93926 1.0037ZM0.499914 18.4996C0.741443 18.9373 0.741481 18.9373 0.74153 18.9373C0.741562 18.9373 0.741623 18.9373 0.741686 18.9372C0.741813 18.9371 0.741985 18.937 0.742204 18.9369C0.74264 18.9367 0.74326 18.9363 0.744063 18.9359C0.745669 18.935 0.748011 18.9337 0.75109 18.932C0.757249 18.9286 0.766362 18.9235 0.77846 18.9168C0.802656 18.9033 0.838791 18.8832 0.887113 18.856C0.983757 18.8017 1.12915 18.7196 1.32528 18.6076C1.71753 18.3836 2.31273 18.0401 3.12673 17.5607C4.75471 16.6019 7.258 15.0996 10.7634 12.9234L10.236 12.0738C6.73657 14.2463 4.23995 15.7445 2.61925 16.699C1.80891 17.1762 1.21757 17.5176 0.829369 17.7392C0.63527 17.8501 0.491959 17.931 0.397455 17.9841C0.350203 18.0106 0.315153 18.0302 0.292057 18.0431C0.280509 18.0495 0.271949 18.0542 0.266347 18.0574C0.263546 18.0589 0.261485 18.06 0.260159 18.0608C0.259496 18.0611 0.259017 18.0614 0.258721 18.0616C0.258573 18.0617 0.258471 18.0617 0.258415 18.0617C0.258387 18.0618 0.258379 18.0618 0.258365 18.0618C0.258369 18.0618 0.258384 18.0618 0.499914 18.4996ZM10.7634 12.9234C12.6068 11.779 13.5 10.4339 13.7149 9.02066C13.9263 7.63011 13.4648 6.27415 12.8116 5.122C12.1559 3.96527 11.2782 2.96233 10.5738 2.25436C10.22 1.89872 9.90615 1.61374 9.67985 1.41694C9.56662 1.31848 9.4751 1.2419 9.41119 1.1894C9.37924 1.16315 9.35417 1.1429 9.33673 1.12893C9.328 1.12195 9.32119 1.11653 9.31637 1.11272C9.31396 1.11081 9.31205 1.1093 9.31065 1.1082C9.30995 1.10765 9.30937 1.1072 9.30893 1.10686C9.30871 1.10668 9.30847 1.1065 9.30836 1.10641C9.30816 1.10625 9.30799 1.10612 9 1.5C8.69201 1.89388 8.69191 1.8938 8.69183 1.89374C8.69185 1.89376 8.69181 1.89372 8.69185 1.89375C8.69192 1.89381 8.69212 1.89397 8.69245 1.89422C8.6931 1.89474 8.69426 1.89565 8.69591 1.89696C8.69921 1.89957 8.70448 1.90376 8.71164 1.90949C8.72595 1.92095 8.74778 1.93857 8.77641 1.96209C8.83366 2.00912 8.91801 2.07966 9.02365 2.17153C9.23508 2.35539 9.5309 2.62391 9.86493 2.95965C10.5363 3.63445 11.3469 4.5658 11.9417 5.61514C12.5391 6.66907 12.8903 7.79098 12.7262 8.87035C12.5656 9.92702 11.895 11.0439 10.236 12.0738L10.7634 12.9234Z'
          fill={fill}
        />
      ) : (
        <path
          d='M5.05297 1.0286C5.3273 1.06014 5.52413 1.30811 5.49258 1.58244L4.97858 6.05299C4.94704 6.32732 4.69908 6.52415 4.42474 6.49261C4.15041 6.46106 3.95358 6.2131 3.98513 5.93877L4.44202 1.96495L0.468197 1.50805C0.193861 1.47651 -0.00296143 1.22855 0.0285803 0.954216C0.060122 0.679881 0.308084 0.483058 0.582419 0.5146L5.05297 1.0286ZM13.6198 18.4624C13.3815 18.9019 13.3814 18.9019 13.3814 18.9019C13.3813 18.9019 13.3813 18.9018 13.3812 18.9018C13.3811 18.9017 13.3809 18.9016 13.3807 18.9015C13.3803 18.9013 13.3796 18.9009 13.3788 18.9005C13.3772 18.8996 13.3749 18.8984 13.3718 18.8967C13.3656 18.8933 13.3564 18.8883 13.3443 18.8817C13.32 18.8684 13.2837 18.8485 13.2352 18.8217C13.1382 18.7681 12.9922 18.687 12.7952 18.5765C12.4014 18.3553 11.8037 18.0161 10.9862 17.5427C9.35126 16.5958 6.83708 15.1119 3.31586 12.9613L3.83708 12.1079C7.35226 14.2547 9.85975 15.7347 11.4874 16.6773C12.3012 17.1487 12.895 17.4857 13.2848 17.7045C13.4797 17.8139 13.6236 17.8938 13.7185 17.9462C13.7659 17.9724 13.8011 17.9917 13.8243 18.0044C13.8359 18.0107 13.8445 18.0154 13.8501 18.0185C13.8529 18.02 13.855 18.0212 13.8563 18.0219C13.857 18.0222 13.8575 18.0225 13.8578 18.0227C13.8579 18.0227 13.858 18.0228 13.8581 18.0228C13.8581 18.0228 13.8581 18.0228 13.8581 18.0229C13.8581 18.0229 13.8581 18.0228 13.6198 18.4624ZM3.31586 12.9613C1.46414 11.8304 0.561178 10.4919 0.336006 9.0802C0.114452 7.69123 0.566069 6.33194 1.21075 5.17506C1.85799 4.01357 2.72839 3.00425 3.42756 2.29116C3.77877 1.93295 4.09056 1.64568 4.31542 1.44724C4.42793 1.34795 4.51889 1.2707 4.58241 1.21774C4.61417 1.19125 4.63909 1.17082 4.65643 1.15673C4.6651 1.14968 4.67188 1.14421 4.67667 1.14037C4.67907 1.13844 4.68097 1.13692 4.68236 1.13581C4.68305 1.13525 4.68362 1.1348 4.68406 1.13445C4.68428 1.13427 4.68452 1.13409 4.68463 1.134C4.68483 1.13384 4.685 1.13371 4.99586 1.52533C5.30671 1.91695 5.30682 1.91687 5.30689 1.91681C5.30687 1.91683 5.30691 1.91679 5.30688 1.91682C5.3068 1.91688 5.30661 1.91704 5.30628 1.9173C5.30563 1.91782 5.30448 1.91874 5.30284 1.92005C5.29955 1.92269 5.29431 1.92692 5.2872 1.9327C5.27297 1.94427 5.25127 1.96205 5.22282 1.98577C5.16591 2.03323 5.08207 2.10438 4.97711 2.19701C4.76703 2.38241 4.47318 2.65308 4.1416 2.99126C3.4752 3.67094 2.67143 4.60818 2.08427 5.66183C1.49455 6.7201 1.15155 7.84454 1.32352 8.92269C1.49188 9.97815 2.17059 11.0901 3.83708 12.1079L3.31586 12.9613Z'
          fill={fill}
        />
      )}
      <text
        {...styles.legend}
        dx={labelOffset ? labelOffset : mirror ? -25 : 10}
        dy='32'
      >
        {label}
      </text>
    </g>
  )
}

const WaffleCircle = ({ year, value, fill }) => {
  return value === 2 ? (
    <g>
      <circle
        cy={0}
        cx={xScale(year)}
        r={value > 0 ? RADIUS : 0}
        fill={fill}
        stroke='var(--color-default)'
        fillOpacity={1}
        strokeWidth='1'
      ></circle>
      <circle
        cy={RADIUS + RADIUS / 2}
        cx={xScale(year)}
        r={value > 0 ? RADIUS : 0}
        fill={fill}
        stroke='var(--color-default)'
        fillOpacity={1}
        strokeWidth='1'
      ></circle>
    </g>
  ) : (
    <circle
      cy={0}
      cx={xScale(year)}
      r={value > 0 ? RADIUS : 0}
      fill={fill}
      stroke='var(--color-default)'
      fillOpacity={1}
      strokeWidth='1'
    ></circle>
  )
}

const styles = {
  circle: css({
    display: 'inline-block',
    borderRadius: '50%',
    width: '15px',
    height: '15px',
    marginRight: '3px',
    marginTop: '0.1em',
    transform: 'translateY(2px)',
  }),
  label: css({
    display: 'inline-block',
    marginLeft: '2px',
    marginRight: '15px',
    lineHeight: '1.1rem',
  }),
  image: css({
    width: '100%',
  }),
  line: css({
    strokeWidth: '1px',
    shapeRendering: 'crispEdges',
    opacity: 0.5,
    stroke: 'var(--color-dividerInverted)',
  }),
  legend: css({
    fontWeight: 'normal',
    fontSize: 14,
    fontFeatureSettings: '"tnum", "kern"',
    fontFamily: fontFamilies.sansSerifRegular,
    fill: 'var(--color-text)',
    color: 'var(--color-text)',
  }),
}
