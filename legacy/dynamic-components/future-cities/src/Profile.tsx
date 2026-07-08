import * as React from 'react'
import { Interaction, fontFamilies } from '@project-r/styleguide'
import Chart from './Chart'
import { css } from 'glamor'
import { COLORS, CHART_WIDTH } from './constants'

export type CityProfile = {
  current_city: string
  Annual_Mean_Temperature: number
  future_Annual_Mean_Temperature: number
  Annual_Precipitation: number
  future_Annual_Precipitation: number
  Max_Temperature_of_Warmest_Month: number
  future_Max_Temperature_of_Warmest_Month: number
  Min_Temperature_of_Coldest_Month: number
  future_Min_Temperature_of_Coldest_Month: number
  label: string
  country: string
}

export type Profiles = {
  highlightKey: string
  distance: number
  orig: CityProfile
  dest: CityProfile
}

export type Props = {
  width?: number
  height?: number
  profile: Profiles
  showHeader?: boolean
}

const KEYS = [
  'Annual_Mean_Temperature',
  'Max_Temperature_of_Warmest_Month',
  'Min_Temperature_of_Coldest_Month',
  'Annual_Precipitation',
]

const styles = {
  note: css({
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: 12,
    width: '33%',
  }),
}

const Profile: React.FC<Props> = React.memo(
  ({ profile, width = CHART_WIDTH, showHeader = true }) => {
    const margin = 0
    const w = width - 2 * margin

    const chartHeight = 80

    const highlightKey = profile.highlightKey

    return (
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: CHART_WIDTH + 30,
          background: `rgba(255,255,255, 1)`,
          padding: 15,
        })}
      >
        {showHeader && (
          <div
            {...css({
              display: 'flex',
              width: '100%',
              alignItems: 'baseline',
            })}
          >
            <div style={{ width: '50%' }}>
              <Interaction.H3>{profile.orig.label}</Interaction.H3>
            </div>
            <div style={{ width: '50%', textAlign: 'right' }}>
              <Interaction.H3>{profile.dest.label}</Interaction.H3>
            </div>
          </div>
        )}
        <div
          {...css({
            display: 'flex',
            width: '100%',
            paddingBottom: 5,
          })}
        >
          <div {...styles.note}>{profile.orig.country}</div>
          <div
            {...styles.note}
            style={{
              textAlign: 'center',
            }}
          >
            {`${profile.distance} km`}
          </div>
          <div {...styles.note} style={{
              textAlign: 'right',
            }}>{profile.dest.country}</div>
        </div>
        {highlightKey && (
          <Chart
            key={highlightKey}
            highlight={true}
            labelKey={highlightKey}
            width={w}
            height={chartHeight}
            profileData={profile}
          />
        )}
        {KEYS.filter(k => k !== highlightKey).map(k => (
          <Chart
            key={k}
            highlight={!highlightKey || k === highlightKey}
            labelKey={k}
            width={w}
            height={chartHeight}
            profileData={profile}
          />
        ))}
      </div>
    )
  },
)

export default Profile
