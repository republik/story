import React from 'react'

const WIDTH = 130
const HEIGHT = 128

const Factory = ({ cx, baseY, scale = 0.666 }) => (
  <g transform={`translate(${1 + cx - WIDTH * scale / 2} ${2 + baseY - HEIGHT * scale}) scale(${scale})`} fill='white' fillRule='evenodd'>
    <path d='M.8 123.86h125.72' stroke='#000' strokeWidth='3.33' strokeLinecap='round' />
    <path stroke='#000' strokeWidth='3.33' strokeLinecap='round' strokeLinejoin='round' d='M10.39 117.68v-65.6l19.13 15.49V52.09l19.13 15.48V52.09l19.12 15.48V52.09L86.9 67.57l30.17.17v49.94z' />
    <path d='M32.66 103.39H20.73c-.62 0-1.13-.51-1.13-1.14V82.6c0-.63.5-1.14 1.13-1.14h11.93c.63 0 1.13.51 1.13 1.14v19.66c0 .63-.5 1.14-1.13 1.14M107.65 117.64H93.03c-.63 0-1.13-.5-1.13-1.13V82.59c0-.63.5-1.14 1.13-1.14h14.62c.63 0 1.14.51 1.14 1.14v33.92c0 .62-.51 1.13-1.14 1.13M75.41 103.39h-36.9c-.62 0-1.13-.51-1.13-1.14V82.6c0-.63.5-1.14 1.13-1.14h36.9c.63 0 1.13.51 1.13 1.14v19.66c0 .63-.5 1.14-1.13 1.14' fill='#000' fillRule='nonzero' />
    <path stroke='#000' strokeWidth='3.33' strokeLinecap='round' strokeLinejoin='round' d='M108.79 67.5H91.9V34.7h16.89zM104.44 27.56h-8.2a5.01 5.01 0 0 1 0-10.03h8.2a5.01 5.01 0 0 1 0 10.03z' />
    <path d='M114.34 17.56h-12.59a5.01 5.01 0 0 1 0-10.02h12.6a5.01 5.01 0 0 1 0 10.02zM89.03 10.21a5.01 5.01 0 1 1 0-10.03 5.01 5.01 0 0 1 0 10.03z' stroke='#000' strokeWidth='3.33' strokeLinecap='round' strokeLinejoin='round' />
  </g>
)

export default Factory
