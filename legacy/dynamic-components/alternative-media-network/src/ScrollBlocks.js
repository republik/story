import React, { Component, Fragment, useMemo } from 'react'
import { css } from 'glamor'
import {
  Center,
  mediaQueries,
  Editorial,
  createFormatter,
  Interaction,
  fontFamilies,
  ChartTitle,
  ChartLead,
} from '@project-r/styleguide'
import { withColorScheme } from './index'
import { icons } from './data'

import Plot from './Plot'

const ARTBOARD_SIZE = [375, 500]
const ARTBOARD_BUFFER = 100
const ARTBOARD_BUFFER_SMALL = 25

const styles = {
  area: css({
    maxWidth: 890,
    margin: '0 auto',
    paddingTop: '12px',
    marginTop: '30px',
  }),
  anchor: css({
    display: 'block',
    visibility: 'hidden',
    position: 'relative',
    top: -100,
    [mediaQueries.mUp]: {
      top: -100,
    },
  }),
  inner: css({
    position: 'relative',
    marginTop: '20px',
  }),
  scrollBlock: css({
    position: 'relative',
    padding: '20px 15px',
    [mediaQueries.mUp]: {
      marginLeft: ARTBOARD_SIZE[0] + 20,
      paddingLeft: 0,
      paddingRight: 0,
      width: 695 - ARTBOARD_SIZE[0] + 5, // make text box little bit wider than usual text flow
    },
  }),
  artboard: css({
    // border: '1px solid black', // enable for measurement in dev
    display: 'block',
    maxWidth: ARTBOARD_SIZE[0],
    height: ARTBOARD_SIZE[1],
    [mediaQueries.onlyS]: {
      margin: '0 auto',
    },
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
    fontFamily: fontFamilies.sansSerifRegular,
    whiteSpace: 'nowrap',
    margin: '0 1px 0',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '0.8em 0.3em',
    padding: '0.1em 0.1em 0.1em 0.2em',
    lineHeight: '20px',
    // borderBottomWidth: '2px',
    // borderBottomStyle: 'solid',
  }),
  icon: css({
    width: '20px',
    height: '20px',
    marginRight: '6px',
    backgroundRepeat: 'no-repeat no-repeat',
    backgroundPosition: 'center center',
  }),
  p: css({
    marginTop: 0,
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: '25px',
    [mediaQueries.mUp]: {
      fontSize: 18,
      lineHeight: '30px',
    },
    fontFamily: fontFamilies.sansSerifRegular,
    '& b, & strong': {
      fontWeight: 'normal',
      fontFamily: fontFamilies.sansSerifMedium,
    },
  }),
  subtitle: css({
    margin: 0,
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: '30px',
    fontFamily: fontFamilies.sansSerifMedium,
    [mediaQueries.mUp]: {
      fontSize: 22,
      lineHeight: '32px',
    },
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
      buffer: ARTBOARD_BUFFER,
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

      let buffer = ARTBOARD_BUFFER
      if (windowHeight < height + ARTBOARD_BUFFER) {
        buffer = ARTBOARD_BUFFER_SMALL
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
      height,
      heightRatio,
    } = this.state
    const isFixed = position === 'fixed'
    const isAfter = position === 'after'

    const scaleFactor =
      innerWidth < 375 ? innerWidth / (ARTBOARD_SIZE[0] + 10) : 1

    const marginLeft =
      innerWidth < 375
        ? left + (Math.abs(innerWidth - ARTBOARD_SIZE[0]) / 2) * scaleFactor
        : Math.min(left, 30)

    const { phases, anchor, colorScheme, translations } = this.props

    const t = createFormatter(translations)
    const phase = phases[phaseIndex] || phases[0]

    return (
      <div
        {...styles.area}
        {...colorScheme.set('backgroundColor', 'background')}
      >
        <Center>
          <ChartTitle>{this.props.title}</ChartTitle>
          <ChartLead>
            {t.elements('lead', {
              movement: (
                <Highlight
                  key={`movement`}
                  colorScheme={colorScheme}
                  type={'movement'}
                  text={this.props.labels['movement']}
                />
              ),
              victim: (
                <Highlight
                  key={`victim`}
                  colorScheme={colorScheme}
                  type={'victim'}
                  text={this.props.labels['victim']}
                />
              ),
              media: (
                <Highlight
                  key={`media}`}
                  colorScheme={colorScheme}
                  type={'media'}
                  text={this.props.labels['media']}
                />
              ),
              person: (
                <Highlight
                  key={`person`}
                  colorScheme={colorScheme}
                  type={'person'}
                  text={this.props.labels['person']}
                />
              ),
            })}
          </ChartLead>
          <div ref={this.setInnerRef} {...styles.inner}>
            <a {...styles.anchor} id={anchor} />
            <div
              style={{
                marginLeft: -marginLeft,
                position: isFixed ? 'fixed' : 'absolute',
                top: isAfter ? undefined : isFixed ? buffer : 0,
                left: isFixed ? left : 0,
                right: isFixed ? left : 0,
                bottom: isAfter ? 0 : undefined,
              }}
              ref={this.setPlotRef}
            >
              <div>
                <div
                  {...styles.artboard}
                  style={{ transform: 'scale(' + scaleFactor + ')' }}
                >
                  <Plot
                    {...phaseState}
                    phase={phase}
                    onPhaseState={this.setPhaseState}
                    size={ARTBOARD_SIZE[0]}
                    innerWidth={innerWidth}
                    heightRatio={heightRatio}
                    labels={this.props.labels}
                  />
                </div>
              </div>
            </div>
            {phases.map((phase, i) => {
              const key = `p${i}`
              return (
                <Fragment key={key}>
                  <Spacer />
                  <div
                    {...colorScheme.set(
                      'backgroundColor',
                      innerWidth >= 768 ? 'background' : 'scrollBlockBg'
                    )}
                    {...styles.scrollBlock}
                    {...colorScheme.set('color', 'text')}
                    ref={this.blocks[key].setRef}
                  >
                    <a {...styles.anchor} id={`${anchor}-${i + 1}`} />
                    {phase.title && <ChartTitle>{phase.title}</ChartTitle>}
                    {phase.step &&
                      [].concat(phase.step).map((text, i) => (
                        <ChartLead key={i}>
                          {t.elements(text, {
                            Matuschek: (
                              <Highlight
                                key={`Matuschek-${i}`}
                                colorScheme={colorScheme}
                                type={'victim'}
                                text={this.props.labels['Matuschek']}
                              />
                            ),
                            NZZ: (
                              <Highlight
                                key={`NZZ-${i}`}
                                colorScheme={colorScheme}
                                type={'media'}
                                text={this.props.labels['NZZ']}
                              />
                            ),
                            Milius: (
                              <Highlight
                                key={`Milius-${i}`}
                                colorScheme={colorScheme}
                                type={'person'}
                                text={this.props.labels['Milius']}
                              />
                            ),
                            Gut: (
                              <Highlight
                                key={`Gut-${i}`}
                                colorScheme={colorScheme}
                                type={'person'}
                                text={this.props.labels['Gut']}
                              />
                            ),
                            Ostschweiz: (
                              <Highlight
                                key={`Ostschweiz-${i}`}
                                colorScheme={colorScheme}
                                type={'media'}
                                text={this.props.labels['Ostschweiz']}
                              />
                            ),
                            Weltwoche: (
                              <Highlight
                                key={`Weltwoche-${i}`}
                                colorScheme={colorScheme}
                                type={'media'}
                                text={this.props.labels['Weltwoche']}
                              />
                            ),
                            Rimoldi: (
                              <Highlight
                                key={`Rimoldi-${i}`}
                                colorScheme={colorScheme}
                                type={'victim'}
                                text={this.props.labels['Rimoldi']}
                              />
                            ),
                            kenfm: (
                              <Highlight
                                key={`kenfm-${i}`}
                                colorScheme={colorScheme}
                                type={'movement'}
                                text={this.props.labels['kenfm']}
                              />
                            ),
                            massvoll: (
                              <Highlight
                                key={`massvoll-${i}`}
                                colorScheme={colorScheme}
                                type={'movement'}
                                text={this.props.labels['massvoll']}
                              />
                            ),
                            joyce: (
                              <Highlight
                                key={`joyce-${i}`}
                                colorScheme={colorScheme}
                                backgroundColor={'victim'}
                                type={'victim'}
                                text={this.props.labels['joyce']}
                              />
                            ),
                            nebelspalter: (
                              <Highlight
                                key={`nebelspalter-${i}`}
                                colorScheme={colorScheme}
                                type={'media'}
                                text={this.props.labels['nebelspalter']}
                              />
                            ),
                            uncutnews: (
                              <Highlight
                                key={`uncutnews-${i}`}
                                colorScheme={colorScheme}
                                type={'movement'}
                                text={this.props.labels['uncutnews']}
                              />
                            ),
                            'Schweizer Monat': (
                              <Highlight
                                key={`Schweizer-${i}`}
                                colorScheme={colorScheme}
                                type={'media'}
                                text={this.props.labels['Schweizer Monat']}
                              />
                            ),
                            'Corona-Transition': (
                              <Highlight
                                key={`Corona-${i}`}
                                colorScheme={colorScheme}
                                type={'movement'}
                                text={this.props.labels['Corona-Transition']}
                              />
                            ),
                            pandamned: (
                              <Highlight
                                key={`pandamned-${i}`}
                                colorScheme={colorScheme}
                                type={'movement'}
                                text={this.props.labels['pandamned']}
                              />
                            ),
                          })}
                        </ChartLead>
                      ))}
                  </div>
                </Fragment>
              )
            })}
            <Spacer height={height} />
          </div>
        </Center>
      </div>
    )
  }
}

export default withColorScheme(Story)

const Highlight = (props) => {
  const { text, colorScheme, type } = props

  const styleRules = useMemo(
    () => ({
      victim: css({
        fill: colorScheme.getCSSColor('victim'),
      }),
      media: css({
        fill: colorScheme.getCSSColor('media'),
      }),
      person: css({
        fill: colorScheme.getCSSColor('person'),
      }),
      movement: css({
        fill: colorScheme.getCSSColor('movement'),
      }),
    }),
    [colorScheme]
  )

  return (
    <span
      style={{
        display: 'inline-block',
        verticalAlign: 'text-bottom',
      }}
    >
      <span
        {...styles.highlight}
        {...colorScheme.set('backgroundColor', type + 'Bg')}
      >
        <svg width={20} height={20} viewBox='0 0 30 30' {...styles.icon}>
          <path {...styleRules[type]} d={icons[type]} />
        </svg>
        {(type === 'media' && text !== 'Medien') || text === 'Pandamned'
          ? `«${text}»`
          : text}
      </span>
    </span>
  )
}

const Link = (props) => {
  const { href, text } = props
  return <Editorial.A href={href}>{text}</Editorial.A>
}
