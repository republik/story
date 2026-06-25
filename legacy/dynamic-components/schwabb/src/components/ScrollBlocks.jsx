import React, { Component, Fragment } from 'react'
import { css } from 'glamor'
import {
  Center,
  Label,
  mediaQueries,
  RawHtml,
  Editorial,
  fontFamilies
} from '@project-r/styleguide'

import PregnancyTimeline from './PregnancyTimeline'

const ARTBOARD_SIZE = [310, 480]
const ARTBOARD_BUFFER = 100
const ARTBOARD_BUFFER_SMALL = 25

const styles = {
  area: css({
    maxWidth: 890,
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
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
  scrollBlock: {
    base: css({
      position: 'relative',
      padding: '20px 15px',
      [mediaQueries.mUp]: {
        paddingLeft: 0,
        paddingRight: 0,
        width: 695 - ARTBOARD_SIZE[0] - 60
      }
    }),
    background: css({
      backgroundColor: 'rgba(255,255,255,0.9)',
      [mediaQueries.mUp]: {
        backgroundColor: 'transparent'
      }
    }),
    left: css({}),
    right: css({
      [mediaQueries.mUp]: {
        marginLeft: ARTBOARD_SIZE[0] + 60
      }
    }),
    center: css({
      [mediaQueries.mUp]: {
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    })
  },
  p: css({
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: '25px',
    [mediaQueries.mUp]: {
      fontSize: 18,
      lineHeight: '30px'
    },
    fontFamily: fontFamilies.serifRegular,
    '& b, & strong': {
      fontWeight: 'normal',
      fontFamily: fontFamilies.serifBold
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
  }),
  opacity: css({
    transition: 'opacity 1s'
  }),
  opacityDelay: css({
    transitionDelay: '400ms'
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
      const innerHeight = window.innerHeight
      const cy = y + innerHeight / 2
      const calcDistance = block => Math.min(
        Math.abs(block.y0 - cy),
        Math.abs(block.y1 - cy)
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
      let visibility = 'none'
      if (cy >= innerY0) {
        visibility = 'before'
      }
      if (y >= innerY0) {
        visibility = 'full'
      }
      if (y + innerHeight > innerY1) {
        visibility = 'after'
      }
      if (y > innerY1) {
        visibility = 'none'
      }
      if (this.state.position !== position || this.state.visibility !== visibility) {
        this.setState({ position, visibility })
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
    const { left, position, activeBlock, artboardBuffer, visibility } = this.state
    const isFixed = position === 'fixed'
    const isAfter = position === 'after'

    const phaseIndex = activeBlock ? this.refKeys.indexOf(activeBlock) : 0

    const { phases, schema, anchor, labels, backgrounds } = this.props
    const phase = phases[phaseIndex]
    const { active = [] } = phase

    return (
      <div style={{ position: 'relative' }}>
      {!!backgrounds.length && <div style={{
        position: visibility === 'full' 
          ? 'fixed' : 'absolute',
        top: visibility === 'after'
          ? undefined
          : 0,
        bottom: visibility === 'after'
          ? 0
          : undefined,
        left: 0,
        right: 0,
        zIndex: 0
      }}>
        {backgrounds.map(background => {
          const isActive = active.includes(background.name) && visibility !== 'none'
          return (
            <div key={background.name} {...styles.opacity} {...!isActive && styles.opacityDelay} style={{
              position: 'absolute',
              top: visibility === 'after'
                ? undefined
                : 0,
              bottom: visibility === 'after'
                ? 0
                : undefined,
              left: 0,
              right: 0,
              height: '100vh',
              backgroundImage: `url(${background.src})`,
              backgroundSize: 'cover',
              zIndex: isActive ? 1 : 0,
              opacity: isActive ? 1 : 0
            }} {...css({
              backgroundPosition: background.mobilePosition || background.position || '50% 50%',
              [mediaQueries.mUp]: {
                backgroundPosition: background.position || '50% 50%'
              }
            })} />
          )
        })}
      </div>}
      <div {...styles.area}>
        <Center>
          <div ref={this.setInnerRef} {...styles.inner}>
            <a {...styles.anchor} id={anchor} />
            <div style={{
              marginLeft: -15,
              marginRight: -15,
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
                {schema === 'PregnancyTimeline' && <PregnancyTimeline
                  labels={labels}
                  size={ARTBOARD_SIZE}
                  activeIndex={phaseIndex}
                  {...phase} />}
              </svg>
            </div>
            <Spacer height={ARTBOARD_SIZE[1]} mediaQuery='onlyS' />
            <Spacer height='20vh' mediaQuery='mUp' />
            {phases.map((phase, i) => {
              const key = `p${i}`
              return <Fragment key={key}>
                {i !== 0 && <Spacer />}
                <div {...styles.scrollBlock.base} {...phase.background !== false && styles.scrollBlock.background} {...styles.scrollBlock[phase.align || 'right']} ref={this.blocks[key].setRef} style={{ textAlign: phase.align }}>
                  <a {...styles.anchor} id={`${anchor}-${i + 1}`} />
                  {phase.title && <Editorial.Subhead>{phase.title}</Editorial.Subhead>}
                  {phase.html && <RawHtml type={P} black dangerouslySetInnerHTML={{
                    __html: phase.html
                  }} />}
                </div>
              </Fragment>
            })}
            <Spacer height={ARTBOARD_SIZE[1]} mediaQuery='onlyS' />
            <Spacer height='20vh' mediaQuery='mUp' />
          </div>
        </Center>
      </div>
      </div>
    )
  }
}

export default Story
