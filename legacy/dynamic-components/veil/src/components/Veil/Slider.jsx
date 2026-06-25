import React, { Component, Fragment } from 'react'
import { css } from 'glamor'

import { formatLocale } from 'd3-format'

import { Label, Button, colors, Interaction } from '@project-r/styleguide'

import Slider from '../Base/Slider'
import { withColorScheme } from '../..'

const thousandSeparator = '\u2019'
const swissNumbers = formatLocale({
  decimal: ',',
  thousands: thousandSeparator,
  grouping: [3],
  currency: ['CHF\u00a0', ''],
  minus: '\u2212',
  percent: '\u2009%',
})

const countFormat = (value, precision) => {
  const count4Format = swissNumbers.format(`.${precision}f`)
  const count5Format = swissNumbers.format(`,.${precision}f`)
  if (String(Math.abs(Math.round(value))).length > 4) {
    return count5Format(value)
  }
  return count4Format(value)
}

const styles = {
  fadeIn: css({
    opacity: 0,
    transition: 'opacity 0.4s ease-out 0.2s',
  }),
  slideIn: css({
    transition: 'width 0.4s ease-out',
  }),

  guessContainer: css({
    position: 'absolute',
    marginTop: 6,
    width: '100%',
  }),
  guessBar: css({
    height: 8,
    borderRight: '1px solid white',
  }),
}

class Reveal extends Component {
  constructor(props) {
    super(props)

    this.state = { value: props.config.initialValue || 0, revealed: false }
  }

  render() {
    const { config, t, colorScheme, secondary } = this.props
    const { value, revealed } = this.state

    const {
      min,
      max,
      step,
      revealValue,
      initialValue,
      precision = 0,
      labelMin,
      labelMax,
      guide,
      paddingBottom,
    } = config

    const width = Math.round((100 / max) * value)
    const revealedWidth = Math.round((100 / max) * revealValue)

    return (
      <Fragment>
        <div
          style={{
            marginBottom: 23,
            paddingTop: 32,
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'flex-start',
          }}
        >
          <div
            style={{
              height: 12,
              width: 12,
              marginRight: 12,
              borderRadius: '50%',
              flex: 'none',
            }}
            {...colorScheme.set(
              'backgroundColor',
              revealed ? 'guessed' : 'guess'
            )}
          ></div>
          <Interaction.P style={{ marginBottom: 24 }}>
            {t.elements('slider/label/text', {
              emphasis: (
                <Interaction.Emphasis key='emphasis'>
                  {t('slider/label/emphasis', {
                    value: countFormat(value, precision),
                  })}
                </Interaction.Emphasis>
              ),
              valueEmphasis: (
                <Interaction.Emphasis key='valueEmphasis'>
                  {t('slider/label/valueEmphasis', {
                    value: countFormat(value, precision),
                  })}
                </Interaction.Emphasis>
              ),
            })}
            {guide && (
              <span {...colorScheme.set('color', 'guide')}>
                {t('slider/guide')}
              </span>
            )}
          </Interaction.P>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Track itself */}
          <div style={{ position: 'absolute', width: '100%', marginTop: 6 }}>
            <div style={{ height: 8, backgroundColor: colors.secondaryBg }} />
          </div>

          {/* User guessed value as colored bar */}
          <div
            {...styles.guessContainer}
            style={{ zIndex: revealed && value <= revealValue ? 1 : 0 }}
          >
            <div
              {...styles.guessBar}
              style={{
                width: `${Math.round(width)}%`,
              }}
              {...colorScheme.set(
                'backgroundColor',
                revealed ? 'guessed' : 'guess'
              )}
            />
          </div>

          {/* Actual value as colored bar */}
          <div
            {...styles.slideIn}
            style={{
              opacity: revealed ? 1 : 0,
              width: revealed ? '100%' : '0%',
              position: 'absolute',
              marginTop: 6,
            }}
          >
            <div
              style={{
                height: 8,
                borderRightWidth: '1px',
                borderRightStyle: 'solid',
                width: `${Math.round(revealedWidth)}%`,
              }}
              {...colorScheme.set('backgroundColor', revealed && 'reveal')}
              {...colorScheme.set('borderRightColor', 'text')}
            />
          </div>

          {/* Range Label | min ---> max | */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              borderLeftWidth: '1px',
              borderLeftStyle: 'solid',
              marginTop: 28,
              marginLeft: 1,
            }}
            {...colorScheme.set('borderLeftColor', 'text')}
          >
            <Label style={{ paddingLeft: 5 }}>{labelMin || '0 %'}</Label>
            <div
              style={{
                borderRightWidth: '1px',
                borderRightStyle: 'solid',
                float: 'right',
                paddingRight: 5,
                marginRight: 2,
              }}
              {...colorScheme.set('borderRightColor', 'text')}
            >
              <Label>{labelMax || '100 %'}</Label>
            </div>
          </div>

          {/* Actual value as label and line */}
          <div
            {...styles.fadeIn}
            style={{
              opacity: revealed ? 1 : 0,
              position: 'absolute',
              width: '100%',
              marginTop: 28,
            }}
          >
            {revealValue / max > 0.5 ? (
              <div
                style={{
                  width: `${Math.round(revealedWidth)}%`,
                  borderRightWidth: '1px',
                  borderRightStyle: 'solid',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
                {...colorScheme.set('borderRightColor', 'reveal')}
              >
                <div
                  style={{
                    alignSelf: 'flex-end',
                    textAlign: 'right',
                    paddingTop: 20,
                    paddingRight: 10,
                  }}
                >
                  <Interaction.P {...colorScheme.set('color', 'reveal')}>
                    {t.elements('veil/label/text', {
                      emphasis: (
                        <Interaction.Emphasis key='reveal-emphasis-1'>
                          {t('veil/label/emphasis', {
                            value: countFormat(revealValue, precision),
                          })}
                        </Interaction.Emphasis>
                      ),
                    })}
                  </Interaction.P>
                </div>
              </div>
            ) : (
              <div
                style={{
                  marginLeft: `${Math.round(revealedWidth)}%`,
                  borderLeftWidth: '1px',
                  borderLeftStyle: 'solid',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
                {...colorScheme.set('borderLeftColor', 'reveal')}
              >
                <div
                  style={{ textAlign: 'left', paddingTop: 20, paddingLeft: 10 }}
                >
                  <Interaction.P {...colorScheme.set('color', 'reveal')}>
                    {t.elements('veil/label/text', {
                      emphasis: (
                        <Interaction.Emphasis key='reveal-emphasis-2'>
                          {t('veil/label/emphasis', {
                            value: countFormat(revealValue, precision),
                          })}
                        </Interaction.Emphasis>
                      ),
                    })}
                  </Interaction.P>
                </div>
              </div>
            )}
          </div>

          {/* Slider */}
          {!revealed && (
            <div style={{ position: 'absolute', width: '100%' }}>
              <Slider
                min={min}
                max={max}
                step={step}
                value={value}
                thumbColor={
                  revealed
                    ? colorScheme.getCSSColor('guessed')
                    : colorScheme.getCSSColor('guess')
                }
                onChange={(_, value) => !revealed && this.setState({ value })}
              />
            </div>
          )}
        </div>
        <div style={{ marginTop: 140, paddingBottom: paddingBottom || 48 }}>
          <Button
            disabled={revealed}
            onClick={() => this.setState({ revealed: true })}
          >
            {t('button')}
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default withColorScheme(Reveal)
