import React, { Component, Fragment } from 'react'
import { css } from 'glamor'
import {
  colors,
  Center,
  Label,
  mediaQueries,
  RawHtml,
  fontFamilies
} from '@project-r/styleguide'

import UStKarussell from './UStKarussell'

const ARTBOARD_SIZE = [300, 480]
const ARTBOARD_BUFFER = 100
const ARTBOARD_BUFFER_SMALL = 25

const styles = {
  area: css({
    backgroundColor: colors.primaryBg,
    maxWidth: 890,
    margin: '0 auto'
  }),
  anchor: css({
    display: 'block',
    visibility: 'hidden',
    position: 'relative',
    top: -100,
    [mediaQueries.mUp]: {
      top: -100
    }
  }),
  inner: css({
    position: 'relative',
    minHeight: ARTBOARD_SIZE[1] + ARTBOARD_BUFFER * 2
  }),
  artboard: css({
    // border: '1px solid black', // enable for measurement in dev
    display: 'block',
    width: ARTBOARD_SIZE[0],
    height: ARTBOARD_SIZE[1],
    [mediaQueries.onlyS]: {
      margin: '0 auto'
    }
   }),
  scrollBlock: css({
    position: 'relative',
    padding: '20px 15px',
    backgroundColor: '#fff',
    [mediaQueries.mUp]: {
      backgroundColor: 'transparent',
      marginLeft: ARTBOARD_SIZE[0] + 60,
      paddingLeft: 0,
      paddingRight: 0,
      width: 695 - ARTBOARD_SIZE[0] - 60
    }
  }),
  p: css({
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: '25px',
    [mediaQueries.mUp]: {
      fontSize: 18,
      lineHeight: '30px'
    },
    fontFamily: fontFamilies.sansSerifRegular,
    '& b, & strong': {
      fontWeight: 'normal',
      fontFamily: fontFamilies.sansSerifMedium
    }
  }),
  spacer: css({
    pointerEvents: 'none',
    height: '50vh',
    [mediaQueries.onlyS]: {
      minHeight: ARTBOARD_SIZE[1]
    }
  }),
  onlyS: css({
    display: 'none',
    [mediaQueries.onlyS]: {
      display: 'block'
    }
  }),
  mUp: css({
    display: 'none',
    [mediaQueries.mUp]: {
      display: 'block'
    }
  })
}

const P = ({ children, ...props }) => (
  <p {...styles.p} {...props}>{children}</p>
)

const Spacer = ({height, mediaQuery}) => (
  <div
    {...styles.spacer}
    {...styles[mediaQuery]}
    style={{height: height}} />
)

let id = 0

class Story extends Component {
  constructor (props, ...args) {
    super(props, ...args)

    this.state = {
      position: 'before',
      artboardBuffer: ARTBOARD_BUFFER
    }
    this.refs = {}
    this.blocks = {}
    this.id = id++

    this.refKeys = props.phases.map((phase, i) => `p${i}`)
    this.refKeys.map(key => {
      this.blocks[key] = {
        setRef: (ref) => {
          this.blocks[key].ref = ref
        }
      }
    })

    this.setInnerRef = (ref) => {
      this.innerRef = ref
    }

    this.onScroll = () => {
      const y = window.pageYOffset
      const cx = y + window.innerHeight / 2
      const calcDistance = block => Math.min(
        Math.abs(block.y0 - cx),
        Math.abs(block.y1 - cx)
      )
      const activeBlock = this.refKeys
        .reduce(
          (active, key) => {
            if (calcDistance(this.blocks[key]) < calcDistance(this.blocks[active])) {
              return key
            }
            return active
          }
        )
      if (this.state.activeBlock !== activeBlock) {
        this.setState({ activeBlock })
      }

      const { innerY0, innerY1, artboardBuffer } = this.state
      let position = 'before'
      if (y + ARTBOARD_SIZE[1] + artboardBuffer * 2 > innerY1) {
        position = 'after'
      } else if (y >= innerY0) {
        position = 'fixed'
      }
      if (this.state.position !== position) {
        this.setState({ position })
      }
    }

    this.measure = () => {
      const y = window.pageYOffset
      this.refKeys.forEach(key => {
        const block = this.blocks[key]
        const {top, height} = block.ref
          .getBoundingClientRect()
        block.y0 = y + top
        block.y1 = block.y0 + height
      })

      const width = window.innerWidth
      const windowHeight = window.innerHeight

      let artboardBuffer = ARTBOARD_BUFFER
      if (windowHeight < ARTBOARD_SIZE[1] + ARTBOARD_BUFFER) {
        artboardBuffer = ARTBOARD_BUFFER_SMALL
      }

      const innerRect = this.innerRef.getBoundingClientRect()
      const { left } = innerRect
      const innerY0 = y + innerRect.top
      const innerY1 = innerY0 + innerRect.height

      if (
        this.state.width !== width ||
        this.state.windowHeight !== windowHeight ||
        this.state.artboardBuffer !== artboardBuffer ||
        this.state.left !== left ||
        this.state.innerY0 !== innerY0 ||
        this.state.innerY1 !== innerY1
      ) {
        this.setState({
          width,
          windowHeight,
          artboardBuffer,
          left,
          innerY0,
          innerY1
        })
      }
      this.onScroll()
    }
  }
  componentDidMount () {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.measure)
    this.measure()
  }
  componentDidUpdate () {
    this.measure()
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.measure)
  }
  render () {
    const { left, position, activeBlock, artboardBuffer } = this.state
    const isFixed = position === 'fixed'
    const isAfter = position === 'after'

    const phaseIndex = activeBlock ? this.refKeys.indexOf(activeBlock) : 0

    const { phases, schema, anchor, labels } = this.props

    const phase = phases[phaseIndex]

    return (
      <div {...styles.area}>
        <Center>
          <div ref={this.setInnerRef} {...styles.inner}>
            <a {...styles.anchor} id={anchor} />
            <div style={{
              marginLeft: -5,
              position: isFixed
                ? 'fixed' : 'absolute',
              top: isAfter
                ? undefined
                : artboardBuffer,
              left: isFixed ? left : 0,
              right:  isFixed ? left : 0,
              bottom: isAfter
                ? artboardBuffer
                : undefined
            }}>
              <svg {...styles.artboard}>
                {schema === 'UStKarussell' && <UStKarussell
                  labels={labels}
                  size={ARTBOARD_SIZE}
                  active={phase.active}
                  activeIndex={phaseIndex} />}
              </svg>
            </div>
            <Spacer height={ARTBOARD_SIZE[1]} mediaQuery='onlyS' />
            <Spacer height='20vh' mediaQuery='mUp' />
            {phases.map((phase, i) => {
              const key = `p${i}`
              return <Fragment key={key}>
                {i !== 0 && <Spacer />}
                <div {...styles.scrollBlock} ref={this.blocks[key].setRef}>
                  <a {...styles.anchor} id={`${anchor}-${i + 1}`} />
                  <RawHtml type={P} dangerouslySetInnerHTML={{
                    __html: phase.html
                  }} />
                </div>
              </Fragment>
            })}
            <Spacer height={ARTBOARD_SIZE[1]} mediaQuery='onlyS' />
            <Spacer height='20vh' mediaQuery='mUp' />
          </div>
        </Center>
      </div>
    )
  }
}

export default Story
