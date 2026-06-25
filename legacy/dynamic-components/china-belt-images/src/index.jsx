import React from 'react'
import {
  useColorContext,
  ColorContextLocalExtension,
} from '@project-r/styleguide'

import ScrollBlocks from './ScrollBlocks'

const App = (props) => {
  return (
    <ColorContextLocalExtension
      localColors={{
        light: {
          grey: 'rgba(220, 220, 220, 0.8)',
          scrollBlockBg: 'rgba(255, 255, 255, 0.90)',
          percip_low: '#e8e8e8',
          percip_medium: '#e4d9ac',
          percip_high: '#c8b35a',
          temp_low: '#e8e8e8',
          temp_medium: '#cbb8d7',
          temp_high: '#9972af',
        },
        dark: {
          grey: 'rgba(90, 90, 90, 0.8)',
          scrollBlockBg: 'rgba(25, 25, 25, 0.9)',
          CP011: 'rgb(0, 143, 93)',
          CP045: 'rgb(203, 94, 0)',
          CP072: 'rgb(232, 198, 0)',
          CP112: 'rgb(112, 225, 106)',
          CP041: 'rgb(64, 70, 201)',
          CP082_083: 'rgb(18, 122, 243)',
          'CP011-background': 'rgba(0, 143, 93, 0.35)',
          'CP045-background': 'rgba(203, 94, 0, 0.35)',
          'CP072-background': 'rgba(232, 198, 0, 0.35)',
          'CP112-background': 'rgba(112, 225, 106, 0.35)',
          'CP041-background': 'rgba(64, 70, 201, 0.35)',
          'CP082_083-background': 'rgba(18, 122, 243, 0.35)',
        },
      }}
    >
      <ScrollBlocks {...props} />
    </ColorContextLocalExtension>
  )
}

export function withColorScheme(Component) {
  return (props) => {
    const [colorScheme] = useColorContext()

    return <Component colorScheme={colorScheme} {...props} />
  }
}

export default App
