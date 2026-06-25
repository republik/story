import React from 'react'

import { createFormatter } from '@project-r/styleguide'
import VeilSlider from './components/Veil/Slider'
import {
  useColorContext,
  ColorContextLocalExtension,
} from '@project-r/styleguide'

const Wrapper = (props) => {
  const { veil, config, translations } = props
  const t = createFormatter(translations)

  return (
    <ColorContextLocalExtension localColors={{ ...config.colors }}>
      <VeilSlider config={config} t={t} {...props} />
    </ColorContextLocalExtension>
  )
}

export function withColorScheme(Component) {
  return (props) => {
    const [colorScheme] = useColorContext()

    return <Component colorScheme={colorScheme} {...props} />
  }
}

export default Wrapper
