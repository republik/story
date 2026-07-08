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
          scrollBlockBg: 'rgba(255, 255, 255, 0.9)',
          deaths: '#DFCCBD',
          'deaths-background': 'rgba(223, 204, 189, 0.2)',
          pumps: '#103BD9',
          'pumps-background': 'rgba(16, 59, 217, 0.1)',
        },
        dark: {
          grey: 'rgba(90, 90, 90, 0.8)',
          scrollBlockBg: 'rgba(25, 25, 25, 0.9)',
          deaths: '#DFCCBD',
          'deaths-background': 'rgba(223, 204, 189, 0.3)',
          pumps: '#103BD9',
          'pumps-background': 'rgba(16, 59, 217, 0.3)',
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
