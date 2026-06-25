import React, { Fragment } from 'react'
import { css } from 'glamor'
import {
  fontFamilies,
  colors
} from '@project-r/styleguide'

import Building from './Building'
import Investor from './Investor'
import Factory from './Factory'
import Money from './Money'
import Arrow, { MarkerDefs } from './Arrow'

const styles = {
  textName: css({
    fontWeight: 'normal',
    fontFamily: fontFamilies.sansSerifMedium,
    fontSize: 16,
    textAnchor: 'middle'
  }),
  textLocation: css({
    fontWeight: 'normal',
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: 14,
    textAnchor: 'middle'
  }),
  opacity: css({
    transition: 'opacity 400ms'
  })
}

const Fade = ({ opacity, visible, children }) => (
  <g
    {...styles.opacity}
    style={{
      opacity: opacity === undefined
        ? visible ? 1 : 0
        : opacity
    }}>
    {children}
  </g>
)

const io = {
  baseY: 80,
  cx: 45,
  padX: 45,
  padY: 60
}
const mt = {
  baseY: 80,
  cx: 255,
  padX: 45,
  padY: 70
}
const buffer = {
  baseY: 420,
  cx: 255,
  padX: 45,
  padY: 90
}
const distributor = {
  baseY: 420,
  cx: 45,
  padX: 45,
  padY: 90
}

const Artboard = ({ activeIndex, active = [], labels = {}, size }) => {
  return <Fragment>
    <defs>
      <MarkerDefs />
    </defs>

    <g transform='translate(0 225)'>
      <Fade visible={active.includes('amt')}>
        <Building windows={3} floors={2} door={false} cx={size[0] / 2} baseY={5} />
        <text y={32}>
          <tspan x={size[0] / 2} {...styles.textName}>{labels.amt}</tspan>
          <tspan x={size[0] / 2} {...styles.textLocation} dy='1.3em'>{labels.amtOrt}</tspan>
        </text>
      </Fade>
    </g>

    <g transform={`translate(${io.cx} ${io.baseY})`}>
      <Fade visible={active.includes('io')}>
        <Building windows={4} floors={2} cx={0} baseY={5} />
        <text y={32}>
          <tspan x={0} {...styles.textName}>{labels.io}</tspan>
          <tspan x={0} {...styles.textLocation} dy='1.3em'>{labels.ioOrt}</tspan>
        </text>
      </Fade>
    </g>

    <Fade visible={active.includes('io-mt')}>
      <rect x={size[0] / 2 - 30} y={io.baseY + 10} width={60} height={40} fill={colors.primaryBg} />
      <text y={io.baseY + 20 + 8}>
        <tspan x={size[0] / 2} {...styles.textLocation}>MwSt.-</tspan>
        <tspan x={size[0] / 2} {...styles.textLocation} dy='1.3em'>befreit</tspan>
      </text>
      <Arrow
        color='black'
        source={[io.cx + io.padX, io.baseY + 20]}
        target={[mt.cx - mt.padX, mt.baseY + 20]} />
    </Fade>

    <g transform={`translate(${mt.cx} ${mt.baseY})`}>
      <Fade opacity={active.includes('mt-faded') ? 0.2 : active.includes('mt') ? 1 : 0}>
        <Building windows={2} floors={1} cx={0} baseY={5} />
        <text y={32}>
          <tspan x={0} {...styles.textName}>{labels.mt}</tspan>
          <tspan x={0} {...styles.textLocation} dy='1.3em'>{labels.mtOrt}</tspan>
        </text>
      </Fade>
    </g>

    <Fade visible={active.includes('mt-amt')}>
      <Arrow
        straight error
        source={[mt.cx - mt.padX + 2, mt.baseY + mt.padY - 8]}
        target={[size[0] / 2 + 30, size[1] / 2 - 60]} />
      <text y={size[1] / 2 - 85}>
        <tspan x={size[0] / 2 + 25} {...styles.textName} fill={colors.error}>100 €</tspan>
      </text>
    </Fade>


    <Fade visible={active.includes('mt-buffer')}>
      <Arrow
        cc
        target={[mt.cx - 20, mt.baseY + mt.padY]}
        source={[buffer.cx - 20, buffer.baseY - buffer.padY]} />
      <rect x={buffer.cx} y={size[1] / 2 - 20} width={40} height={50} fill={colors.primaryBg} />
      <text y={size[1] / 2}>
        <tspan x={buffer.cx + 5} {...styles.textName}>100 €</tspan>
        <tspan x={buffer.cx + 5} {...styles.textLocation} dy='1.3em'>MwSt.</tspan>
      </text>
      <Arrow
        color='black'
        source={[mt.cx, mt.baseY + mt.padY]}
        target={[buffer.cx, buffer.baseY - buffer.padY]} />
    </Fade>


    <g transform={`translate(${buffer.cx} ${buffer.baseY})`}>
      <Fade visible={active.includes('buffer')}>
        <Building windows={3} floors={3} cx={0} baseY={5} />
        <text y={32}>
          <tspan x={0} {...styles.textName}>{labels.buffer}</tspan>
          <tspan x={0} {...styles.textLocation} dy='1.3em'>{labels.bufferOrt}</tspan>
        </text>
      </Fade>
    </g>

    <Fade visible={active.includes('buffer-amt')}>
      <Arrow
        straight
        source={[buffer.cx - buffer.padX + 10, buffer.baseY - buffer.padY]}
        target={[size[0] / 2 + 40, size[1] / 2 + 50]} />
      <text y={size[1] / 2 + 50 + 15}>
        <tspan x={size[0] / 2 + 40 + 35} {...styles.textName}>30 €</tspan>
      </text>
    </Fade>

    <Fade visible={active.includes('buffer-distributor')}>
      <Arrow
        cc
        target={[buffer.cx - buffer.padX, buffer.baseY - buffer.padY + 15]}
        source={[distributor.cx + distributor.padX, distributor.baseY - distributor.padY + 15]} />
      <rect x={size[0] / 2 - 30} y={buffer.baseY - buffer.padY + 15} width={60} height={40} fill={colors.primaryBg} />
      <text y={buffer.baseY - buffer.padY + 12 + 15}>
        <tspan x={size[0] / 2} {...styles.textName}>130 €</tspan>
        <tspan x={size[0] / 2} {...styles.textLocation} dy='1.3em'>MwSt.</tspan>
      </text>
      <Arrow
        color='black'
        source={[buffer.cx - buffer.padX, buffer.baseY - buffer.padY + 35]}
        target={[distributor.cx + distributor.padX, distributor.baseY - distributor.padY + 35]} />
    </Fade>

    <g transform={`translate(${distributor.cx} ${distributor.baseY})`}>
      <Fade visible={active.includes('distributor')}>
        <Building windows={2} floors={3} cx={0} baseY={5} />
        <text y={32}>
          <tspan x={0} {...styles.textName}>{labels.distributor}</tspan>
          <tspan x={0} {...styles.textLocation} dy='1.3em'>{labels.distributorOrt}</tspan>
        </text>
      </Fade>
    </g>

    <Fade visible={active.includes('amt-distributor')}>
      <Arrow
        straight
        source={[size[0] / 2 - 45, size[1] / 2 + 50]}
        target={[distributor.cx + distributor.padX - 10, distributor.baseY - distributor.padY - 5]} />
      <text y={size[1] / 2 + 50 + 25}>
        <tspan x={size[0] / 2 - 40 + 15} {...styles.textName}>130 €</tspan>
      </text>
    </Fade>

    <Fade visible={active.includes('distributor-io')}>
      <rect x={distributor.cx - 30} y={size[1] / 2 - 20} width={60} height={50} fill={colors.primaryBg} />
      <text y={size[1] / 2}>
        <tspan x={distributor.cx - 5} {...styles.textLocation}>MwSt.-</tspan>
        <tspan x={distributor.cx - 5} {...styles.textLocation} dy='1.3em'>befreit</tspan>
      </text>
      <Arrow
        color='black'
        target={[io.cx, io.baseY + io.padY]}
        source={[distributor.cx, distributor.baseY - distributor.padY]} />
    </Fade>
  </Fragment>
}

export default Artboard
