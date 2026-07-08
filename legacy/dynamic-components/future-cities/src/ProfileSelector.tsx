import * as React from 'react'
import Profile, { Profiles } from './Profile'
import { Dropdown, Interaction } from '@project-r/styleguide'
import { Center, Breakout, mediaQueries, fontFamilies } from '@project-r/styleguide'

import { PROFILES } from './profiles'
import { CHART_WIDTH } from './constants'

var values = obj => Object.keys(obj).map(e => obj[e])

const selectableProfiles = values(PROFILES).filter(
  (p: Profiles) => !p.highlightKey,
)

const dropdownItems = selectableProfiles.map((i: Profiles) => ({
  text: `${i.orig.label}`,
  value: i.orig.current_city.toLocaleLowerCase(),
}))

const ProfileSelector: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = React.useState<any>(
    dropdownItems[0].value,
  )

  return (
    <Breakout size="breakout">
      <div
        style={{
          // backgroundImage:
          //   'url(https://republik-assets.s3.eu-central-1.amazonaws.com/dynamic-components/future-cities/assets/world.jpg)',
          //   backgroundPositionX: 'center',
          //   backgroundRepeat: 'no-repeat',
          //   backgroundSize: `1035px`
        }}
      >
        <div style={{ width: CHART_WIDTH + 30, margin: 'auto', background: '#fff' }}>
          <div style={{ display: 'flex', padding: '0 15px' }}>
            <div style={{ width: '50%' }}>
              <Dropdown
                items={dropdownItems}
                value={selectedProfile}
                onChange={item =>
                  setSelectedProfile(item.value || item.target.value)
                }
              />
            </div>
            <Interaction.H3
              style={{
                width: '50%',
                marginTop: 25,
                textAlign: 'right',
                fontSize: 22,
                fontFamily: fontFamilies.sansSerifRegular
              }}
            >
              {PROFILES[selectedProfile].dest.label}
            </Interaction.H3>
          </div>
          <Profile
            showHeader={false}
            profile={PROFILES[selectedProfile]}
          />
        </div>
      </div>
    </Breakout>
  )
}

export default ProfileSelector
