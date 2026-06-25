import React from 'react'

const SarZones = ({ discrete }) => (
  <g>
    <g>
      <polyline
        points='267.07 485.55 289.26 451.05 289.26 417.88 267.07 417.88 267.07 298.55 267.07 214.54 165.07 166.91 127.56 166.91 129.07 264.55'
        fill='none'
        stroke='#bbb'
        strokeLinecap='round'
        strokeMiterlimit='10'
        strokeWidth={discrete ? 0.75 : 2}
        opacity={discrete ? 0.3 : 1}
      />
      <polyline
        points='289.26 417.88 829.29 417.88 864.57 437.05 943.82 544.3 913.07 568.54'
        fill='none'
        stroke='#bbb'
        strokeLinecap='round'
        strokeMiterlimit='10'
        strokeWidth={discrete ? 0.75 : 2}
        opacity={discrete ? 0.3 : 1}
      />
      <line
        x1='616.54'
        y1='295.55'
        x2='829.29'
        y2='417.88'
        fill='none'
        stroke='#bbb'
        strokeLinecap='round'
        strokeMiterlimit='10'
        strokeWidth={discrete ? 0.75 : 2}
        opacity={discrete ? 0.3 : 1}
      />
      <polyline
        points='267.07 298.55 301.57 367.05 318.64 367.05 393.57 292.04 473.84 326.23 616.54 326.23 620.57 32.05 508.57 -53.95 501.43 -43.2 494.07 -43.2 485.05 -53.95 489.57 -65.95 500.57 -69.95 493.07 -79.95'
        fill='none'
        stroke='#bbb'
        strokeLinecap='round'
        strokeMiterlimit='10'
        strokeWidth={discrete ? 0.75 : 2}
        opacity={discrete ? 0.3 : 1}
      />
      <polyline
        points='127.56 166.91 86.7 166.91 86.7 1.04'
        fill='none'
        stroke='#bbb'
        strokeLinecap='round'
        strokeMiterlimit='10'
        strokeWidth={discrete ? 0.75 : 2}
        opacity={discrete ? 0.3 : 1}
      />
    </g>
    {!discrete && (
      <g fill='#bbb'>
        <text transform='translate(142.51 230.43)'>Tunesien</text>
        <text transform='translate(286.62 284.96)'>Italien</text>
        <text transform='translate(368.96 365.42)'>Malta</text>
        <text transform='translate(314.78 466.28)'>Libyen</text>
      </g>
    )}
  </g>
)

export default SarZones
