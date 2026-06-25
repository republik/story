import React from 'react'

const WIDTH = 25
const HEIGHT = 60

const Investor = ({ cx, baseY, scale = 0.666 }) => (
  <g transform={`translate(${1 + cx - WIDTH * scale / 2} ${1 + baseY - HEIGHT * scale}) scale(${scale})`} stroke='#000' strokeWidth='3.33' fill='white' fillRule='evenodd' strokeLinecap='round'>
    <rect x={6} width={WIDTH - 6 * 2} y={10} height={HEIGHT - 10 - 2} stroke='none' />
    <path d='M.8 34.96v-20.4a2.58 2.58 0 0 1 5.16 0v20.4M16.25 34.96v-20.4a2.58 2.58 0 0 1 5.15 0v20.4' />
    <path d='M11.08 34.35v20.4a2.58 2.58 0 0 1-5.16 0v-20.4' />
    <path d='M16.22 34.35v20.4a2.58 2.58 0 0 1-5.15 0v-20.4M15.37 5.24a4.37 4.37 0 1 1-8.73 0 4.37 4.37 0 0 1 8.73 0zM11.03 18.26v6.92M11.03 14.27h.01' />
  </g>
)

export default Investor
