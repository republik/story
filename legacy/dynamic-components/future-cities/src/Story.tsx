import * as React from 'react'
import { JourneyDef } from './journeys'
import JourneyMap from './JourneyMap'
import { scaleLinear } from 'd3-scale'
import { mediaQueries, fontFamilies } from '@project-r/styleguide'
import { css } from 'glamor'
import Profile, { Profiles } from './Profile'
import { CHART_WIDTH } from './constants'

css.global('body', { margin: 0 })

type Props = {
  width: number
  height: number
  top?: number
  journey: JourneyDef
  profile: Profiles
  descriptions?: string[]
}

const styles = {
  map: css({
    position: ['sticky', '-webkit-sticky'],
    zIndex: 0,
  }),
  story: css({
    position: 'relative',
    pointerEvents: 'none',
    zIndex: 1,
  }),
  items: css({
    position: 'absolute',
    bottom: 0,
    height: `100%`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }),
  description: css({
    background: 'rgba(255,255,255,0.75)',
    padding: 15,
    lineHeight: 1.2,
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: 18,
    [mediaQueries.onlyS]: {
      fontSize: 16,
    },
  }),
}

const Story: React.FC<Props> = ({
  journey,
  width,
  height,
  top = 0,
  profile,
  descriptions = [],
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [progress, setProgress] = React.useState<number>(0)

  const storyHeight = descriptions.length * height

  const scrollScale = React.useMemo(
    () =>
      scaleLinear()
        .domain([0, storyHeight - height])
        .range([0, 1]),
    [height],
  )

  const onScroll = () => {
    const top = wrapperRef.current
      ? wrapperRef.current.getBoundingClientRect().top
      : 0
    setProgress(-scrollScale(top))
  }

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  //layout
  const sideBySide = width >= 2 * CHART_WIDTH
  const chartPosRight = sideBySide
    ? 0
    : (width - CHART_WIDTH) / 2 - 15
  const mapCenter = sideBySide ? 0.25 * width : 0.5 * width

  return (
    <div ref={wrapperRef}>
      <div {...styles.map} style={{ top }}>
        <JourneyMap
          journey={journey}
          width={width}
          center={mapCenter}
          height={height}
          progress={progress}
        />
      </div>

      <div
        {...styles.story}
        style={{ height: 1.5 * storyHeight, width }}
      >
        <div
          {...styles.items}
          style={{ width: CHART_WIDTH + 30, right: chartPosRight }}
        >
          {descriptions.length > 0 &&
            descriptions.map((d, i) => (
              <div key={i} {...styles.description}>
                {d}
              </div>
            ))}
          <Profile profile={profile} />
        </div>
      </div>
    </div>
  )
}

export default Story
