import React from 'react'
import { css } from 'glamor'
import {
  ChartTitle,
  ChartLead,
  FigureCaption,
  Label,
} from '@project-r/styleguide'

const ASSETS_BASE_URL =
  'https://cdn.repub.ch/s3/republik-assets/dynamic-components/map-color-legend/assets/'

const legendColors = [
  '#33a02c',
  '#b2df8a',
  '#fb9a99',
  '#e31a1c',
  '#fdbf6f',
  '#ff7f00',
  '#a6cee3',
  '#1f78b4',
  '#6a3d9a',
]
// const names = [
//   'Léman',
//   'Jura',
//   'Bern',
//   'Basel',
//   'Zürich',
//   'Rigi',
//   'Wallis',
//   'Gottardo',
//   'Säntis',
// ]

const Index = ({ title, lead, source, image, names }) => {
  return (
    <>
      <ChartTitle>{title}</ChartTitle>
      <ChartLead>{lead}</ChartLead>
      <Legend colors={legendColors} names={names} />
      <img {...styles.image} src={ASSETS_BASE_URL + image} />
      <FigureCaption>{source}</FigureCaption>
    </>
  )
}

export default Index

const Legend = ({ colors, names }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {colors.map((color, i) => (
        <span style={{ whiteSpace: 'nowrap' }} key={`color-legend-${i}`}>
          <span {...styles.circle} style={{ backgroundColor: color }} />
          <span {...styles.label}>
            <Label>{names[i]}</Label>
          </span>
        </span>
      ))}
    </div>
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
}
