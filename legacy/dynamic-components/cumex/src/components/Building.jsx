import React from 'react'
import { range } from 'd3'

const Building = ({
  cx, baseY,
  door = true,
  windows = 3,
  floors = 3
}) => {
  const doorSize = [18, 22, 3]
  const roomSize = [16, 16, 2]

  const padding = 3
  const height = (
    padding +
    floors * roomSize[1] +
    (door ? doorSize[1] + doorSize[2] + padding : padding)
  )
  const width = (
    padding +
    windows * roomSize[0] +
    padding
  )

  const radius = 1

  return (
    <g transform={`translate(${cx - width / 2} ${baseY - height})`}>
      <rect
        rx={radius} ry={radius}
        width={width} height={height}
        fill='white'
        stroke='black'
        strokeWidth={2}
      />
      {range(floors).map(floor => (
        <g key={floor} transform={`translate(${padding} ${padding + roomSize[1] * floor})`}>
          {range(windows).map(room => (
            <rect
              rx={radius} ry={radius}
              key={room}
              x={roomSize[0] * room + roomSize[2]}
              y={roomSize[2]}
              fill='black'
              width={roomSize[0] - roomSize[2] * 2}
              height={roomSize[1] - roomSize[2] * 2} />
          ))}
        </g>
      ))}
      { door && <rect 
        rx={radius} ry={radius}
        width={doorSize[0]}
        height={doorSize[1]}
        x={(width - doorSize[0]) / 2}
        y={height - doorSize[1]}
        fill='black'
      />}
    </g>
  )
}

export default Building
