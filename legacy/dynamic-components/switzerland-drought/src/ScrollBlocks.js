import React, { Component, Fragment } from 'react'
import { css } from 'glamor'
import {
  Center,
  mediaQueries,
  Editorial,
  createFormatter,
  Label,
  ChartTitle,
  ChartLead,
  Autocomplete,
} from '@project-r/styleguide'
import { withColorScheme } from './index'
import ContextBox, { ContextBoxValue } from './ContextBox'
import ColorLegend from './ColorLegend'
import { easeBounce, formatLocale } from 'd3'

import { percipitationDeviation, tempDeviation } from './data'
import { csvParse } from 'd3-dsv'

const percipitationData = csvParse(percipitationDeviation)
const tempData = csvParse(tempDeviation)

const colorItemsPercip = ['percip_low', 'percip_medium', 'percip_high']
const colorItemsTemp = ['temp_low', 'temp_medium', 'temp_high']

const dropDownItems = percipitationData.map((d) => {
  return {
    value: d.feature,
    text: d.name,
  }
})

// import Plot from './Plot'
import MapPlot from './MapPlot'

export const swissNumbers = formatLocale({
  decimal: ',',
  grouping: [3],
  minus: '\u2212',
  percent: '\u2009%',
})

const format = (number) => {
  return swissNumbers.format('.1%')(number)
}

const ARTBOARD_SIZE = [400, 500]
const ARTBOARD_BUFFER = 75
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
    padding: '20px 0',
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
    width: '10px',
    height: '10px',
    marginRight: '3px',
    marginTop: '0.1em',
  }),
  fadeOut: css({
    transition: 'opacity 1s ease',
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

    this.setDropdownItem = (dropDownItem) => {
      if (!dropDownItem) {
        this.setState(() => ({ dropDownItem: null }))
        return
      }
      this.setState(() => ({
        dropDownItem,
      }))
    }

    this.setUserData = (dropDownItem) => {
      if (!dropDownItem) {
        this.setState(() => ({ userData: null }))
        return
      }
      this.setState(() => ({
        userData: {
          winter_diff: percipitationData.find(
            (d) => d.feature === dropDownItem.value
          )?.value,
        },
      }))
    }

    this.setFilter = (filter) => {
      if (!filter) {
        this.setState(() => ({ filter: null }))
        return
      }
      this.setState(() => ({
        filter,
      }))
    }

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

    console.log(
      dropDownItem &&
        percipitationData.find((d) => d.feature === dropDownItem.value)?.value
    )

    return (
      <div>
        <Center>
          <ChartTitle>{this.props.title}</ChartTitle>
          <ChartLead>{this.props.lead}</ChartLead>
          <div ref={this.setInnerRef} {...styles.inner}>
            <a {...styles.anchor} id={anchor} />
            <div
              style={{
                // marginLeft: -DEFAULT_MARGIN_LEFT,
                position: isFixed ? 'fixed' : 'absolute',
                top: isAfter ? undefined : isFixed ? buffer : 0,
                left: isFixed ? left : 0,
                right: isFixed ? left : 0,
                bottom: isAfter ? 0 : undefined,
              }}
              ref={this.setPlotRef}
            >
              <div>
                <div>
                  <div
                    {...styles.fadeOut}
                    style={{ opacity: phase.step === 'step1' ? 1 : 0 }}
                  >
                    <Autocomplete
                      label='Gemeinde auswählen'
                      value={dropDownItem || ''}
                      filter={filter}
                      items={dropDownItems.filter(
                        ({ text }) =>
                          !filter ||
                          text.toLowerCase().includes(filter.toLowerCase())
                      )}
                      onChange={(value) => {
                        this.setDropdownItem(value)
                        this.setUserData(value)
                      }}
                      onFilterChange={(filter) => this.setFilter(filter)}
                    />
                  </div>
                  <MapPlot
                    {...phaseState}
                    phase={phase}
                    dataByStep={percipitationData}
                    onPhaseState={this.setPhaseState}
                    innerWidth={innerWidth}
                    heightRatio={heightRatio}
                    labels={this.props.labels}
                    userMunicipality={dropDownItem}
                  />
                  <div style={{ height: '50px' }}>
                    <ColorLegend
                      items={colorItemsPercip}
                      labels={this.props.labels}
                      positionLeft={phase.step === 'step1' ? 0 : 50}
                    />
                    <ColorLegend
                      items={colorItemsTemp}
                      labels={this.props.labels}
                      positionLeft={phase.step === 'step1' ? 150 : 50}
                    />
                  </div>
                  <Label>
                    {this.props.labels.source}
                    <Link
                      href={this.props.labels.href}
                      text={this.props.labels.sourceText}
                    />
                  </Label>
                </div>
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
                    {phase.title && <ChartTitle>{phase.title}</ChartTitle>}

                    {phase.step &&
                      [].concat(phase.step + '/text').map((text, i) => (
                        <ChartLead key={i}>
                          {t.elements(text, {
                            municipality_winter: (
                              <MunicipalityText
                                key={`municipality_winter-${i}`}
                                hasMunicipality={dropDownItem}
                                text={t(phase.step + '/municipality_winter', {
                                  municipality: dropDownItem?.text,
                                  winter_diff:
                                    userData && format(userData.winter_diff),
                                })}
                              />
                            ),
                            CP045: (
                              <Highlight
                                key={`CP045-${i}`}
                                colorScheme={colorScheme}
                                color={'CP045'}
                                text={t(phase.step + '/CP045')}
                              />
                            ),
                            CP072: (
                              <Highlight
                                key={`CP072-${i}`}
                                colorScheme={colorScheme}
                                color={'CP072'}
                                text={t(phase.step + '/CP072')}
                              />
                            ),
                            CP112: (
                              <Highlight
                                key={`CP112-${i}`}
                                colorScheme={colorScheme}
                                color={'CP112'}
                                text={t(phase.step + '/CP112')}
                              />
                            ),
                            CP041: (
                              <Highlight
                                key={`CP041-${i}`}
                                colorScheme={colorScheme}
                                color={'CP041'}
                                text={t(phase.step + '/CP041')}
                              />
                            ),
                            CP082_083: (
                              <Highlight
                                key={`CP082_083-${i}`}
                                colorScheme={colorScheme}
                                color={'CP082_083'}
                                text={t(phase.step + '/CP082_083')}
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
  const { color, text, colorScheme } = props
  return (
    <span style={{ display: 'inline-block', verticalAlign: 'text-top' }}>
      <span
        {...styles.highlight}
        {...colorScheme.set('backgroundColor', color + '-background')}
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

const MunicipalityText = (props) => {
  const { text, hasMunicipality } = props
  return <span>{hasMunicipality ? text : ''}</span>
}

const Link = (props) => {
  const { href, text } = props
  return <Editorial.A href={href}>{text}</Editorial.A>
}
