import * as React from 'react'
import { Size, Profile } from '../types'
import { COLORS } from '../theme'
import { Button, mediaQueries } from '@project-r/styleguide'
import { PADDING_MOBILE, PADDING } from '../constants'
import { css } from 'glamor'
import Text from './text'
import { useSpring, animated } from 'react-spring/web.cjs'
import sum from 'lodash/sum'

const AnimatedText = animated(Text)

export const Poster: React.FC<{
  size: Size
  profile: Profile
  active?: boolean
  hidden?: boolean
}> = ({ size, profile, active = false, hidden }) => {
  const posterSize = size.width
  const imageHeight = posterSize * 0.9
  const imageWidth = (imageHeight * 1.5) / 2

  const { r, opacity, color } = useSpring({
    r: hidden ? 0 : active ? posterSize * 1.5 : posterSize * 0.14,
    opacity: hidden ? 0 : 1,
    color: active ? COLORS.textSecondary : COLORS.textPrimary
  })

  return (
    <animated.div style={{ opacity }}>
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <svg width={posterSize} height={posterSize}>
          <mask id={`lens${profile.id}`}>
            <animated.circle
              cx={10 + imageWidth / 2}
              cy={posterSize / 6}
              r={r}
              fill='#fff'
            />
          </mask>
          <g mask={`url(#lens${profile.id})`}>
            <rect
              x={-posterSize}
              y={-posterSize}
              width={3 * posterSize}
              height={3 * posterSize}
              fill='#fff'
            />
            <image
              y={(posterSize - imageHeight) * 0.9}
              x={10}
              href={`https://cdn.republik.space/s3/republik-assets/dynamic-components/footprint/${profile.id}.svg`}
              height={imageHeight}
              width={imageWidth}
            />
          </g>
        </svg>
      </div>
      <animated.div
        style={{
          position: 'absolute',
          width: '45%',
          top: imageHeight / 10,
          right: 0,
          color
        }}
      >
        <AnimatedText large style={{ color, fontSize: size.mobile ? 'inherit' : 30 }}>
          {profile.name}
        </AnimatedText>
        <AnimatedText style={{ color, fontSize: size.mobile ? 'inherit' : 20 }}>
          Fussabdruck: {(sum(Object.values(profile.budget)) / 1000).toFixed(1).replace('.', ',')}{' '}
          t
        </AnimatedText>
        <AnimatedText style={{ color }}>Ziel: {profile.target}</AnimatedText>
      </animated.div>
    </animated.div>
  )
}

type Props = {
  size: Size
  profiles: Profile[]
  activeProfile?: Profile
  onChange: (profile: Profile) => void
  resetProfile: () => void
}

const Intro: React.FC<Props> = ({
  size,
  activeProfile,
  profiles,
  onChange,
  resetProfile
}) => {
  const previewHeight = size.width / 3

  const { opacity } = useSpring({
    opacity: activeProfile ? 1 : 0
  })

  return (
    <div>
      <div
        {...css({
          position: 'relative',
          width: size.width,
          minHeight: size.width,
          background: COLORS.bgPrimary,
          overflow: 'hidden',
        })}
      >
        <img
          style={{ opacity: 0.07, position: 'absolute', top: size.width*0.05, left: -size.width*0.25 }}
          width={2*size.width}
          height={2*size.width}
          src='https://cdn.republik.space/s3/republik-assets/dynamic-components/footprint/footprint.svg'
        />
        {profiles.map((p, i) => {
          const { top } = useSpring({
            top: p.id === activeProfile?.id ? 0 : i * previewHeight
          })

          return (
            <animated.div
              key={p.id}
              onClick={() => !activeProfile && onChange(p)}
              style={{
                position: 'absolute',
                width: size.width,
                height: previewHeight,
                cursor: activeProfile ? 'default' : 'pointer',
                top
              }}
            >
              <Poster
                size={size}
                profile={p}
                active={p.id === activeProfile?.id}
                hidden={activeProfile && p.id !== activeProfile?.id}
              />
            </animated.div>
          )
        })}
      </div>
      <animated.div
        style={{
          opacity: activeProfile ? 1 : 0
        }}
      >
        {activeProfile && (
          <>
            <Text margin padding>
              {activeProfile.description}
            </Text>
            <div
              style={{
                display: 'flex',
                padding: 15,
                marginBottom: 15,
                justifyContent: 'center'
              }}
            >
              <Button black onClick={resetProfile}>
                Profil wechseln
              </Button>
            </div>
          </>
        )}
      </animated.div>
    </div>
  )
}

export default Intro
