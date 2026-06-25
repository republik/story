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
  return <Fragment>
    <defs>
      <MarkerDefs />
    </defs>

    <Investor cx={3 + size[0] / 2 - 20 - 30} baseY={85} />
    <Investor cx={3 + size[0] / 2 - 32} baseY={99} />

    <Investor cx={3 + size[0] / 2 - 5 - 10} baseY={60} />
    <Investor cx={3 + size[0] / 2 - 5} baseY={98} />
    <Investor cx={3 + size[0] / 2 - 5 + 10 + 3} baseY={65} />

    <Investor cx={3 + size[0] / 2 + 8 + 16} baseY={102} />
    <Investor cx={3 + size[0] / 2 + 20 + 16} baseY={63} />
    <Investor cx={3 + size[0] / 2 + 30 + 16} baseY={100} />

    <text y={122}>
      <tspan x={size[0] / 2} {...styles.textName}>Investoren</tspan>
      <tspan x={size[0] / 2} {...styles.textLocation} dy='1.3em'>Schweden, USA</tspan>
      <tspan x={size[0] / 2} {...styles.textLocation} dy='1.2em'>und Holland</tspan>
    </text>


    <Fade visible={active.includes('brokery')}>
      <text y={162}>
        <tspan x={size[0] / 2 + 100} {...styles.textName}>Broker</tspan>
        <tspan x={size[0] / 2 + 100} {...styles.textLocation} dy='1.3em'>Aktien</tspan>
      </text>
    </Fade>

    {/* Investors -> Bank */}
    <Fade visible={active.includes('investors-bank')}>
      <Arrow
        source={[size[0] / 2 + 55, 122 + 30]}
        target={[size[0] / 2 + 45, 270 + 16 - 30 - 16]} />
    </Fade>
    {/* Bank -> Broker Y */}
    <Fade visible={active.includes('bank-brokery')}>
      <Arrow
        cc
        source={[size[0] / 2 + 45, 270 + 16 - 30]}
        target={[size[0] / 2 + 90, 122 + 26 + 50]} />
    </Fade>
    <Fade visible={active.includes('brokery-money')}>
      <Money cx={223} cy={224} scale={0.5} />
    </Fade>

    <Fade visible={active.includes('brokerzw')}>
      <text y={142}>
        <tspan x={45} {...styles.textName}>Broker</tspan>
        <tspan x={45} {...styles.textLocation} dy='1.3em'>Futures</tspan>
      </text>
    </Fade>
    {/* Bank -> Broker Z/W */}
    <Fade visible={active.includes('bank-brokerzw')}>
      <Arrow
        source={[size[0] / 2 - 45, 270 + 16 - 50]}
        target={[size[0] / 2 - 90, 122 + 26 + 20]}/>
    </Fade>
    {/* Broker Z/W -> Bank */}
    <Fade visible={active.includes('brokerzw-bank')}>
      <Arrow
        cc
        source={[size[0] / 2 - 110, 122 + 26 + 20]}
        target={[size[0] / 2 - 50, 270 + 16 - 30]} />
    </Fade>
    <Fade visible={active.includes('brokerzw-money')}>
      <Money cx={55} cy={215} scale={0.5} />
    </Fade>

    <g transform='translate(0 270)'>
      <Building windows={3} floors={4} cx={size[0] / 2} baseY={5} />
      <text y={32}>
        <tspan x={size[0] / 2} {...styles.textName}>{bankName}</tspan>
        <tspan x={size[0] / 2} {...styles.textLocation} dy='1.3em'>Dänemark</tspan>
      </text>
    </g>

    {/* SMI-Companies -> Bank */}
    <Fade visible={active.includes('companies-bank')}>
      <Arrow
        source={[50, 340]}
        target={[size[0] / 2 - 50, 270 + 16 - 10]} />
      <Money cx={50 + 8} cy={340 - 47} scale={0.5} chf />
    </Fade>


    <g transform='translate(0 400)'>
      <Fade visible={active.includes('companies')}>
        <Factory cx={50} baseY={10} />
        <text y={32}>
          <tspan x={50} {...styles.textName}>Unternehmen</tspan>
          <tspan x={50} {...styles.textLocation} dy='1.3em'>Schweiz</tspan>
        </text>
      </Fade>
    </g>

    {/* EStV -> Bank */}
    <Fade visible={active.includes('estv-bank')}>
      <Arrow
        cc
        source={[230 + 20, 330]}
        target={[size[0] / 2 + 50 + 25, 270 + 16 - 20]}
        error={active.includes('estv-bank-money-error')} />
    </Fade>
    <Fade visible={active.includes('estv-bank-money-error')}>
      <rect x={size[0] / 2 + 50 + 20} y={255} width={40} height={40} fill={colors.primaryBg} />
    </Fade>
    <Fade visible={active.includes('estv-bank-money')}>
      <Money cx={250} cy={295} scale={0.5} chf
        color={active.includes('estv-bank-money-error') ? colors.error : undefined} />
    </Fade>
    {/* Bank -> EStV */}
    <Fade visible={active.includes('bank-estv')}>
      <Arrow
        source={[size[0] / 2 + 50, 270 + 16 - 20]}
        target={[230, 330]} />
    </Fade>

    <g transform='translate(180 400)'>
      <Fade visible={active.includes('estv')}>
        <Building windows={6} floors={4} door={false} cx={50} baseY={10} />
        <text y={32}>
          <tspan x={50} {...styles.textName}>Steuerverwaltung</tspan>
          <tspan x={50} {...styles.textLocation} dy='1.3em'>Schweiz</tspan>
        </text>
      </Fade>
    </g>
  </Fragment>
}

export default Artboard
