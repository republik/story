import React from 'react'
import {
  useColorContext,
  ColorContextLocalExtension,
} from '@project-r/styleguide'

import ScrollBlocks from './ScrollBlocks'
import { light, dark } from './data'

const App = (props) => {
  return (
    <ColorContextLocalExtension localColors={{ light, dark }}>
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
