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

const Fade = ({ visible, children }) => (
  <g
    {...styles.opacity}
    style={{
      opacity: visible ? 1 : 0
    }}>
    {children}
  </g>
)

const Artboard = ({ activeIndex, active = [], bankName, size }) => {

  const centerX = size[0] / 2 + 5

  return <Fragment>
    <defs>
      <MarkerDefs />
    </defs>

    <g transform={`translate(${centerX} 70)`}>
      <Building windows={2} floors={2} cx={0} baseY={5} />
      <text y={32}>
        <tspan x={0} {...styles.textName}>Broker A</tspan>
        <tspan x={0} {...styles.textLocation} dy='1.3em'>London</tspan>
      </text>
    </g>

    <Fade visible={active.includes('broker1-rrfe')}>
      <Arrow
        source={[centerX + 40, 80]}
        target={[size[0] - 50, 190]} />
    </Fade>
    <Fade visible={active.includes('rrfe-broker1')}>
      <Arrow
        cc
        source={[size[0] - 30, 190]}
        target={[centerX + 40, 60]} />
    </Fade>

    <g transform={`translate(${size[0] - 60} 250)`}>
      <Investor cx={0} scale={0.8} baseY={5} />
      <text y={32}>
        <tspan x={0} {...styles.textName}>RRFE</tspan>
        <tspan x={0} {...styles.textLocation} dy='1.3em'>Frankfurt</tspan>
      </text>
    </g>

    <Fade visible={active.includes('rrfe-finanzamt')}>
      <Arrow
        source={[size[0] - 30, 315]}
        target={[centerX + 70, 405]} />
    </Fade>
    <Fade visible={active.includes('finanzamt-rrfe')}>
      <Arrow
        cc
        source={[centerX + 70, 385]}
        target={[size[0] - 50, 315]} />
    </Fade>
    <Fade visible={active.includes('finanzamt-rrfe-money')}>
      <Money cx={centerX + 95} cy={315 + 35} scale={0.5} />
    </Fade>


    <Fade visible={active.includes('rrfe-ucb')}>
      <Arrow
        source={[size[0] - 70, 315]}
        target={[70, 315]} />
    </Fade>
    <Fade visible={active.includes('ucb-rrfe')}>
      <Arrow
        cc
        source={[100, 315]}
        target={[size[0] - 100, 315]} />
    </Fade>
    <Fade visible={active.includes('ucb-money-rrfe')}>
      <Money cx={centerX} cy={315 + 25} scale={0.5} />
    </Fade>

    <g transform={`translate(${70} 250)`}>
      <Fade visible={active.includes('ucb')}>
        <Building windows={4} floors={3} cx={0} baseY={5} />
        <text y={32}>
          <tspan x={0} {...styles.textName}>Hypovereinsbank</tspan>
          <tspan x={0} {...styles.textLocation} dy='1.3em'>London & München</tspan>
        </text>
      </Fade>
    </g>


    <Fade visible={active.includes('ucb-broker1')}>
      <Arrow
        source={[50, 160]}
        target={[centerX - 40, 80]} />
    </Fade>
    <Fade visible={active.includes('broker2')}>
      <g transform={`translate(60 110)`}>
        <rect width={70} height={40} y={-15} x={-35} fill={colors.primaryBg} />
        <text>
          <tspan x={0} {...styles.textName}>Broker B</tspan>
          <tspan x={0} {...styles.textLocation} dy='1.3em'>London</tspan>
        </text>
      </g>
    </Fade>
    <Fade visible={active.includes('broker1-ucb')}>
      <Arrow
        cc
        source={[centerX - 40, 60]}
        target={[30, 160]} />
    </Fade>
    <Fade visible={active.includes('broker1-money-ucb')}>
      <Money cx={55} cy={105} scale={0.5} />
    </Fade>

    <g transform={`translate(${centerX} 420)`}>
      <Fade visible={active.includes('finanzamt')}>
        <Building windows={6} floors={3} door={false} cx={0} baseY={10} />
        <text y={32}>
          <tspan x={0} {...styles.textName}>Finanzamt</tspan>
          <tspan x={0} {...styles.textLocation} dy='1.3em'>Wiesbaden</tspan>
        </text>
      </Fade>
    </g>

  </Fragment>
}

export default Artboard
