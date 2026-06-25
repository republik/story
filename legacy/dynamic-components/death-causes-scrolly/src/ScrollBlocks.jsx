import React, { Component, Fragment } from 'react'
import { css } from 'glamor'
import { mediaQueries, Editorial, createFormatter } from '@project-r/styleguide'
import { withColorScheme } from './index'

import Plot from './Plot'

const BUFFER = 110
const BUFFER_SMALL = 25

const styles = {
  anchor: css({
    display: 'block',
    visibility: 'hidden',
    position: 'relative',
    top: -100,
    [mediaQueries.mUp]: {
      top: -1000,
    },
  }),
  inner: css({
    position: 'relative',
  }),
  scrollBlock: css({
    position: 'relative',
    padding: '20px 0',
  }),
  spacer: css({
    pointerEvents: 'none',
    height: '80vh',
  }),
  onlyS: css({
    display: 'none',
    [mediaQueries.onlyS]: {
      display: 'block',
    },
  }),
  mUp: css({
    display: 'none',
    [mediaQueries.mUp]: {
      display: 'block',
    },
  }),
  highlight: css({
    padding: '0 3px',
    whiteSpace: 'nowrap',
    margin: '0 1px',
    display: 'flex',
    alignItems: 'center',
  }),
  circle: css({
    display: 'inline-block',
    borderRadius: '50%',
    width: '10px',
    height: '10px',
    marginRight: '3px',
  }),
}

const Spacer = ({ height, mediaQuery }) => (
  <div {...styles.spacer} {...styles[mediaQuery]} style={{ height: height }} />
)

let id = 0

class Story extends Component {
  constructor(props, ...args) {
    super(props, ...args)

    this.state = {
      position: 'before',
      buffer: BUFFER,
      phaseIndex: 0,
    }
    this.refs = {}
    this.blocks = {}
    this.id = id++

    this.refKeys = props.phases.map((phase, i) => `p${i}`)
    this.refKeys.map((key) => {
      this.blocks[key] = {
        setRef: (ref) => {
          this.blocks[key].ref = ref
        },
      }
    })

    this.setInnerRef = (ref) => {
      this.innerRef = ref
    }
    this.setPlotRef = (ref) => {
      this.plotRef = ref
    }

    this.setPhaseState = (phaseState) =>
      this.setState((state) => ({
        phaseState: {
          ...state.phaseState,
          ...phaseState,
        },
      }))

    this.onScroll = () => {
      const y = window.pageYOffset
      const cx = y + window.innerHeight / 2
      const calcDistance = (block) =>
        Math.min(Math.abs(block.y0 - cx), Math.abs(block.y1 - cx))
      const activeBlock = this.refKeys.reduce((active, key) => {
        if (
          calcDistance(this.blocks[key]) < calcDistance(this.blocks[active])
        ) {
          return key
        }
        return active
      })
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
      this.refKeys.forEach((key) => {
        const block = this.blocks[key]
        const { top, height } = block.ref.getBoundingClientRect()
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
      const heightRatio = Math.min(
        1,
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
        this.setState(
          {
            innerWidth,
            heightRatio,
            height,
            buffer,
            left,
            innerY0,
            innerY1,
          },
          this.onScroll
        )
      } else {
        this.onScroll()
      }
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.measure)
    this.measure()
  }
  componentDidUpdate() {
    this.measure()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.measure)
  }
  render() {
    const {
      left,
      position,
      phaseIndex,
      phaseState,
      buffer,
      innerWidth,
      height,
      heightRatio,
    } = this.state
    const isFixed = position === 'fixed'
    const isAfter = position === 'after'

    const { phases, anchor, translations, colorScheme } = this.props

    const t = createFormatter(translations)

    const phase = phases[phaseIndex] || phases[0]

    return (
      <div>
        <div ref={this.setInnerRef} {...styles.inner}>
          <a {...styles.anchor} id={anchor} />
          <div
            style={{
              position: isFixed ? 'fixed' : 'absolute',
              top: isAfter ? undefined : isFixed ? buffer : 0,
              left: isFixed ? left : 0,
              right: isFixed ? left : 0,
              bottom: isAfter ? 0 : undefined,
            }}
            ref={this.setPlotRef}
          >
            <div>
              <Plot
                age={phase.age}
                cause={phase.cause}
                {...phaseState}
                onPhaseState={this.setPhaseState}
                width={innerWidth}
                heightRatio={heightRatio}
              />
            </div>
          </div>
          {phases.map((phase, i) => {
            const key = `p${i}`
            return (
              <Fragment key={key}>
                <Spacer />
                <div
                  {...colorScheme.set('backgroundColor', 'scrollBlockBg')}
                  {...styles.scrollBlock}
                  ref={this.blocks[key].setRef}
                >
                  <a {...styles.anchor} id={`${anchor}-${i + 1}`} />
                  {phase.title && (
                    <Editorial.Subhead style={{ marginTop: 0 }}>
                      {phase.title}
                    </Editorial.Subhead>
                  )}
                  {phase.age + '/text' &&
                    [].concat(phase.age + '/text').map((text, i) => (
                      <Editorial.P key={i}>
                        {t.elements(text, {
                          other: (
                            <Highlight
                              key={`other-${i}`}
                              colorScheme={colorScheme}
                              color={'other'}
                              text={t(phase.age + '/other')}
                            />
                          ),
                          perinatal: (
                            <Highlight
                              key={`Perinatal-${i}`}
                              colorScheme={colorScheme}
                              color={'Perinatal'}
                              text={t(phase.age + '/perinatal')}
                            />
                          ),
                          suicide: (
                            <Highlight
                              key={`Suizid-${i}`}
                              colorScheme={colorScheme}
                              color={'Suizid'}
                              text={t(phase.age + '/suicide')}
                            />
                          ),
                          accident: (
                            <Highlight
                              key={`Unfälle-${i}`}
                              colorScheme={colorScheme}
                              color={'Unfälle'}
                              text={t(phase.age + '/accident')}
                            />
                          ),
                          cancer: (
                            <Highlight
                              key={`Krebs-${i}`}
                              colorScheme={colorScheme}
                              color={'Krebserkrankungen'}
                              text={t(phase.age + '/cancer')}
                            />
                          ),
                          dementia: (
                            <Highlight
                              key={`Demenz-${i}`}
                              colorScheme={colorScheme}
                              color={'Demenz'}
                              text={t(phase.age + '/dementia')}
                            />
                          ),
                          heart: (
                            <Highlight
                              key={`Herz-${i}`}
                              colorScheme={colorScheme}
                              color={'Herz-Kreislauf-Erkrankungen'}
                              text={t(phase.age + '/heart')}
                            />
                          ),
                          respiratory: (
                            <Highlight
                              key={`Herz-${i}`}
                              colorScheme={colorScheme}
                              color={'Atemwegserkrankungen'}
                              text={t(phase.age + '/respiratory')}
                            />
                          ),
                          link1: (
                            <Link
                              key={`link1-${i}`}
                              href={t(phase.age + '/link1/href')}
                              text={t(phase.age + '/link1/text')}
                            />
                          ),
                          link2: (
                            <Link
                              key={`link2-${i}`}
                              href={t(phase.age + '/link2/href')}
                              text={t(phase.age + '/link2/text')}
                            />
                          ),
                        })}
                      </Editorial.P>
                    ))}
                </div>
              </Fragment>
            )
          })}
          <Spacer height={height} />
        </div>
      </div>
    )
  }
}

export default withColorScheme(Story)

const Highlight = (props) => {
  const { color, text, colorScheme } = props
  return (
    <span style={{ display: 'inline-block', verticalAlign: 'top' }}>
      <span
        {...styles.highlight}
        {...colorScheme.set('backgroundColor', color + '-background')}
        // {...colorScheme.set('borderBottomColor', color)}
      >
        <span
          {...styles.circle}
          {...colorScheme.set('backgroundColor', color)}
        />
        {text}
      </span>
    </span>
  )
}

const Link = (props) => {
  const { href, text } = props
  return <Editorial.A href={href}>{text}</Editorial.A>
}
