import React, { Component, Fragment } from 'react'
import { css } from 'glamor'
import {
  colors,
  Center,
  Label,
  mediaQueries,
  RawHtml,
  fontFamilies,
  Editorial
} from '@project-r/styleguide'

import Plot from './Plot'

const BUFFER = 80
const BUFFER_SMALL = 25

const styles = {
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
    position: 'relative'
  }),
  scrollBlock: css({
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px 0'
  }),
  spacer: css({
    pointerEvents: 'none',
    height: '50vh'
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
      buffer: BUFFER,
      phaseIndex: 0
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
    this.setPlotRef = (ref) => {
      this.plotRef = ref
    }

    this.setPhaseState = phaseState => this.setState(state => ({
      phaseState: {
        ...state.phaseState,
        ...phaseState
      }
    }))

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
      const phaseIndex = activeBlock ? this.refKeys.indexOf(activeBlock) : 0
      if (this.state.phaseIndex !== phaseIndex) {
        this.setState({ phaseIndex, phaseState: {} })
      }

      const { innerY0, innerY1, buffer, height } = this.state
      let position = 'before'
      if (y + buffer + height > innerY1) {
        position = 'after'
      } else if (y + buffer >= innerY0) {
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

      const windowHeight = window.innerHeight

      const { height } = this.plotRef.getBoundingClientRect()

      let buffer = BUFFER
      if (windowHeight < height + BUFFER) {
        buffer = BUFFER_SMALL
      }

      const innerRect = this.innerRef.getBoundingClientRect()
      const { left, width: innerWidth } = innerRect
      const innerY0 = y + innerRect.top
      const innerY1 = innerY0 + innerRect.height
      const heightRatio = Math.min(1,
        Math.max(0.6, (windowHeight - buffer - 200) / innerWidth)
      )

      if (
        this.state.heightRatio !== heightRatio ||
        this.state.innerWidth !== innerWidth ||
        this.state.height !== height ||
        this.state.buffer !== buffer ||
        this.state.left !== left ||
        this.state.innerY0 !== innerY0 ||
        this.state.innerY1 !== innerY1
      ) {
        this.setState({
          innerWidth,
          heightRatio,
          height,
          buffer,
          left,
          innerY0,
          innerY1
        }, this.onScroll)
      } else {
        this.onScroll()
      }
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
    const {
      left, position,
      phaseIndex, phaseState,
      buffer, innerWidth, height, heightRatio
    } = this.state
    const isFixed = position === 'fixed'
    const isAfter = position === 'after'

    const { phases, anchor } = this.props

    const phase = phases[phaseIndex] || phases[0]

    return (
      <Center style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div ref={this.setInnerRef} {...styles.inner}>
          <a {...styles.anchor} id={anchor} />
          <div style={{
            position: isFixed
              ? 'fixed' : 'absolute',
            top: isAfter
              ? undefined
              : isFixed ? buffer : 0,
            left: isFixed ? left : 0,
            right:  isFixed ? left : 0,
            bottom: isAfter
              ? 0
              : undefined
          }} ref={this.setPlotRef}>
            <div {...styles.plot}>
              <Plot
                year={phase.year}
                inlines={phase.inlines}
                {...phaseState}
                onPhaseState={this.setPhaseState}
                width={innerWidth}
                heightRatio={heightRatio} />
            </div>
          </div>
          {phases.map((phase, i) => {
            const key = `p${i}`
            return <Fragment key={key}>
              <Spacer height={height} />
              <div {...styles.scrollBlock} ref={this.blocks[key].setRef}>
                <a {...styles.anchor} id={`${anchor}-${i + 1}`} />
                {phase.title && <Editorial.Subhead style={{ marginTop: 0}}>
                  {phase.title}
                </Editorial.Subhead>}
                {phase.text && [].concat(phase.text).map((text, i) => (
                  <Editorial.P key={i}>{text}</Editorial.P>
                ))}
              </div>
            </Fragment>
          })}
          <Spacer height={height} />
        </div>
      </Center>
    )
  }
}

export default Story
