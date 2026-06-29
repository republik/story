import React, { Component, Fragment } from 'react'
import { css } from 'glamor'
import {
  Center,
  mediaQueries,
  Editorial,
  createFormatter,
  FigureCaption,
  ChartTitle,
  ChartLead,
  Label,
} from '@project-r/styleguide'
import { withColorScheme } from './index'
import { formatLocale } from 'd3'

import ImageFader from './ImageFader'

export const swissNumbers = formatLocale({
  decimal: ',',
  grouping: [3],
  minus: '\u2212',
  percent: '\u2009%',
})

const format = (number) => {
  return swissNumbers.format('.1%')(number)
}

const legendColors = ['#efedf5', '#bcbddc', '#807dba', '#54278f', '#3f007d']

const ARTBOARD_SIZE = [750, 250]
const ARTBOARD_BUFFER = 110
const ARTBOARD_BUFFER_SMALL = 45
const DEFAULT_MARGIN_LEFT = 10

const styles = {
  area: css({
    maxWidth: 890,
    margin: '0 auto',
  }),
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
    padding: '20px 15px',
    width: '100%',
    borderRadius: '5px',
    boxShadow: 'var(--styleguide-color-imageChoiceShadow)',
    [mediaQueries.mUp]: {
      // marginLeft: ARTBOARD_SIZE[1],
      width: 400, // make text box little bit wider than usual text flow
      marginLeft: '-100px',
    },
  }),
  artboard: css({
    // border: '1px solid black', // enable for measurement in dev
    display: 'block',
    maxWidth: '60vw',
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
    whiteSpace: 'nowrap',
    margin: '-1px 0 1px 0',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '0.8em 0.3em',
    padding: '0.1em 0.1em 0.1em 0.2em',
    lineHeight: '20px',
  }),
  circle: css({
    display: 'inline-block',
    borderRadius: '50%',
    width: '15px',
    height: '15px',
    marginRight: '3px',
    marginTop: '0.1em',
    transform: 'translateY(2px)',
  }),
  labelLine: css({
    position: 'relative',
    padding: '0 3px 1px',
    display: 'inline-block',
    borderRadius: '4px',
  }),
}

const Spacer = ({ height, mediaQuery }) => (
  <div {...styles.spacer} {...styles[mediaQuery]} style={{ height: height }} />
)

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
      dropDownItem,
      userData,
      filter,
    } = this.state
    const isFixed = position === 'fixed'
    const isAfter = position === 'after'

    const { phases, anchor, colorScheme, translations } = this.props

    const t = createFormatter(translations)
    const phase = phases[phaseIndex] || phases[0]

    return (
      <div>
        <Center>
          <ChartTitle>{this.props.title}</ChartTitle>
          <ChartLead>{this.props.lead}</ChartLead>
          <div ref={this.setInnerRef} {...styles.inner}>
            <a {...styles.anchor} id={anchor} />
            <div
              style={{
                // marginLeft: -left,
                position: isFixed ? 'fixed' : 'absolute',
                top: isAfter ? undefined : isFixed ? buffer : 0,
                left: isFixed ? 0 : left ? -left : undefined,
                right: isFixed ? 0 : left ? -left : undefined,
                bottom: isAfter ? 0 : undefined,
              }}
              ref={this.setPlotRef}
            >
              <div>
                <ImageFader
                  {...phaseState}
                  phase={phase}
                  onPhaseState={this.setPhaseState}
                  imageStep1={this.props.imageStep1}
                  imageStep2={this.props.imageStep2}
                  imageStep3={this.props.imageStep3}
                  imageStep4={this.props.imageStep4}
                  imageStep5={this.props.imageStep5}
                  imageStep6={this.props.imageStep6}
                  labels={this.props.labels}
                  backgroundPosition={this.props.backgroundPosition}
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
                    {/* {phase.title && <ChartTitle>{phase.title}</ChartTitle>} */}

                    {phase.step &&
                      [].concat(phase.step + '/text').map((text, i) => (
                        <ChartLead key={i} style={{ marginBottom: 0 }}>
                          {t.elements(text, {
                            label: (
                              <TextLabel
                                key={`label-${i}`}
                                text={t(phase.step + '/label')}
                              />
                            ),
                          })}
                        </ChartLead>
                      ))}
                    {phase.step === 'step1' && <Legend colors={legendColors} />}
                  </div>
                </Fragment>
              )
            })}
            <Spacer height={height} />
          </div>
          <FigureCaption>
            {this.props.labels.sourceBefore}
            <Link
              href={this.props.labels.href}
              text={this.props.labels.sourceText}
            />
            {this.props.labels.sourceAfter}
          </FigureCaption>
        </Center>
      </div>
    )
  }
}

export default withColorScheme(Story)

const Link = (props) => {
  const { href, text } = props
  return <Editorial.A href={href}>{text}</Editorial.A>
}

const Legend = ({
  colors,
  labelLeft = 'Geringer Anteil',
  labelRight = 'Hoher Anteil',
}) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Label style={{ paddingRight: '10px' }}>{labelLeft}</Label>
      {colors.map((color, i) => (
        <span
          key={`color-legend-${i}`}
          {...styles.circle}
          style={{ backgroundColor: color }}
        />
      ))}
      <Label style={{ paddingLeft: '10px' }}>{labelRight}</Label>
    </div>
  )
}

const TextLabel = ({ text, color = 'rgba(106, 81, 163, 0.4)' }) => {
  return (
    <span {...styles.labelLine} style={{ backgroundColor: color }}>
      {text}
    </span>
  )
}
