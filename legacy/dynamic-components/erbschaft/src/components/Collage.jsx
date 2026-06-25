import React, { Component, Fragment } from 'react'
import { AudioPlayer, Editorial, fontStyles, mediaQueries, colors } from '@project-r/styleguide'
import { css } from 'glamor'
import debounce from 'lodash/debounce'
import { easeCubicOut } from 'd3-ease'
import { timer } from 'd3-timer'
import { interpolateNumber } from 'd3-interpolate'
import scrollIntoView from 'scroll-into-view'

import Item, { SIZE, SPACE } from './Item'

import barometerSubtitles from '../../assets/subs/barometer.srt'
import goldvreneliSubtitles from '../../assets/subs/goldvreneli.srt'
import hausSubtitles from '../../assets/subs/haus.srt'
import holztruheSubtitles from '../../assets/subs/holztruhe.srt'
import porzellanSubtitles from '../../assets/subs/porzellan.srt'
import radioSubtitles from '../../assets/subs/radio.srt'
import ringSubtitles from '../../assets/subs/ring.srt'
import bauernhofSubtitles from '../../assets/subs/bauernhof.srt'
import kerzeSubtitles from '../../assets/subs/kerze.srt'
import listerinSubtitles from '../../assets/subs/listerin.srt'
import schalSubtitles from '../../assets/subs/schal.srt'

const SUBTITLES = {
  barometer: barometerSubtitles,
  goldvreneli: goldvreneliSubtitles,
  haus: hausSubtitles,
  holztruhe: holztruheSubtitles,
  porzellan: porzellanSubtitles,
  radio: radioSubtitles,
  ring: ringSubtitles,
  bauernhof: bauernhofSubtitles,
  kerze: kerzeSubtitles,
  listerin: listerinSubtitles,
  schal: schalSubtitles
}

const styles = {
  slider: css({
    width: '100%',
    height: SIZE + 15 + 10,
    paddingTop: 10,
    paddingBottom: 15,
    display: 'flex',
    overflowX: 'auto',
    '::-webkit-scrollbar': {
      width: 0,
      height: 0,
      background: 'transparent'
    }
  }),
  buffer: css({
    height: '100%',
    flexShrink: 0
  }),
  subtitles: css({
    backgroundColor: '#f7f7f7',
    padding: '12px 15px',
    margin: '20px 15px 0',
    ...fontStyles.sansSerifRegular15,
    [mediaQueries.mUp]: {
      width: 665,
      margin: '20px auto 0',
      ...fontStyles.sansSerifRegular18,
      padding: '20px 25px'
    },
    maxHeight: 200,
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch'
  }),
  activeItem: css({
    width: SIZE,
    [mediaQueries.mUp]: {
      width: 665
    },
    margin: '5px auto 0'
  })
}

const ActiveItem = React.forwardRef(({ activeItem, currentSubLine, onProgress, autoPlay, subtitles }, ref) => {
  const lineRef = React.useRef()
  const playerRef = React.useRef()
  React.useEffect(() => {
    scrollIntoView(lineRef.current, {
      time: 400,
      validTarget: (target, parentsScrolled) => {
        return target !== window
      }
    })
  }, [currentSubLine])

  return <>
    <div ref={ref} {...styles.activeItem}>
      <AudioPlayer
        ref={playerRef}
        key={`${activeItem.title}${autoPlay}`}
        src={activeItem.audioSrc}
        t={() => {}}
        autoPlay={autoPlay}
        onProgress={onProgress} />
    </div>
    {currentSubLine && <div {...styles.subtitles}>
      {subtitles.filter(Boolean).map((line, i) => 
        <span
          key={i}
          onClick={() => {
            if (playerRef.current && playerRef.current.audio) {
              playerRef.current.audio.currentTime = line.start
              if (playerRef.current.audio.paused) {
                playerRef.current.audio.play()
              }
            }
          }}
          style={{
            cursor: playerRef.current && playerRef.current.audio
              ? 'pointer'
              : undefined,
            color: line !== currentSubLine ? colors.lightText : undefined
          }}
          ref={line === currentSubLine ? lineRef : undefined}>
          {line.text}{' '}
        </span>
      )}
    </div>}
  </>
})

class Collage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: props.items[0],
      autoPlay: false
    }
    this.setSliderRef = ref => {
      this.slider = ref
    }
    this.setActiveItemRef = ref => {
      this.activeItem = ref
    }

    let scrollTimer

    this.scrollTo = (
      destination,
      duration = 400
    ) => {
      if (scrollTimer) {
        scrollTimer.stop()
      }
      const n = interpolateNumber(this.slider.scrollLeft, destination)
      scrollTimer = timer(elapsed => {
        const t = easeCubicOut(Math.min(elapsed / duration, 1))

        this.slider.scroll(Math.round(n(t)), 0)

        if (t >= 1) {
          scrollTimer.stop()
        }
      })
    }
    this.scrollToIndex = index => {
      this.scrollTo(index * SIZE)
    }

    this.measure = () => {
      const { left: sliderLeft } = this.slider.getBoundingClientRect()
      const { left, width, right } = this.activeItem.getBoundingClientRect()
      const bufferLeft = left - sliderLeft - SPACE
      const bufferRight = width + (window.innerWidth - right) - SIZE
      if (bufferRight !== this.state.bufferRight) {
        this.setState({ bufferRight })
      }
      if (bufferLeft !== this.state.bufferLeft) {
        this.setState({ bufferLeft })
      }
    }
    this.onScroll = debounce(() => {
      if (this.state.touch) {
        return
      }

      let snapIndex = Math.round(this.slider.scrollLeft / SIZE)
      if (!this.props.items[snapIndex]) {
        snapIndex = this.props.items.indexOf(this.state.activeItem)
      }
      this.scrollToIndex(snapIndex)

      const snapToItem = this.props.items[snapIndex]
      if (snapToItem.name !== this.state.activeItem.name) {
        this.setState({activeItem: snapToItem, currentTime: undefined, autoPlay: false})
      }
    }, 200)
  }
  renderActiveItem () {
    const { activeItem, currentTime = 0, autoPlay } = this.state
    if (!activeItem) {
      return null
    }

    const subtitles = activeItem.subtitles || SUBTITLES[activeItem.name] || []
    const reachSubtitles = subtitles.filter(subtitle => subtitle.start <= currentTime)
    const subtitleIndex = reachSubtitles.length - 1
    const currentSubLine = subtitles[subtitleIndex]

    return <ActiveItem
      ref={this.setActiveItemRef}
      autoPlay={autoPlay}
      activeItem={activeItem}
      currentSubLine={currentSubLine}
      subtitles={subtitles}
      onProgress={(progress, audioElement) => {
        if (progress >= 1) {
          const { items } = this.props
          const nextIndex = items.indexOf(activeItem) + 1
          const nextItem = items[nextIndex]
          if (nextItem) {
            this.setState({activeItem: nextItem, currentTime: undefined, autoPlay: true})
            this.scrollToIndex(nextIndex)
            return
          }
        } 
        this.setState({currentTime: audioElement.currentTime})
      }} />
  }

  componentDidMount () {
    this.slider.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.measure)
    this.measure()
  }

  componentWillUnmount () {
    this.slider.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.measure)
  }

  render () {
    const { activeItem, bufferLeft, bufferRight } = this.state

    return <Fragment>
      <div {...styles.slider} ref={this.setSliderRef}
        onTouchStart={() => this.setState({touch: true})}
        onTouchEnd={() => {
          this.setState({touch: false})
          this.onScroll()
        }}>
        <div {...styles.buffer} style={{ width: bufferLeft }} />
        {bufferLeft && this.props.items.map((item, i) => <Item
          key={item.name}
          {...item}
          active={activeItem.name === item.name}
          onClick={e => {
            e.preventDefault()
            this.setState({activeItem: item, currentTime: undefined, autoPlay: true})
            this.scrollToIndex(i)
          }}
        />)}
        <div {...styles.buffer} style={{ width: bufferRight }} />
      </div>
      {this.renderActiveItem()}
    </Fragment>
  }
}

Collage.defaultProps = {
  items: []
}

export default Collage
